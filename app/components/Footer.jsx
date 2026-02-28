import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full relative  flex justify-center  ">
      <div className="w-full max-w-[1440px] min-h-[520px] flex flex-col justify-between mx-auto rounded-3xl overflow-hidden  text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-10 md:p-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <Image src="/gta-logo.png" alt="GTA Tech Solutions Logo" width={220} height={80} className="" />
            </div>
            <p className="text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
              GTA Tech Solutions delivers AI-powered digital products, cloud-ready engineering, and growth-focused technology services for modern businesses.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl  uppercase tracking-wider mb-5 text-white/90">Company</h3>
            <ul className="space-y-4 text-lg text-white/90 mt-5">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl uppercase tracking-wider mb-5 text-white/90">Contact</h3>
            <ul className="space-y-4 text-lg mt-5 text-white/90">
              <li><a href="mailto:info@gtatechsolutions.com" className="hover:text-white transition-colors">info@gtatechsolutions.com</a></li>
              <li><a href="tel:+16263792252" className="hover:text-white transition-colors">+1 626 379 2252</a></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
            </ul>
          </div>
        </div>

        <div className="px-10 md:px-16 py-6 border-t border-white/20 flex flex-col sm:flex-row  items-center justify-between  gap-4 text-sm text-white/85">
          <p>© 2026 GTA Tech Solutions. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link
              href="https://www.instagram.com/gtatechsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/15 border backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-[#009933] transition-all duration-300"
            >
              <FaInstagram className="w-6 h-6" />
            </Link>

            <Link
              href="https://youtube.com/@gtatechsolutions"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full border bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-[#009933] transition-all duration-300"
            >
              <FaYoutube className="w-6 h-6" />
            </Link>

            <Link
              href="https://www.facebook.com/share/17zZCAnKMG/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-[#009933] transition-all duration-300"
            >
              <FaFacebookF className="w-6 h-6" />
            </Link>

            <Link
              href="https://www.linkedin.com/company/gtatechsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-[#009933] transition-all duration-300"
            >
              <FaLinkedinIn className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
