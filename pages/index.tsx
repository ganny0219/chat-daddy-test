import Board from "@/features/board/components/board";
import Task from "@/features/board/components/task";
import ColorText from "@/components/color-text";
import { DndContext } from "@dnd-kit/core";
import { useBoardCtx } from "@/context/board";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export default function Home() {
  const { data, onDragEnd, onDragOver } = useBoardCtx();

  return (
    <main className="p-4 m-auto min-h-[100vh] overflow-hidden">
      <h2 className="text-3xl font-bold">Personal</h2>
      <p>A board to keep track of personal tasks</p>
      <div className="bg-gray-100 w-full rounded-md grid grid-cols-4 gap-4">
        <DndContext onDragEnd={onDragEnd} onDragOver={onDragOver}>
          <Board
            boardId="notStarted"
            title="Not started"
            titleColor="#9fa19f"
            taskData={data.notStarted}
          />
          <Board
            boardId="inProgress"
            title="In progress"
            titleColor="#f3e1f5"
            taskData={data.inProgress}
          />
          <Board
            boardId="blocked"
            title="Blocked"
            titleColor="#fadcf3"
            taskData={data.blocked}
          />
          <Board
            boardId="done"
            title="Done"
            titleColor="#badbd3"
            taskData={data.done}
          />
        </DndContext>
      </div>
    </main>
  );
}
