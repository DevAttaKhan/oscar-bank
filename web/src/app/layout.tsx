import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={cn(inter.className, "bg-background")}>{children}</body>
      </SessionProvider>
    </html>
  );
}
