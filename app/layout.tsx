import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Íslenskur orðaforði',
  description: 'Vikuleg háþróuð íslensk orð með spjöldum og dæmasetningum.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="is">
      <body>{children}</body>
    </html>
  );
}
