import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Prevent FontAwesome from automatically adding its CSS
import "mapbox-gl/dist/mapbox-gl.css"; // Import the necessary Mapbox CSS
import LayoutWrapper from "./layoutWrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import RouterEventsProvider from "./RouterEventsProvider";

const geist = localFont({
  src: "./fonts/Geist-VariableFont_wght.ttf",
  weight: "100 900",
  variable: "--font-geist",
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
      <body className={`${geist.className} antialiased`} suppressHydrationWarning >
        <NextTopLoader
          color="#ef4444"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease-in-out"	
          speed={100}
          zIndex={1600}
          showAtBottom={false}
        />
        <RouterEventsProvider />
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
