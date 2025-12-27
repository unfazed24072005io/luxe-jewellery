import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import CollectionCard from '@/components/CollectionCard';

// Categories with gender filter
const CATEGORIES = [
  { name: 'Earrings', icon: '👂', gender: 'women' },
  { name: 'Pendants', icon: '💎', gender: 'both' },
  { name: 'Bracelets', icon: '📿', gender: 'both' },
  { name: 'Rings', icon: '💍', gender: 'both' },
  { name: 'Chains', icon: '⛓️', gender: 'men' },
  { name: 'Charms', icon: '✨', gender: 'both' },
  { name: 'Studs', icon: '⭐', gender: 'men' },
];

async function getFeaturedProducts() {
  try {
    const q = query(collection(db, 'products'), limit(12));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function getFeaturedCollections() {
  try {
    const q = query(collection(db, 'collections'), limit(6));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

async function getProductsByGender(gender) {
  try {
    const q = query(
      collection(db, 'products'),
      where('gender', 'in', [gender, 'both']),
      limit(8)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching products by gender:', error);
    return [];
  }
}

export default async function Home() {
  // Fetch all data in parallel
  const [products, collections, womenProducts, menProducts] = await Promise.all([
    getFeaturedProducts(),
    getFeaturedCollections(),
    getProductsByGender('women'),
    getProductsByGender('men')
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Diamantra Style */}
      <section className="relative w-full h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/80 to-black"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-7xl font-bold mb-2 text-white tracking-tight">
              <span className="text-gray-300">Dia</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Mantra</span>
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto my-6"></div>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light tracking-wide">
              Lab-Grown Brilliance Meets Timeless Silver Elegance
            </p>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Crafted in Silver, Set in Soul. Shine in Your Story
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products" 
              className="group px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Shop Now
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link 
              href="/collections" 
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300"
            >
              View Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600">Discover pieces crafted for every style and occasion</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}&gender=${category.gender}`}
                className="group flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-gray-800">{category.name}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {category.gender === 'both' ? 'For All' : 
                   category.gender === 'women' ? 'For Her' : 'For Him'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Her Section */}
      <section className="w-full py-16 bg-gradient-to-r from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">For Her</h2>
              <p className="text-gray-600 mt-2">Elegant pieces that celebrate feminine grace</p>
            </div>
            <Link href="/products?gender=women" className="text-gray-700 hover:text-black font-medium flex items-center gap-2">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {womenProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* For Him Section */}
      <section className="w-full py-16 bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">For Him</h2>
              <p className="text-gray-600 mt-2">Bold designs for the modern man</p>
            </div>
            <Link href="/products?gender=men" className="text-gray-700 hover:text-black font-medium flex items-center gap-2">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Collections</h2>
            <p className="text-gray-600">Curated collections with handpicked sparkle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/collections" 
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Explore All Collections
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Certified Lab Diamonds</h3>
              <p className="text-gray-600">Ethically sourced brilliance</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">925 Sterling Silver</h3>
              <p className="text-gray-600">Premium quality silver</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">Worldwide delivery</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Lifetime Warranty</h3>
              <p className="text-gray-600">Quality guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Find Your Signature Piece?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands who have discovered the perfect balance of modern luxury and timeless elegance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products" 
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
