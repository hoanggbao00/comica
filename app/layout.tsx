import "@/assets/css/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { OpenGraph } from "@/lib/og";
import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  ...OpenGraph,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${comicNeue.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <NextTopLoader showSpinner={false} />
          <Toaster richColors theme="system" position="bottom-right" duration={2000} closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
