import dayjs from "dayjs";

export const formatDate = (date) => {
  const day = dayjs(date);
  return day.format("DD-MM-YYYY");
};
