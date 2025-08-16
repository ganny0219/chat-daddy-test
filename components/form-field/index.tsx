import { useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { get } from "lodash";

type Props = {
  name?: string;
  label?: string;
  children: React.ReactNode;
  desc?: string;
  className?: string;
};

function FormField({ name, label, children, desc, className }: Props) {
  const { formState } = useFormContext();
  const error = get(formState.errors, name || "");
  return (
    <FormItem className={`my-2 ${className || ""}`}>
      {label && <FormLabel className="ml-[1px]">{label}</FormLabel>}
      {desc && <FormDescription className="ml-[1px]">{desc}</FormDescription>}
      <FormControl>{children}</FormControl>
      {error && (
        <FormMessage className="ml-[1px]">
          {error.message as string}{" "}
        </FormMessage>
      )}
    </FormItem>
  );
}

export default FormField;
