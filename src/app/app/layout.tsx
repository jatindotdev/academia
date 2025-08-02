import React from "react";
import QueryProvider from "./components/provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
