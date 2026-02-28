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
    default: "GD Marketing | Premium Digital Marketing & IT Solutions",
    template: "%s | GD Marketing",
  },
  description:
    "Transform your business with GD Marketing's cutting-edge digital marketing and IT solutions. We specialize in custom software development, web & mobile apps, business automation, cloud services, cybersecurity, and digital marketing. Your trusted partner in innovation.",
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
  authors: [{ name: "GD Marketing" }],
  creator: "GD Marketing",
  publisher: "GD Marketing",
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
    url: "https://gdmarketing.us",
    siteName: "GD Marketing",
    title: "GD Marketing - Premium Digital Marketing & IT Solutions",
    description:
      "Transform your business with cutting-edge digital marketing and IT solutions. Custom software, mobile apps, automation, cloud services & more.",
    images: [
      {
        url: "/gdLogo.jpg",
        width: 1200,
        height: 630,
        alt: "GD Marketing - Premium Digital Marketing & IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GD Marketing - Premium Digital Marketing & IT Solutions",
    description:
      "Transform your business with cutting-edge digital marketing and IT solutions. Custom software, mobile apps, automation, cloud services & more.",
    images: ["/gdlogo.png"],
    creator: "@gdmarketing",
  },
  icons: {
    icon: "/gdlogo-p1.png", // use a valid existing image as favicon
    shortcut: "/gdlogo-p1.png",
    apple: "/gdlogo-p1.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#039932",
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
