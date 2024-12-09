import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, BedDouble, Bath, Square, ArrowLeft, School, 
  Hospital, ShoppingBag, Share2, Heart, ChevronLeft, 
  ChevronRight, User, Zap, Droplet, Wind, Thermometer, 
  Signal, Road, Shield, Tree, ShoppingCart, Bus 
} from 'lucide-react';
import { featuredProperties } from '../data/properties';
import { infrastructureData } from '../data/infrastructure';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PropertyDetailView = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [nearbyInfrastructure, setNearbyInfrastructure] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [is360View, setIs360View] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showInfrastructurePanel, setShowInfrastructurePanel] = useState(false);

  // Sample property images
  const propertyImages = [
    { src: property?.image, alt: property?.title },
    { src: property?.image, alt: "Interior view" },
    { src: property?.image, alt: "Kitchen view" },
    { src: property?.image, alt: "Bathroom view" }
  ];

  // Enhanced price history data
  const priceHistory = [
    { month: 'Jan 2024', price: 60000000, change: '+2.5%' },
    { month: 'Mar 2024', price: 70500000, change: '+2.0%' },
    { month: 'May 2024', price: 78000000, change: '+1.9%' },
    { month: 'Jul 2024', price: 72500000, change: '-0.6%' },
    { month: 'Sep 2024', price: 79000000, change: '+1.9%' },
    { month: 'Nov 2024', price: 89000000, change: '+1.3%' },
  ];

  useEffect(() => {
    const currentProperty = featuredProperties.find(p => p.id === parseInt(id));
    setProperty(currentProperty);

    if (currentProperty) {
      // Calculate nearby infrastructure
      const nearby = [];
      infrastructureData.categories.forEach(category => {
        category.items.forEach(item => {
          const distance = Math.sqrt(
            Math.pow(currentProperty.coordinates[0] - item.location[0], 2) +
            Math.pow(currentProperty.coordinates[1] - item.location[1], 2)
          );
          
          if (distance <= 0.05) {
            nearby.push({
              ...item,
              type: category.name,
              icon: getIconForCategory(category.id)
            });
          }
        });
      });

      setNearbyInfrastructure(nearby.slice(0, 5));
    }
  }, [id]);

  const getIconForCategory = (categoryId) => {
    switch (categoryId) {
      case 'schools':
        return School;
      case 'hospitals':
        return Hospital;
      case 'shopping':
        return ShoppingBag;
      default:
        return MapPin;
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Property Images/360 Tour Section */}
      <div className="relative h-[70vh] bg-gray-100">
        {is360View ? (
          <iframe 
            src="https://cdn.styldod.com/360/beverly-woods/app-files/index.html"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <img 
            src={propertyImages[activeImageIndex].src}
            alt={propertyImages[activeImageIndex].alt}
            className="w-full h-full object-cover"
          />
        )}

        {/* Navigation and Controls */}
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          <button 
            onClick={() => setIs360View(!is360View)}
            className="bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium"
          >
            {is360View ? 'View Photos' : '360° View'}
          </button>
          <button className="bg-white p-2 rounded-full shadow-lg">
            <Share2 className="h-6 w-6 text-gray-600" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-lg">
            <Heart className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Image Navigation */}
        {!is360View && (
          <>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {propertyImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    activeImageIndex === index ? 'bg-[#0066CC]' : 'bg-white'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              onClick={() => setActiveImageIndex((prev) => 
                prev === 0 ? propertyImages.length - 1 : prev - 1
              )}
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              onClick={() => setActiveImageIndex((prev) => 
                prev === propertyImages.length - 1 ? 0 : prev + 1
              )}
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Property Details and Contact Agent */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Property Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
              <p className="text-[#0e109f] text-xl font-bold mb-4">{property.price}</p>
              
              <div className="flex items-center gap-6 mb-6">
                {property.beds && (
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-gray-600" />
                    <span>{property.beds} Bedrooms</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-gray-600" />
                    <span>{property.baths} Bathrooms</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-gray-600" />
                  <span>{property.area}</span>
                </div>
              </div>

              {property.description && (
                <div className="mb-6">
                  <h2 className="font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">{property.description}</p>
                </div>
              )}

              {/* Map Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-semibold mb-4">Location</h2>
                <div className="rounded-lg h-[300px] relative overflow-hidden">
                  <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${property.coordinates[0]},${property.coordinates[1]})/${property.coordinates[0]},${property.coordinates[1]},14,0,0/800x600@2x?access_token=pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ`}
                    alt={`Map showing ${property.location}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <p className="mt-4 flex items-center gap-2 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  {property.location}
                </p>
              </div>
            </div>

            {/* Price History Section with Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-6">Price History</h2>
              <div className="h-[300px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory}>
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#666' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fill: '#666' }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      tickFormatter={(value) => `₦${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₦${(value / 1000000).toFixed(1)}M`, 'Price']}
                      contentStyle={{ 
                        background: '#fff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '12px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#0e109f" 
                      strokeWidth={2}
                      dot={{ fill: '#0e109f', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 text-sm font-medium text-gray-600 pb-2 border-b">
                  <span>Date</span>
                  <span className="text-right">Price</span>
                  <span className="text-right">Change</span>
                </div>
                {priceHistory.map((entry, index) => (
                  <div key={index} className="grid grid-cols-3 text-sm">
                    <span>{entry.month}</span>
                    <span className="text-right">₦{(entry.price / 1000000).toFixed(1)}M</span>
                    <span className={`text-right ${
                      entry.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {entry.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact Agent Card with Updated Colors */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#0e109f]/10 flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-[#0e109f]" />
                </div>
                <div>
                  <h3 className="font-bold">Muhammad Tukur</h3>
                  <p className="text-gray-600">Premium Agent</p>
                </div>
              </div>
              <button
                onClick={() => setShowContactModal(true)}
                className="w-full bg-[#0e109f] text-white py-3 rounded-lg mb-3 hover:bg-[#0c0d8a] transition-colors duration-300"
              >
                Contact Agent
              </button>
              <button className="w-full border border-[#0e109f] text-[#0e109f] py-3 rounded-lg hover:bg-[#0e109f]/10 transition-colors duration-300">
                Schedule Viewing
              </button>
            </div>

            {/* Nearby Infrastructure */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold mb-4">Nearby Infrastructure</h2>
              <div className="space-y-4">
                {nearbyInfrastructure.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-2 text-[#0e109f]" />
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.type}</div>
                      </div>
                    </div>
                    <span className="text-gray-600">{item.distance}</span>
                  </div>
                ))}
              </div>
              <Link
                to={`/infrastructure-analysis?lat=${property.coordinates[1]}&lng=${property.coordinates[0]}`}
                className="mt-6 block bg-[#0e109f]/10 hover:bg-[#0e109f] text-[#0e109f] hover:text-white py-2 rounded-lg text-center font-semibold transition-colors"
              >
                View Full Infrastructure Analysis
              </Link>
            </div>

            {/* Similar Properties with View All Button */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-semibold mb-4">Similar Properties</h2>
              <div className="space-y-4 mb-6">
                {featuredProperties.slice(0, 3).map((similarProperty) => (
                  <Link
                    key={similarProperty.id}
                    to={`/properties/${similarProperty.id}`}
                    className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  >
                    <img
                      src={similarProperty.image}
                      alt={similarProperty.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-semibold">{similarProperty.title}</div>
                      <div className="text-sm text-gray-600">{similarProperty.price}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                to="/properties"
                className="block text-center bg-[#0e109f]/10 hover:bg-[#0e109f] text-[#0e109f] hover:text-white py-2 rounded-lg font-semibold transition-colors"
              >
                View All Properties
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Agent Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Contact Agent</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Your Email</label>
                <input 
                  type="email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]/20"
                  rows={4}
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  className="flex-1 bg-[#0e109f] text-white py-2 rounded-lg hover:bg-[#0c0d8a] transition-colors duration-300"
                >
                  Send Message
                </button>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 border border-[#0e109f] text-[#0e109f] py-2 rounded-lg hover:bg-[#0e109f]/10 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailView;
