"use client";
import React, { useEffect } from "react";

const NotPaid = () => {
  useEffect(() => {
    const rzpPaymentForm = document.getElementById("rzp_payment_form");

    if (rzpPaymentForm && !rzpPaymentForm.hasChildNodes()) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.async = true;
      script.dataset.payment_button_id = "pl_RA63H1DIAGQj8P";
      rzpPaymentForm.appendChild(script);
    }
  });
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
        {/* <button className="py-1 w-full px-10 rounded border border-white/10 capitalize bg-white/5 ">
          pay
        </button> */}
        <h3 className="text-[16px] text-blue-300 px-5 ">
          Yes, a student made this. Now, a student can pay too!
        </h3>
        <form id="rzp_payment_form"></form>
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
