import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useExpenses } from "@/contexts/expenses-control";
import { currencyFormat } from "@/utils/currency-format";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { useMemo } from "react";

const chartConfig = {
  totalExpenses: {
    label: "Gastos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ExpenseMonthsChart() {
  const { expenses } = useExpenses();

  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const chartData = useMemo(() => {
    const monthlyExpenses = Array.from({ length: 12 }, (_, i) => ({
      month: format(new Date(0, i), "MMMM", { locale: ptBR }),
      totalExpenses: 0,
    }));
  
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const monthIndex = expenseDate.getMonth();
      monthlyExpenses[monthIndex].totalExpenses += expense.amount;
    });
  
    return monthlyExpenses;
  }, [expenses]);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>
          Total gasto esse ano - <strong>{currencyFormat(totalExpense)}</strong>
        </CardTitle>
        <CardDescription>
          O gráfico exibe os gastos de mês a mês no período de 1 ano.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="w-full h-[calc(100vh-365px)]"
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="[&>div>div>div]:space-x-4" />}
            />
            <Bar dataKey="totalExpenses" fill="var(--color-totalExpenses)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={14}
                formatter={(value: number) => currencyFormat(value)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
