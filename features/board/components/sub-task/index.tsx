import { SubTaskData } from "@/types/board";
import { Check, Dot } from "lucide-react";
import React from "react";

type Props = {
  data: SubTaskData;
};

function SubTask({ data }: Props) {
  return (
    <div className="flex items-center">
      <div className="bg-gray-300 rounded-sm">
        {data.done ? (
          <Check size={15} className="m-[2px]" />
        ) : (
          <Dot size={18} />
        )}
      </div>
      <p
        className={`ml-2 mb-[2px] ${
          data.done ? "line-through text-gray-400" : ""
        }`}
      >
        {data.text}
      </p>
    </div>
  );
}

export default SubTask;
