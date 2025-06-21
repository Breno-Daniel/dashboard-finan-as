import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Transaction } from '../types';

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransaction = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransaction deve ser usado dentro de TransactionProvider');
  return context;
};

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;

      const ref = collection(db, 'transactions');
      const q = query(ref, where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Transaction, 'id'>),
        date: doc.data().date.toDate().toISOString(), // garantir formato ISO
      }));

      setTransactions(data);
    };

    fetchTransactions();
  }, [user]);

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    if (!user) return;

    const docRef = await addDoc(collection(db, 'transactions'), {
      ...transaction,
      userId: user.uid,
      date: Timestamp.fromDate(new Date(transaction.date)),
      createdAt: Timestamp.now(),
    });

    setTransactions(prev => [
      ...prev,
      { ...transaction, id: docRef.id },
    ]);
  };

  const removeTransaction = async (id: string) => {
    await deleteDoc(doc(db, 'transactions', id));
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
