import z from "zod";
import TaskDataSchema from "../features/board/schemas/task";

export type BoardData = {
  notStarted: TaskData[];
  inProgress: TaskData[];
  blocked: TaskData[];
  done: TaskData[];
};

export type TaskData = {
  due?: Date;
  id: string;
  title: string;
  subTasks: SubTaskData[];
};

export type SubTaskData = {
  text: string;
  done: boolean;
};
