"use client";

import { useState } from "react";
import { BookGrid } from "@/components/BookGrid";
import { BookList } from "@/components/BookList";
import { ScanInput } from "@/components/ScanInput";
import { useLibrary } from "@/lib/useLibrary";

export default function CatalogPage() {
  const { books, addBookFromScan, updateBook, deleteBook } = useLibrary();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [q, setQ] = useState("");

  const filtered = books.filter((b) => `${b.title} ${b.author} ${b.genre} ${b.shelf_location} ${b.read_status}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <main className="space-y-4">
      <ScanInput onScan={async (isbn) => {
        const res = await fetch(`/api/isbn?isbn=${isbn}`);
        const data = await res.json();
        if (data?.isbn) addBookFromScan(data);
      }} />
      <div className="card flex flex-wrap items-center gap-2">
        <input placeholder="Search author, genre, shelf..." className="rounded border p-2" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="rounded bg-amber-200 px-3 py-1" onClick={() => setView("grid")}>Grid</button>
        <button className="rounded bg-amber-200 px-3 py-1" onClick={() => setView("list")}>List</button>
      </div>
      {view === "grid" ? <BookGrid books={filtered} /> : <BookList books={filtered} />}
      <div className="card overflow-x-auto">
        <h2 className="mb-2 font-semibold">Quick Edit</h2>
        {books.map((b) => (
          <div key={b.id} className="mb-2 flex flex-wrap items-center gap-2 border-b pb-2">
            <span className="min-w-40 text-sm">{b.title}</span>
            <select value={b.read_status} onChange={(e) => updateBook(b.id, { read_status: e.target.value as never })} className="rounded border p-1">
              <option value="unread">unread</option><option value="reading">reading</option><option value="finished">finished</option>
            </select>
            <label className="text-sm"><input type="checkbox" checked={b.favorite} onChange={(e) => updateBook(b.id, { favorite: e.target.checked })} /> Favorite</label>
            <button onClick={() => deleteBook(b.id)} className="rounded bg-red-100 px-2 py-1 text-sm">Delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}
