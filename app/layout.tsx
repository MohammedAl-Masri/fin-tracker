import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { BookDashedIcon, LogIn, Outdent, PlusSquareIcon, StarsIcon } from "lucide-react";


export const metadata: Metadata = {
  title: "Fin-Tracker",
  description: "Track your finances with ease",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className='h-full antialiased'>
      <body className="h-full font-sans">
        <header className='h-16'>
          <nav className="h-full w-full px-6 flex items-center justify-between bg-gray-800 text-white
                          px-10">
            <div className="font-bold hover:scale-120 transition">
              <Link href="/">Fin-Tracker</Link>
            </div>
            <ul className="flex items-center gap-2">
              <li className="px-4 w-1 hover:scale-120 transition">
                <Link href="/login"><LogIn /></Link>
              </li>
              <li className="px-4 w-1 hover:scale-120 transition">
                <Link href="/register"><PlusSquareIcon /></Link>
              </li>
              <li className="px-4 w-1 hover:scale-120 transition">
                <Link href="/dashboard"><BookDashedIcon /></Link>
              </li>
              <li className="px-4 w-1 hover:scale-120 transition">
                <Link href="/stats"><StarsIcon/></Link>
              </li>
              <li className="px-4 w-1 hover:scale-120 transition text-red-500">
                <Link href="/logout"><Outdent/></Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        </body>
    </html>
  );
}
