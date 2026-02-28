import Image from 'next/image';
import Link from 'next/link';
import { FiShield } from 'react-icons/fi';

type Props = {
  content: {
    category?: string;
    heroTitle?: string;
    heroDescription?: string;
    title?: string;
  };
  highlights?: string[];
};

export default function ServicesHero({ content, highlights = [] }: Props) {
  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-linear-to-br from-sky-50 via-white to-teal-50">
                    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-100 blur-3xl" />
                        <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-teal-100 blur-3xl" />
                    </div>
                    <div className="relative mx-auto max-w-[1440px] px-6 py-20 lg:flex lg:items-center lg:gap-12">
                        <div className="max-w-2xl space-y-6">
                            <p className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm ring-1 ring-sky-100">{content.category}</p>
                            <h1 className="text-4xl capitalize font-semibold leading-tight text-slate-900  sm:text-6xl"><p>{content.heroTitle}</p></h1>
                            <p className="text-lg text-slate-700">{content.heroDescription}</p>
                            <div className="flex flex-wrap items-center gap-3">
                                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-sky-200 to-teal-200 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-100 transition hover:shadow-xl hover:brightness-105">Book a Consultation</Link>
                                <Link href="/services" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-sky-700 ring-1 ring-sky-200 transition hover:bg-sky-50">View All Services</Link>
                            </div>
                            <div className="flex flex-col gap-3 text-sm text-slate-600">
                                {highlights.map((item) => (
                                    <span key={item} className="flex items-center gap-2">
                                        <FiShield className="h-5 w-5 text-teal-500" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-8 ">
                            <div className="w-full absolute -bottom-24 -right-24 max-w-lg  lg:w-[900px]  lg:max-w-none">
                                <Image src="/services/web.svg" alt={`${content.title} team working`} width={800} height={800} className="h-auto w-full object-cover overflow-visible" />
                            </div>
                        </div>
                    </div>
                </section>
  );
}
