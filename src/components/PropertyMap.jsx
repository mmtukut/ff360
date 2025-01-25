import React from 'react';
import { MapPin } from 'lucide-react';

const PropertyMap = ({ coordinates, location }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      <div className="rounded-lg h-[400px] relative overflow-hidden mb-4">
        <img
          src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff0000(${coordinates[0]},${coordinates[1]})/${coordinates[0]},${coordinates[1]},14,0,0/800x400@2x?access_token=pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ`}
          alt={`Map showing ${location}`}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin className="h-5 w-5" />
        <span>{location}</span>
      </div>
    </div>
  );
};

export default PropertyMap; 