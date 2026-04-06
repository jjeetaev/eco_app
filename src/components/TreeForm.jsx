import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Camera, Send, Calendar } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
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

function LocationSelector({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? <Marker position={position} icon={DefaultIcon} /> : null;
}

export default function TreeForm({ onAddTree }) {
  const [formData, setFormData] = useState({
    species: '',
    status: 'Здоровое',
    location: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    image: null
  });
  
  const [preview, setPreview] = useState(null);
  const [position, setPosition] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.species || !formData.location) return;

    const newTree = {
      id: Date.now(),
      lat: position ? position.lat : null,
      lng: position ? position.lng : null,
      ...formData
    };

    onAddTree(newTree);
    
    setFormData({ 
      species: '', status: 'Здоровое', location: '', 
      date: new Date().toISOString().split('T')[0], notes: '', image: null 
    });
    setPreview(null);
    setPosition(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8"
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-nature-green" />
        Отметить дерево
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Вид дерева *</label>
            <input 
              type="text" 
              placeholder="Например, Дуб или Карагач" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-green"
              value={formData.species}
              onChange={(e) => setFormData({...formData, species: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Состояние</label>
            <select 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-green"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Здоровое">Здоровое</option>
              <option value="Под угрозой">Под угрозой</option>
              <option value="Спилено">Спилено</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Текстовый адрес площадки *</label>
            <input 
              type="text" 
              placeholder="ул. Киевская / Тоголока Молдо" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-green"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> Дата записи
            </label>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-green"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Укажите точные координаты на карте (кликните)</label>
          <div className="w-full rounded-xl border border-gray-200 overflow-hidden relative z-0">
            <MapContainer 
              center={[42.8746, 74.6122]} 
              zoom={12} 
              className="h-[300px] w-full z-0"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationSelector position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Экологическая защита (комментарий)</label>
          <textarea 
            rows="2"
            placeholder="Защищает от пыли, старое дерево..."
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-nature-green"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
          <div className="relative">
            <input 
              type="file" 
              accept="image/*" 
              id="image-upload" 
              className="hidden" 
              onChange={handleImageUpload}
            />
            <label 
              htmlFor="image-upload" 
              className="flex items-center gap-2 cursor-pointer text-nature-green hover:text-nature-darkGreen font-medium px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-100"
            >
              <Camera className="w-5 h-5" />
              {preview ? 'Изменить фото' : 'Прикрепить фото'}
            </label>
            {preview && (
              <div className="mt-2 text-xs text-green-600 flex items-center absolute w-full top-full">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Загружено
              </div>
            )}
          </div>
          <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-nature-green hover:bg-nature-lightGreen text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm">
            Внести в Реестр <Send className="w-4 h-4 ml-1" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
