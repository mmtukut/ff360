import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building, TrendingUp, Home, BedDouble, Bath, Square, ArrowRight, X, Filter, ChevronDown, Currency, Heart, Home as HomeIcon, Building2, Trees, Castle, Building as BuildingIcon, Warehouse, Hotel, PalmTree, Landmark, Factory, Apple, PlayCircle, Star, Download, Smartphone, Plus, Minus, Map, Layers, Eye, CheckCircle, Bell, Share2, Quote, Users, CalendarCheck, Shield } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { featuredProperties } from '../data/properties';
import { infrastructureData } from '../data/infrastructure';
import residentialImg from '../assets/images/propertyTypes/residential.png'
import commercialImg from '../assets/images/propertyTypes/commercial.png'
import landImg from '../assets/images/propertyTypes/land.png'
import luxuryImg from '../assets/images/propertyTypes/luxury.png'
import industrialImg from '../assets/images/propertyTypes/industrial.png'
import hotelsImg from '../assets/images/propertyTypes/hotels.png'
import institutionalImg from '../assets/images/propertyTypes/institutional.png'
import mixedUseImg from '../assets/images/propertyTypes/mixed-use.png'
import appInterface from '../assets/images/propertyTypes/app-mockup.png'
import SearchInterface from './SearchInterface';
import MapView from '../components/MapView';


// Add the appFeatures array
const appFeatures = [
  {
    title: "Easy to Use",
    description: "Intuitive interface for seamless experience",
    icon: <Smartphone className="h-5 w-5 text-[#1c5bde]" />
  },
  {
    title: "Real-time Updates",
    description: "Get instant notifications for new properties",
    icon: <Bell className="h-5 w-5 text-[#1c5bde]" />
  },
  {
    title: "Save Favorites",
    description: "Bookmark properties for later viewing",
    icon: <Heart className="h-5 w-5 text-[#1c5bde]" />
  },
  {
    title: "Virtual Tours",
    description: "View properties in 360° from anywhere",
    icon: <Eye className="h-5 w-5 text-[#1c5bde]" />
  }
];

// Add the testimonials array
const testimonials = [
  {
    name: "John Smith",
    role: "Property Buyer",
    comment: "FastFind made my property search incredibly easy. The 360° tours saved me so much time!",
    image: "/path/to/image1.jpg" // Optional: Add actual image paths if you have them
  },
  {
    name: "Sarah Johnson",
    role: "Real Estate Agent",
    comment: "The best platform for showcasing properties. My clients love the virtual tours feature.",
    image: "/path/to/image2.jpg"
  },
  {
    name: "Michael Brown",
    role: "Property Investor",
    comment: "The infrastructure insights helped me make informed investment decisions. Highly recommended!",
    image: "/path/to/image3.jpg"
  }
];

// Add the steps array
const steps = [
  {
    title: "Find Your Location",
    description: "Search properties in your preferred location with our smart filters",
    icon: <Search className="w-6 h-6 text-[#1c5bde]" />
  },
  {
    title: "Connect with Agents",
    description: "Browse verified properties and connect with trusted agents directly",
    icon: <Users className="w-6 h-6 text-[#1c5bde]" />
  },
  {
    title: "Visit & Decide",
    description: "Schedule viewings and make your informed property decision",
    icon: <CheckCircle className="w-6 h-6 text-[#1c5bde]" />
  }
];

// Add the whyChooseData array
const whyChooseData = [
  {
    title: "Verified Properties",
    description: "All listings are thoroughly verified for authenticity, ensuring you deal with genuine properties and agents",
    icon: <CheckCircle className="w-6 h-6 text-[#1c5bde]" />
  },
  {
    title: "Location Intelligence",
    description: "Make informed decisions with our detailed location insights and infrastructure analysis",
    icon: <MapPin className="w-6 h-6 text-[#1c5bde]" />
  },
  {
    title: "Direct Agent Contact",
    description: "Connect directly with verified agents for seamless property viewing and negotiations",
    icon: <Users className="w-6 h-6 text-[#1c5bde]" />
  }
];

