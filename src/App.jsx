import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import TreeForm from './components/TreeForm';
import TreeFeed from './components/TreeFeed';
import TreeMap from './components/TreeMap';
import KnowledgeBase from './components/KnowledgeBase';
import EcoPulse from './components/EcoPulse';
import { initialTrees } from './data/trees';
import { Leaf, Send } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('list');

  const [trees, setTrees] = useState(() => {
    const saved = localStorage.getItem('eco_trees');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialTrees;
      }
    }
    return initialTrees;
  });

  useEffect(() => {
    localStorage.setItem('eco_trees', JSON.stringify(trees));
  }, [trees]);

  const handleAddTree = (newTree) => {
    setTrees([newTree, ...trees]);
    setActiveTab('list'); // switch back to list view on add
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-nature-green selection:text-white bg-nature-beige">
      {/* Header */}
      <header className="bg-nature-darkGreen text-white py-6 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Leaf className="w-8 h-8 text-nature-beige" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">Tamyr</h1>
              <p className="text-sm text-nature-beige/80 opacity-90 hidden sm:block">Цифровая Экосистема</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8 max-w-6xl flex-grow">
        <EcoPulse />
        <Dashboard trees={trees} />

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-6 py-3 rounded-xl font-bold flex-1 transition-all shadow-sm ${activeTab === 'list'
                ? 'bg-nature-darkGreen text-nature-beige ring-2 ring-offset-2 ring-nature-green border-transparent'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
          >
            Список событий
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-6 py-3 rounded-xl font-bold flex-1 transition-all shadow-sm ${activeTab === 'map'
                ? 'bg-nature-darkGreen text-nature-beige ring-2 ring-offset-2 ring-nature-green border-transparent'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
          >
            Карта озеленения Бишкека
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">

          {/* Conditional Rendering for List Tab */}
          {activeTab === 'list' && (
            <div className="lg:col-span-2">
              <TreeForm onAddTree={handleAddTree} />
              <TreeFeed trees={trees} />
            </div>
          )}

          {/* Conditional Rendering for Map Tab */}
          {activeTab === 'map' && (
            <div className="lg:col-span-2 h-full">
              <TreeMap trees={trees} />
            </div>
          )}

          {/* Sidebar KnowledgeBase (Always Visible) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <KnowledgeBase />
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Community */}
      <footer className="bg-nature-darkGreen text-nature-beige py-10 mt-auto border-t-4 border-nature-green">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto bg-white/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <Send className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Голос Сообщества</h3>
          <p className="text-sm opacity-90 mb-6 max-w-xl mx-auto leading-relaxed">
            Присоединяйтесь к нашему движению "Зеленый Дозор". Мы собираем энтузиастов, обсуждаем инициативы по спасению деревьев, защищаем легкие нашего города и делимся наблюдениями!
          </p>
          <a href="#" className="inline-flex items-center gap-2 bg-white text-nature-darkGreen hover:bg-nature-beige px-8 py-3 rounded-xl transition-colors font-bold shadow-lg">
            Присоединиться в Telegram
          </a>
        </div>
      </footer>
    </div>
  );
}
