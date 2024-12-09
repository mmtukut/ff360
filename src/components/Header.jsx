import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Add useLocation
import { Menu, X, Search, Heart } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Add this to track current route

  // Function to check if link is active
  const isActive = (path) => location.pathname === path;

  // Navigation items array for easier management
  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/infrastructure-analysis', label: 'Infrastructure' },
    { path: '/market-analysis', label: 'Market Analysis' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // For authenticated users
  const userNavigation = [
    { name: 'Saved Properties', href: '/saved' },
    { name: 'Property Alerts', href: '/alerts' },
    { name: 'My Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
              <img 
                src={new URL('/src/assets/images/logo.png', import.meta.url).href}
                alt="FastFind360 Logo" 
                className="h-12 w-auto"
              />
            </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-semibold transition-colors ${
                  isActive(item.path)
                    ? 'text-[#0e109f]'
                    : 'text-gray-700 hover:text-[#0e109f]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <Link 
              to="/properties"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#0e109f]"
            >
              <Search className="h-5 w-5" />
            </Link>

            {/* Saved Properties */}
            <Link 
              to="/saved"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#0e109f]"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Auth Buttons */}
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-[#0e109f]"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-white bg-[#0e109f] px-4 py-2 rounded-lg hover:bg-[#0c0d8a] transition-colors"
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 