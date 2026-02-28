export const metadata = {
  title: 'Industries — GTA Tech Solutions',
  description: 'Solutions for Finance, Healthcare, E‑commerce, Education, Manufacturing, Logistics, Energy and Government — tailored engineering, security, and product design.',
  openGraph: {
    title: 'Industries — GTA Tech Solutions',
    description: 'We build tailored technology solutions for complex industries — combining design, resilient engineering and pragmatic product thinking.',
    url: 'https://gtatechsolutions.com/industries',
    siteName: 'GTA Tech Solutions',
    images: [
      {
        url: 'https://gtatechsolutions.com/og/industries.png',
        width: 1200,
        height: 630,
        alt: 'Industries we serve at GTA Tech Solutions'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries — GTA Tech Solutions',
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
