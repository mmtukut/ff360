import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, X, ChevronLeft, ChevronRight, 
  Heart, Share2, Star, Info, 
  MapPin, Building, DollarSign, TrendingUp, 
  Search, SlidersHorizontal, Home, Building2, Briefcase, Crown, Factory, BedDouble, Map, Bath, Square, ArrowLeft 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Supercluster from 'supercluster';
import SearchInterface from './SearchInterface';

const propertyTypes = [
  { id: 'all', label: 'All', icon: Building },
  { id: 'homes', label: 'Homes', icon: Home },
  { id: 'apts', label: 'Apts', icon: Building2 },
  { id: 'office', label: 'Office', icon: Briefcase },
  { id: 'luxury', label: 'Luxury', icon: Crown },
  { id: 'industrial', label: 'Industrial', icon: Factory },
  { id: 'hotels', label: 'Hotels', icon: BedDouble },
  { id: 'land', label: 'Land', icon: Map },
];

const priceRanges = [
  { id: 'any', label: 'Any Price' },
  { id: '0-50m', label: '₦0 - ₦50M' },
  { id: '50m-100m', label: '₦50M - ₦100M' },
  { id: '100m-200m', label: '₦100M - ₦200M' },
  { id: '200m+', label: '₦200M+' }
];

const bedroomOptions = [
  { id: 'any', label: 'Any' },
  { id: '1', label: '1' },
  { id: '2', label: '2' },
  { id: '3', label: '3' },
  { id: '4', label: '4+' }
];

