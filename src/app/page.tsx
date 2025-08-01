"use client";

import { useTheme } from "next-themes";

export default function Home() {
  const { setTheme, themes } = useTheme();
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      {themes.map((theme) => (
        <button key={theme} onClick={() => setTheme(theme)}>
          {theme}
        </button>
      ))}
    </div>
  );
}
