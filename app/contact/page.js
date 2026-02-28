import ContactPageContent from "./ContactPageContent";

export const metadata = {
  title: "Contact Us | GTA Tech Solutions - Get in Touch",
  description:
    "Ready to transform your business? Contact GTA Tech Solutions today. Our team is ready to discuss your goals, recommend the right technology path, and help you ship high-impact solutions faster.",
  keywords: [
    "contact GTA Tech Solutions",
    "get in touch",
    "IT consultation",
    "project inquiry",
    "business contact",
    "software development inquiry",
    "free consultation",
    "contact form",
  ],
  openGraph: {
    title: "Contact GTA Tech Solutions - Let's Build Together",
    description:
      "Ready to transform your business? Get in touch with our team today.",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Contact GTA Tech Solutions",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
