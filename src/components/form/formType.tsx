import { cn } from "@/lib/utils";

type ComponentProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormTitle = ({ children, className }: ComponentProps) => {
  return <h1 className={cn("mb-2 w-full text-xl font-semibold capitalize text-white sm:text-2xl", className)}>{children}</h1>;
};

export const FormSubheading = ({ children, className }: ComponentProps) => {
  return <h2 className={cn("mt-1 w-full font-semibold capitalize text-white sm:text-lg", className)}>{children}</h2>;
};

export const FormText = ({ children, className }: ComponentProps) => {
  return <p className={cn("mb-4 text-white/70", className)}>{children}</p>;
};

export const FormSpan = ({ children, className }: ComponentProps) => {
  return <span className={cn("inline font-medium text-white", className)}>{children}</span>;
};
