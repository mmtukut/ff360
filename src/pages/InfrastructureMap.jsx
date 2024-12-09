import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { featuredProperties } from '../data/properties';
import { infrastructureData } from '../data/infrastructure';

const InfrastructureMap = () => {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('property');
  const property = propertyId ? featuredProperties.find(p => p.id === parseInt(propertyId)) : null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            to={propertyId ? `/properties/${propertyId}` : '/properties'} 
            className="flex items-center gap-2 text-gray-600 hover:text-[#0e109f]"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Link>
          <h1 className="text-lg font-semibold">Infrastructure Map</h1>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[calc(100vh-64px)]">
        <img
          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${
            property ? 
            `pin-s+ff0000(${property.coordinates[0]},${property.coordinates[1]})` : 
            ''
          }/3.422,6.448,12,0,0/1200x800@2x?access_token=pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ`}
          alt="Infrastructure Map"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default InfrastructureMap; 