'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const MapContainer = ({ currentLocation }: any) => {
  const [currentLocation2, setCurrentLocation2] = useState<any>(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation2({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting the current location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    // Funksiyani chaqirish joyi
    getCurrentLocation();
  }, []);

  return (
    <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        zoom={10}
        center={currentLocation ? currentLocation : currentLocation2}
      >
        {currentLocation && (
          <Marker
            position={currentLocation ? currentLocation : currentLocation2}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
