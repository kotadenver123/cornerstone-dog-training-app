
import { ReactNode } from "react";
import { BottomMenu } from "./BottomMenu";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen pb-16">
      {children}
      <BottomMenu />
    </div>
  );
}
