import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/app/Navbar/Navbar"
import Footer from "@/app/Hero/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Achei! - Recupere seus dispositivos",
  description: "Ajudamos você a localizar e recuperar seus dispositivos perdidos ou roubados.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

