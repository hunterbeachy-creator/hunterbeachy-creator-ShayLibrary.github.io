"use client";

import { BookGrid } from "@/components/BookGrid";
import { useLibrary } from "@/lib/useLibrary";

export default function SpecialCollectionPage() {
  const { books } = useLibrary();
  const featured = books.filter((b) => b.favorite || b.signed_copy || b.special_edition || b.first_edition);

  return (
    <main className="space-y-3">
      <h2 className="text-xl font-semibold">Special Collection</h2>
      {featured.length === 0 ? <div className="card">No special collection books yet.</div> : <BookGrid books={featured} />}
    </main>
  );
}
