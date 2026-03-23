import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SCM Team Dashboard",
  description: "Seattle Cell Market internal team dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
