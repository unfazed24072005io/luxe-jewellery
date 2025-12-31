import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

async function getProduct(slug) {
  try {
    const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(category, currentId) {
  try {
    const q = query(collection(db, 'products'), where('category', '==', category), limit(4));
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(p => p.id !== currentId)
      .slice(0, 3);
  } catch (error) {
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="bg-gray-100 aspect-square flex items-center justify-center">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-gray-400">
                <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Product Image</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-serif font-bold mb-4">{product.name}</h1>
            <p className="text-3xl text-yellow-600 font-bold mb-6">₹{product.price?.toLocaleString()}</p>
            
            <div className="mb-6">
              <span className="inline-block bg-gray-200 px-3 py-1 text-sm text-gray-700 mr-2">
                {product.category}
              </span>
              <span className="inline-block bg-gray-200 px-3 py-1 text-sm text-gray-700">
                {product.material}
              </span>
            </div>

            <div className="prose mb-8">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'A stunning piece from our collection, crafted with precision and attention to detail.'}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between border-b pb-2">
                  <span>Material:</span>
                  <span className="font-semibold">{product.material}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Category:</span>
                  <span className="font-semibold">{product.category}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Collection:</span>
                  <span className="font-semibold">{product.collection || 'N/A'}</span>
                </li>
              </ul>
            </div>

            <button className="btn-primary w-full mb-4">
              ADD TO CART
            </button>
            <button className="btn-secondary w-full">
              CONTACT FOR INQUIRY
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-bold text-center mb-4">You May Also Like</h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
