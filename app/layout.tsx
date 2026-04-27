import type { Metadata } from "next";
import { Epilogue, Sofia } from "next/font/google";
import "./globals.css";
import "./head.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  weight: ["300", "400", "500", "600", "700"],
});

const sofia = Sofia({
  subsets: ["latin"],
  variable: "--font-sofia",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Michells Beauty Salon",
  description: "Servicios de belleza profesional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <head>
             <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        </head>
      <body className={`${epilogue.variable} ${sofia.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}