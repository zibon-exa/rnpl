import type { Metadata } from "next"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { FilesProvider } from "@/lib/files-context"

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;700&family=Dancing+Script:wght@700&family=Tiro+Bangla:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans">
        <AuthProvider>
          <FilesProvider>{children}</FilesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

