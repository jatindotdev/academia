// app/app/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timetable",
  description: "Academic Timetable data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
