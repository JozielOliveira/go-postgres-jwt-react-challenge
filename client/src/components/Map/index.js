/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import axios from 'axios';
import { useOnMount } from 'hooks';

const MapContainer = ({ google, defaultLocation, onMoveMarker, style }) => {
  const [location, setLocation] = useState(defaultLocation);
  const api = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
  });

  const findByType = (type, position) => {
    return position.address_components.find(
      (address) => address.types.indexOf(type) !== -1
    );
  };

  const getGetDataByLatLng = async (lat, lng) => {
    const {
      data: { results },
    } = await api.get(
      `/geocode/json?latlng=${lat},${lng}&key=AIzaSyAlNwBzMFyhB3bjDxVnAE-LQ_rGD_b2bHA`
    );

    return {
      postalCode: findByType('postal_code', results[0])?.long_name,
      country: findByType('country', results[0])?.short_name,
      latitude: results[0].geometry.location.lat,
      longitude: results[0].geometry.location.lng,
      street1: findByType('route', results[0])?.long_name,
      neighborhood: findByType('neighborhood', results[0])?.long_name,
      zone: findByType('locality', results[0])?.long_name,
      city: findByType('administrative_area_level_2', results[0])?.long_name,
      region: findByType('"administrative_area_level_1"', results[0])
        ?.long_name,
      addresseeName: results[0].formatted_address,
      poBoxNumber: findByType('street_number', results[0])?.long_name,
    };
  };

  const handleMoveMarker = async (_, { position }) => {
    setLocation({
      lat: position.lat(),
      lng: position.lng(),
    });
    const dataLocation = await getGetDataByLatLng(
      position.lat(),
      position.lng()
    );
    onMoveMarker(dataLocation);
  };

  useOnMount(async () => {
    const dataLocation = await getGetDataByLatLng(
      defaultLocation?.lat,
      defaultLocation?.lng
    );
    onMoveMarker(dataLocation);
  });

  return (
    <Map
      containerStyle={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      style={style}
      google={google}
      zoom={15}
      initialCenter={location}
    >
      <Marker
        title="The marker`s title will appear as a tooltip."
        name="SOMA"
        draggable
        onDragend={handleMoveMarker}
        position={location}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAlNwBzMFyhB3bjDxVnAE-LQ_rGD_b2bHA',
})(MapContainer);
