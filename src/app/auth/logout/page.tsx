"use client";

import { Loader } from "@/app/app/components/loader";
import { useAuth } from "@/hooks/zustand";
import { getLogout } from "@/server/action";
import { getCookie } from "@/utils/getCookieClient";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const Page = () => {
  useEffect(() => {
    const Clear = async () => {
      const cookie = getCookie();
      if (cookie) {
        await getLogout(cookie);
        Cookies.remove("token");
      }
      return redirect("/auh/login");
    };
    Clear();
  }, []);

  return (
    <div className="w-dvw h-dvh items-center justify-center flex flex-col  gap-4 ">
      <Loader className="w-10 h-10 " />
      <h1 className="text-xl text-white/50 animate-pulse">Logging Out</h1>
    </div>
  );
};

export default Page;
