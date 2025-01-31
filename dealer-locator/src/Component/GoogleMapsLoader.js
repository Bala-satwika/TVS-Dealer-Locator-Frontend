import React from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const GoogleMapsLoader = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading Google Maps API: {loadError.message}</div>;
  if (!isLoaded) return <div>Loading Google Maps...</div>;

  // Once the API is loaded, render the children components
  return <>{children}</>;
};

export default GoogleMapsLoader;
