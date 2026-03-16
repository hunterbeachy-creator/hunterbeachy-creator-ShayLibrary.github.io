"use client";

import { useLibrary } from "@/lib/useLibrary";

export default function StatsPage() {
  const { books, stats } = useLibrary();
  const genres = books.reduce<Record<string, number>>((acc, b) => {
    acc[b.genre] = (acc[b.genre] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="space-y-4">
      <section className="grid gap-3 md:grid-cols-4">
        <Stat label="Total books owned" value={stats.total} />
        <Stat label="Books read this year" value={stats.finishedThisYear} />
        <Stat label="Pages read this year" value={stats.pages} />
        <Stat label="Most read author" value={stats.mostReadAuthor} />
      </section>
      <section className="card">
        <h2 className="mb-2 font-semibold">Genre Breakdown</h2>
        {Object.entries(genres).map(([name, count]) => (
          <div key={name} className="mb-2">
            <div className="mb-1 flex justify-between text-sm"><span>{name}</span><span>{count}</span></div>
            <div className="h-2 rounded bg-amber-100"><div className="h-2 rounded bg-moss" style={{ width: `${(count / Math.max(books.length, 1)) * 100}%` }} /></div>
          </div>
        ))}
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="card"><p className="text-xs">{label}</p><p className="text-2xl font-semibold">{value}</p></div>;
}
