import type { Metadata } from "next";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Kinddit — Safer Communities",
  description: "A Reddit-inspired community platform with built-in safety primitives."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-slate-950 text-slate-100 antialiased ${inter.variable} ${manrope.variable}`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex flex-1 gap-8 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/80">
              <Sidebar />
              <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-8 md:px-8">
                {children}
              </div>
              <RightSidebar />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
