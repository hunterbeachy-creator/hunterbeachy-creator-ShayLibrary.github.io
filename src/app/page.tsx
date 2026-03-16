"use client";

import Link from "next/link";
import { useLibrary } from "@/lib/useLibrary";

export default function HomePage() {
  const { books, stats } = useLibrary();
  const current = books.filter((b) => b.read_status === "reading").slice(0, 5);
  const recent = books.slice(0, 5);
  const favorites = books.filter((b) => b.favorite).slice(0, 5);
  const loaned = books.filter((b) => b.borrower_name && !b.returned).slice(0, 5);

  return (
    <main className="space-y-4">
      <section className="grid gap-3 md:grid-cols-4">
        <div className="card"><p className="text-xs">Total books</p><p className="text-3xl font-semibold">{stats.total}</p></div>
        <div className="card"><p className="text-xs">Books read this year</p><p className="text-3xl font-semibold">{stats.finishedThisYear}</p></div>
        <div className="card"><p className="text-xs">Pages read</p><p className="text-3xl font-semibold">{stats.pages}</p></div>
        <div className="card"><p className="text-xs">Most read author</p><p className="text-2xl font-semibold">{stats.mostReadAuthor}</p></div>
      </section>
      <section className="grid gap-3 md:grid-cols-2">
        <Panel title="Currently Reading" items={current} />
        <Panel title="Recently Added" items={recent} />
        <Panel title="Favorite Books" items={favorites} />
        <Panel title="Books Loaned Out" items={loaned} />
      </section>
      <div className="card text-sm">Use <Link className="underline" href="/scan-mode">Scan Mode</Link> for rapid barcode intake.</div>
    </main>
  );
}

function Panel({ title, items }: { title: string; items: { id: string; title: string; author: string }[] }) {
  return (
    <article className="card">
      <h2 className="font-semibold">{title}</h2>
      <ul className="mt-2 space-y-1 text-sm">
        {items.length === 0 ? <li className="text-stone-500">No books yet</li> : items.map((b) => <li key={b.id}>{b.title} — {b.author}</li>)}
      </ul>
    </article>
  );
}
