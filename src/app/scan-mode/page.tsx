"use client";

import { useState } from "react";
import { ScanInput } from "@/components/ScanInput";
import { useLibrary } from "@/lib/useLibrary";

export default function ScanModePage() {
  const { books, addBookFromScan } = useLibrary();
  const [latest, setLatest] = useState<string>("");

  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">Live Scan Mode</h2>
      <ScanInput compact onScan={async (isbn) => {
        const res = await fetch(`/api/isbn?isbn=${isbn}`);
        const data = await res.json();
        if (data?.isbn) {
          const book = addBookFromScan(data);
          setLatest(`${book.title} (${book.personal_library_id})`);
        }
      }} />
      <div className="card text-sm">Latest added: {latest || "Nothing scanned yet"}</div>
      <div className="card text-sm">Session count: {books.length}</div>
    </main>
  );
}
