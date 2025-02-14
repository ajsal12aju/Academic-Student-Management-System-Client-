export const formatCurrency = (value) => {
  if (!value) return '0';
  return new Intl.NumberFormat('en-US').format(value); // For example, 45000 -> "45,000"
};
