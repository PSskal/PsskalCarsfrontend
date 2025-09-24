import { Geist, Geist_Mono } from "next/font/google";
import { CarProvider } from "@/context/CarContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "PsskalCars | Compra y venta de autos en Perú",
  description:
    "Encuentra, vende y compra autos fácilmente en PsskalCars. Plataforma segura, rápida y con la mejor experiencia.",
  openGraph: {
    title: "PsskalCars | Compra y venta de autos en Perú",
    description: "Encuentra, vende y compra autos fácilmente en PsskalCars.",
    url: "https://psskal.com",
    siteName: "PsskalCars",
    images: [
      {
        url: "/icon.png",
        width: 500,
        height: 500,
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PsskalCars | Compra y venta de autos en Perú",
    description: "Encuentra, vende y compra autos fácilmente en PsskalCars.",
    images: ["/icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CarProvider>{children}</CarProvider>
      </body>
    </html>
  );
}
