import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUp, Building, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'; // Adjust this import based on your UI components

// Sample data for the chart
const propertyValueData = [
  { month: 'Jan', value: 250000 },
  { month: 'Feb', value: 255000 },
  { month: 'Mar', value: 258000 },
  { month: 'Apr', value: 262000 },
  { month: 'May', value: 270000 },
  { month: 'Jun', value: 275000 },
];

const PropertyValueImpact = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg md:text-xl flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#0e109f]" />
            Property Value Impact
          </CardTitle>
          <select className="text-sm border rounded-md px-2 py-1 bg-white">
            <option value="6m">Last 6 months</option>
            <option value="1y">Last year</option>
            <option value="2y">Last 2 years</option>
          </select>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Value Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0e109f]/10 rounded-lg p-3">
            <p className="text-sm text-gray-600 mb-1">Average Value</p>
            <p className="text-xl font-bold text-[#0e109f]">₦270,000</p>
            <div className="flex items-center text-green-600 text-sm mt-1">
              <ArrowUp className="h-4 w-4" />
              <span>10.2%</span>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
            <p className="text-xl font-bold text-green-600">15.5%</p>
            <p className="text-xs text-gray-500 mt-1">Year over Year</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3 hidden md:block">
            <p className="text-sm text-gray-600 mb-1">Infrastructure Score</p>
            <p className="text-xl font-bold text-purple-600">8.5/10</p>
            <p className="text-xs text-gray-500 mt-1">Above Average</p>
          </div>
        </div>

        {/* Value Trend Chart */}
        <div className="h-[200px] md:h-[250px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={propertyValueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₦${value/1000}k`}
              />
              <Tooltip 
                formatter={(value) => [`₦${value.toLocaleString()}`, 'Value']}
                labelStyle={{ color: '#666' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0e109f" 
                strokeWidth={2}
                dot={{ fill: '#0e109f' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Impact Factors */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 mb-2">Key Impact Factors</h4>
          
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <Building className="h-5 w-5 text-[#0e109f]" />
            <div className="flex-1">
              <p className="text-sm font-medium">New Metro Station</p>
              <p className="text-xs text-gray-500">Expected +12% value increase</p>
            </div>
            <span className="text-green-600 text-sm font-medium">High Impact</span>
          </div>

          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-[#0e109f]" />
            <div className="flex-1">
              <p className="text-sm font-medium">Shopping Complex Development</p>
              <p className="text-xs text-gray-500">Expected +8% value increase</p>
            </div>
            <span className="text-blue-600 text-sm font-medium">Medium Impact</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyValueImpact;
