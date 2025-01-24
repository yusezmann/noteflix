import { Bebas_Neue, Noto_Sans } from "next/font/google"
import { QueryProvider } from "@/providers/query-provider"
import "./globals.css"
import { Footer } from "@/components/footer"

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
})

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans",
})

export const metadata = {
  title: "Noteflix",
  description: "A Netflix clone built with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${notoSans.variable}`}>
        <QueryProvider>{children}</QueryProvider>
        <Footer />
      </body>
    </html>
  )
}
