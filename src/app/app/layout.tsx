import React from "react";
import QueryProvider from "./components/provider";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App",
  description: "App Route",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
