import { useState } from "react";

export const useDialog = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const dialogToggle = (visible?: boolean) => {
    return setVisible((prev) => visible ?? !prev);
  };

  return {
    visible,
    dialogToggle,
  };
};
