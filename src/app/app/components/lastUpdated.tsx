import React from "react";
import { RotateCcw } from "lucide-react";
const LastUpdated = () => {
  return (
    <div className="w-full h-12 border-b border-slate-400/10 flex px-4 items-center justify-between ">
      <h1 className="text-white/50">Last updated at </h1>
      <span className="cursor-pointer ">
        <RotateCcw className="h-5 w-5" />
      </span>
    </div>
  );
};

export default LastUpdated;
