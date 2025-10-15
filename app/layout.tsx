import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Document Hosting Platform",
  description: "Host and share your HTML, CSS, and JavaScript documents",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Suspense fallback={<div>Loading...</div>}> 
        {children}
        <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
