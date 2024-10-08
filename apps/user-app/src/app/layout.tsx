import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppbarClient from "@/components/AppbarClient";
import { Providers } from "./providers";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className}`} >
          <div className="min-w-screen min-h-screen bg-slate-950">
            <AppbarClient />
            {children}
            <Toaster />
          </div>
        </body>
      </Providers>
    </html>
  );
}
