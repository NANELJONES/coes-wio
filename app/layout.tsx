import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import LenisProvider from "./components/LenisProvider";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-comfortaa",
  display: "swap",
});

export const metadata: Metadata = {
  title: "COESSWIO",
  description: "The Coastal Ocean Environment School in the Western Indian Ocean (COES-WIO) is a regional summer school strengthening ocean science capacity across Africa and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.variable} ${comfortaa.className} antialiased`}
      style={{ fontFamily: 'var(--font-comfortaa)' , color: 'var(--primary_color)'}}
      >
        <LenisProvider>
          <Nav />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
