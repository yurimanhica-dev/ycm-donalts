import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CartProvider } from "./[slug]/menu/context/cart";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YCM Donald's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased  [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2  [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-track]:bg-zinc-100`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
