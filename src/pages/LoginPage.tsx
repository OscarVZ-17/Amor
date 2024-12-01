import React from 'react';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-rose-100 p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      <LoginForm />
    </div>
  );
}