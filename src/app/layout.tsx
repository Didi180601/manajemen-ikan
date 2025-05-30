import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Fishing Management System',
  description: 'Sistem Manajemen Perikanan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${poppins.variable}`}>
      <body className={`${poppins.className} antialiased bg-slate-50`}>
        {children}
      </body>
    </html>
  )
}