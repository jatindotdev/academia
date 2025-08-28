"use client";
import { getPaymentClient } from "@/utils/getCookieClient";
import React from "react";

const Paid = () => {
  const data = getPaymentClient();
  if (!data) return;
  const date = new Date(data.created_at * 1000);
  return (
    <div className="w-full h-full items-center  flex flex-col ">
      <div className="max-w-md lg:mt-40 mt-24 w-full text-center text-xl flex flex-col items-center  p-4 rounded border border-white/10 ">
        <div className="w-full border-white/10 border-b pb-5">
          <h1>Payment Info</h1>
        </div>
        <h2 className="text-lg text-white/50 w-full text-start flex flex-col mt-5 justify-center">
          <ul className="flex flex-col gap-3">
            <li className="flex justify-between">
              <p>Mail ID</p> <span>{data?.email}</span>
            </li>
            <li className="flex justify-between">
              <p>Phone No</p> <span>{data?.payload.contact}</span>
            </li>
            <li className="flex justify-between">
              <p>Amount</p>{" "}
              <span>{(data?.payload.amount / 100).toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <p>Method</p> <span>{data?.payload.method}</span>
            </li>
            <li className="flex justify-between">
              <p>Payment on</p> <span>{date.toLocaleDateString()}</span>
            </li>
          </ul>
        </h2>
      </div>
    </div>
  );
};

export default Paid;
