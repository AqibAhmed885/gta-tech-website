import ServicesPageContent from "./ServicesPageContent";

export const metadata = {
  title: "Services | GTA Tech Solutions - AI, Product & IT Services",
  description:
    "Explore our end-to-end GTA Tech Solutions services: AI automation, custom software engineering, web and mobile development, cloud modernization, cybersecurity, data intelligence, and digital growth strategy.",
  keywords: [
    "IT services",
    "software development",
    "web development",
    "mobile app development",
    "business automation",
    "digital marketing",
    "branding",
    "creative design",
    "cloud services",
    "DevOps",
    "cybersecurity",
    "IT consulting",
    "tech solutions",
    "digital transformation",
    "enterprise software",
  ],
  openGraph: {
    title: "Premium IT Services | GTA Tech Solutions",
    description:
      "Accelerate business outcomes with AI automation, cloud-native development, secure systems, and product engineering excellence.",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GTA Tech Solutions Services",
      },
    ],
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
