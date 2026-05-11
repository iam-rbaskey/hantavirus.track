import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { SocketProvider } from '@/providers/SocketProvider';

import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { NewsTicker } from '@/components/Ticker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hantavirus Intelligence Tracker',
  description: 'Global real-time epidemiological intelligence platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-white antialiased overflow-x-hidden`}>
        <QueryProvider>
          <SocketProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col pl-64">
                <Topbar />
                <NewsTicker />
                <main className="flex-1 w-full mx-auto p-8 max-w-[1920px]">
                  {children}
                </main>
              </div>
            </div>
          </SocketProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
