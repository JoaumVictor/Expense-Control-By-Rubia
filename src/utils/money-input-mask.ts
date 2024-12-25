import { ChangeEvent } from "react";

export function moneyInputMask(event: ChangeEvent<HTMLInputElement>): string {
  event.target.value = event.target.value.replace(/[^\d]/g, "");
  const sanitizedValue: string = event.target.value;

  if (sanitizedValue.length > 2) {
    const integerPart: string = sanitizedValue.slice(0, -2);
    const decimalPart: string = sanitizedValue.slice(-2);
    let formattedValue: string = `${integerPart},${decimalPart}`;

    if (formattedValue[0] === "0" && sanitizedValue.length !== 3) {
      formattedValue = formattedValue.slice(1);
    }

    return (event.target.value = formattedValue);
  } else {
    return (event.target.value = `0,${sanitizedValue.padStart(2, "0")}`);
  }
}
