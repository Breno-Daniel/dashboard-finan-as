// src/utils/formatters.ts
export const formatCurrency = (value: number): string =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString('pt-BR');
