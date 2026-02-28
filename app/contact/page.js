import ContactPageContent from "./ContactPageContent";

export const metadata = {
  title: "Contact Us | GD Marketing - Get in Touch",
  description:
    "Ready to transform your business? Contact GD Marketing today. Our team is ready to discuss your project, answer questions, and provide expert consultation. Let's build something amazing together.",
  keywords: [
    "contact GD Marketing",
    "get in touch",
    "IT consultation",
    "project inquiry",
    "business contact",
    "software development inquiry",
    "free consultation",
    "contact form",
  ],
  openGraph: {
    title: "Contact GD Marketing - Let's Build Together",
    description:
      "Ready to transform your business? Get in touch with our team today.",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Contact GD Marketing",
      },
    ],
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
