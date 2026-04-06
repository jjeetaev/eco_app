import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom colored icons for statuses
const createIcon = (color) => {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const icons = {
  'Здоровое': createIcon('green'),
  'Под угрозой': createIcon('orange'),
  'Спилено': createIcon('red'),
  default: DefaultIcon
};

export default function TreeMap({ trees }) {
  const bishkekCenter = [42.8747, 74.6122];
  
  const placeholderPattern = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23cbd5e1' stroke-width='2' stroke-dasharray='5 5'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%2394a3b8' stroke-width='4'/%3E%3Cpath d='M40 50h20M50 40v20' stroke='%2394a3b8' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E";

  return (
    <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-12 relative z-0">
      <MapContainer 
        center={bishkekCenter} 
        zoom={13} 
        className="h-[500px] w-full rounded-2xl shadow-inner z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trees.map((tree) => {
          if (!tree.lat || !tree.lng) return null;
          
          return (
            <Marker 
              key={tree.id} 
              position={[tree.lat, tree.lng]}
              icon={icons[tree.status] || icons.default}
            >
              <Popup>
                <div className="w-48">
                  <img 
                    src={tree.image || placeholderPattern} 
                    alt={tree.species} 
                    className="w-full h-24 object-cover rounded mb-2 bg-gray-100"
                  />
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">{tree.species}</h3>
                  <span className={`text-xs inline-block mb-2 font-medium px-2 py-0.5 rounded-full border ${
                    tree.status === 'Здоровое' ? 'bg-green-100 text-green-800 border-green-200' :
                    tree.status === 'Под угрозой' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {tree.status}
                  </span>
                  <p className="text-xs text-gray-600 line-clamp-2">{tree.location}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
