import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Book, Heart, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Sidebar() {
  const menuItems = [
    { icon: Home, text: 'Inicio', path: '/home' },
    { icon: Heart, text: 'Recuerdos', path: '/memories' },
    { icon: Book, text: 'Poemas', path: '/poems' },
    { icon: BookOpen, text: 'Diario', path: '/diary' },
  ];

  return (
    <>
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 h-full w-[280px] bg-white shadow-lg py-6 z-40"
      >
        <div className="px-4">
          <motion.div className="flex items-center mb-8 ml-2">
            <Heart className="w-8 h-8 text-pink-500" />
            <motion.h2 className="ml-3 text-xl font-bold text-gray-800">
              Nuestro Amor
            </motion.h2>
          </motion.div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-600'
                      : 'text-gray-600 hover:bg-pink-50'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="ml-3">{item.text}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.div>
      
      <motion.div
        className="min-h-screen bg-gray-50 ml-[280px]"
      >
        <div className="p-8">
          <slot />
        </div>
      </motion.div>
    </>
  );
}