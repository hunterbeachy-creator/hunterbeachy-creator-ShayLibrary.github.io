"use client";

import { useLibraryContext } from "@/components/LibraryProvider";

export function useLibrary() {
  return useLibraryContext();
}
