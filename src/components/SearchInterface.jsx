import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Mic, Sliders, X, Crown, Building2, Clock, TrendingUp, Home, Coins, BedDouble, Bath, Star, Square, Building, Zap, Droplet, Car, Trees, Shield, Wifi, UtensilsCrossed, Sparkles, Percent, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import AdvancedFilters from './AdvancedFilters';

const SearchInterface = ({ 
  onSearch, 
  initialFilters,
  showTrending = true,
  categories = [],
  activeCategory,
  onCategoryChange,
  enhancedView = false,
  variant = 'default'
}) => {
  // Enhanced state management
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
  const [savedSearches, setSavedSearches] = useLocalStorage('savedSearches', []);
  const searchRef = useRef(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('type');
  const [localFilters, setLocalFilters] = useState(initialFilters || {});

  // Enhanced filters state
  const [filters, setFilters] = useState({
    propertyType: [],
    priceRange: { min: '', max: '' },
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    furnished: false,
    availability: '',
    sortBy: 'relevance',
    // Advanced filters
    propertyAge: '',
    parkingSpots: '',
    floorLevel: '',
    facing: '',
    petsAllowed: false,
    securityFeatures: [],
    nearbyFacilities: [],
    distanceTo: {
      schools: '',
      hospitals: '',
      shopping: '',
      transport: ''
    }
  });

  // Filter options
  const filterOptions = {
    propertyType: ['Apartment', 'Villa', 'Duplex', 'Self Contain', 'Single Room'],
    priceRange: [
      { label: 'Under ₦500k', value: '0-500000' },
      { label: '₦500k - ₦1M', value: '500000-1000000' },
      { label: '₦1M - ₦2M', value: '1000000-2000000' },
      { label: 'Above ₦2M', value: '2000000-999999999' }
    ],
    beds: ['1', '2', '3', '4+'],
    amenities: ['24/7 Power', 'Security', 'Water Supply', 'Parking', 'Furnished'],
    availability: ['Immediate', '1 Month Notice', 'Coming Soon']
  };

  // Search history management
  const addToRecentSearches = (query, appliedFilters) => {
    const newSearch = {
      id: Date.now(),
      query,
      filters: appliedFilters,
      timestamp: new Date().toISOString()
    };

    setRecentSearches(prev => {
      const updated = [newSearch, ...prev.slice(0, 4)];
      return updated;
    });
  };

  // Save search functionality
  const saveSearch = (query, appliedFilters) => {
    const newSavedSearch = {
      id: Date.now(),
      query,
      filters: appliedFilters,
      timestamp: new Date().toISOString(),
      name: `Search ${savedSearches.length + 1}` // Allow users to rename
    };

    setSavedSearches(prev => [...prev, newSavedSearch]);
  };

  // Enhanced search handler with relevance scoring
  const handleSearch = () => {
    const searchData = {
      query: searchQuery,
      filters,
      timestamp: new Date().toISOString()
    };

    // Add to recent searches
    addToRecentSearches(searchQuery, filters);

    // Calculate relevance score based on filters
    const relevanceScore = calculateRelevanceScore(searchData);

    // Pass search data to parent with relevance score
    onSearch({ ...searchData, relevanceScore });
  };

  // Relevance score calculation
  const calculateRelevanceScore = (searchData) => {
    let score = 0;
    
    // Query length weight
    if (searchData.query.length > 3) score += 10;
    
    // Filter completeness weight
    const filledFilters = Object.entries(searchData.filters).filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'object') return Object.values(value).some(v => v !== '');
      return value !== '' && value !== false;
    });
    
    score += filledFilters.length * 5;
    
    // Price range weight
    if (searchData.filters.priceRange.min && searchData.filters.priceRange.max) {
      score += 15;
    }
    
    // Location specificity weight
    if (searchData.filters.nearbyFacilities.length > 0) {
      score += 20;
    }

    return score;
  };

  // Filter suggestions based on user input
  const getSuggestions = (query) => {
    // Implement sophisticated suggestion logic
    return [
      {
        type: 'location',
        text: `Properties in ${query}`,
        score: 0.9
      },
      {
        type: 'property',
        text: `${query} style homes`,
        score: 0.8
      },
      {
        type: 'amenity',
        text: `Properties with ${query}`,
        score: 0.7
      }
    ].sort((a, b) => b.score - a.score);
  };

  // Voice search functionality
  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-NG';
      
      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      if (Array.isArray(prev[category])) {
        return {
          ...prev,
          [category]: prev[category].includes(value)
            ? prev[category].filter(item => item !== value)
            : [...prev[category], value]
        };
      }
      return {
        ...prev,
        [category]: value
      };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      propertyType: [],
      priceRange: { min: '', max: '' },
      bedrooms: '',
      bathrooms: '',
      amenities: [],
      furnished: false,
      availability: '',
      sortBy: 'relevance',
      // Advanced filters
      propertyAge: '',
      parkingSpots: '',
      floorLevel: '',
      facing: '',
      petsAllowed: false,
      securityFeatures: [],
      nearbyFacilities: [],
      distanceTo: {
        schools: '',
        hospitals: '',
        shopping: '',
        transport: ''
      }
    });
  };

  // Handle clicks outside of search component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto px-4">
      {/* Enhanced Search Bar */}
      <div className="relative group">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c5bde]/10 via-transparent to-[#ff6b6b]/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Glass Morphism Effect */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Main Search Container */}
        <div className="relative flex items-center bg-white rounded-full border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Search Icon with Pulse Effect */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-300">
            <div className="relative">
              <Search className="h-5 w-5 text-[#1c5bde]" />
              <div className="absolute inset-0 bg-[#1c5bde]/20 rounded-full animate-ping" />
            </div>
          </div>

          {/* Enhanced Search Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by location, property type, or keywords..."
            className="w-full pl-14 pr-32 py-4 bg-transparent rounded-full
                     focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20 
                     placeholder-gray-400 text-gray-700 text-lg"
          />

          {/* Action Buttons Container */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {/* Voice Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVoiceSearch}
              className={`relative p-3 rounded-full transition-all duration-300 
                ${isListening 
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gradient-to-r hover:from-[#1c5bde]/10 hover:to-[#ff6b6b]/10 hover:text-[#1c5bde]'
                } focus:outline-none`}
            >
              <Mic className={`h-5 w-5 ${isListening && 'animate-pulse'}`} />
              {isListening && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
                  <span className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
                </span>
              )}
            </motion.button>

            {/* Animated Divider */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent" />

            {/* Advanced Filters Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`relative p-3 rounded-full transition-all duration-300 
                ${showFilters 
                  ? 'bg-gradient-to-r from-[#1c5bde] to-[#2563eb] text-white shadow-lg shadow-[#1c5bde]/30' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gradient-to-r hover:from-[#1c5bde]/10 hover:to-[#2563eb]/10 hover:text-[#1c5bde]'
                } focus:outline-none`}
            >
              <Sliders className="h-5 w-5" />
              {showFilters && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-[#1c5bde] rounded-full"
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Interactive Glow Effect */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500
                      bg-gradient-to-r from-[#1c5bde]/20 via-transparent to-[#ff6b6b]/20 blur-xl -z-10" />
      </div>

      {/* Search Suggestions Panel */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white/80 backdrop-blur-md rounded-2xl 
                     shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-4 border-b border-gray-100/50">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Searches</h3>
                <div className="space-y-2">
                  {recentSearches.map((search) => (
                    <motion.button
                      key={search.id}
                      whileHover={{ x: 5 }}
                      onClick={() => setSearchQuery(search.query)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-[#1c5bde]/5 rounded-lg transition-colors"
                    >
                      <Clock className="h-4 w-4 text-[#1c5bde]" />
                      <span className="text-sm text-gray-600">{search.query}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Suggestions */}
            <div className="p-4">
              <div className="space-y-2">
                {['Location', 'Property', 'Amenity'].map((type, index) => (
                  <motion.button
                    key={type}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 w-full p-2 hover:bg-[#1c5bde]/5 rounded-lg transition-colors"
                  >
                    {type === 'Location' && <MapPin className="h-4 w-4 text-[#1c5bde]" />}
                    {type === 'Property' && <Home className="h-4 w-4 text-[#1c5bde]" />}
                    {type === 'Amenity' && <Building2 className="h-4 w-4 text-[#1c5bde]" />}
                    <span className="text-sm text-gray-600">{`${type}: ${searchQuery}`}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <AdvancedFilters
            filters={filters}
            setFilters={setFilters}
            onClose={() => setShowFilters(false)}
          />
        )}
      </AnimatePresence>

      {enhancedView && categories.length > 0 && (
        <div className="py-2 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-3 min-w-max">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm
                  ${activeCategory === category.id
                    ? 'bg-[#1c5bde] text-white shadow-md shadow-[#1c5bde]/20'
                    : 'bg-white text-neutral-600 hover:bg-[#1c5bde]/5 border border-[#1c5bde]/10'
                  }`}
              >
                <category.icon className="h-4 w-4" />
                <span className="font-medium">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Trending Searches - Always Visible */}
      {showTrending && (
        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <TrendingUp className="w-4 h-4" />
            <span>Trending in Gombe</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Near Federal College', 
              'Newly Built Apartments', 
              'Gated Communities',
              'Student Housing',
              'Business Districts',
              'Family Homes'
            ].map((trend) => (
              <button
                key={trend}
                className="px-4 py-2 bg-white shadow-sm border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#1c5bde] hover:text-[#1c5bde] transition-colors"
              >
                {trend}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FilterModal component */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

const FilterModal = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [activeTab, setActiveTab] = useState('type');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const quickPriceRanges = [
    { label: 'Under ₦500k', min: 0, max: 500000 },
    { label: '₦500k - ₦1M', min: 500000, max: 1000000 },
    { label: '₦1M - ₦2M', min: 1000000, max: 2000000 },
    { label: '₦2M - ₦5M', min: 2000000, max: 5000000 },
    { label: 'Above ₦5M', min: 5000000, max: null }
  ];

  const propertyTypes = [
    { icon: Building2, label: 'Apartment', description: 'Flats & Apartments' },
    { icon: Home, label: 'House', description: 'Single Family Homes' },
    { icon: Building, label: 'Duplex', description: 'Multi-floor Homes' },
    { icon: Square, label: 'Land', description: 'Plots & Land' },
    { icon: Building2, label: 'Commercial', description: 'Offices & Shops' },
    { icon: Home, label: 'Self Contain', description: 'Studio Apartments' }
  ];

  const amenities = [
    { icon: Zap, label: '24/7 Power', category: 'utilities' },
    { icon: Droplet, label: 'Water Supply', category: 'utilities' },
    { icon: Car, label: 'Parking Space', category: 'facilities' },
    { icon: Trees, label: 'Garden', category: 'outdoor' },
    { icon: Shield, label: 'Security', category: 'safety' },
    { icon: Wifi, label: 'Internet', category: 'utilities' },
    { icon: UtensilsCrossed, label: 'Kitchen', category: 'indoor' },
    { icon: Wifi, label: 'Staff Quarters', category: 'facilities' }
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white rounded-3xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Filter Properties
                </Dialog.Title>
                <p className="text-sm text-gray-500 mt-1">
                  Find your perfect property with our advanced filters
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Quick Filters */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Crown, label: 'Luxury' },
                  { icon: Sparkles, label: 'New' },
                  { icon: Clock, label: 'Ready to Move' },
                  { icon: BadgeCheck, label: 'Verified' },
                  { icon: Percent, label: 'Special Offer' }
                ].map((filter) => (
                  <button
                    key={filter.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 
                             hover:border-[#1c5bde] hover:bg-[#1c5bde]/5 transition-all group"
                  >
                    <filter.icon className="w-4 h-4 text-gray-400 group-hover:text-[#1c5bde]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#1c5bde]">
                      {filter.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Filter Content */}
            <div className="grid grid-cols-3 gap-6 p-6">
              {/* Property Type */}
              <div className="col-span-3 md:col-span-1">
                <h3 className="font-medium mb-3">Property Type</h3>
                <div className="space-y-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.label}
                      className="flex items-center gap-3 w-full p-3 rounded-xl border border-gray-200 
                               hover:border-[#1c5bde] hover:bg-[#1c5bde]/5 transition-all group"
                    >
                      <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white">
                        <type.icon className="w-5 h-5 text-gray-600 group-hover:text-[#1c5bde]" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 group-hover:text-[#1c5bde]">
                          {type.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          {type.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range & Rooms */}
              <div className="col-span-3 md:col-span-2 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-gray-600">Minimum</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                        <input
                          type="number"
                          placeholder="0"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                          className="w-full pl-7 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#1c5bde] focus:ring-2 focus:ring-[#1c5bde]/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Maximum</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                        <input
                          type="number"
                          placeholder="No limit"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                          className="w-full pl-7 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#1c5bde] focus:ring-2 focus:ring-[#1c5bde]/20"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickPriceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange({ min: range.min, max: range.max })}
                        className="px-4 py-2 rounded-lg border border-gray-200 text-sm
                                 hover:border-[#1c5bde] hover:bg-[#1c5bde]/5 hover:text-[#1c5bde] transition-all"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rooms & Amenities */}
                <div className="space-y-6">
                  {/* Rooms */}
                  <div>
                    <h3 className="font-medium mb-3">Rooms</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-gray-600">Bedrooms</label>
                        <div className="mt-2 flex gap-2">
                          {['Any', '1', '2', '3', '4+'].map((num) => (
                            <button
                              key={num}
                              className="min-w-[48px] py-2 rounded-lg border border-gray-200 text-sm
                                       hover:border-[#1c5bde] hover:bg-[#1c5bde]/5 hover:text-[#1c5bde] transition-all"
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Bathrooms</label>
                        <div className="mt-2 flex gap-2">
                          {['Any', '1', '2', '3', '4+'].map((num) => (
                            <button
                              key={num}
                              className="min-w-[48px] py-2 rounded-lg border border-gray-200 text-sm
                                       hover:border-[#1c5bde] hover:bg-[#1c5bde]/5 hover:text-[#1c5bde] transition-all"
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="font-medium mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {amenities.map((amenity) => (
                        <label
                          key={amenity.label}
                          className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 
                                   hover:border-[#1c5bde] hover:bg-[#1c5bde]/5 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            className="rounded text-[#1c5bde] focus:ring-[#1c5bde]"
                          />
                          <div className="flex items-center gap-2">
                            <amenity.icon className="w-4 h-4 text-gray-400 group-hover:text-[#1c5bde]" />
                            <span className="text-sm text-gray-600 group-hover:text-[#1c5bde]">
                              {amenity.label}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-100">
              <button
                onClick={() => {
                  // Clear filters logic
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Clear all
              </button>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Apply filters logic
                    onClose();
                  }}
                  className="px-6 py-2 bg-[#1c5bde] text-white rounded-full hover:bg-[#1c5bde]/90 transition-colors"
                >
                  Show Results
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default SearchInterface; 