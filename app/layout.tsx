import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import LenisProvider from "./components/LenisProvider";
import { SchoolProvider } from "@/contexts/SchoolContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "COES-WIO",
  description: "The Coastal Ocean Environment School in the Western Indian Ocean (COES-WIO) is a regional school strengthening ocean science capacity across East Africa and beyond.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.className} antialiased`}
      style={{ fontFamily: 'var(--font-poppins)' , color: 'var(--primary_color)'}}
      >
        <LenisProvider>
          <SchoolProvider>
            <Nav />
            {children}
          </SchoolProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
