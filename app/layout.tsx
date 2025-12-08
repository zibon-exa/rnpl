import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { FilesProvider } from "@/lib/files-context"
import { inter, tiroBangla, playfairDisplay, dancingScript, notoSerifBengali } from "@/lib/fonts"

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
    <html lang="en" className={`${inter.variable} ${tiroBangla.variable} ${playfairDisplay.variable} ${dancingScript.variable} ${notoSerifBengali.variable}`}>
      <body>
        <AuthProvider>
          <FilesProvider>{children}</FilesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

