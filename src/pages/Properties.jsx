import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, BedDouble, Bath, Square, Filter, Heart } from 'lucide-react';
import { featuredProperties } from '../data/properties'; // Update the import path as needed

const Properties = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    propertyType: '',
    priceRange: '',
    location: '',
    bedrooms: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20 focus:border-[#0e109f]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <button
              className="bg-[#0e109f] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0c0d8a] transition-colors"
            >
              <Filter className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Available Properties
          </h1>
          <p className="text-gray-600">
            Showing {featuredProperties.length} properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => openModal(property)}
              className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
            >
              {/* Property Image with Overlay */}
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Action Buttons Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // Add favorite functionality
                    }}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                  >
                    <Heart className="h-4 w-4 text-[#0e109f]" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProperty(property.id);
                    }}
                    className="bg-white/90 hover:bg-[#0e109f] hover:text-white text-[#0e109f] px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>

                {/* Infrastructure Link Overlay */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/infrastructure-analysis?lat=${property.coordinates[1]}&lng=${property.coordinates[0]}`}
                    onClick={(e) => e.stopPropagation()}
                    className="block bg-white/90 hover:bg-white text-[#0e109f] px-3 py-1.5 rounded-lg text-sm font-medium text-center transition-colors"
                  >
                    View Infrastructure
                  </Link>
                </div>
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
      </div>

      {/* Quick View Modal */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              {/* Property Image */}
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              {/* Property Title and Price */}
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

              {/* Map Section */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Location</h3>
                <div className="rounded-lg h-[200px] relative overflow-hidden">
                  <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${selectedProperty.coordinates[0]},${selectedProperty.coordinates[1]})/${selectedProperty.coordinates[0]},${selectedProperty.coordinates[1]},14,0,0/600x400@2x?access_token=pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ`}
                    alt={`Map showing ${selectedProperty.location}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-4 flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  {selectedProperty.location}
                </p>
              </div>

              {/* Description */}
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
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;