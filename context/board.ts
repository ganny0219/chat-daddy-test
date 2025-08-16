import { defaultBoardData } from "@/features/board/data";
import { TaskData, BoardData } from "@/types/board";
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import dayjs from "dayjs";
import { create } from "zustand";

type BoardDataCtx = {
  data: BoardData;
  onDragEnd: (event: DragEndEvent) => void;
  onDragOver: (event: DragOverEvent) => void;
  onAdd: (boardId: keyof BoardData, taskData: TaskData) => void;
  onUpdate: (
    boardId: keyof BoardData,
    taskIndex: number,
    taskData: TaskData
  ) => void;
  onDelete: (boardId: keyof BoardData, taskId: string) => void;
};

export const useBoardCtx = create<BoardDataCtx>((set) => ({
  data: defaultBoardData,
  onDragEnd: (event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;
    const boardId: keyof BoardData = active.data.current?.boardId;
    const oldTaskDataId: string = active.data.current?.task?.id;
    const newTaskDataId: string = over.data.current?.task?.id;

    const targetType = event.over?.data?.current?.type;

    if (targetType !== "task") return;

    if (
      over &&
      boardId &&
      oldTaskDataId &&
      newTaskDataId &&
      oldTaskDataId != newTaskDataId
    ) {
      set((ctx) => {
        let data = ctx.data;

        const oldIdx = ctx.data[boardId].findIndex(
          (task) => task.id === oldTaskDataId
        );
        const newIdx = ctx.data[boardId].findIndex(
          (task) => task.id === newTaskDataId
        );

        data[boardId] = arrayMove(data[boardId], oldIdx, newIdx);

        return {
          ...ctx,
          data,
        };
      });
    }
  },
  onDragOver: (event: DragOverEvent) => {
    const { over, active } = event;

    const taskData: TaskData = active.data.current?.task;

    set((ctx) => {
      const oldBoardId: keyof BoardData = active.data.current?.boardId;
      const newBoardId: keyof BoardData = over?.data.current?.boardId;

      if (oldBoardId === newBoardId) return ctx;

      let data = ctx.data;

      if (oldBoardId && newBoardId) {
        data[oldBoardId] = data[oldBoardId].filter(
          (data) => data.id != taskData?.id
        );
        data[newBoardId] = [...data[newBoardId], taskData];
      }
      return {
        ...ctx,
        data,
      };
    });
  },
  onAdd: (boardId: keyof BoardData, taskData: TaskData) => {
    if (boardId && taskData) {
      set((ctx) => {
        let data = ctx.data;

        data[boardId] = [...data[boardId], taskData];
        return {
          ...ctx,
          data,
        };
      });
    }
  },
  onUpdate: (
    boardId: keyof BoardData,
    taskIndex: number,
    taskData: TaskData
  ) => {
    if (boardId && taskData) {
      set((ctx) => {
        let data = ctx.data;
        data[boardId][taskIndex] = taskData;

        return {
          ...ctx,
          data,
        };
      });
    }
  },
  onDelete: (boardId: keyof BoardData, taskId: string) => {
    if (boardId && taskId) {
      set((ctx) => {
        let data = ctx.data;

        data[boardId] = data[boardId].filter(
          (taskData) => taskData.id != taskId
        );
        return {
          ...ctx,
          data,
        };
      });
    }
  },
}));
