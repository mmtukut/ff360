import React from 'react';
import { View360 } from 'react-360';

const Viewer360 = ({ imageUrl }) => {
  return (
    <View360
      source={{ uri: imageUrl }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Viewer360; 