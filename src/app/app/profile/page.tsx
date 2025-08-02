"use client";
import { useUserInfo } from "@/hooks/query";
import React from "react";

const Page = () => {
  const data = useUserInfo().data;
  if (!data) return <div>No data</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default Page;
