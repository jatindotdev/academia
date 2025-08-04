// app/app/layout.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page for Authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
