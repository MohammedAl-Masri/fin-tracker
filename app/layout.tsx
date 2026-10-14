import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Fin-Tracker",
  description: "Track your finances with ease",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <header>
          <nav className="sticky w-full h-3 mx-30">
            <div>Fin-Tracker</div>
          </nav>
        </header>
        {children}
        </body>
    </html>
  );
}
