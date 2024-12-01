import React from 'react';
import { motion } from 'framer-motion';

const poems = [
  {
    id: 1,
    title: 'Amor Eterno',
    content: `En cada latido de mi corazón,
    Tu nombre resuena con pasión.
    Eres mi luz, mi inspiración,
    Mi más hermosa bendición.
    
    Como el sol que ilumina el día,
    Tu amor me llena de alegría.
    Eres el sueño que soñé,
    La estrella que siempre busqué.`,
    author: 'Oscar'
  },
  {
    id: 2,
    title: 'Nuestro Amor',
    content: `Como las estrellas en el cielo,
    Nuestro amor brilla sin fin.
    Juntos escribimos esta historia,
    De un amor puro y sin fin.
    
    En cada mirada compartida,
    En cada sonrisa regalada,
    Nuestro amor crece día a día,
    Como una flor bien cuidada.`,
    author: 'Yuritzi'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function PoemsPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-12 text-center"
      >
        Poemas de Amor
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-2"
      >
        {poems.map((poem) => (
          <motion.div
            key={poem.id}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{poem.title}</h2>
              <p className="opacity-80">por {poem.author}</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {poem.content}
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-pink-600 font-medium hover:text-pink-700 transition-colors"
              >
                Compartir ♥
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}