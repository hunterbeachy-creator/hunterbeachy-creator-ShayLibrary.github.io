import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { LibraryProvider } from "@/components/LibraryProvider";

export const metadata: Metadata = {
  title: "Shay's Library",
  description: "Personal home library catalog"
};

const links = [
  ["/", "Dashboard"],
  ["/catalog", "Catalog"],
  ["/scan-mode", "Scan Mode"],
  ["/loaned", "Books Currently Loaned Out"],
  ["/stats", "Reading Stats"],
  ["/wishlist", "Wishlist"],
  ["/special-collection", "Special Collection"],
  ["/library-card", "Library Card"]
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LibraryProvider>
          <div className="mx-auto min-h-screen max-w-7xl px-4 py-5">
            <header className="mb-4 card">
              <h1 className="text-3xl font-semibold">Shay&apos;s Library</h1>
              <p className="text-sm text-stone-600">Cozy home catalog with scanner-ready ISBN intake.</p>
              <nav className="mt-3 flex flex-wrap gap-2 text-sm">
                {links.map(([href, label]) => (
                  <Link key={href} href={href} className="rounded-full bg-amber-100 px-3 py-1 hover:bg-amber-200">
                    {label}
                  </Link>
                ))}
              </nav>
            </header>
            {children}
            <footer className="mt-8 pb-8 text-center text-sm text-stone-600">Established in honor of the world&apos;s best reader.</footer>
          </div>
        </LibraryProvider>
      </body>
    </html>
  );
}
