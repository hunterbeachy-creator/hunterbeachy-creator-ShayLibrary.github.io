import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const isbn = req.nextUrl.searchParams.get("isbn");
  if (!isbn) return NextResponse.json({ error: "ISBN is required" }, { status: 400 });

  try {
    const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    if (!res.ok) throw new Error("Not found");
    const data = await res.json();

    return NextResponse.json({
      isbn,
      title: data.title,
      author: data.by_statement ?? "Unknown Author",
      cover_image: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
      description: typeof data.description === "string" ? data.description : data.description?.value ?? "",
      publisher: data.publishers?.[0] ?? "",
      published_date: data.publish_date ?? "",
      page_count: data.number_of_pages ?? 0,
      genre: data.subjects?.[0] ?? "General"
    });
  } catch {
    return NextResponse.json({ error: "Unable to retrieve metadata" }, { status: 404 });
  }
}
