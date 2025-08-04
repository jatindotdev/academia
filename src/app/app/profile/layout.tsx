// app/app/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Academic Profile data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
