import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js DEMO",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
