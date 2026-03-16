"use client";

import Image from "next/image";
import { Book } from "@/lib/types";

export function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
      {books.map((book) => (
        <article key={book.id} className="card p-2">
          <div className="relative mb-2 aspect-[2/3] overflow-hidden rounded bg-amber-50">
            {book.cover_image ? <Image fill src={book.cover_image} alt={book.title} className="object-cover" /> : <div className="p-3 text-xs">No Cover</div>}
          </div>
          <p className="line-clamp-2 text-sm font-semibold">{book.title}</p>
          <p className="text-xs text-stone-600">{book.author}</p>
          <p className="text-xs text-cedar">{book.personal_library_id}</p>
        </article>
      ))}
    </div>
  );
}
