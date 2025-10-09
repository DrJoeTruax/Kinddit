import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Kinddit — Safer communities, transparent by default",
  description:
    "Kinddit is a Reddit-quality social platform with built-in safety tooling, transparency tickets, and Block-Lock moderation.",
  metadataBase: new URL("https://kinddit.dev")
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} min-h-screen bg-slate-950 text-slate-100`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-6 px-6 py-8">
              <aside className="hidden xl:block w-64 flex-shrink-0">
                <Sidebar />
              </aside>
              <main className="flex-1 space-y-6">{children}</main>
              <aside className="hidden lg:block w-80 flex-shrink-0">
                <RightSidebar />
              </aside>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
