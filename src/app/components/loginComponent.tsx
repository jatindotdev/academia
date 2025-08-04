"use client";
import { useAuth } from "@/hooks/zustand";
import { validatePassword, validateUser } from "@/server/action";
import { Eye, EyeOff } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { Loader } from "../app/components/loader";

export const LoginComponent = () => {
  const [eyeOpen, setEyeOpen] = useState(false);
  const { error, setError, loading, setLoading, setEmail, email } = useAuth();
  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const hash1 = form.get("name") as string;
    const hash2 = form.get("password") as string;

    if (hash1) {
      const { res } = await validateUser(hash1);
      if (res.data?.status_code === 400) {
        setError(res.data?.message as string);
        setLoading(false);
        return;
      }
      if (res.error) {
        setError(res.errorReason as string);
        setLoading(false);
        return;
      }

      setEmail({
        digest: res.data?.digest as string,
        identifier: res.data?.identifier as string,
      });
      setLoading(false);
      return;
    }

    const { res } = await validatePassword({
      digest: email.digest,
      identifier: email.identifier,
      password: hash2,
    });

    if (res.data?.statusCode === 500 || res.data?.captcha?.required) {
      if (res.data?.captcha?.required) {
        setError(res.data.message as string);
        setLoading(false);
        return;
      }
      setError(res.data?.message as string);
      setLoading(false);
      return;
    }
    if (res.error) {
      setError(res.errorReason as string);
      setLoading(false);
      return;
    }

    if (res.isAuthenticated && res.data?.cookies) {
      Cookies.set("token", res.data?.cookies, { expires: 30, path: "/" });
      return redirect("/app/timetable");
    }
    setLoading(false);
    return;
  };
  return (
    <div className="flex-1 flex items-center justify-center px-6 lg:px-0">
      <div className="max-w-5xl min-h-[50%] w-full rounded-lg grid grid-cols-1 lg:grid-cols-2 bg-[#1B1D21] apply-border-md ">
        <div className="flex items-center justify-center min-h-20 lg:text-4xl h-full text-2xl ">
          Login
        </div>
        <div className="w-full h-full flex items-center justify-center ">
          <form
            onSubmit={HandleSubmit}
            className="w-[90%] h-[90%] flex flex-col justify-center items-center gap-10 p-4"
          >
            <div className="w-full flex flex-col gap-4 ">
              {/* Show email input if digest is empty (first step) */}
              {email.digest.length === 0 && (
                <input
                  id="name"
                  name="name"
                  type="name"
                  className="w-full px-4 py-2 rounded-md bg-white/5 border apply-border-md focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="SRM Mail ID"
                  autoComplete="email"
                  autoFocus
                  required
                />
              )}
              {/* Show password input if digest is present and password is not yet set (second step) */}
              {email.digest.length !== 0 && (
                <div className="w-full relative z-10 ">
                  <input
                    id="password"
                    name="password"
                    type={eyeOpen ? "name" : "password"}
                    className=" w-full px-4 py-2 rounded-md bg-white/5 border apply-border-md focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Password"
                    autoComplete="current-password"
                    autoFocus
                    required
                  />
                  <div className="right-0 top-1/2 -translate-y-1/2 absolute flex items-center justify-end pr-5 ">
                    {eyeOpen ? (
                      <Eye
                        onClick={() => setEyeOpen((prev) => !prev)}
                        className="h-6 w-6 "
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setEyeOpen((prev) => !prev)}
                        className="h-6 w-6"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
            {error.length !== 0 && <div className="text-red-400">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5  bg-black  text-white flex items-center justify-center border border-white/15 hover:bg-[#23252a] hover:border-white/5 transition rounded-lg cursor-pointer"
            >
              {loading ? <Loader className="w-5 h-5 " /> : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
