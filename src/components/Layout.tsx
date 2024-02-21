import type { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="flex min-h-screen w-full">{children}</main>
    </>
  );
};
