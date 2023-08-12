import { type PropsWithChildren } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="flex w-full">{children}</main>
      <Footer />
    </>
  );
};
