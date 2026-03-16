"use client";

import { useLibrary } from "@/lib/useLibrary";

export default function LoanedPage() {
  const { books } = useLibrary();
  const loaned = books.filter((b) => b.borrower_name && !b.returned);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="card">
      <h2 className="mb-3 text-xl font-semibold">Books Currently Loaned Out</h2>
      {loaned.length === 0 ? <p>No active loans.</p> : (
        <ul className="space-y-2">
          {loaned.map((b) => {
            const overdue = !!(b.due_date && b.due_date < today);
            return <li key={b.id} className={`rounded border p-2 ${overdue ? "border-red-400 bg-red-50" : "border-amber-200"}`}>{b.title} → {b.borrower_name} (Due: {b.due_date || "N/A"}) {overdue && "OVERDUE"}</li>;
          })}
        </ul>
      )}
    </main>
  );
}
