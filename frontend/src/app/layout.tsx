'use client'
import { Inter } from "next/font/google";
import { ThemeToggleButton } from '@/components/ui/themeToggleButton';
import "./globals.css";
import { QueryProvider } from '@/components/queryProvider';

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
          <QueryProvider>
            <ThemeToggleButton/>
            <main className="board flex flex-col space-y-4">
              {children}
            </main>
          </QueryProvider>
        </body>
      </html>
  );
}