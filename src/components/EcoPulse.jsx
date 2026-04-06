import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';
import { ecoQuotes } from '../data/trees';

export default function EcoPulse() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = ecoQuotes[Math.floor(Math.random() * ecoQuotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="bg-nature-green/10 border border-nature-green/20 rounded-2xl p-4 mb-4 flex items-center gap-4">
      <div className="p-2 bg-nature-green text-white rounded-full shrink-0">
        <Leaf className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-nature-darkGreen mb-1">Эко-Пульс Города</h3>
        <p className="text-sm text-nature-darkGreen/80 italic font-serif">«{quote}»</p>
      </div>
    </div>
  );
}
