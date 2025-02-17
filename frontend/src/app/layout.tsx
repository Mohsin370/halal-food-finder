import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Prevent FontAwesome from automatically adding its CSS
import "mapbox-gl/dist/mapbox-gl.css"; // Import the necessary Mapbox CSS
import LayoutWrapper from "./layoutWrapper";


const geist = localFont({
  src: "./fonts/Geist-VariableFont_wght.ttf",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Halal Food Australia",
  description: "Find Halal Food in Australia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
      <body className={`${geist.className} antialiased`}>
        <Providers>
          <LayoutWrapper >{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
