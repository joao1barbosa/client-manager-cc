import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
        <main className="relative w-3/4 h-[80vh] bg-gray-100 rounded-lg p-4 overflow-hidden"> 
          {children}
        </main>
      </body>
    </html>
  );
}
