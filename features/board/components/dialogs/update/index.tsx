import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/dialog";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Form } from "../../../../../components/ui/form";
import { BoardData, TaskData } from "@/types/board";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskDataSchema } from "@/features/board/schemas/task";
import { Input } from "../../../../../components/ui/input";
import { randId } from "@/utils/common";
import FormField from "../../../../../components/form-field";
import { Switch } from "../../../../../components/ui/switch";
import { Button } from "../../../../../components/ui/button";
import { useBoardCtx } from "@/context/board";
import { IDialog } from "@/types/common";
import { DatePicker } from "@/components/date-picker";
import { Checkbox } from "@/components/ui/checkbox";

interface Props extends IDialog {
  boardId: keyof BoardData;
  idx: number;
  taskData: TaskData;
}

function UpdateTaskDialog({
  boardId,
  idx,
  taskData,
  visibe,
  dialogToggle,
}: Props) {
  const subTask = useRef<string>("");
  const [dueSwitch, setDueSwitch] = useState(false);
  const { onUpdate, onDelete } = useBoardCtx();

  const formMethod = useForm<TaskData>({
    defaultValues: taskData,
    resolver: zodResolver(TaskDataSchema),
  });

  const { handleSubmit, register, control, setValue, reset } = formMethod;

  const due = useWatch({
    name: "due",
    control,
  });

  const { append, fields } = useFieldArray({ name: "subTasks", control });

  useEffect(() => {
    reset(taskData);
  }, [taskData]);

  const onSwicthDue = () => {
    setDueSwitch((prev) => {
      if (prev != false) {
        setValue("due", undefined);
      }

      return !prev;
    });
  };

  const onUpdateData = (data: TaskData) => {
    onUpdate(boardId, idx, data);
    dialogToggle();
  };

  const onAddSubTask = () => {
    if (!subTask.current) return;
    append({
      done: false,
      text: subTask.current,
    });
    subTask.current = "";
  };

  return (
    <Dialog modal open={visibe} onOpenChange={dialogToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update task</DialogTitle>
          <Form {...formMethod}>
            <FormField name="title" label="Title">
              <Input {...register("title")}></Input>
            </FormField>
            <FormField name="due" label="Due Date">
              <React.Fragment>
                <Switch checked={dueSwitch} onClick={onSwicthDue} />
                {dueSwitch && (
                  <DatePicker
                    date={due}
                    setDate={(date) => {
                      setValue("due", date);
                    }}
                  />
                )}
              </React.Fragment>
            </FormField>
            <FormField name="subTasks" label="SubTasks">
              <React.Fragment>
                <div className="inline-flex">
                  <Input
                    onChange={(e) => (subTask.current = e.target.value)}
                    placeholder="sub task"
                  />
                  <Button
                    variant="outline"
                    className="cursor-pointer ml-2"
                    onClick={onAddSubTask}
                  >
                    + Sub task
                  </Button>
                </div>
                {fields.map((subTask, idx) => {
                  return (
                    <div className="inline-flex items-center border border-black w-full p-2 rounded-md text-xs">
                      <div key={subTask.id} className="w-full truncate">
                        {subTask.text}
                      </div>
                      <Checkbox
                        defaultChecked={subTask.done}
                        onCheckedChange={(e) =>
                          setValue(`subTasks.${idx}.done`, !!e)
                        }
                      />
                    </div>
                  );
                })}
              </React.Fragment>
            </FormField>
            <Button variant="default" onClick={handleSubmit(onUpdateData)}>
              Update
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(boardId, taskData.id)}
            >
              Delete
            </Button>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateTaskDialog;
