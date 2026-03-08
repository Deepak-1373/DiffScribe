import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// DEV ONLY — delete this route before deploying to production
export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = `ratelimit:generate-pr:${session.user.email}`;
  await redis.del(key);

  return NextResponse.json({ message: `Rate limit reset for ${session.user.email}` });
}
