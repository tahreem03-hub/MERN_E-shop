import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, CreditCard, Send } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'

const companyLinks = [
  { label: 'About Us', to: '/about-us' },
  { label: 'Careers', to: '/careers' },
  { label: 'Store Locations', to: '/store-locations' },
  { label: 'Our Blog', to: '/our-blog' },
]

const supportLinks = [
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'Shipping', to: '/shipping' },
  { label: 'Live Chat', to: '/chat' },
]

const socials = [FaFacebookF, FaTwitter, FaInstagram, FaYoutube]

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="group inline-flex items-center text-white/70 text-sm transition-colors hover:text-white"
  >
    <span className="w-0 group-hover:w-3 h-px bg-[#dfb3c7] mr-0 group-hover:mr-2 transition-all duration-300" />
    {children}
  </Link>
)

const Footer = () => {
  const handleSubmit = () => {
    // newsletter logic here
  }

  return (
    <footer>
      {/* Newsletter */}
      <div className="bg-[#2E294E]/95 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-white font-bold text-2xl md:text-3xl leading-snug md:max-w-md">
            <span className="text-[#dfb3c7]">Subscribe </span>
            to get news, events and offers.
          </h1>

          <div className="flex w-full md:w-auto items-center gap-3">
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="bg-[#f1e8ec] rounded-lg px-4 py-2.5 text-sm text-[#2E294E] placeholder:text-[#2E294E]/50 outline-none w-full md:w-72 focus:ring-2 focus:ring-[#dfb3c7] transition-shadow"
              placeholder="Enter your email..."
            />
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-[#dfb3c7] rounded-lg text-[#2E294E] font-medium px-5 py-2.5 shrink-0 transition-colors hover:bg-[#efbfd5]"
            >
              Submit
              <Send className="w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#2E294E] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <img src="/logo.png" alt="Ellie Crafts" className="w-28 mb-4" />
              <p className="text-white/70 text-sm leading-6 max-w-xs">
                Bringing quality products with a smooth shopping experience. Your
                trusted place for amazing deals and everyday essentials.
              </p>

              <div className="flex gap-3 mt-6">
                {socials.map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="bg-[#dfb3c7] p-2.5 rounded-full text-[#2E294E] transition-transform duration-200 hover:scale-110 hover:bg-[#efbfd5]"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col space-y-3">
              <h2 className="text-[#dfb3c7] text-xs font-semibold uppercase tracking-[0.15em] mb-1">
                Company
              </h2>
              {companyLinks.map((l) => (
                <FooterLink key={l.label} to={l.to}>
                  {l.label}
                </FooterLink>
              ))}
            </div>

            {/* Support */}
            <div className="flex flex-col space-y-3">
              <h2 className="text-[#dfb3c7] text-xs font-semibold uppercase tracking-[0.15em] mb-1">
                Support
              </h2>
              {supportLinks.map((l) => (
                <FooterLink key={l.label} to={l.to}>
                  {l.label}
                </FooterLink>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-[#dfb3c7] text-xs font-semibold uppercase tracking-[0.15em] mb-4">
                Contact
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Mail size={16} className="text-[#dfb3c7] shrink-0" />
                  support@example.com
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Phone size={16} className="text-[#dfb3c7] shrink-0" />
                  +92 300 1234567
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <MapPin size={16} className="text-[#dfb3c7] shrink-0" />
                  Faisalabad, Pakistan
                </div>
              </div>
            </div>
          </div>

          {/* Payment + Copyright */}
          <div className="border-t border-white/15 mt-10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <p className="text-white/60 text-sm order-2 sm:order-1">
              © {new Date().getFullYear()} Ellie Crafts. All rights reserved.
            </p>

            <div className="flex items-center gap-3 text-white/70 order-1 sm:order-2">
              <CreditCard size={20} className="text-[#dfb3c7]" />
              <span className="text-sm hidden sm:inline">Secure Payments</span>
              <div className="flex gap-2 sm:ml-2">
                {['VISA', 'Mastercard', 'PayPal'].map((p) => (
                  <span
                    key={p}
                    className="bg-white/5 border border-white/10 px-3 py-1 rounded-md text-xs"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer