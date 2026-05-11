export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date));
};
