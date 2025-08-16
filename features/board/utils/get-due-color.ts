import dayjs from "dayjs";

const warningLevels = ["#2FFF00", "#FFF700", "#FF0000"];

export const getDueColor = (due?: Date) => {
  if (!due) return;

  const now = dayjs();
  const dueDate = dayjs(due);

  const diff = dueDate.diff(now, "day");

  if (diff >= 7) return warningLevels[0];
  if (diff >= 3) return warningLevels[1];
  if (diff >= 0) return warningLevels[2];
  return warningLevels[2];
};
