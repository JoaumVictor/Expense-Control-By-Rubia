import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExpenses } from "@/contexts/expenses-control";
import { cn } from "@/lib/utils";
import { moneyInputMask } from "@/utils/money-input-mask";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function AddExpense() {
  const { addExpense } = useExpenses();
  const [date, setDate] = useState<Date>();
  const [amount, setAmount] = useState<string>("");

  const handleAddExpense = () => {
    if (!amount || !date) return;

    addExpense(Number(amount.replace(",", ".")), date);
    setAmount("");
    setDate(undefined);
  };

  return (
    <div className="h-[190px]">
      <Card>
        <CardHeader>
          <CardTitle>Cadastrar gastos</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para registrar o seu gasto.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-end gap-4">
          <div>
            <Label>Valor gasto</Label>
            <Input
              value={amount}
              onChange={(e) => setAmount(moneyInputMask(e))}
              placeholder="R$ 0,0"
            />
          </div>

          <div className="grid space-y-1">
            <Label>Data do gasto</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? (
                    format(date, "dd/MM/yyyy", { locale: ptBR })
                  ) : (
                    <span>Escolha uma data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ptBR}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={handleAddExpense} disabled={!amount || !date}>
            Salvar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
