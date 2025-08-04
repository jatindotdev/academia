"use client";
import Cookies from "js-cookie";
export async function getCookie() {
  const cookie = Cookies.get("token");
  return cookie as string;
}
