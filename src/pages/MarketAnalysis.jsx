import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, 
  Pie, Cell, Area, AreaChart, CartesianGrid, Legend 
} from 'recharts';
import { 
  TrendingUp, Map, BarChart, PieChart, DollarSign, 
  Users, Building, BookOpen, Newspaper, Calculator,
  ChevronDown, Filter, Download, Share2, User
} from 'lucide-react';
import AbujaMap from '../components/AbujaMap';

const MarketAnalysis = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeRange, setTimeRange] = useState('1y');
  const [propertyType, setPropertyType] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Nigeria-specific regions in Abuja
  const abujaRegions = [
    'Asokoro',
    'Maitama',
    'Wuse',
    'Garki',
    'Gwarinpa',
    'Jabi',
    'Utako',
    'Life Camp',
    'Katampe',
    'Kubwa'
  ];

  // Enhanced price trends data for Abuja
  const priceTrendsData = [
    { month: 'Jan 2024', price: 75000000, sales: 150, demand: 85 },
    { month: 'Feb 2024', price: 78000000, sales: 165, demand: 88 },
    { month: 'Mar 2024', price: 80000000, sales: 180, demand: 92 },
    { month: 'Apr 2024', price: 82000000, sales: 175, demand: 90 },
    { month: 'May 2024', price: 85000000, sales: 190, demand: 95 },
    { month: 'Jun 2024', price: 87000000, sales: 200, demand: 98 }
  ];

  // Property type distribution in Abuja
  const propertyTypeData = [
    { type: 'Residential', value: 45, color: '#0e109f' },
    { type: 'Commercial', value: 25, color: '#4f46e5' },
    { type: 'Land', value: 20, color: '#818cf8' },
    { type: 'Mixed Use', value: 10, color: '#c7d2fe' }
  ];

  // Enhanced market metrics
  const marketMetrics = {
    averagePrice: '₦85M',
    priceChange: '+5.2%',
    totalListings: '1,234',
    listingChange: '+3.8%',
    averageDays: '45',
    daysChange: '-2.1%'
  };

  const expertsData = [
    {
      name: "Chinedu Okeke",
      role: "Real Estate Analyst",
      image: "/images/experts/chinedu.jpg", // Add actual image path if available
      quote: "The Abuja market is showing resilience with a steady increase in demand for residential properties, particularly in the suburbs."
    },
    {
      name: "Ngozi Nwosu",
      role: "Property Economist",
      image: "/images/experts/ngozi.jpg", // Add actual image path if available
      quote: "With stable interest rates, the market is favorable for both buyers and investors looking to capitalize on growth opportunities."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Enhanced Hero Section with Interactive Elements */}
      <div className="bg-gradient-to-r from-[#0e109f]/5 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Abuja Real Estate Market Analysis
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Comprehensive insights into Nigeria's capital city real estate market
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <Filter className="h-5 w-5" />
                  Filters
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                  <Download className="h-5 w-5" />
                  Export Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Average Price</p>
                  <p className="text-2xl font-bold text-[#0e109f]">{marketMetrics.averagePrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-[#0e109f]">{marketMetrics.totalListings}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]"
                  >
                    <option value="all">All Regions</option>
                    {abujaRegions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]"
                  >
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select 
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-50m">₦0 - ₦50M</option>
                    <option value="50m-100m">₦50M - ₦100M</option>
                    <option value="100m-plus">₦100M+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Period
                  </label>
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e109f]"
                  >
                    <option value="1m">Last Month</option>
                    <option value="3m">Last 3 Months</option>
                    <option value="6m">Last 6 Months</option>
                    <option value="1y">Last Year</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Market Overview with Enhanced Visualizations */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#0e109f]/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-[#0e109f]" />
            </div>
            <h2 className="text-2xl font-semibold">Market Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Average Price</h3>
              <p className="text-3xl font-bold text-[#0e109f]">{marketMetrics.averagePrice}</p>
              <p className="text-green-600 text-sm">{marketMetrics.priceChange} from last month</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Properties Sold</h3>
              <p className="text-3xl font-bold text-[#0e109f]">{marketMetrics.totalListings}</p>
              <p className="text-green-600 text-sm">{marketMetrics.listingChange} from last month</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Days on Market</h3>
              <p className="text-3xl font-bold text-[#0e109f]">{marketMetrics.averageDays}</p>
              <p className="text-red-600 text-sm">{marketMetrics.daysChange} from last month</p>
            </div>
          </div>
        </section>

        {/* Interactive Price Trends */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#0e109f]/10 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-[#0e109f]" />
              </div>
              <h2 className="text-2xl font-semibold">Price Trends</h2>
            </div>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceTrendsData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0e109f" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0e109f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#0e109f" fillOpacity={1} fill="url(#colorPrice)" />
                <Area type="monotone" dataKey="demand" stroke="#4f46e5" fillOpacity={0.3} fill="#4f46e5" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Regional Analysis Specific to Abuja */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#0e109f]/10 p-3 rounded-lg">
              <Map className="h-6 w-6 text-[#0e109f]" />
            </div>
            <h2 className="text-2xl font-semibold">Regional Analysis</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <AbujaMap />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Regions in Abuja</h3>
              <ul className="space-y-2">
                {abujaRegions.map(region => (
                  <li key={region} className="flex items-center gap-2">
                    <ChevronDown className="h-4 w-4 text-[#0e109f]" />
                    <span>{region}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Economic Indicators and Property Market Insights */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#0e109f]/10 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-[#0e109f]" />
            </div>
            <h2 className="text-2xl font-semibold">Economic Indicators</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Interest Rates</h3>
              <p className="text-3xl font-bold text-[#0e109f]">13.5%</p>
              <p className="text-gray-600">Stable interest rates supporting market growth</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Inflation Rate</h3>
              <p className="text-3xl font-bold text-[#0e109f]">11.1%</p>
              <p className="text-gray-600">Moderate inflation impacting purchasing power</p>
            </div>
          </div>
        </section>

        {/* Expert Opinions from Nigerian Real Estate Professionals */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#0e109f]/10 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-[#0e109f]" />
            </div>
            <h2 className="text-2xl font-semibold">Expert Opinions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertsData.map((expert) => (
              <div 
                key={expert.name}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[#0e109f]/10 flex items-center justify-center">
                      {expert.image ? (
                        <>
                          <img 
                            src={expert.image}
                            alt={expert.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="absolute inset-0 hidden items-center justify-center"
                            style={{ backgroundColor: 'rgba(14, 16, 159, 0.1)' }}
                          >
                            <User className="w-8 h-8 text-[#0e109f]" />
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-[#0e109f]" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{expert.name}</h3>
                    <p className="text-sm text-gray-600">{expert.role}</p>
                  </div>
                </div>
                <div className="pl-20">
                  <p className="text-gray-600 italic">
                    "{expert.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* News and Updates Specific to Nigeria */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#0e109f]/10 p-3 rounded-lg">
              <Newspaper className="h-6 w-6 text-[#0e109f]" />
            </div>
            <h2 className="text-2xl font-semibold">News and Updates</h2>
          </div>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">New Housing Policy Announced</h3>
              <p className="text-gray-600 mb-2">
                The Nigerian government has announced new initiatives to support first-time homebuyers in Abuja.
              </p>
              <p className="text-sm text-gray-400">2 hours ago</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold mb-2">Market Growth Continues</h3>
              <p className="text-gray-600 mb-2">
                The Abuja real estate market shows resilience with continued price appreciation and demand.
              </p>
              <p className="text-sm text-gray-400">1 day ago</p>
            </div>
            <div className="pb-4">
              <h3 className="font-semibold mb-2">New Development Projects</h3>
              <p className="text-gray-600 mb-2">
                Major development projects have been announced in growing suburban areas of Abuja.
              </p>
              <p className="text-sm text-gray-400">2 days ago</p>
            </div>
          </div>
        </section>

        {/* Tools and Calculators */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#0e109f]/10 p-3 rounded-lg">
              <Calculator className="h-6 w-6 text-[#0e109f]" />
            </div>
            <h2 className="text-2xl font-semibold">Tools and Calculators</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-4">Mortgage Calculator</h3>
              <button className="bg-[#0e109f] text-white px-6 py-2 rounded-lg hover:bg-[#0c0d8a] transition-colors">
                Calculate Now
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-4">Investment ROI Calculator</h3>
              <button className="bg-[#0e109f] text-white px-6 py-2 rounded-lg hover:bg-[#0c0d8a] transition-colors">
                Calculate ROI
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-4">Affordability Calculator</h3>
              <button className="bg-[#0e109f] text-white px-6 py-2 rounded-lg hover:bg-[#0c0d8a] transition-colors">
                Check Affordability
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketAnalysis;