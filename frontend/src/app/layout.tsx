'use client'
import { Inter } from "next/font/google";
import { App } from "@/components/app";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <html className=''>
        <head>
          <title>Clientes</title>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme && savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                })();
              `,
            }}
          />
        </head>
        <body className={inter.className}>
            <App>
              {children}
            </App>
        </body>
      </html>
  );
}