import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { SectionNavigationTransitionProvider } from "@/components/section-navigation-transition";
import "./globals.css";

// The target site self-hosts IBM Plex; we load the same families from Google Fonts.
// Weights in use across the site: 300 (display type), 400 (body), 600, 700 (labels).
const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIT-IBM Computing Research Lab",
  description:
    "We are a research community from MIT and IBM advancing the frontiers of computation. Our work spans AI, algorithms, and quantum computing to develop new paradigms and methods that drive scientific discovery and create impact at scale.",
  applicationName: "MIT-IBM Computing Research Lab",
  icons: {
    icon: [
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/seo/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/seo/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/seo/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/seo/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/seo/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/seo/apple-touch-icon-152x152.png", sizes: "152x152" },
    ],
  },
  other: {
    "msapplication-TileColor": "#FFFFFF",
    "msapplication-TileImage": "/seo/mstile-144x144.png",
  },
  openGraph: {
    type: "website",
    url: "https://mitibm.mit.edu/",
    locale: "en",
    title: "MIT-IBM Computing Research Lab",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}
    >
      <body>
        <SectionNavigationTransitionProvider>
          {children}
        </SectionNavigationTransitionProvider>
      </body>
    </html>
  );
}
