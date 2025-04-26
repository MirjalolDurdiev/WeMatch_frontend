export const formatDateForBackend = (date) => {
  if (date.length < 9) {
    return date + "T00:00:00.000Z";
  }
  return date;
};
