import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { speciesInfo } from '../data/trees';

export default function TreeFeed({ trees }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Здоровое': return 'bg-green-100 text-green-800 border-green-200';
      case 'Под угрозой': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Спилено': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEcoValue = (species) => {
    const key = Object.keys(speciesInfo).find(k => species.toLowerCase().includes(k.toLowerCase()));
    return key ? speciesInfo[key] : null;
  };

  const shareTree = (e, tree) => {
    e.stopPropagation();
    const text = `Я нашел и защищаю ${tree.species} по адресу ${tree.location}. Присоединяйся к Зеленому Дозору Бишкека!`;
    
    if (navigator.share) {
      navigator.share({ title: 'Eco-System Бишкек', text })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert("Текст скопирован в буфер обмена!");
    }
  };

  const placeholderPattern = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e2e8f0'/%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23cbd5e1' stroke-width='2' stroke-dasharray='5 5'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%2394a3b8' stroke-width='4'/%3E%3Cpath d='M40 50h20M50 40v20' stroke='%2394a3b8' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E";

  return (
    <div className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {trees.map((tree, idx) => {
            const ecoValue = getEcoValue(tree.species);
            
            return (
              <motion.div
                key={tree.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 flex flex-col group transition-shadow"
              >
                <div className="h-48 overflow-hidden bg-gray-100 relative">
                  <img 
                    src={tree.image || placeholderPattern} 
                    alt={tree.species} 
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!tree.image ? 'opacity-50' : ''}`}
                  />
                  {!tree.image && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium text-sm">
                      Нет фото
                    </div>
                  )}
                  {tree.date && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm z-10">
                      {new Date(tree.date).toLocaleDateString('ru-RU')}
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight pr-2">{tree.species}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium whitespace-nowrap shrink-0 ${getStatusColor(tree.status)}`}>
                      {tree.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-3 flex items-start gap-1">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span className="line-clamp-2">{tree.location}</span>
                  </div>
                  
                  {ecoValue && (
                    <div className="mt-1 mb-3 bg-nature-beige/50 p-2.5 rounded-lg text-xs text-nature-darkGreen border border-nature-green/20">
                      <strong className="block mb-1 opacity-90">🌿 Экологическая ценность:</strong>
                      {ecoValue}
                    </div>
                  )}

                  {tree.notes && (
                    <p className="text-sm text-gray-700 italic flex-1 border-l-2 border-nature-green/40 pl-3">
                      "{tree.notes}"
                    </p>
                  )}
                  
                  <div className="mt-4 pt-3 flex items-center justify-end border-t border-gray-50">
                    <button 
                      onClick={(e) => shareTree(e, tree)}
                      className="text-xs flex items-center gap-1.5 text-nature-green hover:text-nature-darkGreen font-medium bg-green-50/50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Share2 className="w-4 h-4" /> Рассказать
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
