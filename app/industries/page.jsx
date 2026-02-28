export const metadata = {
  title: 'Industries — GD Marketing',
  description: 'Solutions for Finance, Healthcare, E‑commerce, Education, Manufacturing, Logistics, Energy and Government — tailored engineering, security, and product design.',
  openGraph: {
    title: 'Industries — GD Marketing',
    description: 'We build tailored technology solutions for complex industries — combining design, resilient engineering and pragmatic product thinking.',
    url: 'https://gdmarketing.us/industries',
    siteName: 'GD Marketing',
    images: [
      {
        url: 'https://gdmarketing.us/og/industries.png',
        width: 1200,
        height: 630,
        alt: 'Industries we serve at GD Marketing'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries — GD Marketing',
    description: 'We build tailored technology solutions for complex industries.'
  }
}

import IndustriesPageContent from './IndustriesPageContent'

export default function Page() {
  return (
    <main className="">
      <IndustriesPageContent />
    </main>
  )
}
