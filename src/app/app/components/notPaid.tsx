"use client";
import { useUserInfo } from "@/hooks/query";
import { createPaymentLink } from "@/server/payment";
import { getEmail } from "@/utils/getCookieClient";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NotPaid = () => {
  const { data } = useUserInfo();
  const email = getEmail();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  return (
    <div className="w-full mx-auto max-w-lg h-full items-center flex flex-col px-4 py-6 lg:py-20 gap-14 ">
      <div className="p-4 border-red-300 border-2 border-dotted rounded-lg  text-white/50">
        <span className="text-white/80">Note : </span> While doing payment
        please make sure that srm mail is correct. This is important for further
        authorization.
      </div>
      <div className="relative    w-full text-center text-xl flex flex-col gap-8 items-center px-4 py-7 rounded-lg border-dotted border-2 border-white/10 bg-background">
        <div className="absolute lg:-top-5 lg:-left-5 -top-5 text-[15px]  px-2.5 py-1.5  bg-black rounded-lg backdrop-blur-3xl border border-white/10 text-blue-300">
          ₹ 20 / <span className="text-sm">M</span>
        </div>
        <h1 className="text-[17px]">AcademiaX is not more free 🥲</h1>
        <h2 className="text-[14px] lg:text-[16px] text-white/50 pl-3 border-l-2 border-blue-100/80 text-left">
          I don’t compel anyone to pay and use this app, but if you genuinely
          adore this user interface and impressive performance, then you have
          the option to do so. It’s entirely up to you.
        </h2>
        {error && (
          <div className="p-2 text-sm text-red-400 bg-red-900/20 rounded-md w-full">
            {error}
          </div>
        )}
        <button
          onClick={async () => {
            try {
              setError(null);
              setIsLoading(true);

              if (!data) {
                setError("RazorPay Error");
                return;
              }

              const link = await createPaymentLink({
                name: data.name,
                email: email,
                contact: data.mobile,
              });

              router.push(link);
              return;
            } catch (err) {
              setError("Failed to create payment link.");
              console.error("Payment link error:", err);
            } finally {
              setIsLoading(false);
            }
          }}
          disabled={isLoading}
          className={`py-1.5 w-full px-10 rounded border border-white/10 capitalize text-[16px] flex items-center justify-center  ${
            isLoading
              ? "bg-white/10 cursor-not-allowed"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          {isLoading ? (
            <Loader className="animate-spin w-5 h-5 text-white " />
          ) : (
            "Pay"
          )}
        </button>
        <h3 className="text-[16px] text-blue-300 px-5 ">
          Yes, a student made this. Now, a student can pay too!
        </h3>
        <a
          href="/app/timetable"
          className="text-[14px] underline text-white/50"
        >
          If you paid and its not redirected then click Here{" "}
        </a>
      </div>
    </div>
  );
};

export default NotPaid;
