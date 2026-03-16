export type ReadStatus = "unread" | "reading" | "finished";

export type Book = {
  id: string;
  isbn: string;
  title: string;
  author: string;
  cover_image: string;
  description: string;
  genre: string;
  page_count: number;
  published_date: string;
  personal_library_id: string;
  shelf_location: string;
  read_status: ReadStatus;
  personal_rating: number;
  notes: string;
  favorite: boolean;
  signed_copy: boolean;
  special_edition: boolean;
  first_edition: boolean;
  date_added: string;
  borrower_name?: string;
  date_borrowed?: string;
  due_date?: string;
  returned?: boolean;
};

export type WishlistItem = {
  id: string;
  title: string;
  author: string;
  notes: string;
  priority: "low" | "medium" | "high";
};

export type LibraryCategory = { code: string; label: string };
