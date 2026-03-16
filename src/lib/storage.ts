"use client";

import { Book, WishlistItem } from "@/lib/types";

const BOOKS_KEY = "shays_library_books";
const WISHLIST_KEY = "shays_library_wishlist";

export const storage = {
  getBooks(): Book[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(BOOKS_KEY) ?? "[]");
  },
  saveBooks(books: Book[]) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },
  getWishlist(): WishlistItem[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) ?? "[]");
  },
  saveWishlist(items: WishlistItem[]) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }
};
