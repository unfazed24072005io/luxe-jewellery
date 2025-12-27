import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import CollectionCard from '@/components/CollectionCard';

// Categories with gender filter
const CATEGORIES = [
  { name: 'Rings', icon: '💍', gender: 'women' },
  { name: 'Earrings', icon: '👂', gender: 'both' },
  { name: 'Bracelets', icon: '📿', gender: 'both' },
  { name: 'Necklace', icon: '💎', gender: 'both' },
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
      {/* Hero Section with Bottom Curved Cleavage */}
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

        {/* Bottom Curved Cleavage */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white">
          <svg className="absolute top-0 w-full h-16" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path d="M0,0 Q600,100 1200,0 L1200,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-2">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}&gender=${category.gender}`}
                className="group relative bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300 overflow-hidden"
              >
                {/* Top Curved Cleavage */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-white">
                  <svg className="absolute bottom-0 w-full h-8" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <path d="M0,40 Q100,0 200,40 L200,0 L0,0 Z" fill="white" />
                  </svg>
                </div>

                <div className="flex flex-col items-center p-6 pt-12">
                  <div className="w-full aspect-square bg-gray-300 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-4xl">{category.icon}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-800 text-center">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Her and For Him Side by Side with Inward Cleavage */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* For Her */}
            <div className="relative bg-gray-100 p-8">
              {/* Right side inward cleavage */}
              <div className="hidden md:block absolute top-0 right-0 bottom-0 w-8">
                <svg className="absolute left-0 w-full h-full" viewBox="0 0 40 600" preserveAspectRatio="none">
                  <path d="M0,0 Q40,300 0,600 L40,600 L40,0 Z" fill="white" />
                </svg>
              </div>

              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900">For Her</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {womenProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/products?gender=women" className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all">
                  View More
                </Link>
              </div>
            </div>

            {/* For Him */}
            <div className="relative bg-gray-100 p-8">
              {/* Left side inward cleavage */}
              <div className="hidden md:block absolute top-0 left-0 bottom-0 w-8">
                <svg className="absolute right-0 w-full h-full" viewBox="0 0 40 600" preserveAspectRatio="none">
                  <path d="M40,0 Q0,300 40,600 L0,600 L0,0 Z" fill="white" />
                </svg>
              </div>

              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900">For Him</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {menProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/products?gender=men" className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all">
                  View More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Video Section - No Border */}
      <section className="w-full py-16 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif italic text-gray-900 mb-4">
              All Products Video Session - Exclusive Collection
            </h2>
          </div>

          <div className="relative bg-gray-300 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
            <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
              <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Featured For You Section */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-2">Featured For You</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map(product => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="w-full aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  {product.images?.[0] && (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <p className="font-bold text-lg mb-3">₹{product.price}</p>
                <button className="w-full py-2 bg-yellow-500 text-black text-sm font-semibold rounded-full hover:bg-yellow-400 transition-all">
                  Add to Cart
                </button>
              </div>
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

      {/* For Men and For Women Video Section Side by Side */}
      <section className="w-full py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Women Video */}
            <div className="relative bg-gray-300 rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
              <div className="absolute top-4 left-4 text-white text-xl font-serif italic">For Women Video Session</div>
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            {/* For Men Video */}
            <div className="relative bg-gray-300 rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
              <div className="absolute top-4 left-4 text-white text-xl font-serif italic">For Men Video Session</div>
              <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why DiaMantra - Four Features on Right */}
      <section className="w-full py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif italic mb-4">Why</h2>
              <h2 className="text-5xl md:text-6xl font-serif italic mb-8">DiaMantra</h2>
            </div>
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
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-yellow-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Lifetime Warranty</h3>
                  <p className="text-gray-600">Quality guaranteed forever</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-yellow-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Free Worldwide Shipping</h3>
                  <p className="text-gray-600">Delivered to your doorstep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Men Who Move Different - Ad Left, Carousel Right */}
      <section className="w-full py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left - Ad/Shop Now */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif italic mb-2">For Men Who</h2>
              <h2 className="text-3xl md:text-4xl font-serif italic mb-4">Move Different</h2>
              <div className="flex items-center gap-2 text-yellow-500 text-sm mb-6">
                <span>★★★★★</span>
                <span>4.9/5 Rating</span>
              </div>
              <p className="text-gray-300 mb-6">Bold designs for the modern man who dares to stand out</p>
              <Link 
                href="/products?gender=men" 
                className="inline-block px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all"
              >
                SHOP NOW
              </Link>
            </div>

            {/* Right - Carousel */}
            <div className="grid grid-cols-2 gap-4">
              {menProducts.slice(0, 4).map(product => (
                <div key={product.id} className="bg-white text-black rounded-lg p-3">
                  <div className="w-full aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden">
                    {product.images?.[0] && (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <h3 className="font-semibold text-xs mb-1 line-clamp-1">{product.name}</h3>
                  <p className="font-bold text-sm">₹{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products to Claim with Video Card */}
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
                  {/* Video Play Button Overlay */}
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-5 h-5 text-gray-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <button className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all text-sm">
                  CLAIM NOW
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As Seen In - Black BG, Gold Text */}
      <section className="w-full py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-2 text-yellow-500">As Seen In Leading Fashion</h2>
            <h2 className="text-3xl md:text-4xl font-serif italic text-yellow-500">& Lifestyle Magazines</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: 'GRAZIA', quote: 'Stunning collection of lab-grown diamond jewelry' },
              { name: 'FEMINA', quote: 'Perfect blend of elegance and affordability' },
              { name: 'VOGUE', quote: 'Ethical luxury at its finest' },
              { name: 'BAZAAR', quote: 'Modern designs with timeless appeal' },
              { name: 'ELLE', quote: 'The future of sustainable jewelry' }
            ].map((mag) => (
              <div key={mag.name} className="bg-white rounded-lg p-6 text-center">
                <h3 className="text-2xl font-serif text-black mb-4">{mag.name}</h3>
                <p className="text-sm text-gray-600">{mag.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof That Real Looks This Good - Photo Left, Name/Age Right, Text Below */}
      <section className="w-full py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900">
              Proof That Real Looks This Good
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: 'Priya Sharma', age: 28, text: 'I was skeptical about lab-grown diamonds at first, but DiaMantra changed my mind completely. The quality is exceptional and the sparkle is exactly like natural diamonds. I get compliments every single day!' },
              { name: 'Arjun Mehta', age: 32, text: 'As someone who values both style and ethics, DiaMantra is the perfect choice. The silver craftsmanship is top-notch and the diamonds are absolutely brilliant. Highly recommended!' },
              { name: 'Sneha Reddy', age: 25, text: 'The best jewelry purchase I have ever made. The designs are elegant, the quality is outstanding, and the customer service is fantastic. I am already planning my next purchase!' },
              { name: 'Rahul Singh', age: 30, text: 'I bought a pendant for my wife and she absolutely loves it. The certificate of authenticity and lifetime warranty give me peace of mind. DiaMantra has a customer for life!' }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  {/* Photo on Left */}
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0"></div>
                  
                  {/* Name and Age on Right */}
                  <div>
                    <p className="font-bold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.age} years old</p>
                    <div className="flex text-yellow-500 text-sm mt-1">★★★★★</div>
                  </div>
                </div>
                
                {/* Text Below */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{testimonial.text}"
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
