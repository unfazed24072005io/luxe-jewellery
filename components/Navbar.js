'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Collections', href: '/collections' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' }
  ];

  return (
    <nav className="bg-gradient-to-b from-black to-gray-900 text-white shadow-2xl border-b border-yellow-500/50 sticky top-0 z-50 backdrop-blur-md bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo - ENHANCED WITH GLOW */}
          <Link href="/" className="flex-shrink-0 group relative">
            <div className="relative">
              <h1 className="text-4xl font-serif font-bold text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(234,179,8,0.7)] transition-all duration-500">
<<<<<<< HEAD
                DIAMANTRA
=======
                DiaMantra
>>>>>>> b8fedfa3ef707d02e29a0015bee0c48cadc1e406
              </h1>
              <p className="text-xs tracking-[0.3em] text-yellow-300/90 mt-1 font-light">
                FINE JEWELLERY
              </p>
            </div>
            
            {/* Animated underline effect */}
            <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-yellow-500 to-yellow-300 group-hover:w-full transition-all duration-500"></div>
          </Link>
          
          {/* Desktop Navigation - ENHANCED */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map(link => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="text-white/90 hover:text-yellow-300 transition-all duration-300 text-sm tracking-wider font-medium py-2 px-1"
                >
                  {link.name}
                </Link>
                
                {/* Animated underline on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300 group-hover:w-full transition-all duration-300"></div>
                
                {/* Admin link gets special styling */}
                {link.name === 'Admin' && (
                  <div className="absolute -top-1 -right-1">
                    
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button - ENHANCED WITH ANIMATION */}
          <button
            className="md:hidden text-white bg-yellow-500/20 p-3 rounded-lg hover:bg-yellow-500/30 transition-all duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-white top-3 transform transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation - ENHANCED WITH GLASS EFFECT */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 pt-4 bg-gradient-to-b from-black/95 to-gray-900/95 backdrop-blur-xl border-t border-yellow-500/30 shadow-2xl animate-slideDown">
            <div className="space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-4 px-6 text-lg text-white/90 hover:text-yellow-300 hover:bg-white/5 rounded-lg transition-all duration-300 mx-2 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    {link.name}
                    {link.name === 'Admin' && (
                      <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300 group-hover:w-full transition-all duration-500 mt-1"></div>
                </Link>
              ))}
            </div>
            
            {/* Mobile extra info */}
            <div className="mt-8 pt-6 border-t border-white/10 px-8">
              <p className="text-sm text-yellow-300/80 text-center">
                ✨ By Appointment Only ✨
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Global Styles for animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
}
