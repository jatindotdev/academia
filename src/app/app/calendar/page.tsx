"use client";
import { useCalendar } from "@/hooks/query";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Month } from "srm-academia-api";
import { GlobalLoader } from "../components/loader";
const Page = () => {
  const { data, isPending } = useCalendar();
  if (isPending) return <GlobalLoader className="h-10 w-10 text-blue-400" />;
  if (!data)
    return (
      <div className="flex h-full w-full justify-center items-center">
        No data found
      </div>
    );
  return <DayChange data={data} />;
};

export default Page;

const DayChange = ({ data }: { data: Month[] }) => {
  const now = new Date();
  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedMonth = `${monthsShort[now.getMonth()]} '${String(
    now.getFullYear()
  ).slice(-2)}`;
  const getIndex = data.findIndex((i) => i.month === formattedMonth);
  const [month, setMonth] = useState<number>(getIndex);
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="w-full flex-shrink-0 h-[15%]  py-5">
        <div className="relative max-w-100 mx-auto h-full flex items-center justify-center text-4xl text-white/80 lg:text-5xl">
          {data[month].month}
          <div
            onClick={() => {
              if (month > 0) {
                setMonth(month - 1);
              }
            }}
            className="absolute top-1/2  -translate-y-1/2 left-10   bg-white/5  p-1 apply-border-sm rounded-lg cursor-pointer shadow-2xl"
          >
            <Minus className="w-5 h-5" />
          </div>
          <div
            onClick={() => {
              if (month < data.length - 1) {
                setMonth(month + 1);
              }
            }}
            className="absolute top-1/2 -translate-y-1/2 right-10  bg-white/5  p-1 apply-border-sm rounded-lg cursor-pointer shadow-2xl"
          >
            <Plus className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto flex">
        <Data data={data} month={month} />
      </div>
    </div>
  );
};

const Data = ({ data, month }: { data: Month[]; month: number }) => {
  console.log(data);
  return (
    <div className="py-3 h-full w-full grid px-1 sm:px-2 md:px-4 lg:px-6 xl:px-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
      {data[month].days.map((item, i) => (
        <div
          key={i}
          className="w-full h-full flex flex-col  apply-border-md  bg-[#18191d] shadow-xl  p-3 sm:p-4  gap-4 lg:min-h-50 min-h-40"
        >
          <div className="flex justify-between items-center w-full min-h-14 px-1 sm:px-2 ">
            <div className="flex flex-col items-center gap-0.5 text-xl text-white/60 ">
              <span className="font-semibold ">{item.date}</span>
              <h1 className=" ">{item.day}</h1>
            </div>
            <span className="text-3xl text-green-400">{item.dayOrder}</span>
          </div>
          {item.event.length !== 0 && (
            <div className="text-sm flex justify-start items-end-safe text-red-400 h-full overflow-y-auto">
              {item.event}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
