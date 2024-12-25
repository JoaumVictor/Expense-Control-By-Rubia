import { ExpenseMonthsChart } from "./charts/expense-months-chart";
import { AddExpense } from "./components/add-expense";
import { Expenses } from "./components/expenses";
import { ThemeProvider } from "./components/theme-provider";
import { ExpensesProvider } from "./contexts/expenses-control";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="expense-control-theme">
      <ExpensesProvider>
        <div className="space-y-4 p-4 max-h-screen">
          <AddExpense />
          <div className="grid grid-cols-2 gap-4">
            <ExpenseMonthsChart />
            <Expenses />
          </div>
        </div>
      </ExpensesProvider>
    </ThemeProvider>
  );
}
