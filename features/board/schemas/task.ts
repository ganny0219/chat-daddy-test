import z from "zod";

export const TaskDataSchema = z.object({
  due: z.date().optional(),
  id: z.string().min(1),
  title: z.string().min(1, "Title is required!"),
  subTasks: z.array(
    z.object({
      text: z.string().min(1, "Text is required!"),
      done: z.boolean(),
    })
  ),
});
