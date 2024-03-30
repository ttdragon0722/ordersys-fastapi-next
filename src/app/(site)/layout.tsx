import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SourceProvider } from "@/context/sourceData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "點貨系統",
  description: "生成點貨文字",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SourceProvider>
          {children}
        </SourceProvider>
      </body>
    </html>
  );
}
