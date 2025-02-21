export const formatCurrency = (value: number) => {
  const formattedValue = new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    maximumFractionDigits: 2,
    currency: "MZN",
  }).format(value);

  return `Preço: ${formattedValue}`;
};
