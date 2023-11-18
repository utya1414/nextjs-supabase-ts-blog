import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
export const dynamic = "force-dynamic";
import LoginObserver from "./components/auth/login-observer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nextjs-supabase-ts-blog",
  description: "my blog",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-primary">
          <LoginObserver />
          <main className="flex-1 px-1 py-5">{children}</main>
          <footer>
            <div className="py-5 flex flex-col items-center mx-10">
              <p className="text-sm">Contact <a href="/cusomer" className="hover:underline hover:underline-offset-2">Customer Service</a></p>
              <p className="text-sm text-gray-400">Copyright © 2023-2023 Jitumu All Rights Reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
