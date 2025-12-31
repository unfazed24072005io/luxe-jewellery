'use client'
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative">
      {/* Discount Ribbon */}
      {product.discount && (
        <div className="absolute top-4 right-0 z-10 rotate-45 translate-x-8 -translate-y-2">
          <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500 text-white font-bold px-8 py-1 shadow-lg">
            <span className="text-xs font-semibold tracking-wider">20% OFF</span>
          </div>
        </div>
      )}

      {/* Heart Icon */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 left-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
      >
        <svg 
          className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isLiked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      <Link href={`/products/${product.slug}`}>
        <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {product.images && product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-2">💎</div>
                  <p className="text-sm">No Image</p>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-[#d48b00] transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                {product.description || 'Beautiful piece from our collection'}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#d48b00]">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 text-sm line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {product.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
