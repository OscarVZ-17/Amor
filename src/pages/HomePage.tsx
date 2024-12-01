import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Heart, Clock, Star } from 'lucide-react';

const cards = [
  {
    title: 'Momentos',
    description: 'Cada instante juntos es un tesoro que guardamos en nuestro corazón. Los pequeños detalles, las risas compartidas y los abrazos sinceros construyen nuestra historia de amor.',
    icon: Clock,
    gradient: 'from-pink-500 to-rose-400',
    delay: 0
  },
  {
    title: 'Amor',
    description: 'Nuestro amor crece cada día más fuerte y más hermoso. Como un jardín bien cuidado, florece con cada gesto de cariño y cada palabra de amor que compartimos.',
    icon: Heart,
    gradient: 'from-rose-400 to-red-500',
    delay: 0.2
  },
  {
    title: 'Futuro',
    description: 'Juntos construimos un futuro lleno de sueños y esperanzas. Cada paso que damos es una promesa de amor eterno, un camino que recorremos de la mano.',
    icon: Star,
    gradient: 'from-red-500 to-pink-500',
    delay: 0.4
  }
];

export function HomePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 mb-12 text-center"
        >
          Nuestra Historia de Amor
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: card.delay,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full transform transition-all duration-300 hover:shadow-2xl">
                <div className={`p-6 bg-gradient-to-r ${card.gradient}`}>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4"
                  >
                    <card.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">{card.title}</h2>
                </div>
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                  <motion.div
                    className="mt-4 flex justify-end"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Heart className="w-6 h-6 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-gray-600"
        >
          <p className="italic">"El amor no se mide en tiempo, sino en la intensidad de los momentos compartidos."</p>
        </motion.div>
      </main>
    </div>
  );
}