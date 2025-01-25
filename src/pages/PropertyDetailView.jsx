import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, BedDouble, Bath, Square, ArrowLeft, School, 
  Hospital, ShoppingBag, Share2, Heart, ChevronLeft, 
  ChevronRight, User, Zap, Droplet, Wind, Thermometer, 
  Signal, Road, Shield, Tree, ShoppingCart, Bus, Wifi, Tv, 
  Mountain, Utensils, Car, X, Check, Home, FileText, Coffee, TrendingUp 
} from 'lucide-react';
import { featuredProperties } from '../data/properties';
import { infrastructureData } from '../data/infrastructure';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ';

const PropertyDetailView = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [nearbyInfrastructure, setNearbyInfrastructure] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [is360View, setIs360View] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showInfrastructurePanel, setShowInfrastructurePanel] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('12');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [transactionType, setTransactionType] = useState('rent');
  const [showEMIModal, setShowEMIModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState(property?.price || 0);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);

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

  // Amenities data
  const amenities = {
    essential: [
      { icon: Wifi, label: 'High-speed WiFi' },
      { icon: Tv, label: 'Smart TV' },
      { icon: Wind, label: 'Air conditioning' },
      { icon: Droplet, label: 'Hot water' },
    ],
    featured: [
      { icon: Mountain, label: 'Scenic views' },
      { icon: Utensils, label: 'Fully equipped kitchen' },
      { icon: Car, label: 'Free parking' },
      { icon: Shield, label: '24/7 security' },
    ]
  };

  // Add these sections configuration
  const sections = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'details', label: 'Details & Pricing', icon: FileText },
    { id: 'amenities', label: 'Amenities', icon: Coffee },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'history', label: 'Price History', icon: TrendingUp }
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

  const calculateEMI = (amount, rate, years) => {
    const principal = parseFloat(amount);
    const monthlyRate = (parseFloat(rate) / 12) / 100;
    const numberOfPayments = parseFloat(years) * 12;
    
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
    return emi;
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Primary Information - Always Visible */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {property.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#1c5bde]">{property.price}</p>
              <p className="text-sm text-gray-600">per month</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 py-4 border-y">
            {property.beds && (
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-gray-600" />
                <span>{property.beds} Beds</span>
              </div>
            )}
            {property.baths && (
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-gray-600" />
                <span>{property.baths} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5 text-gray-600" />
              <span>{property.area}</span>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? 'bg-[#1c5bde] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <section.icon className="h-4 w-4" />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Transaction Type Selection */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setTransactionType('rent')}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                        transactionType === 'rent'
                          ? 'bg-[#1c5bde] text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Rent Property
                    </button>
                    <button
                      onClick={() => setTransactionType('buy')}
                      className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                        transactionType === 'buy'
                          ? 'bg-[#1c5bde] text-white'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Buy Property
                    </button>
                  </div>

                  {transactionType === 'rent' && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold">Select Tenure Period</h2>
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { value: '3', label: '3 Months' },
                          { value: '6', label: '6 Months' },
                          { value: '12', label: '1 Year' },
                          { value: 'continuous', label: 'Continuous' }
                        ].map((period) => (
                          <button
                            key={period.value}
                            onClick={() => setSelectedPeriod(period.value)}
                            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                              selectedPeriod === period.value
                                ? 'bg-[#1c5bde] text-white'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {period.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {transactionType === 'buy' && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold">Purchase Options</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium mb-2">Outright Purchase</h3>
                          <p className="text-gray-600 text-sm mb-3">Full payment with complete ownership transfer</p>
                          <p className="font-bold text-[#1c5bde]">{property?.price}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h3 className="font-medium mb-2">Mortgage Option</h3>
                          <p className="text-gray-600 text-sm mb-3">Monthly payments with our banking partners</p>
                          <button 
                            onClick={() => setShowEMIModal(true)} 
                            className="text-[#1c5bde] text-sm font-medium"
                          >
                            Calculate EMI →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Property Overview */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Property Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Key Features</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#1c5bde]" />
                            Built in {property?.yearBuilt}
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#1c5bde]" />
                            {property?.furnishing} furnished
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#1c5bde]" />
                            {property?.facing} facing
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-[#1c5bde]" />
                            Floor {property?.floor} of {property?.totalFloors}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Property Description</h3>
                        <p className="text-gray-600">{property?.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Property Highlights</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Property Age</p>
                            <p className="font-medium">{new Date().getFullYear() - property?.yearBuilt} years</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Available From</p>
                            <p className="font-medium">Immediate</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Pet Policy</p>
                            <p className="font-medium">{property?.petPolicy}</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Maintenance</p>
                            <p className="font-medium">{property?.maintenance}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Additional Costs</h3>
                        <div className="space-y-2 text-gray-600">
                          <p>Security Deposit: 2 months rent</p>
                          <p>Maintenance: {property?.maintenance}/month</p>
                          <p>Utilities: Not included</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'details' && (
              <div className="space-y-6">
                {/* Move-in Dates */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Move-in Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Move-in Date
                      </label>
                      <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Move-out Date
                      </label>
                      <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Property Details */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Basic Information</h3>
                      <div className="space-y-2 text-gray-600">
                        <p>Property Type: {property.type}</p>
                        <p>Built Year: {property.yearBuilt}</p>
                        <p>Floor Level: {property.floor}</p>
                        <p>Total Floors: {property.totalFloors}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">Additional Details</h3>
                      <div className="space-y-2 text-gray-600">
                        <p>Furnishing: {property.furnishing}</p>
                        <p>Facing: {property.facing}</p>
                        <p>Pet Policy: {property.petPolicy}</p>
                        <p>Maintenance: {property.maintenance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'amenities' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">What this place offers</h2>
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(amenities).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-medium mb-4 capitalize">{category}</h3>
                      <div className="space-y-4">
                        {items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-[#1c5bde]" />
                            <span className="text-gray-600">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowAllAmenities(true)}
                  className="w-full mt-6 py-2 px-4 border border-[#1c5bde] text-[#1c5bde] rounded-lg hover:bg-[#1c5bde]/5 transition-colors"
                >
                  Show all amenities
                </button>
              </div>
            )}

            {activeSection === 'location' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Location</h2>
                <div className="rounded-lg h-[400px] relative overflow-hidden mb-6">
                  <img
                    src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${property.coordinates[0]},${property.coordinates[1]})/${property.coordinates[0]},${property.coordinates[1]},14,0,0/800x400@2x?access_token=${MAPBOX_ACCESS_TOKEN}`}
                    alt={`Map showing ${property.location}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  {nearbyInfrastructure.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-[#1c5bde]" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.type}</p>
                        </div>
                      </div>
                      <span className="text-gray-600">{item.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'history' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">Price History</h2>
                <div className="h-[300px] mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceHistory}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="#1c5bde" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {priceHistory.map((record, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{record.month}</span>
                      <div className="text-right">
                        <span className="font-medium">₦{(record.price).toLocaleString()}</span>
                        <span className={`ml-2 text-sm ${
                          record.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {record.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Always Visible */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Contact Agent Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#1c5bde]/10 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-[#1c5bde]" />
                  </div>
                  <div>
                    <h3 className="font-bold">Muhammad Tukur</h3>
                    <p className="text-gray-600">Premium Agent</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="w-full bg-[#1c5bde] text-white py-3 rounded-lg mb-3 hover:bg-[#0c0d8a] transition-colors duration-300"
                >
                  Contact Agent
                </button>
                <button className="w-full border border-[#1c5bde] text-[#1c5bde] py-3 rounded-lg hover:bg-[#1c5bde]/10 transition-colors duration-300">
                  Schedule Viewing
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col gap-3">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#1c5bde]">
                    <Share2 className="h-5 w-5" />
                    <span>Share Property</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-[#1c5bde]">
                    <Heart className="h-5 w-5" />
                    <span>Save to Favorites</span>
                  </button>
                </div>
              </div>
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
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Your Email</label>
                <input 
                  type="email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                  rows={4}
                />
              </div>
              <div className="flex space-x-3">
                <button 
                  className="flex-1 bg-[#1c5bde] text-white py-2 rounded-lg hover:bg-[#0c0d8a] transition-colors duration-300"
                >
                  Send Message
                </button>
                <button 
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 border border-[#1c5bde] text-[#1c5bde] py-2 rounded-lg hover:bg-[#1c5bde]/10 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Amenities Modal */}
      {showAllAmenities && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">All Amenities</h3>
              <button
                onClick={() => setShowAllAmenities(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {[
                { title: 'Bathroom', items: ['Bathtub', 'Hair dryer', 'Shampoo'] },
                { title: 'Bedroom', items: ['Hangers', 'Iron', 'Extra pillows'] },
                { title: 'Entertainment', items: ['65" HDTV', 'Netflix', 'Sound system'] },
                { title: 'Heating & Cooling', items: ['Central AC', 'Ceiling fans', 'Heating'] },
                { title: 'Home Safety', items: ['Smoke alarm', 'Fire extinguisher', 'First aid kit'] },
                { title: 'Kitchen', items: ['Full kitchen', 'Dishwasher', 'Coffee maker'] },
                { title: 'Outdoor', items: ['Private patio', 'BBQ grill', 'Garden'] },
                { title: 'Parking', items: ['Free parking', 'EV charger', 'Garage'] },
                { title: 'Services', items: ['Self check-in', 'Long term stays', 'Cleaning'] }
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="font-semibold mb-4">{section.title}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-[#1c5bde]" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EMI Calculator Modal */}
      {showEMIModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Mortgage Calculator</h3>
              <button
                onClick={() => setShowEMIModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₦)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                />
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>Min: ₦10M</span>
                  <span>Max: ₦500M</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  step="0.1"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                />
                <div className="mt-2 flex justify-between text-sm text-gray-600">
                  <span>Current Rate: 8.5%</span>
                  <span>Max: 15%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Term (Years)
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c5bde]/20"
                >
                  {[5, 10, 15, 20, 25, 30].map(year => (
                    <option key={year} value={year}>{year} years</option>
                  ))}
                </select>
              </div>

              {/* EMI Calculation Results */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium mb-4">Monthly Payment Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly EMI</span>
                    <span className="font-semibold">
                      ₦{Math.round(calculateEMI(loanAmount, interestRate, loanTerm)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-semibold text-[#1c5bde]">
                      ₦{Math.round((calculateEMI(loanAmount, interestRate, loanTerm) * loanTerm * 12) - loanAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-semibold">
                      ₦{Math.round(calculateEMI(loanAmount, interestRate, loanTerm) * loanTerm * 12).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowEMIModal(false)}
                  className="flex-1 py-3 px-4 border rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {/* Handle loan application */}}
                  className="flex-1 py-3 px-4 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a]"
                >
                  Apply for Loan
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
