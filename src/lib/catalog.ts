import { Book, LibraryCategory } from "@/lib/types";

export const defaultCategories: LibraryCategory[] = [
  { code: "FIC", label: "Fiction" },
  { code: "ROM", label: "Romance" },
  { code: "FANTASY", label: "Fantasy" },
  { code: "NF", label: "Non-Fiction" },
  { code: "HISTORY", label: "History" },
  { code: "BIOGRAPHY", label: "Biography" },
  { code: "CUSTOM", label: "Custom" }
];

export function generatePersonalId(genre: string, books: Book[]): string {
  const code = defaultCategories.find((c) => genre.toLowerCase().includes(c.label.toLowerCase()))?.code ?? "CUSTOM";
  const count = books.filter((b) => b.personal_library_id.startsWith(`HB-${code}`)).length + 1;
  return `HB-${code}-${String(count).padStart(3, "0")}`;
}
