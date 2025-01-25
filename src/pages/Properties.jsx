import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  MapPin, 
  BedDouble, 
  Bath, 
  Square, 
  Heart, 
  ArrowLeft, 
  ArrowRight, 
  Home,
  Building2,
  Building,
  Store,
  Castle,
  Warehouse,
  Hotel,
  TreePine,
  SlidersHorizontal,
  X,
  Map,
  HeartOff,
  Crown,
  Sparkles,
  Clock,
  BadgeCheck,
  Percent
} from 'lucide-react';
import { featuredProperties } from '../data/properties';
import MapView from '../components/MapView';
import SearchInterface from '../components/SearchInterface';
import { Dialog } from '@headlessui/react';

const Properties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState(featuredProperties);
  const [properties, setProperties] = useState(featuredProperties);
  const [activeView, setActiveView] = useState('properties');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('relevance');
  const [compareList, setCompareList] = useState([]);
  const [filters, setFilters] = useState({
    propertyType: [],
    priceRange: { min: '', max: '' },
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    furnished: false,
    availability: '',
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showMapView, setShowMapView] = useState(false);

  const categories = [
    { id: 'all', label: 'All', icon: Home },
    { id: 'residential', label: 'Homes', icon: Building2 },
    { id: 'apartments', label: 'Apts', icon: Building },
    { id: 'commercial', label: 'Office', icon: Store },
    { id: 'luxury', label: 'Luxury', icon: Castle },
    { id: 'industrial', label: 'Industrial', icon: Warehouse },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'land', label: 'Land', icon: TreePine }
  ];

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

  // Filter properties based on filters
  const filterProperties = (properties, filters) => {
    return properties.filter(property => {
      // Property Type
      if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) {
        return false;
      }

      // Price Range
      if (filters.priceRange.min && property.price < parseInt(filters.priceRange.min)) {
        return false;
      }
      if (filters.priceRange.max && property.price > parseInt(filters.priceRange.max)) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms && filters.bedrooms !== 'Any' && property.bedrooms !== parseInt(filters.bedrooms)) {
        if (filters.bedrooms === '4+' && property.bedrooms < 4) return false;
        if (filters.bedrooms !== '4+' && property.bedrooms !== parseInt(filters.bedrooms)) return false;
      }

      // Bathrooms
      if (filters.bathrooms && filters.bathrooms !== 'Any' && property.bathrooms !== parseInt(filters.bathrooms)) {
        if (filters.bathrooms === '4+' && property.bathrooms < 4) return false;
        if (filters.bathrooms !== '4+' && property.bathrooms !== parseInt(filters.bathrooms)) return false;
      }

      // Amenities
      if (filters.amenities.length > 0 && !filters.amenities.every(amenity => property.amenities.includes(amenity))) {
        return false;
      }

      // Furnished
      if (filters.furnished && !property.furnished) {
        return false;
      }

      // Property Age
      if (filters.propertyAge) {
        const age = parseInt(property.yearBuilt);
        if (filters.propertyAge === '0-1' && (age < (new Date().getFullYear() - 1) || age > new Date().getFullYear())) return false;
        if (filters.propertyAge === '1-5' && (age < (new Date().getFullYear() - 5) || age > (new Date().getFullYear() - 1))) return false;
        if (filters.propertyAge === '5-10' && (age < (new Date().getFullYear() - 10) || age > (new Date().getFullYear() - 5))) return false;
        if (filters.propertyAge === '10+' && age > (new Date().getFullYear() - 10)) return false;
      }

      // Floor Level
      if (filters.floorLevel) {
        if (filters.floorLevel === 'ground' && property.floorLevel !== 'ground') return false;
        if (filters.floorLevel === '1-3' && (property.floorLevel < 1 || property.floorLevel > 3)) return false;
        if (filters.floorLevel === '4-10' && (property.floorLevel < 4 || property.floorLevel > 10)) return false;
        if (filters.floorLevel === '10+' && property.floorLevel < 10) return false;
      }

      // Pets Allowed
      if (filters.petsAllowed && !property.petsAllowed) {
        return false;
      }

      // Distance to Facilities
      if (filters.distanceTo) {
        if (filters.distanceTo.schools && property.distanceTo.schools > parseInt(filters.distanceTo.schools.split('-')[1] || filters.distanceTo.schools.split('< ')[1] || 1000)) return false;
        if (filters.distanceTo.hospitals && property.distanceTo.hospitals > parseInt(filters.distanceTo.hospitals.split('-')[1] || filters.distanceTo.hospitals.split('< ')[1] || 1000)) return false;
        if (filters.distanceTo.shopping && property.distanceTo.shopping > parseInt(filters.distanceTo.shopping.split('-')[1] || filters.distanceTo.shopping.split('< ')[1] || 1000)) return false;
        if (filters.distanceTo.transport && property.distanceTo.transport > parseInt(filters.distanceTo.transport.split('-')[1] || filters.distanceTo.transport.split('< ')[1] || 1000)) return false;
      }

      return true;
    });
  };

  // Sort properties based on sortBy
  const sortProperties = (properties, sortBy) => {
    switch (sortBy) {
      case 'price-asc':
        return [...properties].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...properties].sort((a, b) => b.price - a.price);
      case 'newest':
        return [...properties].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case 'oldest':
        return [...properties].sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      default:
        return properties;
    }
  };

  // Handle search and filter
  const handleSearch = (searchData) => {
    const filtered = filterProperties(allProperties, searchData.filters);
    const sorted = sortProperties(filtered, searchData.filters.sortBy);
    setProperties(sorted);
    setCurrentPage(1);
    setFilters(searchData.filters);
  };

  // Handle map view click
  const handleMapViewClick = () => {
    navigate('/map', { state: { properties } });
  };

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle compare list
  const handleCompare = (property) => {
    if (compareList.find(item => item.id === property.id)) {
      setCompareList(compareList.filter(item => item.id !== property.id));
    } else {
      setCompareList([...compareList, property]);
    }
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    const sorted = sortProperties([...properties], newSortBy);
    setProperties(sorted);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20">
      {/* Enhanced Fixed Search Header */}
      <div className="bg-white shadow-sm sticky top-20 z-10 border-b border-[#1c5bde]/10">
        <div className="container mx-auto">
          <SearchInterface 
            onSearch={handleSearch}
            initialFilters={filters}
            showTrending={false}
            categories={categories}
            activeCategory={activeView}
            onCategoryChange={setActiveView}
            enhancedView={true}
          />
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Count and Sort */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
              Available Properties
            </h1>
            <p className="text-sm text-neutral-600">
              Showing {properties.length} properties
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-4 py-2 rounded-xl border border-[#1c5bde]/20 text-sm text-neutral-600 focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <button
              onClick={() => setShowMapView(!showMapView)}
              className="bg-white border border-[#1c5bde]/20 text-[#1c5bde] px-4 py-2 rounded-xl text-sm 
                       font-medium flex items-center gap-2 hover:bg-[#1c5bde]/5 transition-colors"
            >
              <Map className="h-4 w-4" />
              {showMapView ? 'List View' : 'Map View'}
            </button>
          </div>
        </div>

        {/* Properties Grid with Enhanced Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {currentProperties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => openModal(property)}
                className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 
                         border border-[#1c5bde]/10 hover:border-[#1c5bde]/20 cursor-pointer"
              >
                {/* Property Image with Enhanced Navigation */}
                <div className="relative h-64">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Property Type Label */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm 
                                shadow-sm border border-[#1c5bde]/10">
                    <div className="flex items-center gap-1.5">
                      {property.type === 'residential' && <Building2 className="h-3.5 w-3.5 text-[#1c5bde]" />}
                      {property.type === 'apartments' && <Building className="h-3.5 w-3.5 text-[#1c5bde]" />}
                      {property.type === 'commercial' && <Store className="h-3.5 w-3.5 text-[#1c5bde]" />}
                      {property.type === 'luxury' && <Castle className="h-3.5 w-3.5 text-[#1c5bde]" />}
                      {property.type === 'industrial' && <Warehouse className="h-3.5 w-3.5 text-[#1c5bde]" />}
                      {property.type === 'hotels' && <Hotel className="h-3.5 w-3.5 text-[#1c5bde]" />}
                      {property.type === 'land' && <TreePine className="h-3.5 w-3.5 text-[#1c5bde]" />}
                      <span className="text-xs font-medium text-neutral-800">
                        {property.type === 'residential' && 'Home'}
                        {property.type === 'apartments' && 'Apt'}
                        {property.type === 'commercial' && 'Office'}
                        {property.type === 'luxury' && 'Luxury'}
                        {property.type === 'industrial' && 'Industrial'}
                        {property.type === 'hotels' && 'Hotel'}
                        {property.type === 'land' && 'Land'}
                      </span>
                    </div>
                  </div>

                  {/* Rest of the existing card content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Enhanced Image Navigation Arrows */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 
                                opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Previous image
                      }}
                      className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 text-neutral-900" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Next image
                      }}
                      className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                    >
                      <ArrowRight className="h-4 w-4 text-neutral-900" />
                    </motion.button>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCompare(property);
                      }}
                      className={`bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-colors ${
                        compareList.find(item => item.id === property.id)
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {compareList.find(item => item.id === property.id) ? <Heart /> : <HeartOff />}
                    </motion.button>
                  </div>

                  {/* Enhanced Price Tag */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                      <span className="text-[#1c5bde] font-semibold">{property.price}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Property Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-neutral-800 group-hover:text-[#1c5bde] transition-colors">
                      {property.title}
                    </h3>
                  </div>
                  <p className="text-neutral-600 flex items-center gap-1 mb-3 text-sm">
                    <MapPin className="h-4 w-4 text-[#1c5bde]" />
                    {property.location}
                  </p>
                  <div className="flex items-center gap-4 text-neutral-600 text-sm">
                    {property.beds && (
                      <div className="flex items-center gap-1 bg-[#f8fafc] px-2 py-1 rounded-lg">
                        <BedDouble className="h-4 w-4 text-[#1c5bde]" />
                        <span>{property.beds} Beds</span>
                      </div>
                    )}
                    {property.baths && (
                      <div className="flex items-center gap-1 bg-[#f8fafc] px-2 py-1 rounded-lg">
                        <Bath className="h-4 w-4 text-[#1c5bde]" />
                        <span>{property.baths} Baths</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 bg-[#f8fafc] px-2 py-1 rounded-lg">
                      <Square className="h-4 w-4 text-[#1c5bde]" />
                      <span>{property.area}</span>
                    </div>
                  </div>

                  {/* Enhanced View Details Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProperty(property.id);
                    }}
                    className="w-full mt-4 bg-[#1c5bde]/5 hover:bg-[#1c5bde]/10 text-[#1c5bde] py-2 rounded-lg 
                             text-center font-medium transition-colors"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white border border-[#1c5bde]/20 hover:bg-[#1c5bde]/5 
                       disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-[#1c5bde]" />
            </motion.button>
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i + 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 rounded-full font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#1c5bde] text-white shadow-md shadow-[#1c5bde]/20'
                    : 'bg-white border border-[#1c5bde]/20 text-neutral-600 hover:bg-[#1c5bde]/5'
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white border border-[#1c5bde]/20 hover:bg-[#1c5bde]/5 
                       disabled:opacity-50 disabled:hover:bg-white transition-colors"
            >
              <ArrowRight className="h-5 w-5 text-[#1c5bde]" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Enhanced Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsFilterDrawerOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              onClick={e => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-4 border-b z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-6">
                {/* Price Range */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Price Range</h3>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Type */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Property Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Residential', 'Commercial', 'Industrial', 'Land'].map((type) => (
                      <button
                        key={type}
                        className="px-4 py-2 border rounded-lg text-gray-600 hover:border-[#1c5bde] hover:text-[#1c5bde] transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Bedrooms</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, '5+'].map((num) => (
                      <button
                        key={num}
                        className="flex-1 px-4 py-2 border rounded-lg text-gray-600 hover:border-[#1c5bde] hover:text-[#1c5bde] transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Parking', 'Pool', 'Gym', 'Security',
                      'Garden', 'Elevator', 'Furnished', 'Pet Friendly'
                    ].map((amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <input type="checkbox" className="rounded text-[#1c5bde]" />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <div className="sticky bottom-0 bg-white p-4 border-t">
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-[#1c5bde] text-white py-3 rounded-lg hover:bg-[#0c0d8a] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Modal with Mapbox */}
      <AnimatePresence>
        {isModalOpen && selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Property Image Side with Navigation */}
                <div className="relative h-72 md:h-full">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Modal Image Navigation */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-900" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
                    >
                      <ArrowRight className="h-5 w-5 text-gray-900" />
                    </motion.button>
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Property Details Side */}
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedProperty.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedProperty.description}</p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-5 w-5 text-[#1c5bde]" />
                        <span>{selectedProperty.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-5 w-5 text-[#1c5bde]" />
                        <span>{selectedProperty.area}</span>
                      </div>
                    </div>

                    {/* Mapbox Static Map */}
                    <div className="rounded-lg h-[400px] relative overflow-hidden mb-4">
                      <img
                        src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${selectedProperty.coordinates[0]},${selectedProperty.coordinates[1]})/${selectedProperty.coordinates[0]},${selectedProperty.coordinates[1]},14,0,0/800x400@2x?access_token=pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ`}
                        alt={`Map showing ${selectedProperty.location}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Action Buttons - Centered on Mobile */}
                  <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3 mt-4">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleViewProperty(selectedProperty.id)}
                      className="px-6 py-2 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-colors w-full sm:w-auto"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map View Modal */}
      <AnimatePresence>
        {showMapView && (
          <MapView
            properties={properties}
            onClose={() => setShowMapView(false)}
            filters={filters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Properties;