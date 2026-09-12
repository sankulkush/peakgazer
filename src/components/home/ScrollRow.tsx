import { type ComponentProps, type ReactNode } from "react";

const BASE_CLASSES =
  "-mx-6 flex items-start gap-6 overflow-x-auto scroll-smooth px-6 pb-2 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export default function ScrollRow({
  children,
  className,
  ...props
}: ComponentProps<"div"> & { children: ReactNode }) {
  return (
    <div
      className={className ? `${BASE_CLASSES} ${className}` : BASE_CLASSES}
      {...props}
    >
      {children}
    </div>
  );
}
