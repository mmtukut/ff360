import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  BarChart2, 
  PieChart,
  FileText,
  Download,
  Filter,
  Calendar,
  Search,
  ChevronDown
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('1y');
  const [propertyType, setPropertyType] = useState('all');

  // Sample data for market trends
  const marketTrendsData = [
    { month: 'Jan', price: 450000, sales: 120, inventory: 850 },
    { month: 'Feb', price: 455000, sales: 115, inventory: 820 },
    { month: 'Mar', price: 460000, sales: 125, inventory: 790 },
    { month: 'Apr', price: 465000, sales: 130, inventory: 760 },
    { month: 'May', price: 470000, sales: 128, inventory: 740 },
    { month: 'Jun', price: 475000, sales: 135, inventory: 720 },
  ];

  // Sample data for property comparison
  const propertyComparisonData = [
    { type: 'Studio', avgPrice: 250000, pricePerSqft: 400, rentYield: 5.2 },
    { type: '1 Bed', avgPrice: 350000, pricePerSqft: 380, rentYield: 4.8 },
    { type: '2 Bed', avgPrice: 450000, pricePerSqft: 360, rentYield: 4.5 },
    { type: '3 Bed', avgPrice: 550000, pricePerSqft: 340, rentYield: 4.2 },
  ];

  // Sample data for investment analysis
  const investmentData = [
    { year: '2024', value: 100000, appreciation: 5.2, rental: 6000 },
    { year: '2025', value: 105200, appreciation: 5.4, rental: 6300 },
    { year: '2026', value: 110880, appreciation: 5.3, rental: 6600 },
    { year: '2027', value: 116756, appreciation: 5.5, rental: 6900 },
    { year: '2028', value: 123177, appreciation: 5.4, rental: 7200 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#333333]">Analytics Dashboard</h1>
          <p className="text-gray-500">Market insights and property analysis</p>
        </div>
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#0066CC]">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Market Trends Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp size={20} />
              Price Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#0066CC" name="Avg. Price" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 size={20} />
              Market Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" fill="#0066CC" name="Sales" />
                <Bar yAxisId="right" dataKey="inventory" fill="#E6F0FF" name="Inventory" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Property Comparison Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart size={20} />
            Property Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price Comparison */}
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={propertyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgPrice" fill="#0066CC" name="Avg. Price" />
              </BarChart>
            </ResponsiveContainer>

            {/* Price per Sqft */}
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={propertyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pricePerSqft" stroke="#0066CC" name="Price/Sqft" />
              </LineChart>
            </ResponsiveContainer>

            {/* Rent Yield */}
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={propertyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="rentYield" fill="#E6F0FF" stroke="#0066CC" name="Rent Yield %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Investment Analysis Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} />
            Investment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={investmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="value" stroke="#0066CC" name="Property Value" />
              <Line yAxisId="right" type="monotone" dataKey="rental" stroke="#003366" name="Rental Income" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Custom Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={20} />
            Custom Report Generator
          </CardTitle>
          <CardDescription>
            Select metrics and parameters to generate a custom analysis report
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select defaultValue="market">
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market Analysis</SelectItem>
                <SelectItem value="investment">Investment Analysis</SelectItem>
                <SelectItem value="comparison">Property Comparison</SelectItem>
                <SelectItem value="forecast">Market Forecast</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="1y">
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="3y">3 Years</SelectItem>
                <SelectItem value="5y">5 Years</SelectItem>
                <SelectItem value="10y">10 Years</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="detailed">
              <SelectTrigger>
                <SelectValue placeholder="Report Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Additional Filters
            </Button>
            <Button className="bg-[#0066CC]">
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
