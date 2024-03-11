import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar/SideBar"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Do Now",
  description: "Task manager app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        {children}</body>
    </html>
  );
}
