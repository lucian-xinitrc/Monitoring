import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";

const eirian = localFont({
  src: '../../public/fonts/eirian/Eirian.ttf',
  variable: '--font-eirian',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Temperature Monitoring App",
  description: "Created by Mebhevy Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${eirian.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
