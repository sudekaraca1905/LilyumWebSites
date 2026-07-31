import { NextResponse } from "next/server";
import {
  createAdminSession,
  destroyAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const username = String(body.username || "");
  const password = String(body.password || "");

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await destroyAdminSession();
  return NextResponse.json({ ok: true });
}
