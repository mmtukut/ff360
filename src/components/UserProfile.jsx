import React, { useState } from 'react';
import { 
  Home,
  History,
  Settings,
  CreditCard,
  Bookmark,
  MapPin,
  Calendar,
  ChevronRight,
  Bell,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  // Sample data
  const savedProperties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      address: "123 Main St, Downtown",
      price: "$450,000",
      savedDate: "2024-11-10",
    },
    {
      id: 2,
      title: "Suburban Family Home",
      address: "456 Oak Ave, Suburbs",
      price: "$650,000",
      savedDate: "2024-11-09",
    },
  ];

  const searchHistory = [
    {
      id: 1,
      query: "2-bedroom apartments in downtown",
      date: "2024-11-10",
      filters: "Price: $400k-$600k, Area: Downtown",
    },
    {
      id: 2,
      query: "Houses near Central Park",
      date: "2024-11-09",
      filters: "Price: $600k-$800k, Type: House",
    },
  ];

  const subscriptionDetails = {
    plan: "Professional",
    status: "Active",
    renewalDate: "Dec 15, 2024",
    features: [
      "Advanced Analytics",
      "Unlimited Searches",
      "Premium Reports",
      "API Access",
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#0066CC] flex items-center justify-center text-white text-2xl">
            JD
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#333333]">John Doe</h1>
            <p className="text-gray-500">john.doe@example.com</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Bookmark size={18} />
            Saved Properties
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History size={18} />
            Search History
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings size={18} />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard size={18} />
            Subscription
          </TabsTrigger>
        </TabsList>

        {/* Saved Properties Tab */}
        <TabsContent value="saved">
          <div className="grid gap-4">
            {savedProperties.map((property) => (
              <Card key={property.id}>
                <CardContent className="flex items-center p-4">
                  <div className="w-24 h-24 bg-[#E6F0FF] rounded-lg flex items-center justify-center">
                    <Home size={32} className="text-[#0066CC]" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold">{property.title}</h3>
                    <p className="text-gray-500 flex items-center gap-1">
                      <MapPin size={14} />
                      {property.address}
                    </p>
                    <p className="text-[#0066CC] font-semibold">{property.price}</p>
                  </div>
                  <div className="text-gray-400 text-sm flex items-center gap-1">
                    <Calendar size={14} />
                    Saved on {property.savedDate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Search History Tab */}
        <TabsContent value="history">
          <div className="grid gap-4">
            {searchHistory.map((search) => (
              <Card key={search.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{search.query}</h3>
                    <span className="text-gray-400 text-sm">{search.date}</span>
                  </div>
                  <p className="text-gray-500 mt-2">{search.filters}</p>
                  <Button variant="outline" className="mt-2">
                    Repeat Search
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell size={20} />
                  <div>
                    <h3 className="font-semibold">Notifications</h3>
                    <p className="text-gray-500 text-sm">Receive alerts for new properties</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun size={20} />
                  <div>
                    <h3 className="font-semibold">Dark Mode</h3>
                    <p className="text-gray-500 text-sm">Toggle dark theme</p>
                  </div>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={20} />
                  <div>
                    <h3 className="font-semibold">Language</h3>
                    <p className="text-gray-500 text-sm">Choose your preferred language</p>
                  </div>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan: {subscriptionDetails.plan}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[#E6F0FF] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold">Status: {subscriptionDetails.status}</h3>
                    <p className="text-gray-500">Renewal: {subscriptionDetails.renewalDate}</p>
                  </div>
                  <Button className="bg-[#0066CC]">
                    Upgrade Plan
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Included Features:</h4>
                  {subscriptionDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <ChevronRight size={16} className="text-[#0066CC]" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline">Billing History</Button>
                <Button variant="outline">Payment Methods</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
