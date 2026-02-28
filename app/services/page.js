import ServicesPageContent from "./ServicesPageContent";

export const metadata = {
  title: "Services | GD Marketing - Premium Digital Marketing & IT Solutions",
  description:
    "Explore our comprehensive digital marketing and IT services: Custom Software Development, Web & Mobile Development, Business Automation, Digital Marketing, Cloud Solutions, Cybersecurity & IT Consulting. Transform your business with cutting-edge technology.",
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
    title: "Premium IT Services | GD Marketing",
    description:
      "Transform your business with our comprehensive digital marketing and IT solutions. From software development to cybersecurity, we deliver excellence.",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GD Marketing Services",
      },
    ],
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
