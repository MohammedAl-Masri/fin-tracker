import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { BookDashedIcon, LogIn, Outdent, PlusSquareIcon, StarsIcon } from "lucide-react";
import { logout } from "@/lib/actions";


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
                          px-40">
            <div className="font-bold hover:scale-120 transition" title="Fin-Tracker">
              <Link href="/">Fin-Tracker</Link>
            </div>
            <ul className="flex items-center gap-2 md:hidden">
              <li className="px-4 w-1 hover:scale-120 transition" title="Login">
                <Link href="/login"><LogIn /></Link>
              </li>
              <li className="px-4 w-1 hover:scale-120 transition" title="Register">
                <Link href="/register"><PlusSquareIcon /></Link>
              </li>
              <li className="px-4 w-1 hover:scale-120 transition" title="Dashboard">
                <Link href="/dashboard"><BookDashedIcon /></Link>
              </li>
              <li className="px-4 w-1 hover:scale-120 transition" title="Statistics">
                <Link href="/stats"><StarsIcon/></Link>
              </li>
              <li className="px-4 w-1 hover:scale-120 transition text-red-500" title="Logout">
                <form action={logout}>
                  <button><Outdent/></button>
                </form>
              </li>
            </ul>
            <ul className="md:gap-10 hidden md:flex">
              <li className="hover:scale-120 transition hover:border-b border-gray-200 hover:text-gray-600">
                <Link href='/dashboard'>Dashboard</Link>
              </li>
              <li className="hover:scale-120 transition hover:border-b border-gray-200 hover:text-gray-600">
                <Link href='/stats'>Stats</Link>
              </li>
              <li className="hover:scale-120 transition hover:border-b border-gray-200 hover:text-gray-600">
                <Link href='/login'>LogIn</Link>
              </li>
              <li className="hover:scale-120 transition hover:border-b border-gray-200 hover:text-gray-600">
                <Link href='/register'>SignIn</Link>
              </li>
              <li>
                <form action={logout} className="hover:scale-120 transition hover:border-b text-red-700">
                  <button>LogOut</button>
                </form>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        </body>
    </html>
  );
}
