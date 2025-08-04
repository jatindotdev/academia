import React from "react";

const Header = () => {
  return (
    <div className="w-full min-h-20 flex items-center justify-center lg:px-0 px-3">
      <div className="max-w-5xl w-full flex px-4 h-[70%] items-center justify-between apply-border-md rounded-lg bg-[#1B1D21]">
        <h1 className="text-xl ">AcademiaX</h1>
        <div className="px-3 py-1.5 rounded-lg apply-border-md bg-white/5">
          Back
        </div>
      </div>
    </div>
  );
};

export default Header;
