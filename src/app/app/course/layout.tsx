import { Metadata } from "next";
export const runtime = "edge";
export const metadata: Metadata = {
  title: "Course",
  description: "Academic Course data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
