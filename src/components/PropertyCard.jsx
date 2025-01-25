import React from 'react';
import { Star, Heart, Bed, Bath, Square, MapPin, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
  const {
    images,
    title,
    type,
    price,
    rating,
    reviews,
    location,
    amenities,
    verificationBadge,
    beds,
    baths,
    area,
    availability,
    furnished,
    propertyCondition
  } = property;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
        {verificationBadge && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#1c5bde] text-white text-xs font-medium">
            Verified
          </div>
        )}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">
          {availability}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#1c5bde] text-[#1c5bde]" />
            <span className="text-sm">{rating}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex gap-4 text-gray-600">
          {beds && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{beds} beds</span>
            </div>
          )}
          {baths && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span className="text-sm">{baths} baths</span>
            </div>
          )}
          {area && (
            <div className="flex items-center gap-1">
              <Square className="w-4 h-4" />
              <span className="text-sm">{area}</span>
            </div>
          )}
        </div>

        {/* Key Features */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {type}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {propertyCondition}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
            {furnished ? 'Furnished' : 'Unfurnished'}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex gap-2 flex-wrap">
          {amenities.slice(0, 3).map((amenity, index) => (
            <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
              <Check className="w-3 h-3 text-green-500" />
              {amenity}
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-gray-100">
          <span className="font-medium text-gray-900">₦{price.toLocaleString()}</span>
          <div className="text-xs text-gray-500">{reviews} reviews</div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard; 