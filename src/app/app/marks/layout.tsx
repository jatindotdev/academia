// app/app/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marks",
  description: "Academic Marks data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
