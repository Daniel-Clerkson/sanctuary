import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sanctuary — Where Faith Meets Now',
  description: 'A community for young believers in Lagos. Sermons, events, devotionals — all in one place.',
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased bg-[#0A0A0A] text-[#E8D5A3]">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '3px solid #C9A84C',
              color: '#E8D5A3',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  )
}
