import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, Bell, User, 
  Building, Calculator, Heart, 
  MessageSquare, Settings, LogOut,
  Home, DollarSign, Map, Briefcase,
  ChevronDown, Globe, Sun, Moon,
  Building2, Crown, TrendingUp, Calendar,
  MapPin, Phone, Users, Star
} from 'lucide-react';
import Logo from '../assets/images/logo.png';

const Header = ({ properties }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Enhanced navigation with categories
  const mainNavLinks = [
    {
      name: 'Home',
      path: '/',
      icon: Home,
    },
 
    {
      name: 'Properties',
      path: '/properties',
      icon: Building,
      submenu: [
        { name: 'Buy', path: '/properties', icon: Home },
        { name: 'Rent', path: '/properties', icon: Building2 },
        { name: 'Shortlets', path: '/properties', icon: Calendar },
        { name: 'Commercial', path: '/properties', icon: Briefcase }
      ]
    },
    {
      name: 'Find Agents',
      path: '/agents',
      icon: Users,
      submenu: [
        { name: 'Top Agents', path: '/agents/top', icon: Star },
        { name: 'Verified Agents', path: '/agents/verified', icon: Users },
        { name: 'Agency Directory', path: '/agents/agencies', icon: Briefcase }
      ]
    }
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmenuToggle = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  // Update the Right Section with enhanced profile/auth buttons
  const ProfileSection = () => {
    if (!isAuthenticated) {
      return
  
    }

    return (
      <div className="relative">
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-[#1c5bde]/5 rounded-full transition-colors"
        >
          <div className="relative">
            <img 
              src="https://ui-avatars.com/api/?name=John+Doe&background=1c5bde&color=fff" 
              alt="Profile" 
              className="w-8 h-8 rounded-full border-2 border-[#1c5bde]"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>

        <AnimatePresence>
          {isProfileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border py-2"
            >
              <div className="px-4 py-3 border-b">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://ui-avatars.com/api/?name=John+Doe&background=1c5bde&color=fff" 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full border-2 border-[#1c5bde]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-500">john@example.com</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="px-2 py-1 bg-[#1c5bde]/10 text-[#1c5bde] text-xs rounded-full">
                    Premium Member
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Verified Agent
                  </span>
                </div>
              </div>

              <div className="py-2">
                <div className="px-4 py-2">
                  <p className="text-xs font-medium text-gray-500 uppercase">Account</p>
                </div>
                <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1c5bde]/5">
                  <User className="h-4 w-4 text-[#1c5bde]" />
                  <div>
                    <p className="text-sm font-medium">Profile</p>
                    <p className="text-xs text-gray-500">Manage your account</p>
                  </div>
                </Link>
                <Link to="/favorites" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1c5bde]/5">
                  <Heart className="h-4 w-4 text-[#1c5bde]" />
                  <div>
                    <p className="text-sm font-medium">Favorites</p>
                    <p className="text-xs text-gray-500">Saved properties</p>
                  </div>
                </Link>
                <Link to="/messages" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1c5bde]/5">
                  <MessageSquare className="h-4 w-4 text-[#1c5bde]" />
                  <div>
                    <p className="text-sm font-medium">Messages</p>
                    <p className="text-xs text-gray-500">View your conversations</p>
                  </div>
                </Link>
              </div>

              <div className="py-2 border-t">
                <div className="px-4 py-2">
                  <p className="text-xs font-medium text-gray-500 uppercase">Settings</p>
                </div>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-[#1c5bde]/5">
                  <Settings className="h-4 w-4 text-[#1c5bde]" />
                  <div>
                    <p className="text-sm font-medium">Settings</p>
                    <p className="text-xs text-gray-500">Preferences & security</p>
                  </div>
                </Link>
                <button 
                  onClick={() => {/* Add logout logic */}}
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                >
                  <LogOut className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Sign Out</p>
                    <p className="text-xs text-red-500">End your session</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Handle hover persistence
  const handleMouseEnter = (index) => {
    setHoveredMenu(index);
  };

  const handleMouseLeave = (event) => {
    const related = event.relatedTarget;
    if (!dropdownRef.current?.contains(related)) {
      setHoveredMenu(null);
    }
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-sm' 
          : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="FastFind" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {mainNavLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  to={link.path}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#1c5bde]"
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {link.submenu && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Link>
                {link.submenu && (
                  <div className="absolute top-full left-0 w-64 p-3 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="space-y-2">
                      {link.submenu.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center gap-2 p-2 text-gray-600 hover:text-[#1c5bde] rounded-lg hover:bg-gray-50"
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
           {/* Search */}
            <div className="hidden md:flex items-center bg-[#1c5bde]/5 rounded-full pl-4 pr-2 py-2">
              <Search className="h-4 w-4 text-[#1c5bde]" />
              <input
                type="text"
                placeholder="Search properties..."
                className="bg-transparent border-none outline-none px-3 text-sm w-40 focus:w-60 transition-all placeholder-gray-500"
              />
            </div>
            {/* Map View Button - Now visible on both mobile and desktop */}
            <Link 
              to="/map"
              state={{ properties }}
              className="flex items-center gap-2 px-3 py-2 bg-[#1c5bde]/10 text-[#1c5bde] rounded-full hover:bg-[#1c5bde]/20 transition-colors"
            >
              <Map className="w-5 h-5" />
              <span className="hidden md:inline text-sm">Map View</span>
            </Link>

            {/* Saved Properties - Moved to header, visible on both mobile and desktop */}
            <Link 
              to="/saved"
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <div className="relative">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <span className="hidden md:inline text-sm">Saved</span>
            </Link>

            {/* User Profile/Login - Desktop only */}
            <button className="hidden md:flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-full hover:border-gray-300 transition-colors">
            <Link 
              to="/signin" 
              className="hidden md:flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-full hover:border-gray-300 transition-colors"
            >
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">Sign in</span>
            </Link>
              <Link
              to="/signup"
              className="bg-[#1c5bde] hover:bg-[#0c0d8a] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-sm hover:shadow-md"
            >
              Sign Up
            </Link>
            </button>

            {/* Profile Section */}
            <ProfileSection />

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>



        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 py-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  className="w-full px-4 py-2 pl-10 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu - Right Side */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/20 z-50 md:hidden"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween' }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-xl z-50 md:hidden"
              >
                {/* Mobile Menu Header with Sign In */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <Link 
                    to="/signin"
                    className="flex items-center gap-2 text-gray-600 hover:text-[#1c5bde] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign in</span>
                  </Link>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Mobile Search */}
                <div className="p-4 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search properties..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#1c5bde]"
                    />
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="overflow-y-auto h-[calc(100%-8rem)]">
                  {mainNavLinks.map((link) => (
                    <div key={link.name} className="px-4 py-2 border-b border-gray-100">
                      <Link
                        to={link.path}
                        className="flex items-center gap-2 py-2 text-gray-900 font-medium"
                      >
                        <link.icon className="w-5 h-5" />
                        <span>{link.name}</span>
                      </Link>
                      {link.submenu && (
                        <div className="space-y-1 ml-7">
                          {link.submenu.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="flex items-center gap-2 py-2 text-gray-600 hover:text-[#1c5bde]"
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 