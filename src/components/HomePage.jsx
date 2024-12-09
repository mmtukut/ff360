import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, TrendingUp, Home, BedDouble, Bath, Square, ArrowRight, X, Filter, ChevronDown, Currency, Heart, Home as HomeIcon, Building2, Trees, Castle, Building as BuildingIcon, Warehouse, Hotel, PalmTree, Landmark, Factory, Apple, PlayCircle, Star, Download, Smartphone } from 'lucide-react';

import { featuredProperties } from '../data/properties';
import { infrastructureData } from '../data/infrastructure';

const propertyTypes = [
  {
    type: 'residential',
    title: 'Residential',
    subtitle: 'Houses & Apartments',
    icon: Home,
    image: '/images/residential.png'
  },
  {
    type: 'commercial',
    title: 'Commercial',
    subtitle: 'Offices & Shops',
    icon: Building2,
    image: '/images/commercial.png'
  },
  {
    type: 'land',
    title: 'Land',
    subtitle: 'Plots & Farmland',
    icon: Trees,
    image: '/images/land.png'
  },
  {
    type: 'luxury',
    title: 'Luxury',
    subtitle: 'Premium Properties',
    icon: Castle,
    image: '/images/luxury.png'
  },
  {
    type: 'industrial',
    title: 'Industrial',
    subtitle: 'Warehouses & Factories',
    icon: Factory,
    image: '/images/industrial.png'
  },
  {
    type: 'hospitality',
    title: 'Hotels & Resorts',
    subtitle: 'Hospitality Properties',
    icon: Hotel,
    image: '/images/hotels.png'
  },
  {
    type: 'institutional',
    title: 'Institutional',
    subtitle: 'Schools & Hospitals',
    icon: Landmark,
    image: '/images/institutional.png'
  },
  {
    type: 'mixed-use',
    title: 'Mixed Use',
    subtitle: 'Multi-purpose Properties',
    icon: BuildingIcon,
    image: '/images/mixed-use.png'
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('properties'); // 'properties' or 'infrastructure'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
    location: '',
    bedrooms: '',
  });

  const priceRanges = [
    '₦1M - ₦5M',
    '₦5M - ₦10M',
    '₦10M - ₦20M',
    '₦20M - ₦50M',
    '₦50M+'
  ];
  const locations = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano'];
  const bedrooms = ['1', '2', '3', '4', '5+'];

  const modalRef = useRef(null);

  // Handle modal focus trap
  useEffect(() => {
    if (!isModalOpen) return;

    const handleTabKey = (e) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (!e.shiftKey && document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }

      if (e.shiftKey && document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    modalRef.current?.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      modalRef.current?.removeEventListener('keydown', handleTabKey);
    };
  }, [isModalOpen]);

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    document.body.style.overflow = 'unset';
  };

  const handleViewProperty = (propertyId) => {
    closeModal();
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect Property in{' '}
              <span className="text-[#0e109f]">Nigeria</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Discover properties with comprehensive infrastructure insights and 360° virtual tours
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex-1 flex items-center gap-2 px-4">
                    <Search className="text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search by location, property type..."
                      className="w-full py-3 focus:outline-none text-gray-700"
                    />
                  </div>
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="px-4 py-2 text-[#0e109f] hover:bg-[#0e109f]/10 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <span>Filters</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <button className="bg-[#0e109f] hover:bg-[#0c0d8a] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                    Search
                  </button>
                </div>

                {/* Filters Panel */}
                {isFilterOpen && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Property Type Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Home className="h-4 w-4 text-[#0e109f]" />
                          Property Type
                        </label>
                        <select
                          value={filters.propertyType}
                          onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20 focus:border-[#0e109f]"
                        >
                          <option value="">Any Type</option>
                          {propertyTypes.map((type) => (
                            <option key={type.type} value={type.type}>{type.title}</option>
                          ))}
                        </select>
                      </div>

                      {/* Price Range Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Currency className="h-4 w-4 text-[#0e109f]" />
                          Price Range
                        </label>
                        <select
                          value={filters.priceRange}
                          onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20 focus:border-[#0e109f]"
                        >
                          <option value="">Any Price</option>
                          {priceRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>

                      {/* Location Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#0e109f]" />
                          Location
                        </label>
                        <select
                          value={filters.location}
                          onChange={(e) => setFilters({...filters, location: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20 focus:border-[#0e109f]"
                        >
                          <option value="">Any Location</option>
                          {locations.map((location) => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>

                      {/* Bedrooms Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <Home className="h-4 w-4 text-[#0e109f]" />
                          Bedrooms
                        </label>
                        <select
                          value={filters.bedrooms}
                          onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20 focus:border-[#0e109f]"
                        >
                          <option value="">Any Bedrooms</option>
                          {bedrooms.map((num) => (
                            <option key={num} value={num}>{num} Bedrooms</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <button
                        onClick={() => setFilters({
                          propertyType: '',
                          priceRange: '',
                          location: '',
                          bedrooms: '',
                        })}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="px-6 py-2 bg-[#0e109f] text-white rounded-lg hover:bg-[#0c0d8a] transition-colors"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toggle View Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveView('properties')}
              className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                activeView === 'properties'
                  ? 'bg-[#0e109f] text-white'
                  : 'bg-white text-[#0e109f] border border-[#0e109f]'
              }`}
            >
              Browse Properties
            </button>
            <button
              onClick={() => setActiveView('infrastructure')}
              className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                activeView === 'infrastructure'
                  ? 'bg-[#0e109f] text-white'
                  : 'bg-white text-[#0e109f] border border-[#0e109f]'
              }`}
            >
              View Infrastructure Map
            </button>
          </div>

          {/* Content Container */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {activeView === 'properties' ? (
              <div className="p-6">
                {/* Header with only search */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Featured Properties</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProperties.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => openModal(property)}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
                    >
                      {/* Property Image with Overlay */}
                      <div className="relative h-48">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Property Details */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{property.title}</h3>
                        </div>
                        <p className="text-[#0e109f] font-bold mb-2">{property.price}</p>
                        <p className="text-gray-600 flex items-center gap-1 mb-3">
                          <MapPin className="h-4 w-4" />
                          {property.location}
                        </p>
                        <div className="flex items-center gap-4 text-gray-600 text-sm">
                          {property.beds && (
                            <div className="flex items-center gap-1">
                              <BedDouble className="h-4 w-4" />
                              <span>{property.beds} Beds</span>
                            </div>
                          )}
                          {property.baths && (
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              <span>{property.baths} Baths</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Square className="h-4 w-4" />
                            <span>{property.area}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Properties Link */}
                <div className="mt-8 text-center">
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 text-[#0e109f] hover:text-[#0c0d8a] font-semibold group"
                  >
                    View All Properties
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              // Infrastructure Map View
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Infrastructure Map</h2>
                  <div className="flex items-center gap-4">
                    {infrastructureData.categories.map(category => (
                      <button
                        key={category.id}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50"
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Map Container */}
                <div className="h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/7.491,9.082,12,0,0/1200x600@2x?access_token=pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ`}
                    alt="Infrastructure Map"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Infrastructure List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  {infrastructureData.categories.map(category => (
                    <div key={category.id} className="space-y-4">
                      <h3 className="font-semibold flex items-center gap-2">
                        {category.icon} {category.name}
                      </h3>
                      <div className="space-y-2">
                        {category.items.slice(0, 3).map(item => (
                          <div
                            key={item.id}
                            className="border rounded-lg p-3 hover:border-[#0e109f] transition-colors"
                          >
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.type}</p>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                              <span>⭐ {item.rating}</span>
                              <span>{item.distance}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="min-h-screen px-4 py-12 flex items-center justify-center">
            <div 
              ref={modalRef}
              className="relative bg-white rounded-2xl shadow-lg w-[700px] max-w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm p-4 border-b flex justify-between items-center rounded-t-2xl">
                <h3 id="modal-title" className="font-semibold text-lg">
                  Property Details
                </h3>
                <button
                  onClick={closeModal}
                  className="h-8 w-8 bg-gray-100 hover:bg-gray-200 flex justify-center items-center rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4">
                {/* Property Image */}
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <h2 className="text-2xl font-bold mb-2">{selectedProperty.title}</h2>
                <p className="text-[#0e109f] text-xl font-bold mb-4">{selectedProperty.price}</p>
                
                {/* Property Features */}
                <div className="flex items-center gap-6 mb-6">
                  {selectedProperty.beds && (
                    <div className="flex items-center gap-2">
                      <BedDouble className="h-5 w-5 text-gray-600" />
                      <span>{selectedProperty.beds} Bedrooms</span>
                    </div>
                  )}
                  {selectedProperty.baths && (
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-gray-600" />
                      <span>{selectedProperty.baths} Bathrooms</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Square className="h-5 w-5 text-gray-600" />
                    <span>{selectedProperty.area}</span>
                  </div>
                </div>

                {/* Location Section */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="h-5 w-5" />
                    {selectedProperty.location}
                  </p>
                  
                  {/* Map Section */}
                  <div className="rounded-lg h-[200px] relative overflow-hidden shadow-sm border">
                    <img
                      src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${selectedProperty.coordinates[0]},${selectedProperty.coordinates[1]})/${selectedProperty.coordinates[0]},${selectedProperty.coordinates[1]},14,0,0/600x400@2x?access_token=pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ`}
                      alt={`Map showing ${selectedProperty.location}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2">
                      <Link
                        to={`/infrastructure-analysis?lat=${selectedProperty.coordinates[1]}&lng=${selectedProperty.coordinates[0]}`}
                        onClick={closeModal}
                        className="bg-white/90 hover:bg-white text-[#0e109f] px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <MapPin className="h-4 w-4" />
                        View Infrastructure
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                {selectedProperty.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{selectedProperty.description}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleViewProperty(selectedProperty.id)}
                    className="flex-1 bg-[#0e109f] hover:bg-[#0c0d8a] text-white py-2 rounded-lg text-center font-semibold transition-colors"
                  >
                    View Property
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-center font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Infrastructure Map Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-[#0e109f]/5 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Explore Infrastructure Around Properties</h2>
              <p className="text-gray-600 mb-8">
                Discover nearby amenities, schools, hospitals, and more with our interactive infrastructure map.
              </p>
              <Link
                to="/infrastructure-analysis"
                className="inline-flex items-center gap-2 bg-[#0e109f] hover:bg-[#0c0d8a] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                <MapPin className="h-5 w-5" />
                Open Infrastructure Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose FastFind Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FastFind</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#0e109f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[#0e109f]" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Smart Location Analysis</h3>
              <p className="text-gray-600">Make informed decisions with our detailed infrastructure analysis and location insights.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-[#0e109f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BedDouble className="h-8 w-8 text-[#0e109f]" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Wide Range of Properties</h3>
              <p className="text-gray-600">Explore a diverse selection of properties to find the perfect match for your needs.</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-[#0e109f]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-[#0e109f]" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Trusted by Thousands</h3>
              <p className="text-gray-600">Join a community of satisfied users who have found their dream homes with FastFind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative">
                <div className="bg-[#0e109f]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0e109f] font-bold">1</span>
                </div>
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-[#0e109f]/20"></div>
              </div>
              <h3 className="font-semibold mb-2">Search Location</h3>
              <p className="text-gray-600">Find your preferred area or property type using our advanced search tools.</p>
            </div>
            <div className="text-center">
              <div className="relative">
                <div className="bg-[#0e109f]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0e109f] font-bold">2</span>
                </div>
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-[#0e109f]/20"></div>
              </div>
              <h3 className="font-semibold mb-2">Explore Listings</h3>
              <p className="text-gray-600">Browse through detailed property listings with 360° virtual tours, photos, descriptions, and more.</p>
            </div>
            <div className="text-center">
              <div className="relative">
                <div className="bg-[#0e109f]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0e109f] font-bold">3</span>
                </div>
                <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-[#0e109f]/20"></div>
              </div>
              <h3 className="font-semibold mb-2">Contact Agents</h3>
              <p className="text-gray-600">Get in touch with property agents directly to schedule viewings or ask questions.</p>
            </div>
            <div className="text-center">
              <div className="bg-[#0e109f]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#0e109f] font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Make Your Move</h3>
              <p className="text-gray-600">Finalize your decision and move into your new home with confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Property Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {propertyTypes.map((property) => {
              const Icon = property.icon;
              return (
                <Link 
                  key={property.type}
                  to={`/properties?type=${property.type}`} 
                  className="group"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="aspect-w-16 aspect-h-12">
                      <img 
                        src={property.image}
                        alt={`${property.title} Properties`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/30 transition-colors" />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Icon className="w-10 h-10 text-white mb-2" />
                      <span className="text-white font-semibold text-lg">{property.title}</span>
                      <span className="text-white/80 text-sm">{property.subtitle}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-gray-600 text-sm">Property Buyer</p>
                </div>
              </div>
              <p className="text-gray-600">"FastFind made it incredibly easy to find my dream home with its infrastructure analysis feature."</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-gray-600 text-sm">Real Estate Investor</p>
                </div>
              </div>
              <p className="text-gray-600">"The variety of properties and detailed listings helped me make informed investment decisions."</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Emily Johnson</h4>
                  <p className="text-gray-600 text-sm">First-time Buyer</p>
                </div>
              </div>
              <p className="text-gray-600">"I appreciated the user-friendly interface and the ability to contact agents directly through the platform."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-[#0e109f]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-white/80 mb-8">Get the latest property updates and market insights.</p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none"
              />
              <button className="bg-white text-[#0e109f] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Download App Section (if applicable) */}
      <section className="py-20 bg-gradient-to-br from-[#0e109f]/5 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 max-w-xl">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#0e109f] to-blue-600 bg-clip-text text-transparent">
                Get FastFind Mobile App
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Find your perfect property on the go. Get real-time notifications, save your favorites, and schedule viewings instantly.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-[#0e109f]/10 p-2 rounded-lg">
                    <Smartphone className="h-5 w-5 text-[#0e109f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Easy to Use</h3>
                    <p className="text-gray-600 text-sm">Intuitive interface for seamless experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#0e109f]/10 p-2 rounded-lg">
                    <Download className="h-5 w-5 text-[#0e109f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Free Download</h3>
                    <p className="text-gray-600 text-sm">Available on iOS and Android</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#0e109f]/10 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-[#0e109f]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">4.8 Rating</h3>
                    <p className="text-gray-600 text-sm">Trusted by thousands</p>
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#" 
                  className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
                >
                  <PlayCircle className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* App Screenshots */}
            <div className="flex-1 relative">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/app-mockup.png" 
                  alt="FastFind App Interface" 
                  className="w-full max-w-md mx-auto"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#0e109f]/10 to-blue-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#0e109f]/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
