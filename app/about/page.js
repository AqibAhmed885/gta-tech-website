import AboutPageContent from "./AboutPageContent";

export const metadata = {
  title: "About Us | GTA Tech Solutions - Building Future-Ready Products",
  description:
    "Learn about GTA Tech Solutions, our mission, and our engineering mindset. We help businesses modernize systems, launch digital products, and scale with AI-powered technology solutions.",
  keywords: [
    "about GTA Tech Solutions",
    "IT company",
    "software development team",
    "technology experts",
    "digital transformation",
    "company mission",
    "company values",
    "tech innovation",
  ],
  openGraph: {
    title: "About GTA Tech Solutions - Our Mission & Team",
    description:
      "Discover the team behind GTA Tech Solutions and our commitment to delivering reliable, scalable, and high-impact digital solutions.",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GTA Tech Solutions About Us",
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