const MapView = ({ properties = [], onClose, filters }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapStyle, setMapStyle] = useState('streets-v12');
  const [showLayerOptions, setShowLayerOptions] = useState(false);
  const [activeCluster, setActiveCluster] = useState(null);
  const [heatmapVisible, setHeatmapVisible] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'full-map', 'full-list'
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('any');
  const [selectedBedrooms, setSelectedBedrooms] = useState('any');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const navigate = useNavigate();
  const [supercluster, setSupercluster] = useState(null);

  useEffect(() => {
    if (!mapContainer.current || !properties?.length) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ';
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [7.491, 9.082],
      zoom: 12,
      pitch: 45,
      bearing: -17.6
    });

    // Initialize Supercluster
    const cluster = new Supercluster({
      radius: 40,
      maxZoom: 16,
      minPoints: 2 // Minimum points to form a cluster
    });

    // Format properties for clustering
    const points = properties.map(property => ({
      type: 'Feature',
      properties: {
        ...property,
        priceNum: parseInt(property.price.replace(/[₦,]/g, '')) / 1000000
      },
      geometry: {
        type: 'Point',
        coordinates: property.coordinates
      }
    }));

    cluster.load(points);
    setSupercluster(cluster);

    map.current.on('load', () => {
      // Update clusters on map move
      const updateClusters = () => {
        // Helper functions inside updateClusters where cluster is available
        const calculateClusterTrend = (clusterProperties) => {
          if (!cluster || !clusterProperties) return 0;

          if (clusterProperties.cluster_id) {
            try {
              const leaves = cluster.getLeaves(clusterProperties.cluster_id);
              const growthValues = leaves
                .map(leaf => leaf.properties.growth)
                .filter(Boolean);
              
              if (!growthValues.length) return 0;
              return growthValues.reduce((sum, val) => sum + val, 0) / growthValues.length;
            } catch (error) {
              console.error('Error calculating cluster trend:', error);
              return 0;
            }
          }
          
          return clusterProperties.growth || 0;
        };

        const getClusterTrend = (clusterProperties) => {
          const trend = calculateClusterTrend(clusterProperties);
          if (trend > 5) return '🔥';
          if (trend > 0) return '📈';
          return '';
        };

        const getClusterSize = (count) => {
          if (count < 5) return 'small';
          if (count < 10) return 'medium';
          return 'large';
        };

        const bounds = map.current.getBounds();
        const zoom = Math.floor(map.current.getZoom());
        
        const clusters = cluster.getClusters(
          [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
          zoom
        );

        // Remove existing markers

        clusters.forEach(clusterPoint => {
          const el = document.createElement('div');

          if (clusterPoint.properties.cluster) {
            // Cluster marker
            const pointCount = clusterPoint.properties.point_count;
            const leaves = cluster.getLeaves(clusterPoint.properties.cluster_id);
            const avgPrice = leaves.reduce((sum, leaf) => {
              const price = parseInt(leaf.properties.price.replace(/[₦,]/g, '')) / 1000000;
              return sum + price;
            }, 0) / pointCount;
            
            el.innerHTML = `
              <div class="cluster-marker-${getClusterSize(pointCount)}">
                <span class="cluster-count">${pointCount}</span>
                <span class="cluster-price">Avg: ₦${avgPrice.toFixed(1)}M</span>
                ${getClusterTrend(clusterPoint.properties)}
              </div>
            `;

            // Add cluster popup
            new mapboxgl.Marker(el)
              .setLngLat(clusterPoint.geometry.coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(`
                    <div class="p-4">
                      <h3 class="font-bold text-lg mb-2">${pointCount} Properties</h3>
                      <div class="space-y-2">
                        ${leaves.slice(0, 3).map(point => `
                          <div class="cursor-pointer hover:bg-gray-50 p-2 rounded" 
                               onclick="window.location.href='/properties/${point.properties.id}'">
                            <div class="font-medium">${point.properties.title}</div>
                            <div class="text-sm text-gray-600">₦${point.properties.priceNum}M</div>
                          </div>
                        `).join('')}
                        ${leaves.length > 3 ? `
                          <div class="text-sm text-gray-500 pt-2 border-t">
                            +${leaves.length - 3} more properties
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  `)
              )
              .addTo(map.current);
          } else {
            // Single property marker
            el.innerHTML = `
              <div class="price-tag-container">
                <div class="price-tag ${getPropertyClass(clusterPoint.properties)}">
                  <div class="price-main">
                    ₦${clusterPoint.properties.priceNum}M
                  </div>
                  <div class="price-details">
                    ${clusterPoint.properties.beds ? `${clusterPoint.properties.beds}bed` : ''} 
                    ${clusterPoint.properties.area ? `· ${clusterPoint.properties.area}` : ''}
                    ${clusterPoint.properties.type === 'luxury' ? '⭐' : ''}
                  </div>
                  ${clusterPoint.properties.investment_score ? `
                    <div class="investment-badge ${getInvestmentScoreClass(clusterPoint.properties.investment_score)}">
                      ${getInvestmentLabel(clusterPoint.properties.investment_score)}
                    </div>
                  ` : ''}
                </div>
              </div>
            `;

            new mapboxgl.Marker(el)
              .setLngLat(clusterPoint.geometry.coordinates)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                  .setHTML(`
                    <div class="p-3 cursor-pointer" onclick="window.location.href='/properties/${clusterPoint.properties.id}'">
                      <img src="${clusterPoint.properties.image}" class="w-full h-32 object-cover rounded-lg mb-2" />
                      <div class="flex items-center justify-between mb-1">
                        <h3 class="font-bold text-gray-900">${clusterPoint.properties.title}</h3>
                        ${clusterPoint.properties.type === 'luxury' ? '<span class="verified-badge">✓ Premium</span>' : ''}
                      </div>
                      <p class="text-sm text-gray-600 mb-2">${clusterPoint.properties.location}</p>
                      ${clusterPoint.properties.description ? `
                        <p class="text-sm text-gray-600 mt-2">${clusterPoint.properties.description}</p>
                      ` : ''}
                      ${clusterPoint.properties.growth ? `
                        <div class="mt-2 flex items-center gap-1 text-green-600 text-sm">
                          <span>📈</span> +${clusterPoint.properties.growth}% growth/year
                        </div>
                      ` : ''}
                    </div>
                  `)
              )
              .addTo(map.current);
          }
        });
      };

      map.current.on('moveend', updateClusters);
      updateClusters();
    });

    // Add 3D building layer
    map.current.on('load', () => {
      map.current.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 14,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ['get', 'height'],
          'fill-extrusion-base': ['get', 'min_height'],
          'fill-extrusion-opacity': 0.6
        }
      });

      // Add property markers with enhanced styling
      properties.forEach(property => {
        const el = document.createElement('div');
        el.className = 'property-marker';
        
        // Format price by removing "₦" and "," and converting to number
        const priceNumber = parseInt(property.price.replace(/[₦,]/g, '')) / 1000000;
        
        el.innerHTML = `
          <div class="price-tag-container">
            <div class="price-tag">
              <div class="price-main">
                ₦${priceNumber}M
              </div>
              <div class="price-details">
                ${property.beds ? `${property.beds}bed` : ''} 
                ${property.area ? `· ${property.area}` : ''}
                ${property.type === 'luxury' ? '⭐' : ''}
              </div>
              ${property.investment_score ? `
                <div class="investment-badge ${getInvestmentScoreClass(property.investment_score)}">
                  ${getInvestmentLabel(property.investment_score)}
                </div>
              ` : ''}
            </div>
          </div>
        `;

        // Helper functions for investment scoring
        function getInvestmentScoreClass(score) {
          if (score >= 8) return 'hot-investment';
          if (score >= 6) return 'good-investment';
          return 'normal-investment';
        }

        function getInvestmentLabel(score) {
          if (score >= 8) return '🔥 Hot Area';
          if (score >= 6) return '📈 Growing';
          return '💡 Potential';
        }

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-3 cursor-pointer property-popup" data-property-id="${property.id}">
              <img src="${property.image}" class="w-full h-32 object-cover rounded-lg mb-2" />
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-bold text-gray-900">${property.title}</h3>
                ${property.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
              </div>
              <p class="text-sm text-gray-600 mb-2">${property.location}</p>
              <div class="flex items-center justify-between">
                <span class="text-xl font-bold">${property.price}</span>
                <div class="flex items-center gap-2">
                  ${property.growth ? `<span class="text-green-600 text-sm">+${property.growth}% /yr</span>` : ''}
                </div>
              </div>
              <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
                ${property.beds ? `
                  <div class="flex items-center gap-1">
                    <BedDouble className="h-4 w-4" />
                    ${property.beds} Beds
                  </div>
                ` : ''}
                ${property.baths ? `
                  <div class="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    ${property.baths} Baths
                  </div>
                ` : ''}
                ${property.area ? `
                  <div class="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    ${property.area}
                  </div>
                ` : ''}
              </div>
            </div>
          `);

        // Add click event listener to popup
        popup.on('open', () => {
          const popupElement = document.querySelector('.property-popup');
          if (popupElement) {
            popupElement.addEventListener('click', () => {
              navigate(`/properties/${property.id}`);
            });
          }
        });

        new mapboxgl.Marker(el)
          .setLngLat(property.coordinates)
          .setPopup(popup)
          .addTo(map.current);
      });
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    return () => map.current.remove();
  }, [properties, navigate]);

  // Helper functions
  const getClusterSize = count => {
    if (count < 5) return 'small';
    if (count < 10) return 'medium';
    return 'large';
  };

  const calculateClusterTrend = (clusterProperties) => {
    // For a cluster, we need to get the leaves (actual properties)
    if (clusterProperties.cluster_id) {
      const leaves = supercluster.getLeaves(clusterProperties.cluster_id);
      const growthValues = leaves
        .map(leaf => leaf.properties.growth)
        .filter(Boolean);
      
      if (!growthValues.length) return 0;
      return growthValues.reduce((sum, val) => sum + val, 0) / growthValues.length;
    }
    
    // For single property
    return clusterProperties.growth || 0;
  };

  const getClusterTrend = (clusterProperties) => {
    const trend = calculateClusterTrend(clusterProperties);
    if (trend > 5) return '🔥';
    if (trend > 0) return '📈';
    return '';
  };

  const getPropertyClass = property => {
    if (property.investment_score >= 8) return 'hot-property';
    if (property.investment_score >= 6) return 'good-property';
    return 'normal-property';
  };

  const getInvestmentBadge = (property) => {
    if (!property.investment_score) return '';
    
    return `
      <div class="investment-badge ${getInvestmentScoreClass(property.investment_score)}">
        ${getInvestmentLabel(property.investment_score)}
      </div>
    `;
  };

  const getInvestmentScoreClass = (score) => {
    if (score >= 8) return 'hot-investment';
    if (score >= 6) return 'good-investment';
    return 'normal-investment';
  };

  const getInvestmentLabel = (score) => {
    if (score >= 8) return '🔥 Hot Area';
    if (score >= 6) return '📈 Growing';
    return '💡 Potential';
  };

  const getClusterPopup = (cluster) => {
    const points = supercluster.getLeaves(cluster.properties.cluster_id, 10);
    
    return new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div class="p-4">
        <h3 class="font-bold text-lg mb-2">${cluster.properties.point_count} Properties</h3>
        <div class="space-y-2">
          ${points.map(point => `
            <div class="cursor-pointer hover:bg-gray-50 p-2 rounded" 
                 onclick="window.location.href='/properties/${point.properties.id}'">
              <div class="font-medium">${point.properties.title}</div>
              <div class="text-sm text-gray-600">₦${point.properties.priceNum}M</div>
            </div>
          `).join('')}
        </div>
      </div>
    `);
  };

  const getSinglePropertyPopup = (property) => {
    return new mapboxgl.Popup({ offset: 25 }).setHTML(`
      <div class="p-3 cursor-pointer property-popup" onclick="window.location.href='/properties/${property.id}'">
        <img src="${property.image}" class="w-full h-32 object-cover rounded-lg mb-2" />
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-bold text-gray-900">${property.title}</h3>
          ${property.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
        </div>
        <p class="text-sm text-gray-600 mb-2">${property.location}</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">₦${property.priceNum}M</span>
          ${property.growth ? `
            <span class="text-green-600 text-sm">+${property.growth}% /yr</span>
          ` : ''}
        </div>
      </div>
    `);
  };

  return (
    <div className="fixed inset-0 bg-white z-40">
      {/* Replace Fixed Search Header with SearchInterface */}
      <div className="bg-white shadow-sm sticky top-[72px] z-10 border-b">
        <div className="container mx-auto">
          <SearchInterface 
            onSearch={({ query, filters }) => {
              // Handle search and filter logic
              // You can add your search handling here
            }}
            initialFilters={filters}
            showTrending={false}
            enhancedView={true}
            variant="compact"
            categories={[
              { id: 'all', label: 'All', icon: Building },
              { id: 'homes', label: 'Homes', icon: Home },
              { id: 'apts', label: 'Apts', icon: Building2 },
              { id: 'office', label: 'Office', icon: Briefcase },
              { id: 'luxury', label: 'Luxury', icon: Crown },
              { id: 'industrial', label: 'Industrial', icon: Factory },
              { id: 'hotels', label: 'Hotels', icon: BedDouble },
              { id: 'land', label: 'Land', icon: Map },
            ]}
            activeCategory={activeFilter}
            onCategoryChange={setActiveFilter}
          />
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[calc(100vh-72px)] mt-[72px]">
        <div ref={mapContainer} className="h-full" />
      </div>

      {/* Back to List Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-black text-white 
                 px-8 py-3 rounded-full text-sm font-medium flex items-center gap-2 
                 hover:bg-gray-900 transition-colors shadow-lg"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to List
      </button>

      {/* Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50"
          >
            <div className="h-full flex flex-col">
              {/* Filter Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Price Range */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Price Range</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {priceRanges.map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setSelectedPrice(range.id)}
                        className={`px-4 py-2 rounded-lg border text-sm
                          ${selectedPrice === range.id 
                            ? 'border-[#1c5bde] bg-[#1c5bde]/5 text-[#1c5bde]' 
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Bedrooms</h3>
                  <div className="flex flex-wrap gap-3">
                    {bedroomOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSelectedBedrooms(option.id)}
                        className={`px-4 py-2 rounded-lg border text-sm
                          ${selectedBedrooms === option.id 
                            ? 'border-[#1c5bde] bg-[#1c5bde]/5 text-[#1c5bde]' 
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Amenities</h3>
                  <div className="space-y-3">
                    {['Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden'].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAmenities([...selectedAmenities, amenity]);
                            } else {
                              setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                            }
                          }}
                          className="w-5 h-5 rounded border-gray-300 text-[#1c5bde] focus:ring-[#1c5bde]"
                        />
                        <span className="text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Filters Button */}
              <div className="p-4 border-t">
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-[#1c5bde] text-white py-3 rounded-lg hover:bg-[#0c0d8a] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView; 

