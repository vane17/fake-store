import type { Metadata } from "next";
import { Inter } from "next/font/google";

// ----- components
import { Providers } from "@/store/providers/Providers";

// ---- styles
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fake store",
  description: "fake store description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-backgroundPrimary ${inter.className} flex justify-center`}
      >
        <main className="flex min-h-screen px-4 py-8 lg:mx-[10%] lg:px-0 max-w-screen-xl w-screen">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
