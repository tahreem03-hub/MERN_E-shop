import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
} from "lucide-react";

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const handleSubmit = () => {
    // newsletter logic here
  };

  return (
    <>
      {/* Newsletter */}
      <div className="bg-[#2E294E]/90 flex items-center justify-between px-7 py-5">
        <h1 className="text-white font-bold text-3xl w-[40%]">
          <span className="text-[#dfb3c7]">Subscribe </span>
          us to get news, events and offers.
        </h1>

        <div className="flex h-10 items-center">
          <input
            type="email"
            name="email"
            autoComplete="email"
            className="bg-[#f1e8ec] rounded p-2 outline-none w-72"
            placeholder="Enter your email..."
          />

          <button
            className="bg-[#dfb3c7] rounded text-[#2E294E] px-5 py-[7px] ml-5 hover:bg-[#efbfd5]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>


      {/* Main Footer */}
      <div className="bg-[#2E294E] px-7 py-8 text-white">

        <div className="flex justify-between">

          {/* Brand */}
          <div className="w-[30%]">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-28 mb-3"
            />

            <p className="text-white/70 text-sm leading-6">
              Bringing quality products with a smooth shopping experience.
              Your trusted place for amazing deals and everyday essentials.
            </p>

            <div className="flex gap-3 mt-5">
              <a href="#" className="bg-[#dfb3c7] p-2 rounded-full text-[#2E294E] hover:scale-110 transition">
                <FaFacebookF size={18} />
              </a>

              <a href="#" className="bg-[#dfb3c7] p-2 rounded-full text-[#2E294E] hover:scale-110 transition">
                <FaTwitter size={18} />
              </a>

              <a href="#" className="bg-[#dfb3c7] p-2 rounded-full text-[#2E294E] hover:scale-110 transition">
                <FaInstagram size={18} />
              </a>

              <a href="#" className="bg-[#dfb3c7] p-2 rounded-full text-[#2E294E] hover:scale-110 transition">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>


          {/* Company */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-[#dfb3c7] font-medium mb-2">
              Company
            </h1>

            <Link className="text-white/70 text-sm" to="/about-us">
              About Us
            </Link>
            <Link className="text-white/70 text-sm" to="/careers">
              Careers
            </Link>
            <Link className="text-white/70 text-sm" to="/store-locations">
              Store Locations
            </Link>
            <Link className="text-white/70 text-sm" to="/our-blog">
              Our Blog
            </Link>
          </div>


          {/* Support */}
          <div className="flex flex-col space-y-2">
            <h1 className="text-[#dfb3c7] font-medium mb-2">
              Support
            </h1>

            <Link className="text-white/70 text-sm" to="/faq">
              FAQ
            </Link>
            <Link className="text-white/70 text-sm" to="/contact-us">
              Contact Us
            </Link>
            <Link className="text-white/70 text-sm" to="/shipping">
              Shipping
            </Link>
            <Link className="text-white/70 text-sm" to="/chat">
              Live Chat
            </Link>
          </div>


          {/* Contact */}
          <div>
            <h1 className="text-[#dfb3c7] font-medium mb-3">
              Contact
            </h1>

            <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <Mail size={16}/>
              support@example.com
            </div>

            <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
              <Phone size={16}/>
              +92 300 1234567
            </div>

            <div className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin size={16}/>
              Faisalabad, Pakistan
            </div>
          </div>

        </div>


        {/* Payment + Copyright */}
        <div className="border-t border-white/20 mt-8 pt-5 flex justify-between items-center">

          <p className="text-white/60 text-sm">
            © 2026 Your Brand. All rights reserved.
          </p>


          <div className="flex items-center gap-3 text-white/70">
            <CreditCard size={20}/>
            <span className="text-sm">
              Secure Payments
            </span>

            <div className="flex gap-2 ml-3">
              <span className="bg-white/10 px-3 py-1 rounded text-xs">
                VISA
              </span>
              <span className="bg-white/10 px-3 py-1 rounded text-xs">
                Mastercard
              </span>
              <span className="bg-white/10 px-3 py-1 rounded text-xs">
                PayPal
              </span>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Footer;