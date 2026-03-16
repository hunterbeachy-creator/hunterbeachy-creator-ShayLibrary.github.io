"use client";

import { useLibrary } from "@/lib/useLibrary";

export default function WishlistPage() {
  const { wishlist, addWishlist } = useLibrary();

  return (
    <main className="space-y-4">
      <form className="card grid gap-2 md:grid-cols-4" onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        addWishlist({
          title: String(fd.get("title") || ""),
          author: String(fd.get("author") || ""),
          notes: String(fd.get("notes") || ""),
          priority: String(fd.get("priority") || "medium") as never
        });
        e.currentTarget.reset();
      }}>
        <input name="title" placeholder="Title" className="rounded border p-2" required />
        <input name="author" placeholder="Author" className="rounded border p-2" required />
        <input name="notes" placeholder="Notes" className="rounded border p-2" />
        <select name="priority" className="rounded border p-2"><option>low</option><option>medium</option><option>high</option></select>
        <button className="rounded bg-amber-200 px-3 py-2 md:col-span-4">Add to Wishlist</button>
      </form>
      <div className="card">
        {wishlist.map((w) => <p key={w.id} className="border-b py-2 last:border-0">{w.title} — {w.author} ({w.priority})</p>)}
      </div>
    </main>
  );
}
