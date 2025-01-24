import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EVO",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('Initializing Vercel Analytics');
  
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#8B5CF6",
        },
        elements: {
          card: "bg-[#190d2e]/90 backdrop-blur-xl border border-white/15 shadow-[0_0_30px_rgba(140,69,255,0.3)] ",
          headerTitle: "text-white",
          headerSubtitle: "text-white/70",
          socialButtonsBlockButton: "bg-[#190d2e] hover:bg-[#4a208a] border border-white/15",
          formButtonPrimary: "bg-white",
          formFieldInput: "bg-[#190d2e] border-white/15",
          footerAction: "hidden",
          footer: "hidden",
        }
      }}
    >
        <html lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {children}
            <Analytics mode="production" debug={true} />
          </body>
        </html>
    </ClerkProvider>
  );
}