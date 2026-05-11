import type { Metadata } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { SocketProvider } from '@/providers/SocketProvider';
import { Sidebar, MobileNav } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { NewsTicker } from '@/components/Ticker';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'HantaTrack — Global Outbreak Intelligence',
  description: 'Realtime hantavirus outbreak intelligence platform. Live tracking of global cases, geospatial mapping, and epidemiological timelines.',
  keywords: ['hantavirus', 'outbreak', 'epidemiology', 'realtime', 'global tracker'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <body className={`${inter.className} min-h-dvh bg-bg-primary text-text-primary antialiased overflow-x-hidden`}>
        <QueryProvider>
          <SocketProvider>
            {/* Desktop sidebar */}
            <div className="hidden md:block">
              <Sidebar />
            </div>

            {/* Mobile drawer */}
            <MobileNav />

            {/* Main content area */}
            <div className="flex flex-col min-h-dvh md:pl-64">
              <Topbar />
              <NewsTicker />
              <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
                {children}
              </main>
            </div>
          </SocketProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
