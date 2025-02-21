export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    maximumFractionDigits: 2,
    currency: "MZN",
  }).format(value);
};
