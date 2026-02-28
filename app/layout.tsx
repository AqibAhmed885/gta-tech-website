import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: {
    default: "GTA Tech Solutions | AI, Product Engineering & IT Services",
    template: "%s | GTA Tech Solutions",
  },
  description:
    "Transform your business with GTA Tech Solutions. We deliver AI-powered automation, custom software, web and mobile apps, cloud modernization, cybersecurity, and digital growth solutions that scale.",
  keywords: [
    "IT solutions",
    "software development",
    "web development",
    "mobile app development",
    "business automation",
    "digital transformation",
    "cloud services",
    "cybersecurity",
    "UI/UX design",
    "digital marketing",
    "branding",
    "IT consulting",
    "DevOps",
    "enterprise software",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "GTA Tech Solutions" }],
  creator: "GTA Tech Solutions",
  publisher: "GTA Tech Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gtatechsolutions.com",
    siteName: "GTA Tech Solutions",
    title: "GTA Tech Solutions - AI, Product Engineering & IT Services",
    description:
      "Scale with AI automation, product engineering, cloud, cybersecurity, and digital solutions built for measurable growth.",
    images: [
      {
        url: "/gta-logo.png",
        width: 1200,
        height: 630,
        alt: "GTA Tech Solutions - AI, Product Engineering & IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA Tech Solutions - AI, Product Engineering & IT Services",
    description:
      "Scale with AI automation, product engineering, cloud, cybersecurity, and digital solutions built for measurable growth.",
    images: ["/gta-logo.png"],
    creator: "@gtatechsolutions",
  },
  icons: {
    icon: "/gta-logo.png",
    shortcut: "/gta-logo.png",
    apple: "/gta-logo.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#d489ff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-site  text-site">
        <Navbar />
        {/* Main site area — allow full-width/bleed sections (components can choose to constrain themselves) */}
        <main className=" bg-site overflow-hidden min-h-screen md:overflow-visible  ">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
