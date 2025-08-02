"use client";
import { useCourse } from "@/hooks/query";
import React from "react";

const Page = () => {
  const data = useCourse().data;
  if (!data) return <div>No data</div>;

  return <div>{JSON.stringify(data)}</div>;
};

export default Page;
