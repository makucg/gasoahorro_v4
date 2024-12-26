export const calculateGradient = (price: number, minPrice: number, maxPrice: number): string => {
  const percent = (price - minPrice) / (maxPrice - minPrice);
  const r = percent > 0.5 ? 255 : Math.round(percent * 2 * 255);
  const g = percent < 0.5 ? 200 : Math.round((1 - percent) * 2 * 255);
  return `rgb(${r},${g},0)`;
};
