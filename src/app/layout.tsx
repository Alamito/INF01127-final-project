import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarClube } from "@/view/components/navbar/navbarClube";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CliqueClube"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarClube />
        {children}

      </body>
    </html>
  );
}
