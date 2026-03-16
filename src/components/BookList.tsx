"use client";

import { Book } from "@/lib/types";

export function BookList({ books }: { books: Book[] }) {
  return (
    <div className="overflow-x-auto card">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th>Title</th><th>Author</th><th>Genre</th><th>Status</th><th>Shelf</th><th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id} className="border-b last:border-0">
              <td>{b.title}</td><td>{b.author}</td><td>{b.genre}</td><td>{b.read_status}</td><td>{b.shelf_location}</td><td>{b.favorite ? "★" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
