import PortfolioPageContent from "./PortfolioPageContent";

export const metadata = {
  title: "Portfolio | GD Marketing - Our Work & Case Studies",
  description:
    "Explore GD Marketing's portfolio of successful projects. From enterprise software to mobile apps, web platforms, and digital transformations - see how we've helped businesses achieve their goals.",
  keywords: [
    "portfolio",
    "case studies",
    "client projects",
    "software development projects",
    "web development portfolio",
    "mobile app projects",
    "success stories",
    "project showcase",
  ],
  openGraph: {
    title: "GD Marketing Portfolio - Our Work",
    description:
      "See how we've transformed businesses with innovative digital marketing and IT solutions. Explore our portfolio of successful projects.",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GD Marketing Portfolio",
      },
    ],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
