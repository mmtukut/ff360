import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
                src={new URL('/public/images/logo-white.png', import.meta.url).href}
                alt="FastFind Logo" className="h-15" />

            <p className="text-sm text-gray-400">
              Your trusted partner in finding the perfect property. We make property hunting simple and efficient.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#0e109f] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#0e109f] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#0e109f] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-[#0e109f] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-sm hover:text-[#0e109f] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/infrastructure-analysis" className="text-sm hover:text-[#0e109f] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Infrastructure Analysis
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-[#0e109f] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#0e109f] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-white font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=residential" className="text-sm hover:text-[#0e109f] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Residential Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="text-sm hover:text-[#0e109f] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link to="/properties?type=land" className="text-sm hover:text-[#0e109f] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Land
                </Link>
              </li>
              <li>
                <Link to="/properties?type=luxury" className="text-sm hover:text-[#0e109f] transition-colors flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Luxury Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#0e109f]" />
                <span className="text-sm">
                  FCT Abuja,<br />
                  Abuja, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#0e109f]" />
                <a href="tel:+1234567890" className="text-sm hover:text-[#0e109f] transition-colors">
                  (234) 805-641-9040
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#0e109f]" />
                <a href="mailto:info@fastfind.com" className="text-sm hover:text-[#0e109f] transition-colors">
                  info@fastfind.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} FastFind. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm hover:text-[#0e109f] transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm hover:text-[#0e109f] transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm hover:text-[#0e109f] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 