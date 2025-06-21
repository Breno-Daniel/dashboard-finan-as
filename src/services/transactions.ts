import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface TransactionData {
  amount: number;
  category: string;
  date: Date;
  description?: string;
}

export async function saveTransaction(userId: string, data: TransactionData) {
  const transactionsRef = collection(db, 'transactions');
  await addDoc(transactionsRef, {
    userId,
    amount: data.amount,
    category: data.category,
    date: Timestamp.fromDate(data.date),
    description: data.description || '',
    createdAt: Timestamp.now(),
  });
}

export async function fetchUserTransactions(userId: string) {
  const transactionsRef = collection(db, 'transactions');
  const q = query(transactionsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const transactions: Array<TransactionData & { id: string }> = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();
    transactions.push({
      id: doc.id,
      amount: data.amount,
      category: data.category,
      date: data.date.toDate(),
      description: data.description,
    });
  });
  return transactions;
}
