import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) throw new Error("UNAUTHORIZED");
}

const partialSchema = z.object({
  title: z.string().min(2).optional(),
  summary: z.string().min(5).optional(),
  description: z.string().min(5).optional(),
  steps: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  output: z.string().nullable().optional(),
  ageGroup: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const data = partialSchema.parse(body);

    const workshop = await prisma.workshop.update({
      where: { id },
      data: {
        ...data,
        steps: data.steps ? JSON.stringify(data.steps) : undefined,
        learnings: data.learnings ? JSON.stringify(data.learnings) : undefined,
      },
    });

    return NextResponse.json(workshop);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }
    return NextResponse.json({ error: "Atölye güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    await prisma.workshop.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }
    return NextResponse.json({ error: "Atölye silinemedi" }, { status: 500 });
  }
}
