import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "./services/api";

interface Transactions {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TrasactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<Transactions[]>([]);

export function TrasactionsProvider({ children }: TrasactionsProviderProps) {
  const [transaction, setTransaction] = useState<Transactions[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then(({ data }) => setTransaction(data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={transaction}>
      {children}
    </TransactionsContext.Provider>
  );
}
