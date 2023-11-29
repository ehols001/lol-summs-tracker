import type { Metadata } from 'next'
import { Bitter } from 'next/font/google'
import './globals.css'

const bitter = Bitter({
    subsets: ['latin'],
    weight: '400'
});

export const metadata: Metadata = {
  title: 'Summoners Hub',
  description: 'Track enemy summoner spell cooldowns as a team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={bitter.className}>{children}</body>
    </html>
  )
}
