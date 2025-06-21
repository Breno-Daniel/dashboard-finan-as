export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: 'entrada' | 'saida';
  category: string;
  date: string;
};
