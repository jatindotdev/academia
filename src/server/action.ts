"use server";
import { redirect } from "next/navigation";
import {
  getAttendance,
  getCalendar,
  getCourse,
  getMarks,
  getTimetable,
  getUserInfo,
} from "srm-academia-api";

export async function timetable() {
  const data = await getTimetable(
    "_iamadt_client_10002227248=780804d4fb062ae252563040ce8b7403c9331e4eb5609e8a882a416ef95a857611711aaff9892de978accb7a8fac94a1; _iambdt_client_10002227248=44a52e9f348f5bf0adde736ab66db1f89a6fb95133c080068cb6691075da44ff2cbd51052c10c76ef0ee472d41c8974b2a0cf60d9c3a0ad8dff478ec52267352; _z_identity=true;"
  );
  if (data.status === 404) redirect("/login");
  return { data };
}

export async function attendance() {
  const data = await getAttendance(
    "_iamadt_client_10002227248=780804d4fb062ae252563040ce8b7403c9331e4eb5609e8a882a416ef95a857611711aaff9892de978accb7a8fac94a1; _iambdt_client_10002227248=44a52e9f348f5bf0adde736ab66db1f89a6fb95133c080068cb6691075da44ff2cbd51052c10c76ef0ee472d41c8974b2a0cf60d9c3a0ad8dff478ec52267352; _z_identity=true;"
  );
  if (data.status === 404) redirect("/login");
  return { data };
}

export async function marks() {
  const data = await getMarks(
    "_iamadt_client_10002227248=780804d4fb062ae252563040ce8b7403c9331e4eb5609e8a882a416ef95a857611711aaff9892de978accb7a8fac94a1; _iambdt_client_10002227248=44a52e9f348f5bf0adde736ab66db1f89a6fb95133c080068cb6691075da44ff2cbd51052c10c76ef0ee472d41c8974b2a0cf60d9c3a0ad8dff478ec52267352; _z_identity=true;"
  );
  if (data.status === 404) redirect("/login");
  return { data };
}

export async function Calendar() {
  const data = await getCalendar(
    "_iamadt_client_10002227248=780804d4fb062ae252563040ce8b7403c9331e4eb5609e8a882a416ef95a857611711aaff9892de978accb7a8fac94a1; _iambdt_client_10002227248=44a52e9f348f5bf0adde736ab66db1f89a6fb95133c080068cb6691075da44ff2cbd51052c10c76ef0ee472d41c8974b2a0cf60d9c3a0ad8dff478ec52267352; _z_identity=true;"
  );
  if (data.status === 404) redirect("/login");
  return { data };
}

export async function Course() {
  const data = await getCourse(
    "_iamadt_client_10002227248=780804d4fb062ae252563040ce8b7403c9331e4eb5609e8a882a416ef95a857611711aaff9892de978accb7a8fac94a1; _iambdt_client_10002227248=44a52e9f348f5bf0adde736ab66db1f89a6fb95133c080068cb6691075da44ff2cbd51052c10c76ef0ee472d41c8974b2a0cf60d9c3a0ad8dff478ec52267352; _z_identity=true;"
  );
  if (data.status === 404) redirect("/login");
  return { data };
}

export async function userInfo() {
  const data = await getUserInfo(
    "_iamadt_client_10002227248=780804d4fb062ae252563040ce8b7403c9331e4eb5609e8a882a416ef95a857611711aaff9892de978accb7a8fac94a1; _iambdt_client_10002227248=44a52e9f348f5bf0adde736ab66db1f89a6fb95133c080068cb6691075da44ff2cbd51052c10c76ef0ee472d41c8974b2a0cf60d9c3a0ad8dff478ec52267352; _z_identity=true;"
  );
  if (data.status === 404) redirect("/login");
  return { data };
}
