import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram,
  Users,
  Home,
  Building,
  Search,
  Star,
  ArrowRight,
  Building2,
  Clock,
  Linkedin
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/90 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
            <p className="text-white/90 text-sm mb-6">
              Subscribe to our newsletter to get notified about the latest properties in your area
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60 focus:outline-none focus:border-white/40 backdrop-blur-sm text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-white text-[#1c5bde] rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 active:scale-95 text-sm"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Quick Search</h3>
            <ul className="space-y-3">
              {['Featured Properties', 'New Listings', 'Map View', 'Verified Properties'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/properties/${item.toLowerCase().replace(' ', '-')}`}
                    className="group flex items-center text-gray-600 hover:text-[#1c5bde] transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Property Types</h3>
            <ul className="space-y-3">
              {[
                { name: 'Properties for Sale', icon: Home },
                { name: 'Properties for Rent', icon: Building },
                { name: 'Shortlets', icon: Building },
                { name: 'Commercial Properties', icon: Building }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={`/properties/${item.name.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#1c5bde] transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Agents */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Find Agents</h3>
            <ul className="space-y-3">
              {[
                { name: 'Top Agents', icon: Star },
                { name: 'Verified Agents', icon: Users },
                { name: 'Agency Directory', icon: Search },
                { name: 'Become an Agent', icon: Users }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={`/agents/${item.name.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#1c5bde] transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Contact Section */}
          <div className="space-y-4">
            {/* About */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1c5bde]/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-[#1c5bde]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-base mb-2">About FastFind</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">
                  Nigeria's innovative property platform, making it 10x faster 
                  to find your perfect property through AI-powered search.
                </p>
                <Link 
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-[#1c5bde] hover:text-[#1c5bde]/80 transition-colors text-sm"
                >
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Contact Info - Compact Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { icon: Phone, text: '+234 XXX XXX XXXX', href: 'tel:+234XXXXXXXX' },
                { icon: Mail, text: 'support@fastfind.com', href: 'mailto:support@fastfind.com' },
                { icon: MapPin, text: 'Gombe, Nigeria', href: 'https://maps.google.com/?q=Gombe,Nigeria' },
                { icon: Clock, text: 'Mon-Fri: 9AM - 6PM', href: null }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-2 text-gray-600 group transition-colors ${
                    item.href ? 'hover:text-[#1c5bde]' : ''
                  }`}
                >
                  <item.icon className="w-4 h-4 text-[#1c5bde]" />
                  <span className="text-xs">{item.text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto px-4 py-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2025 FastFind. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-600 hover:text-[#1c5bde] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-[#1c5bde] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 