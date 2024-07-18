import React, { useMemo, useRef, useState } from 'react';
import { MapContainer, Marker, useMap, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './InputMap.css';
import pin from '../../assets/location-icon-png-27.png';
import axios from 'axios';

const customIcon = new L.Icon({
  iconUrl: pin,
  iconSize: [32, 52], 
  iconAnchor: [16, 52], 
  popupAnchor: [0, -52] 
});

function LocationMarker({ position, setPosition, flyToSearchResult }) {
  const map = useMap();
  
  // Fly to the new position only if flyToSearchResult is true
  if (flyToSearchResult && position) {
    map.flyTo(position, map.getZoom());
  }

  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        setPosition(marker.getLatLng());
      }
    }
  };

  return position === null ? null : (
    <Marker
      eventHandlers={eventHandlers}
      ref={markerRef}
      draggable={false}
      position={position}
      icon={customIcon}
    >
      <Popup>{position.lat}, {position.lng}</Popup>
    </Marker>
  );
};

const InputMap = ({ onLocationChange }) => {
  const badr = {
    lat: 30.1392,
    lng: 31.7317,
  };

  const markerRef = useRef();
  const [position, setPosition] = useState(badr);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [flyToSearchResult, setFlyToSearchResult] = useState(false); // State to control flying to search result
  const [pinLock, setPinLock] = useState(false); // State to control flying to search result

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        format: 'json',
        q: searchQuery,
        'accept-language': 'ar', // Set the desired language to Arabicو
        countrycodes: 'EG', // تحديد النتائج داخل مصر فقط

      }
    });
    setSearchResults(res.data);
  };

  function handleResultClick (lat, lon){
    const newPosition = { lat: parseFloat(lat), lng: parseFloat(lon) };
    setPosition(newPosition);
    onLocationChange(newPosition);
    setFlyToSearchResult(true); // Set to true to fly to search result
    setSearchResults([]);
  };

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          onLocationChange(marker.getLatLng());
          setFlyToSearchResult(false); // Reset to false when defining location via map drag
        }
      },
    }),
    []
  );

  function MapClickHandler(){
    useMapEvents({
      click(e) {
        if(!pinLock){
          setPosition(e.latlng);
          onLocationChange(e.latlng);
          setFlyToSearchResult(false); // Reset to false when defining location via map click
        } else {
          console.log("you locked the pin!");
        }
      },
    });
    return null;
  };

  function handleFindePin () {
    onLocationChange(position);
    setFlyToSearchResult(true); // Set to true to fly to search result
  }

  return (
    <div className="map-container">
      <div className="map-search">
        <button onClick={handleFindePin}>
          {/* <i className="fa-solid fa-magnifying-glass-location"></i> */}
          <i className="fa-solid fa-location-crosshairs"></i>
        </button>
        <button onClick={() => setPinLock(prev => !prev)}>
          {
            pinLock ? 
            <i className="fa-solid fa-location-pin-lock"></i>
            :
            <i className="fa-solid fa-location-dot"></i>
          }
        </button>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن عنوان"
          />
          <button type="submit">Search</button>
        </form>
        <ul>
          {searchResults.map((result) => (
            <li key={result.place_id} onClick={() => handleResultClick(result.lat, result.lon)}>
              {result.display_name}
            </li>
          ))}
        </ul>
      </div>
      <MapContainer center={badr} zoom={13}>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        <Marker
          eventHandlers={eventHandlers}
          ref={markerRef}
          draggable={true}
          position={position}
          icon={customIcon}
        >
          <Popup>{position.lat},{position.lng}</Popup>
        </Marker>
        <LocationMarker position={position} setPosition={setPosition} flyToSearchResult={flyToSearchResult}/>
      </MapContainer>
    </div>
  );
};

export default InputMap;
