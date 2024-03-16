'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({ currentLocation }: any) => {
  return (
    <LoadScript googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        zoom={10}
        center={currentLocation}
      >
        {currentLocation && <Marker position={currentLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
