import { cookies } from "next/headers";

export async function getCookie() {
  const cookie = (await cookies()).get("token");
  return cookie;
}
