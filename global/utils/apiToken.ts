export const parseExpiry = (exp: string) => {
  const expFromTodayMs = Date.parse(exp) - Date.now();
  return expFromTodayMs || 0;
};

export const getDayValue = (exp: number) => {
  const days = Math.floor(exp / 1000 / 60 / 60 / 24);
  return `Expires in: ${days} days`;
};
