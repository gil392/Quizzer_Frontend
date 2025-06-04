export const formatNumberWithPostfix = (num: number): string => {
  if (num < 1000) return num.toString();

  const units = ["", "K", "M", "B", "T"];
  const tier = Math.floor(Math.log10(num) / 3);

  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;
  const formatted = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);

  return `${formatted}${units[tier]}`;
};
