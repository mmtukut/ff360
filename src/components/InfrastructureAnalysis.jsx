import React, { useState } from 'react';
import { Map, BarChart2, Clock, Layers, Info, X, Wallet, TrendingUp, Building2, School, Hospital, Car } from 'lucide-react';
import MapComponent from '../components/MapComponent';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ArrowUp,
  ArrowDown,
  Building,
  MapPin
} from 'recharts';
import PropertyValueImpact from './PropertyValueImpact';

const InfrastructureAnalysis = () => {
  const [activeLayer, setActiveLayer] = useState('all');
  const [selectedArea, setSelectedArea] = useState('downtown');
  const [timeRange, setTimeRange] = useState('1y');
  const [propertyValues, setPropertyValues] = useState([]);
  const [infrastructureScore, setInfrastructureScore] = useState(85);
  
  // Enhanced infrastructure data with more relevant metrics
  const infrastructureData = [
    { name: 'Healthcare', count: 24, density: 8.5, growth: '+12%', investment: '₦2.5B' },
    { name: 'Education', count: 35, density: 12.3, growth: '+8%', investment: '₦1.8B' },
    { name: 'Transport', count: 18, density: 6.2, growth: '+15%', investment: '₦3.2B' },
    { name: 'Utilities', count: 42, density: 14.8, growth: '+5%', investment: '₦2.1B' },
  ];

  // Sample timeline data
  const timelineData = [
    { project: 'New Metro Station', status: 'In Progress', completion: '2025' },
    { project: 'Hospital Expansion', status: 'Planning', completion: '2026' },
    { project: 'School District Update', status: 'Completed', completion: '2024' },
  ];

  // Sample data for the chart
  const propertyValueData = [
    { month: 'Jan', value: 250000 },
    { month: 'Feb', value: 255000 },
    { month: 'Mar', value: 258000 },
    { month: 'Apr', value: 262000 },
    { month: 'May', value: 270000 },
    { month: 'Jun', value: 275000 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white p-2 sm:p-4 md:p-6">
      {/* Infrastructure Indicators Section */}
      <div className="container mx-auto mb-4 md:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 px-2">
          Infrastructure Overview
        </h2>
        
        {/* Cards Container - Mobile First Design */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 px-2">
          {/* Healthcare Card */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Icon Container - Fixed size for consistency */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#0e109f]/10 rounded-full flex items-center justify-center">
                  <Hospital className="text-[#0e109f] h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                
                {/* Content Container */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base truncate">
                    Healthcare
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-bold text-[#0e109f]">92%</p>
                    <span className="text-xs sm:text-sm text-green-500 font-medium">↑ 4%</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    24 facilities nearby
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education Card */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <School className="text-green-600 h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base truncate">
                    Education
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">88%</p>
                    <span className="text-xs sm:text-sm text-green-500 font-medium">↑ 6%</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    35 institutions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transport Card */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Car className="text-orange-600 h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base truncate">
                    Transport
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600">85%</p>
                    <span className="text-xs sm:text-sm text-green-500 font-medium">↑ 3%</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    18 major routes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Utilities Card */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Building2 className="text-purple-600 h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base truncate">
                    Utilities
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">90%</p>
                    <span className="text-xs sm:text-sm text-green-500 font-medium">↑ 5%</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    42 access points
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Area with Map and Analysis */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel with map */}
        <div className="w-2/3 p-4 border-r border-gray-200">
          <Card className="h-full">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Map size={20} />
                  Infrastructure Map
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={activeLayer} onValueChange={setActiveLayer}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Layer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Infrastructure</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="transport">Transportation</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 relative h-[calc(100%-70px)]">
              
              <CardContent className="p-0 relative h-[calc(100%-70px)]">
              <MapComponent center={[3.421, 6.448]} zoom={12.3} />
              </CardContent>
            </CardContent>
          </Card>
        </div>

        {/* Right panel with analysis */}
        <div className="w-1/3 p-4 overflow-y-auto">
          {/* Infrastructure Statistics */}
          <Card className="mb-4">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2">
                <BarChart2 size={20} />
                Infrastructure Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={infrastructureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0066CC" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Add Property Value Impact Analysis */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} />
                Property Value Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={propertyValues}>
                  {/* Add chart components */}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Add Investment Opportunities */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet size={20} />
                Investment Hotspots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Add investment opportunity cards */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium">New Metro Development Zone</h4>
                  <p className="text-sm text-gray-600">Expected value appreciation: +25%</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 rounded">High Potential</span>
                    <span className="text-xs px-2 py-1 bg-green-100 rounded">Growing Area</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Development Timeline */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2">
                <Clock size={20} />
                Development Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineData.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-[#0066CC]" />
                    <div className="flex-1">
                      <h4 className="font-medium text-[#333333]">{item.project}</h4>
                      <p className="text-sm text-gray-500">
                        {item.status} • Completion: {item.completion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add AI Insights Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info size={20} />
                AI Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-blue-600">Market Prediction</h4>
                  <p className="text-sm">Property values expected to rise 15% in next 12 months due to new infrastructure projects.</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium text-green-600">Investment Recommendation</h4>
                  <p className="text-sm">Consider properties in the northern corridor due to upcoming transport links.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureAnalysis;
