import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Volv - Intelligent Business Analytics",
  description: "Get answers before you ask questions with Volv's predictive business intelligence platform.",
  keywords: "business intelligence, AI analytics, data consolidation, CRM integration, marketing analytics",
  authors: [{ name: "Volv Team" }],
  creator: "Volv",
  publisher: "Volv",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://volv.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Volv - AI-Powered Business Intelligence Platform",
    description:
      "Transform your business intelligence with AI-powered insights and seamless data consolidation. Everything you need, before you ask.",
    url: "https://volv.ai",
    siteName: "Volv",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Volv - AI-Powered Business Intelligence Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volv - AI-Powered Business Intelligence Platform",
    description:
      "Transform your business intelligence with AI-powered insights and seamless data consolidation. Everything you need, before you ask.",
    images: ["/og-image.jpg"],
    creator: "@volv_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F3954A" />
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Preconnect to Wistia's domains for faster loading */}
        <link rel="preconnect" href="https://fast.wistia.com" />
        <link rel="preconnect" href="https://embedwistia-a.akamaihd.net" />
      </head>
      <body className={cn("bg-background text-foreground", inter.className)}>
        <div id="root">{children}</div>
        {/* Load Wistia script once per page load */}
        <Script src="https://fast.wistia.com/assets/external/E-v1.js" strategy="lazyOnload" async />
      </body>
    </html>
  )
}
