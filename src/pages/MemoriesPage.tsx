import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const memories = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80',
    title: 'Nuestro Primer Encuentro',
    date: '14 de Febrero, 2024'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80',
    title: 'Momentos Especiales',
    date: '1 de Marzo, 2024'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&q=80',
    title: 'Nuestro Amor Crece',
    date: '15 de Marzo, 2024'
  }
];

export function MemoriesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-12 text-center"
      >
        Nuestros Momentos Especiales
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            layoutId={`card-${memory.id}`}
            onClick={() => setSelectedId(memory.id)}
            className="cursor-pointer group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5]">
              <motion.img
                src={memory.image}
                alt={memory.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{memory.title}</h3>
                  <p className="text-sm opacity-80">{memory.date}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full"
            >
              <img
                src={memories.find(m => m.id === selectedId)?.image}
                alt="Memoria"
                className="w-full h-[60vh] object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {memories.find(m => m.id === selectedId)?.title}
                </h2>
                <p className="text-gray-600">
                  {memories.find(m => m.id === selectedId)?.date}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}