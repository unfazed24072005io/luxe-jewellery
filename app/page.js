import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import CollectionCard from '@/components/CollectionCard';

// Categories with gender filter
const CATEGORIES = [
  { name: 'Rings', icon: '👂', gender: 'women' },
  { name: 'Earrings', icon: '💎', gender: 'both' },
  { name: 'Bracelets', icon: '📿', gender: 'both' },
  { name: 'Necklace', icon: '💍', gender: 'both' },
  { name: 'Mangalsutra', icon: '⛓️', gender: 'women' },
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
      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700/70 via-gray-600/60 to-gray-500/50"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white tracking-wide italic">
              Shine in Your Story
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-6 font-light">
              Crafted in Silver, Set in Soul
            </p>
            <p className="text-white/90 text-base max-w-xl mx-auto mb-2">
              Premium lab-grown diamond jewelry in 925 sterling silver
            </p>
            <p className="text-white/80 text-sm">
              Certified • Ethical • Timeless
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products" 
              className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-2">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}&gender=${category.gender}`}
                className="group flex flex-col items-center p-6 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300"
              >
                <div className="w-full aspect-square bg-gray-300 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl">{category.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-800 text-center">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Her Section */}
      <section className="w-full py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900">For Her</h2>
            </div>
            <Link href="/products?gender=women" className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all">
              View More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {womenProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* For Him Section */}
      <section className="w-full py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900">For Him</h2>
            </div>
            <Link href="/products?gender=men" className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all">
              View More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections with Video Section */}
      <section className="w-full py-16 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900 mb-4">
              All Products Video Session - Exclusive Collection
            </h2>
          </div>

          <div className="relative bg-gray-300 rounded-2xl p-8 min-h-[400px] flex items-center justify-center mb-12">
            <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="w-full py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif italic mb-8">Why</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-yellow-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Certified Lab Diamonds</h3>
                    <p className="text-gray-600">IGI & SGL certified, ethically created</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-yellow-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">925 Sterling Silver</h3>
                    <p className="text-gray-600">Premium quality, hypoallergenic</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-32 h-32 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-white">
                <span className="text-sm text-center px-2">Quality</span>
              </div>
              <div className="w-32 h-32 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-white">
                <span className="text-sm text-center px-2">Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Men Who Live Different */}
      <section className="w-full py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-2">For Men Who</h2>
            <h2 className="text-3xl md:text-4xl font-serif italic mb-4">Live Different</h2>
            <div className="flex items-center gap-2 text-yellow-500 text-sm">
              <span>★★★★★</span>
              <span>4.9/5 Rating</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menProducts.slice(0, 4).map(product => (
              <div key={product.id} className="bg-white text-black rounded-lg p-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products to Claim */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 mb-2">
              Products to Claim
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-full aspect-square rounded-full bg-gray-200 mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-100"></div>
                </div>
                <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all text-sm">
                  CLAIM NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real People Real Shine */}
      <section className="w-full py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900">
              Real People, Real Shine
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="w-full aspect-square rounded-full bg-gray-200 mb-4"></div>
                <p className="text-xs text-gray-600 mb-2">@diamantra_shine</p>
                <p className="text-sm">Customer testimonial content here...</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/reviews" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* As Seen In */}
      <section className="w-full py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-2">As Seen In Leading Fashion</h2>
            <h2 className="text-3xl md:text-4xl font-serif italic">& Lifestyle Magazines</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {['GRAZIA', 'FEMINA', 'VOGUE', 'BAZAAR', 'ELLE'].map((mag) => (
              <div key={mag} className="bg-white rounded-lg p-6 text-center">
                <h3 className="text-2xl font-serif text-black">{mag}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="w-full py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900">
              Proof That Radiates The Good
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <p className="font-semibold">Customer Name</p>
                    <div className="flex text-yellow-500 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Amazing quality and beautiful designs. The lab-grown diamonds sparkle just like natural ones!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-16 bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif italic mb-6">Ready to Shine Up?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Discover curated diamond jewelry in 925 sterling silver. Certified, ethical & delivered to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/products" 
              className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all duration-300"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
