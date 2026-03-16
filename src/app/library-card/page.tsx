"use client";

import { useLibrary } from "@/lib/useLibrary";

export default function LibraryCardPage() {
  const { books } = useLibrary();

  return (
    <main className="flex justify-center">
      <section className="w-full max-w-xl rounded-3xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-100 p-8 shadow-lg">
        <p className="text-sm uppercase tracking-widest text-stone-500">Library Card</p>
        <h2 className="mt-2 text-3xl font-semibold">Shay&apos;s Library</h2>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between"><dt>Library Name</dt><dd>Shay&apos;s Library</dd></div>
          <div className="flex justify-between"><dt>Librarian</dt><dd>Shay Beachy</dd></div>
          <div className="flex justify-between"><dt>Founded</dt><dd>2026</dd></div>
          <div className="flex justify-between"><dt>Total Volumes</dt><dd>{books.length}</dd></div>
        </dl>
      </section>
    </main>
  );
}
