import type { Metadata } from "next";
import localFont from "next/font/local";
import './globals.css';

const geistSans = localFont({
    src: './fonts/ABCFavoritMono-Bold.woff2',
    variable: '--font-geist-sans',
    weight: '100 900',
});
// public\fonts\ABCFavoritMono-Bold.woff2

const geistMono = localFont({
    src: './fonts/ABCFavoritMono-Book.woff2',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
  title: "Gifiting Nom Yums",
  description: "developed by callmekay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
