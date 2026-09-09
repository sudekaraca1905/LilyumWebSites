import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { serializeImages, slugify } from "@/lib/utils";

const productSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  category: z.string().min(2),
  price: z.union([z.number(), z.null()]).optional(),
  images: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  slug: z.string().optional(),
});

async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) throw new Error("UNAUTHORIZED");
}

export async function GET() {
  try {
    await requireAdmin();
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = productSchema.parse(body);
    const baseSlug = slugify(data.slug || data.title);
    let slug = baseSlug;
    let i = 1;
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${i++}`;
    }

    const product = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price ?? null,
        images: serializeImages(data.images || []),
        featured: data.featured ?? false,
        published: data.published ?? true,
        slug,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Geçersiz ürün bilgisi" }, { status: 400 });
    }
    return NextResponse.json({ error: "Ürün eklenemedi" }, { status: 500 });
  }
}
