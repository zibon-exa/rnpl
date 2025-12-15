import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { FilesProvider } from "@/lib/files-context"
import { Header } from "@/components/header"
import { inter, tiroBangla, playfairDisplay, dancingScript, notoSerifBengali, mina } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "RNPL Note",
  description: "Lightweight digital note and file management system",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${tiroBangla.variable} ${playfairDisplay.variable} ${dancingScript.variable} ${notoSerifBengali.variable} ${mina.variable}`}>
      <body>
        <AuthProvider>
          <FilesProvider>
            <Header />
            {children}
          </FilesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

