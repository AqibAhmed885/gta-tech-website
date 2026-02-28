import AboutPageContent from "./AboutPageContent";

export const metadata = {
  title: "About Us | GD Marketing - Innovating Digital Solutions",
  description:
    "Learn about GD Marketing's journey, mission, and values. We're a team of passionate marketers and technologists dedicated to transforming businesses through innovative digital marketing and IT solutions.",
  keywords: [
    "about GD Marketing",
    "IT company",
    "software development team",
    "technology experts",
    "digital transformation",
    "company mission",
    "company values",
    "tech innovation",
  ],
  openGraph: {
    title: "About GD Marketing - Our Mission & Team",
    description:
      "Discover the team behind GD Marketing and our commitment to delivering world-class digital marketing and IT solutions.",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GD Marketing About Us",
      },
    ],
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
