import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface Expense {
  id: string;
  amount: number;
  date: Date;
}

interface ExpensesContextProps {
  expenses: Expense[];
  addExpense: (amount: number, date: Date) => void;
  getExpenses: () => void;
}

const ExpensesContext = createContext<ExpensesContextProps | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "expenses-control";

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    getExpenses();
  }, []);

  const addExpense = (amount: number, date: Date) => {
    const newExpense: Expense = {
      id: uuidv4(),
      amount,
      date,
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedExpenses));
  };

  const getExpenses = () => {
    const storedExpenses = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, getExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = (): ExpensesContextProps => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
};
