import PortfolioPageContent from "./PortfolioPageContent";

export const metadata = {
  title: "Portfolio | GTA Tech.ai - Case Studies & Outcomes",
  description:
    "Explore GTA Tech.ai case studies across enterprise software, AI automation, web platforms, mobile products, and digital transformation programs that delivered measurable growth.",
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
    title: "GTA Tech.ai Portfolio - Our Work",
    description:
      "See how we help teams scale with modern engineering, secure architecture, and performance-driven digital solutions.",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GTA Tech.ai Portfolio",
      },
    ],
  },
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
