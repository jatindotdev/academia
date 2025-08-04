import Image from "next/image";
import Link from "next/link";
import React from "react";
import LandingImage from "@/../public/Landing/LandingImage.png";
const HeroSection = () => {
  return (
    <div className="flex-1 flex flex-col ">
      <div className="lg:py-20 py-10  w-full container flex mx-auto flex-col justify-center items-center">
        <Content />
      </div>
      <div className="w-full flex justify-center items-center "></div>
    </div>
  );
};

export default HeroSection;

const Content = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-6 text-center">
      <h1 className="lg:text-7xl text-3xl font-extrabold leading-tight tracking-tight">
        Ditch the old SRM Portal.
      </h1>
      <p className="lg:text-xl text-base max-w-2xl font-normal opacity-80 px-4 mt-2">
        Discover a sleek, modern way to manage your academics—no clutter, just
        clarity.
      </p>
      <div className="flex justify-center gap-3 mt-6">
        <Link
          href="/auth/login"
          className="px-5 py-2 rounded-lg apply-border-md bg-white/5"
        >
          Get Started
        </Link>
      </div>
      <div className="relative bg-white/5 apply-border-md rounded-xl p-1 lg:p-2 mt-4 lg:w-[80%] w-[90%]">
        <div className="absolute inset-0 bg-blue-400/60 blur-3xl -z-10 " />
        <Image
          src={LandingImage}
          alt="Landing illustration showing a modern dashboard"
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};
