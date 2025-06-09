import getServerUser from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const user = await getServerUser();
  if (!user) {
    cookieStore.set("token", "", {
      path: "/",
      maxAge: 0,
    });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
