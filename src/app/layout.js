import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavbarDesign1";
import Footer from "@/components/Footer";
import Providers from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  icons: {
    icon: '/favicon.png',
  },
  title: {
    default: "PetGhor — Find Your Forever Friend",
    template: "%s | PetGhor",
  },
  description:
    "PetGhor is a full-stack pet adoption platform where you can browse pets, view detailed profiles, and submit adoption requests. Every pet deserves a loving home.",
  keywords: ["pet adoption", "adopt a pet", "dogs", "cats", "birds", "rabbits", "animal shelter"],
  openGraph: {
    title: "PetGhor — Find Your Forever Friend",
    description:
      "Browse pets available for adoption. Connect with shelters and pet owners to give an animal a forever home.",
    url: "https://petghor.vercel.app",
    siteName: "PetGhor",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <Navbar/>
          <main className="flex-1">
            {children}
          </main>
          <Footer/>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
