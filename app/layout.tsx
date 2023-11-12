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

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginObserver />
        <div className="flex flex-col min-h-screen">
        <main className="flex-1 container max-w-screen-sm mx-auto px-1 py-5">{children}</main>
        <footer>
          <div className="py-5 border-gray-300 flex justify-center items-center">
            My Blog
          </div>
        </footer>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;