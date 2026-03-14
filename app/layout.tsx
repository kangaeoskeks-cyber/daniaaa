import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dania Accounting | Modern Financial Services",
  description:
    "Dania Accounting provides outsourced bookkeeping, payroll, tax returns, annual reports, and financial advice for Danish companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0A0A] text-white antialiased`}>{children}</body>
    </html>
  );
}
