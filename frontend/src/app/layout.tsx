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
    <html className="">
      <body className={inter.className}>
        <main className="board flex flex-col space-y-4">
          {children}
        </main>
      </body>
    </html>
  );
}