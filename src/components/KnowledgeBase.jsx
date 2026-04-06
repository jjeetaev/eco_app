import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';
import { knowledgeBase } from '../data/knowledge';

export default function KnowledgeBase() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="p-3 bg-nature-green text-white rounded-xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Школа Шукурова</h2>
          <p className="text-gray-500 text-sm">База знаний о городской экологии</p>
        </div>
      </div>

      <div className="space-y-3">
        {knowledgeBase.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
            <button 
              onClick={() => toggle(item.id)}
              className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center font-semibold text-gray-800"
            >
              {item.title}
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openId === item.id ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white text-gray-700 leading-relaxed border-t border-gray-100">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
