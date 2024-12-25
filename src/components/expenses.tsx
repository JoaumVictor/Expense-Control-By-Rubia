import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExpenses } from "@/contexts/expenses-control";
import { currencyFormat } from "@/utils/currency-format";
import { format } from "date-fns";
import { ScrollArea } from "./ui/scroll-area";

export function Expenses() {
  const { expenses } = useExpenses();

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Histórico de gastos</CardTitle>
        <CardDescription>
          O histórico exibe a data e valor de quando um gasto foi registrado.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[calc(100vh-365px)]">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="border-b p-4 flex items-center justify-between"
            >
              <p className="font-semibold">{currencyFormat(expense.amount)}</p>
              <p>{format(expense.date, "dd/MM/yyyy")}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
