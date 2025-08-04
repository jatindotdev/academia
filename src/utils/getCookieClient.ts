"use client";
import Cookies from "js-cookie";
export function getCookie() {
  const cookie = Cookies.get("token");
  return cookie as string;
}
