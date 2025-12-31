import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-serif font-bold text-lg mb-2 group-hover:text-yellow-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{product.category} • {product.material}</p>
          <p className="text-yellow-600 font-bold text-xl">₹{product.price?.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
}
