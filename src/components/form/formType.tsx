import { cn } from "@/lib/utils";
import styles from "@/css/scrollbar.module.css";
import classNames from "classnames";

const colors = `text-l-text-second peer-valid:bg-l-foreground peer-focus:bg-l-foreground dark:text-d-text-second dark:peer-valid:bg-d-foreground dark:peer-focus:bg-d-foreground`;

type ComponentProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormTitle = ({ children, className }: ComponentProps) => {
  return (
    <h1 className={cn("mb-2 w-full text-xl font-semibold capitalize text-l-text-main dark:text-d-text-main sm:text-2xl", className)}>{children}</h1>
  );
};

export const FormSubheading = ({ children, className }: ComponentProps) => {
  return <h2 className={cn("mt-1 w-full font-semibold capitalize text-l-text-main  dark:text-d-text-main sm:text-lg", className)}>{children}</h2>;
};

export const FormText = ({ children, className }: ComponentProps) => {
  return <p className={cn("mb-4 text-l-text-second dark:text-d-text-second", className)}>{children}</p>;
};

export const FormSpan = ({ children, className }: ComponentProps) => {
  return <span className={cn("inline font-medium  text-l-text-main dark:text-d-text-main", className)}>{children}</span>;
};

export const TextArea = ({ updateForm, value, id, label }: { updateForm: (arg0: any) => void; value: string; id: string; label: string }) => {
  return (
    <div className="relative mb-4 mt-4 w-full overflow-hidden rounded-2xl border-[1.5px] border-l-border bg-l-foreground py-2 pr-2 dark:border-d-border dark:bg-d-foreground">
      <textarea
        rows={5}
        required
        name={id}
        className={classNames(
          styles.container,
          "peer max-h-[200px] w-full resize-none rounded-2xl border-[1.5px] border-l-border bg-l-foreground px-6 pb-4 pt-4 text-xs text-l-text-second outline-none dark:border-d-border dark:bg-d-foreground dark:text-d-text-second sm:text-sm"
        )}
        value={value}
        onChange={updateForm}
      />
      <label
        className={classNames(
          colors,
          "pointer-events-none absolute left-6 top-6 w-[90%] duration-200 peer-valid:top-2 peer-valid:pb-1 peer-valid:text-xs peer-focus:top-2 peer-focus:pb-1 peer-focus:text-xs "
        )}
      >
        {label}
      </label>
    </div>
  );
};
