import { BoardData, TaskData } from "@/types/board";
import { useDroppable } from "@dnd-kit/core";
import React, { CSSProperties, ReactNode } from "react";

import CreateTaskDialog from "../dialogs/create";
import { useDialog } from "@/hooks/dialog";
import { Button } from "../../../../components/ui/button";
import ColorText from "@/components/color-text";
import { SortableContext } from "@dnd-kit/sortable";
import Task from "../task";

type Props = {
  boardId: keyof BoardData;
  title: string;
  titleColor: string;
  taskData: TaskData[];
  className?: string;
};

function Board({ boardId, title, titleColor, taskData, className }: Props) {
  const { visible, dialogToggle } = useDialog();
  const { setNodeRef, isOver } = useDroppable({
    id: boardId,
    data: {
      boardId,
      type: "board",
    },
  });

  const style: CSSProperties | undefined = isOver
    ? {
        borderWidth: 2,
        borderColor: "transparent",
        transition: "transform 0.3s ease",
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex flex-col p-2 text-sm ${className || ""}`}
    >
      <ColorText title={title} bgColor={titleColor} />
      <SortableContext items={taskData}>
        {taskData.map((task, idx) => {
          return <Task boardId={boardId} data={task} key={task.id} idx={idx} />;
        })}
      </SortableContext>

      <CreateTaskDialog
        boardId={boardId}
        visibe={visible}
        dialogToggle={dialogToggle}
      />
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => dialogToggle()}
      >
        +
      </Button>
    </div>
  );
}

export default Board;
