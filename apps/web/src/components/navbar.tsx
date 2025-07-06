import { type PropsWithChildren, Suspense } from "react";
import { API_URL } from "@/config";
import { cn } from "@/lib/utils";
import { fetchApi } from "@/utils/fetch-api";
import { MonthSelector } from "./month-selector";
import type { Month } from "@/types";

interface Props extends PropsWithChildren {
  className?: string;
}

export const Navbar = async ({ children, className, ...props }: Props) => {
  const months = await fetchApi<Month[]>(`${API_URL}/cars/months`);

  return (
    <header
      className={cn("bg-sidebar flex h-16 items-center gap-2 px-4", className)}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">{children}</div>
        <Suspense fallback={null}>
          <MonthSelector months={months} />
        </Suspense>
      </div>
    </header>
  );
};
