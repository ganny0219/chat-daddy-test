import React, { ReactNode } from "react";

type Props = {
  bgColor?: string;
  className?: string;
  textColor?: string;
  title: string;
};
function ColorText({
  bgColor = "",
  className = "",
  textColor = "",
  title,
}: Props) {
  return (
    <div className="flex my-2">
      <p
        style={{ backgroundColor: bgColor, color: textColor }}
        className={`rounded-full px-2 shadow-xs ${className}`}
      >
        {title}
      </p>
    </div>
  );
}

export default ColorText;
