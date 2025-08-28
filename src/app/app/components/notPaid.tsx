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
    <div className="w-full h-full items-center  flex flex-col ">
      <div className="relative max-w-lg lg:mt-40 mt-24 w-full text-center text-xl flex flex-col gap-8 items-center  px-4 py-7 rounded border border-white/10 ">
        <div className="absolute lg:-top-5 lg:-left-5 -top-7  px-3 py-2 text-white bg-white/5 rounded-lg backdrop-blur-3xl border border-white/5">
          ₹ 20
        </div>
        <h1>AcademiaX is not more free 🥲</h1>
        <h2 className="text-lg text-white/50">
          I don’t compel anyone to pay and use this app, but if you genuinely
          adore this user interface and impressive performance, then you have
          the option to do so. It’s entirely up to you.
        </h2>
        {/* <button className="py-1 w-full px-10 rounded border border-white/10 capitalize bg-white/5 ">
          pay
        </button> */}
        <h3 className="text-lg text-blue-300 px-5 ">
          Yes, a student made this. Now, a student can pay too!
        </h3>
        <form id="rzp_payment_form"></form>
        <a href="/app/timetable" className="text-lg underline text-white/50">
          If you paid and its not redirected then click Here{" "}
        </a>
      </div>
    </div>
  );
};

export default NotPaid;
