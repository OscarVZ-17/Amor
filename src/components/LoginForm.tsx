import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar credenciales
    if ((username === 'oscar' || username === 'yuritzi') && password === 'amor2024') {
      // Guardar el usuario en sessionStorage para mantener el registro de quién escribe en el diario
      sessionStorage.setItem('currentUser', username);
      navigate('/home');
    } else {
      setError('Usuario o contraseña incorrectos');
      setTimeout(() => setError(''), 3000); // Limpiar el error después de 3 segundos
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl"
    >
      <div className="flex flex-col items-center mb-8">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart className="w-12 h-12 text-pink-500" />
        </motion.div>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">Bienvenidos</h2>
        <p className="mt-2 text-gray-600">Oscar & Yuritzi</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 transition-colors"
            placeholder="oscar o yuritzi"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 focus:border-pink-500 focus:ring focus:ring-pink-200 transition-colors"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-md font-medium hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all"
        >
          Iniciar Sesión
        </motion.button>
      </form>
    </motion.div>
  );
}