import React from 'react';
import { motion } from 'framer-motion';
import { Trees, AlertTriangle, CheckCircle2, Download } from 'lucide-react';

export default function Dashboard({ trees }) {
  const total = trees.length;
  const healthy = trees.filter(t => t.status === 'Здоровое').length;
  const threatened = trees.filter(t => t.status === 'Под угрозой' || t.status === 'Спилено').length;

  const stats = [
    { label: "Всего объектов", value: total, icon: Trees, color: "text-nature-darkGreen", bg: "bg-green-100" },
    { label: "Здоровые", value: healthy, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    { label: "Под угрозой", value: threatened, icon: AlertTriangle, color: "text-nature-orange", bg: "bg-orange-100" }
  ];

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trees, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "eco_report.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="mb-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className={`p-4 rounded-full ${stat.bg}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Экспорт отчета */}
      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleExport} 
          className="flex items-center gap-2 bg-nature-green text-white px-4 py-2 rounded-xl text-sm hover:bg-nature-lightGreen transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" /> Отчет для Мэрии (.json)
        </button>
      </div>
    </div>
  );
}
