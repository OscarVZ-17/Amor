import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface DiaryEntry {
  id: string;
  content: string;
  author: string;
  date: string;
  mood: 'happy' | 'love' | 'thoughtful';
}

export function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState<DiaryEntry['mood']>('love');
  const currentUser = sessionStorage.getItem('currentUser') || 'Usuario';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.trim()) return;

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      content: newEntry,
      author: currentUser,
      date: new Date().toLocaleDateString(),
      mood: selectedMood
    };

    setEntries([entry, ...entries]);
    setNewEntry('');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-800 mb-12 text-center"
      >
        Nuestro Diario de Amor
      </motion.h1>
      
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
          <h2 className="text-xl font-semibold">Nueva Entrada</h2>
          <p className="opacity-80">Comparte tus pensamientos y sentimientos</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cómo te sientes hoy?
            </label>
            <div className="flex gap-4">
              {['happy', 'love', 'thoughtful'].map((mood) => (
                <motion.button
                  key={mood}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMood(mood as DiaryEntry['mood'])}
                  className={`p-3 rounded-full ${
                    selectedMood === mood
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Heart className="w-6 h-6" />
                </motion.button>
              ))}
            </div>
          </div>

          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Escribe tu entrada del diario aquí..."
            className="w-full min-h-[200px] p-4 border border-gray-200 rounded-xl focus:border-pink-500 focus:ring focus:ring-pink-200 transition-colors resize-none"
          />
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-rose-600 transition-all shadow-md hover:shadow-lg"
          >
            Guardar Entrada
          </motion.button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{entry.author}</h3>
                    <p className="text-sm text-gray-500">{entry.date}</p>
                  </div>
                  <Heart className={`w-6 h-6 ${
                    entry.mood === 'love' ? 'text-pink-500' :
                    entry.mood === 'happy' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                </div>
                <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}