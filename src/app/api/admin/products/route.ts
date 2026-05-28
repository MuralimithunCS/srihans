import { NextResponse } from "next/server";
import { products as staticProducts } from "@/data/products";
import { getCustomProducts, getHiddenIds, addCustomProduct, toggleProductVisibility } from "@/lib/db";
import { Product } from "@/types";

export async function GET() {
  try {
    const customProducts = await getCustomProducts();
    const hiddenIds = await getHiddenIds();
    
    const merged = [...staticProducts, ...customProducts].map((p) => ({
      ...p,
      hidden: hiddenIds.includes(p.id),
    }));

    return NextResponse.json(merged);
  } catch (err) {
    console.error("GET products admin API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, category, shortDescription, backType, material, tags } = await request.json();

    if (!name || !category || !shortDescription) {
      return NextResponse.json({ error: "Missing required fields: Name, Category, or Short Description." }, { status: 400 });
    }

    // Generate unique ID/slug from name
    const generatedId = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4);

    const specs: { [key: string]: string } = {};
    if (backType && backType !== "None") specs.backType = backType;
    if (material) specs.material = material;

    const parsedTags = Array.isArray(tags) 
      ? tags 
      : typeof tags === "string" 
        ? tags.split(",").map(t => t.trim()).filter(Boolean)
        : [];

    const newProduct: Product = {
      id: generatedId,
      name,
      category,
      shortDescription,
      specs,
      tags: parsedTags,
      featured: false,
      image: "",
      price: 0,
    };

    await addCustomProduct(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    console.error("POST product admin API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing required parameter: id." }, { status: 400 });
    }

    const isHiddenNow = await toggleProductVisibility(id);
    return NextResponse.json({ success: true, hidden: isHiddenNow });
  } catch (err) {
    console.error("PUT product admin API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
