import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serializeImages, slugify } from "@/lib/utils";

const workshopSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(5),
  description: z.string().min(5),
  steps: z.array(z.string()).optional(),
  learnings: z.array(z.string()).optional(),
  output: z.string().nullable().optional(),
  ageGroup: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) throw new Error("UNAUTHORIZED");
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = workshopSchema.parse(body);
    const baseSlug = slugify(data.title);
    let slug = baseSlug;
    let i = 1;
    while (await prisma.workshop.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${i++}`;
    }

    const workshop = await prisma.workshop.create({
      data: {
        title: data.title,
        summary: data.summary,
        description: data.description,
        steps: JSON.stringify(data.steps || []),
        learnings: JSON.stringify(data.learnings || []),
        output: data.output || null,
        ageGroup: data.ageGroup || null,
        duration: data.duration || null,
        images: serializeImages(data.images || []),
        featured: data.featured ?? false,
        published: data.published ?? true,
        sortOrder: data.sortOrder ?? 99,
        slug,
      },
    });

    return NextResponse.json(workshop);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }
    return NextResponse.json({ error: "Atölye eklenemedi" }, { status: 500 });
  }
}
