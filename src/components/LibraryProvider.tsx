"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { generatePersonalId } from "@/lib/catalog";
import { storage } from "@/lib/storage";
import { Book, WishlistItem } from "@/lib/types";

type LibraryContextValue = {
  books: Book[];
  wishlist: WishlistItem[];
  stats: {
    total: number;
    finishedThisYear: number;
    pages: number;
    mostReadAuthor: string;
  };
  addBookFromScan: (meta: Partial<Book> & { isbn: string }) => Book;
  updateBook: (id: string, patch: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addWishlist: (item: Omit<WishlistItem, "id">) => void;
};

const LibraryContext = createContext<LibraryContextValue | null>(null);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setBooks(storage.getBooks());
    setWishlist(storage.getWishlist());
  }, []);

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key === "shays_library_books") setBooks(storage.getBooks());
      if (event.key === "shays_library_wishlist") setWishlist(storage.getWishlist());
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const stats = useMemo(() => {
    const total = books.length;
    const thisYear = new Date().getFullYear().toString();
    const finishedThisYear = books.filter((b) => b.read_status === "finished" && b.date_added.startsWith(thisYear)).length;
    const pages = books.filter((b) => b.read_status === "finished").reduce((acc, b) => acc + (b.page_count || 0), 0);
    const mostReadAuthor = Object.entries(
      books.reduce<Record<string, number>>((acc, b) => {
        acc[b.author] = (acc[b.author] ?? 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A";
    return { total, finishedThisYear, pages, mostReadAuthor };
  }, [books]);

  const value = useMemo<LibraryContextValue>(() => {
    function saveBooks(next: Book[]) {
      setBooks(next);
      storage.saveBooks(next);
    }

    function addBookFromScan(meta: Partial<Book> & { isbn: string }) {
      const nextBook: Book = {
        id: crypto.randomUUID(),
        isbn: meta.isbn,
        title: meta.title ?? "Unknown Title",
        author: meta.author ?? "Unknown Author",
        cover_image: meta.cover_image ?? "",
        description: meta.description ?? "",
        genre: meta.genre ?? "General",
        page_count: meta.page_count ?? 0,
        published_date: meta.published_date ?? "",
        personal_library_id: generatePersonalId(meta.genre ?? "General", books),
        shelf_location: "Main Shelf",
        read_status: "unread",
        personal_rating: 0,
        notes: "",
        favorite: false,
        signed_copy: false,
        special_edition: false,
        first_edition: false,
        date_added: new Date().toISOString(),
        returned: true
      };

      saveBooks([nextBook, ...books]);
      return nextBook;
    }

    function updateBook(id: string, patch: Partial<Book>) {
      saveBooks(books.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    }

    function deleteBook(id: string) {
      saveBooks(books.filter((b) => b.id !== id));
    }

    function addWishlist(item: Omit<WishlistItem, "id">) {
      const next = [{ ...item, id: crypto.randomUUID() }, ...wishlist];
      setWishlist(next);
      storage.saveWishlist(next);
    }

    return { books, wishlist, stats, addBookFromScan, updateBook, deleteBook, addWishlist };
  }, [books, wishlist, stats]);

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibraryContext() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibraryContext must be used within LibraryProvider");
  }
  return context;
}
