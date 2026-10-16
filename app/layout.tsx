import type { Metadata, Viewport } from "next";
import { Poppins, Caveat } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const caveat = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--font-script" });

export const metadata: Metadata = {
  title: "92 Print Studio | High Quality Printing",
  description: "T-shirt, mug, cap, bag and business printing. Get a quote on WhatsApp.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#050b1c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${caveat.variable}`}>{children}</body>
    </html>
  );
}
