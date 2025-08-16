import ColorText from "@/components/color-text";
import { TaskData, BoardData } from "@/types/board";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "@mui/material";
import React, { CSSProperties, useRef } from "react";
import SubTask from "../sub-task";
import dayjs from "dayjs";
import { useDialog } from "@/hooks/dialog";
import UpdateTaskDialog from "../dialogs/update";
import { getDueColor } from "../../utils/get-due-color";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  boardId: keyof BoardData;
  idx: number;
  data: TaskData;
};
function Task({ boardId, data, idx }: Props) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { visible, dialogToggle } = useDialog();
  const holdTriggered = useRef(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: data.id,
      data: {
        boardId,
        type: "task",
        task: data,
      },
    });

  const style: CSSProperties | undefined = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleMouseDown = () => {
    holdTriggered.current = false;

    timerRef.current = setTimeout(() => {
      holdTriggered.current = true;
    }, 100);
  };

  const handleMouseUp = () => {
    if (!timerRef.current) return;

    clearTimeout(timerRef.current);

    if (!holdTriggered.current) {
      dialogToggle(true);
    }
  };

  return (
    <React.Fragment>
      <UpdateTaskDialog
        boardId={boardId}
        idx={idx}
        taskData={data}
        visibe={visible}
        dialogToggle={dialogToggle}
      />
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Card className="flex flex-col p-2 my-2 cursor-pointer">
          <h2 className="font-bold">{data.title}</h2>
          {data?.due && (
            <ColorText
              title={`Due ${dayjs(data?.due).format("MM/DD")}`}
              bgColor={getDueColor(data.due)}
              className="text-xs"
            />
          )}
          {data.subTasks && (
            <div className="mt-2">
              {data.subTasks.map((subTask, index) => {
                return <SubTask key={`${boardId}-${index}`} data={subTask} />;
              })}
            </div>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Task;
