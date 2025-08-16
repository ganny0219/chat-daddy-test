import { boolean } from "zod";

export interface IDialog {
  visibe: boolean;
  dialogToggle: () => void;
}
