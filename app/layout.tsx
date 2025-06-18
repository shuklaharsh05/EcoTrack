import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EcoTrack - Carbon Footprint Calculator',
  description: 'Track, analyze, and reduce your carbon footprint with our comprehensive calculator. Make a positive impact on the environment.',
  keywords: 'carbon footprint, sustainability, environment, climate change, eco-friendly',
  authors: [{ name: 'EcoTrack Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#059669',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="EcoTrack" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}