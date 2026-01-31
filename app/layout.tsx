import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clothier Store',
  description: 'Thời trang chính hãng',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts & Material Icons */}
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-sans antialiased bg-[#f5f7f8]">
        {children}
      </body>
    </html>
  );
}