const propertyTypes = [
  {
    type: 'residential',
    title: 'Residential',
    subtitle: 'Houses & Apartments',
    image: residentialImg,
    icon: <HomeIcon className="w-6 h-6 text-white" />
  },
  {
    type: 'commercial',
    title: 'Commercial',
    subtitle: 'Offices & Shops',
    image: commercialImg,
    icon: <Building2 className="w-6 h-6 text-white" />
  },
  {
    type: 'land',
    title: 'Land',
    subtitle: 'Plots & Farmland',
    image: landImg,
    icon: <Trees className="w-6 h-6 text-white" />
  },
  {
    type: 'luxury',
    title: 'Luxury',
    subtitle: 'Premium Properties',
    image: luxuryImg,
    icon: <Castle className="w-6 h-6 text-white" />
  },
  {
    type: 'industrial',
    title: 'Industrial',
    subtitle: 'Warehouses & Factories',
    image: industrialImg,
    icon: <Factory className="w-6 h-6 text-white" />
  },
  {
    type: 'hospitality',
    title: 'Hotels & Resorts',
    subtitle: 'Hospitality Properties',
    image: hotelsImg,
    icon: <Hotel className="w-6 h-6 text-white" />
  },
  {
    type: 'institutional',
    title: 'Institutional',
    subtitle: 'Schools & Hospitals',
    image: institutionalImg,
    icon: <Landmark className="w-6 h-6 text-white" />
  },
  {
    type: 'mixed-use',
    title: 'Mixed Use',
    subtitle: 'Multi-purpose Properties',
    image: mixedUseImg,
    icon: <BuildingIcon className="w-6 h-6 text-white" />
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('properties'); // 'properties' or 'infrastructure'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeLayer, setActiveLayer] = useState('all');
  const mapContainer = useRef(null);
  const map = useRef(null);
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
  
  // Add this useEffect for map initialization
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Initialize map only when container is available
    mapboxgl.accessToken = 'pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [7.491, 9.082], // Abuja coordinates
      zoom: 12,
      pitch: 45
    });

    map.current.on('load', () => {
      // Add 3D building layer
      map.current.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 12,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-opacity': 0.6
        }
      });

      // Add heatmap layer for infrastructure density
      map.current.addLayer({
        'id': 'infrastructure-heat',
        'type': 'heatmap',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': infrastructureData.categories.flatMap(category =>
              category.items.map(item => ({
                'type': 'Feature',
                'properties': {
                  'intensity': item.rating,
                  'category': category.name
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': item.location
                }
              }))
            )
          }
        },
        'paint': {
          'heatmap-weight': ['get', 'intensity'],
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          'heatmap-radius': 30
        }
      });

      // Add interactive markers
      infrastructureData.categories.forEach(category => {
        category.items.forEach(item => {
          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.innerHTML = category.icon;
          el.style.fontSize = '24px';
          el.style.cursor = 'pointer';

          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-4 max-w-sm">
                <h3 class="font-semibold text-lg">${item.name}</h3>
                <p class="text-sm text-gray-600">${item.type}</p>
                <div class="flex items-center mt-2">
                  <span class="text-yellow-500">★</span>
                  <span class="ml-1">${item.rating}</span>
                </div>
                <p class="text-sm mt-2">${item.distance} from center</p>
              </div>
            `);

          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(item.location)
            .setPopup(popup)
            .addTo(map.current);
        });
      });
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());

    // Cleanup function
    return () => {
      map.current?.remove();
    };
  }, []);

  // Add effect for layer visibility
  useEffect(() => {
    if (!map.current) return;

    infrastructureData.categories.forEach(category => {
      const markers = document.querySelectorAll(`.custom-marker[data-category="${category.id}"]`);
      markers.forEach(marker => {
        marker.style.display = (activeLayer === 'all' || activeLayer === category.id) ? 'block' : 'none';
      });
    });
  }, [activeLayer]);

  const handleMapViewClick = () => {
    navigate('/map', { 
      state: { 
        fromHomePage: true 
      } 
    });
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background gradient */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-[#1c5bde]/10 via-[#f8fafc] to-[#ff8533]/5 -z-10"
        />

        {/* Animated background shapes */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1c5bde]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#ff8533]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Enhanced heading with animation */}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Find Your Perfect Property in{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
                  Gombe
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-[#1c5bde]/20 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            {/* Enhanced subtitle */}
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg sm:text-xl text-neutral-600 mb-8"
            >
              Discover properties with comprehensive infrastructure insights and 360° virtual tours
            </motion.p>

            {/* Search Interface */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <SearchInterface onSearch={(query) => console.log(query)} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Toggle View Section */}
      <section className="py-16 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center gap-4 mb-8"
          >
            <button
              onClick={() => setActiveView('properties')}
              className={`px-4 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeView === 'properties'
                  ? 'bg-[#1c5bde] text-white shadow-lg shadow-[#1c5bde]/20 scale-105'
                  : 'bg-white text-[#1c5bde] border border-[#1c5bde] hover:bg-[#1c5bde]/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span className="text-sm sm:text-base">Browse Properties</span>
              </div>
            </button>
            <button
              onClick={handleMapViewClick}
              className={`px-4 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeView === 'infrastructure'
                  ? 'bg-[#1c5bde] text-white shadow-lg shadow-[#1c5bde]/20 scale-105'
                  : 'bg-white text-[#1c5bde] border border-[#1c5bde] hover:bg-[#1c5bde]/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                <span className="text-sm sm:text-base">View Properties Map</span>
              </div>
            </button>
          </motion.div>

          {/* Content Container with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#1c5bde]/10"
          >
            {activeView === 'properties' ? (
              <div className="p-6">
                {/* Enhanced Header with search */}
                <div className="flex justify-between items-center mb-6">
                  <motion.h2 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-2xl font-bold bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent"
                  >
                    Featured Properties
                  </motion.h2>
                </div>

                {/* Properties Grid with View All Button */}
                <div className="space-y-8">
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {featuredProperties.slice(0, 3).map((property) => (
                      <div
                        key={property.id}
                        onClick={() => openModal(property)}
                        className="group relative bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-[#1c5bde]/10 cursor-pointer"
                      >
                        {/* Property Image with Enhanced Overlay */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Enhanced Property Details */}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg text-neutral-800 group-hover:text-[#1c5bde] transition-colors">
                              {property.title}
                            </h3>
                          </div>
                          <p className="text-[#1c5bde] font-bold mb-2">{property.price}</p>
                          <p className="text-neutral-600 flex items-center gap-1 mb-3">
                            <MapPin className="h-4 w-4" />
                            {property.location}
                          </p>
                          <div className="flex items-center gap-4 text-neutral-600 text-sm">
                            {property.beds && (
                              <div className="flex items-center gap-1 bg-[#f8fafc] px-2 py-1 rounded-md">
                                <BedDouble className="h-4 w-4 text-[#1c5bde]" />
                                <span>{property.beds} Beds</span>
                              </div>
                            )}
                            {property.baths && (
                              <div className="flex items-center gap-1 bg-[#f8fafc] px-2 py-1 rounded-md">
                                <Bath className="h-4 w-4 text-[#1c5bde]" />
                                <span>{property.baths} Baths</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 bg-[#f8fafc] px-2 py-1 rounded-md">
                              <Square className="h-4 w-4 text-[#1c5bde]" />
                              <span>{property.area}</span>
                            </div>
                          </div>
                        </div>

                        {/* New: Quick Actions */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#1c5bde] hover:text-white transition-colors">
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#1c5bde] hover:text-white transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Enhanced View All Properties Button */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center"
                  >
                    <Link
                      to="/properties"
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-[#1c5bde] text-white rounded-lg hover:bg-[#1c5bde]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#1c5bde]/20 active:scale-95"
                    >
                      <span>View All Properties</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            ) : (
              // Infrastructure Map View with enhanced styling
              <div className="w-full p-6">
                <Card className="h-full">
                  <CardHeader className="p-4 border-b border-[#1c5bde]/10">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-2 text-[#1c5bde]">
                        <Map size={20} />
                        Infrastructure Map
                      </CardTitle>
                      <motion.div 
                        className="flex gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {/* Enhanced Layer Controls */}
                        <button
                          onClick={() => setActiveLayer('all')}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                            activeLayer === 'all'
                              ? 'bg-[#1c5bde] text-white shadow-sm'
                              : 'bg-[#f8fafc] text-neutral-600 hover:bg-[#1c5bde]/10 hover:text-[#1c5bde]'
                          }`}
                        >
                          All Layers
                        </button>
                        <button
                          className="p-2 rounded-md hover:bg-[#f8fafc] transition-colors text-[#1c5bde]"
                          title="Toggle fullscreen"
                        >
                          <Layers size={18} />
                        </button>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 relative h-[calc(100%-70px)]">
                    {/* Map container with enhanced styling */}
                    <div 
                      ref={mapContainer} 
                      className="h-[600px] w-full rounded-b-xl overflow-hidden bg-[#f8fafc]"
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Property Details Modal */}
      {isModalOpen && selectedProperty && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="min-h-screen px-4 py-12 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              ref={modalRef}
              className="relative bg-white rounded-2xl shadow-xl w-[700px] max-w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm p-4 border-b border-[#1c5bde]/10 flex justify-between items-center rounded-t-2xl">
                <h3 id="modal-title" className="font-semibold text-lg text-neutral-800">
                  Property Details
                </h3>
                <button
                  onClick={closeModal}
                  className="h-8 w-8 bg-[#f8fafc] hover:bg-[#1c5bde]/10 flex justify-center items-center rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-neutral-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4">
                {/* Property Image Gallery */}
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#1c5bde] hover:text-white transition-colors shadow-sm">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-[#1c5bde] hover:text-white transition-colors shadow-sm">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-2 text-neutral-800">{selectedProperty.title}</h2>
                <p className="text-[#1c5bde] text-xl font-bold mb-4">{selectedProperty.price}</p>
                
                {/* Property Features */}
                <div className="flex items-center gap-6 mb-6">
                  {selectedProperty.beds && (
                    <div className="flex items-center gap-2 text-neutral-700">
                      <div className="p-2 bg-[#1c5bde]/5 rounded-lg">
                        <BedDouble className="h-5 w-5 text-[#1c5bde]" />
                      </div>
                      <span>{selectedProperty.beds} Bedrooms</span>
                    </div>
                  )}
                  {selectedProperty.baths && (
                    <div className="flex items-center gap-2 text-neutral-700">
                      <div className="p-2 bg-[#1c5bde]/5 rounded-lg">
                        <Bath className="h-5 w-5 text-[#1c5bde]" />
                      </div>
                      <span>{selectedProperty.baths} Bathrooms</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-neutral-700">
                    <div className="p-2 bg-[#1c5bde]/5 rounded-lg">
                      <Square className="h-5 w-5 text-[#1c5bde]" />
                    </div>
                    <span>{selectedProperty.area}</span>
                  </div>
                </div>

                {/* Location Section */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-neutral-800">Location</h3>
                  <p className="flex items-center gap-2 text-neutral-600 mb-4">
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
                        className="bg-white/90 hover:bg-white text-[#1c5bde] px-3 py-1.5 rounded-lg text-sm font-medium backdrop-blur-sm transition-colors shadow-sm flex items-center gap-1.5"
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
                    <h3 className="font-semibold mb-2 text-neutral-800">Description</h3>
                    <p className="text-neutral-600">{selectedProperty.description}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleViewProperty(selectedProperty.id)}
                    className="flex-1 bg-[#1c5bde] hover:bg-[#1c5bde]/90 text-white py-2 rounded-lg text-center font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#1c5bde]/20 active:scale-95"
                  >
                    View Property
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-[#f8fafc] hover:bg-[#1c5bde]/5 text-neutral-700 py-2 rounded-lg text-center font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Why Choose FastFind - Enhanced Section */}
      <section className="py-24 bg-gradient-to-br from-[#1c5bde]/5 via-white to-[#ff8533]/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-[#1c5bde] font-medium text-sm tracking-wider uppercase mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
              The Smarter Way to Find Properties
            </h2>
            <p className="text-neutral-600 text-lg">
              Experience a revolutionary approach to property search with features designed for the modern house hunter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "AI-Powered Search",
                description: "Our intelligent search understands your preferences and shows you properties that truly match your needs",
                color: "from-blue-500/20 to-blue-600/20"
              },
              {
                icon: Map,
                title: "Infrastructure Analysis",
                description: "Get detailed insights about nearby facilities, transportation, and amenities for informed decisions",
                color: "from-orange-500/20 to-orange-600/20"
              },
              {
                icon: Shield,
                title: "Verified Listings",
                description: "Every property is verified by our team to ensure you get accurate and reliable information",
                color: "from-green-500/20 to-green-600/20"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative z-10 h-full bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[#1c5bde]/10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-[#1c5bde]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1c5bde]/5 to-transparent rounded-2xl transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-[#1c5bde] font-medium text-sm tracking-wider uppercase mb-4 block">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
              Find Your Property in 3 Steps
            </h2>
            <p className="text-neutral-600 text-lg">
              We've simplified the property search process to help you find your dream property faster
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#1c5bde]/20 via-[#1c5bde] to-[#1c5bde]/20 transform -translate-y-1/2" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
              {[
                {
                  number: "01",
                  title: "Search & Filter",
                  description: "Use our AI-powered search to find properties matching your criteria",
                  icon: Search
                },
                {
                  number: "02",
                  title: "Explore Details",
                  description: "View comprehensive property information, virtual tours, and infrastructure analysis",
                  icon: Eye
                },
                {
                  number: "03",
                  title: "Contact & Visit",
                  description: "Schedule viewings and connect with verified property owners",
                  icon: CalendarCheck
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[#1c5bde]/10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#1c5bde] flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                        {step.number}
                      </div>
                      <step.icon className="w-6 h-6 text-[#1c5bde]" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Property Type Section */}
      <section className="py-16 bg-gradient-to-br from-[#1c5bde]/5 via-white to-[#ff8533]/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
              Browse by Property Type
            </h2>
            <p className="text-neutral-600 text-lg">
              Explore properties across different categories
            </p>
          </motion.div>

          {/* Property type grid with enhanced styling */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {propertyTypes.map((type, index) => (
              <div key={type.type} className="relative group cursor-pointer">
                <div className="relative h-[200px] rounded-xl overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-[#1c5bde]/80 transition-colors duration-300" />
                  <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center gap-4">
                    <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      {React.cloneElement(type.icon, { className: "w-8 h-8 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{type.title}</h3>
                      <p className="text-white/90 text-sm">{type.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Areas Section */}
      <section className="py-12 bg-gradient-to-br from-[#1c5bde]/5 via-white to-[#ff8533]/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-4xl mx-auto text-center mb-8"
          >
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
              Explore Popular Areas
            </h2>
            <p className="text-neutral-600">
              Discover properties in Gombe's most sought-after locations
            </p>
          </motion.div>

        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-gradient-to-br from-[#f8fafc] via-white to-[#1c5bde]/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Content */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
                Take FastFind With You
              </h2>
              <p className="text-neutral-600 text-lg mb-8">
                Download our mobile app to search for properties on the go and receive instant notifications
              </p>

              {/* App Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {appFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#1c5bde]/10 hover:border-[#1c5bde]/20 hover:shadow-sm transition-all"
                  >
                    <div className="bg-[#1c5bde]/5 p-2 rounded-lg">
                      {React.cloneElement(feature.icon, { className: "w-5 h-5 text-[#1c5bde]" })}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-neutral-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-black/90 transition-all">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-black/90 transition-all">
                  <PlayCircle className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* App Interface Image */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex-1 relative"
            >
              <div className="relative w-full max-w-[400px] mx-auto">
                <img
                  src={appInterface}
                  alt="FastFind Mobile App Interface"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#1c5bde]/10 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#ff8533]/10 rounded-full blur-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  </div>
  );
};

export default HomePage;
