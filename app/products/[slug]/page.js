import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link 
            href="/products" 
            className="inline-block px-6 py-3 bg-[#d48b00] text-white font-medium rounded-lg hover:bg-[#c07f00] transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[350px] md:h-[400px] bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
        <div className="absolute inset-0 bg-grey/70 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0"></div>
        </div>
        
        <div className="relative z-10 px-4 h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full text-center">
            <h1 className="text-4xl md:text-5xl lg:text-[65px] [font-family:'Rische-Demo',Helvetica] font-normal text-white tracking-[-1px] md:tracking-[-3.90px] leading-tight">
              {product.name}
            </h1>
            <p className="text-sm md:text-base [font-family:'Inter',Helvetica] font-semibold text-white tracking-[1px] md:tracking-[2.52px] mt-4">
              Home / {product.category} / {product.name}
            </p>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-[25px] overflow-hidden shadow-xl aspect-square flex items-center justify-center p-8">
              {product.images && product.images[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105" 
                />
              ) : (
                <div className="text-center text-gray-400">
                  <div className="text-8xl mb-4">💎</div>
                  <p className="text-lg">Product Image</p>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(0, 4).map((img, index) => (
                  <div 
                    key={index} 
                    className="relative bg-gray-100 rounded-[15px] overflow-hidden aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title & Price */}
            <div className="border-b border-gray-200 pb-6">
              <h1 className="text-4xl md:text-5xl [font-family:'Rische-Demo',Helvetica] font-normal text-black mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-4xl [font-family:'Inter',Helvetica] font-bold text-[#d48b00]">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full border border-gray-200">
                {product.category}
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full border border-gray-200">
                {product.material}
              </span>
              {product.collection && (
                <span className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full border border-gray-200">
                  {product.collection}
                </span>
              )}
              {product.featured && (
                <span className="px-4 py-2 bg-gradient-to-r from-[#d48b00]/20 to-yellow-100 text-[#d48b00] text-sm font-medium rounded-full border border-[#d48b00]/30">
                  ★ Featured
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl [font-family:'Inter',Helvetica] font-semibold text-black">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'A stunning piece from our collection, crafted with precision and attention to detail. This exquisite jewelry combines timeless elegance with modern design, perfect for any occasion.'}
              </p>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-xl [font-family:'Inter',Helvetica] font-semibold text-black">
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Material:</span>
                  <span className="font-medium text-black">{product.material}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-black capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Style:</span>
                  <span className="font-medium text-black">{product.style || 'Contemporary'}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-600">Collection:</span>
                  <span className="font-medium text-black">{product.collection || 'General Collection'}</span>
                </div>
                {product.stones && (
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-600">Stones:</span>
                    <span className="font-medium text-black">{product.stones}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium text-black">{product.weight}g</span>
                  </div>
                )}
              </div>
            </div>

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-black mb-2">Care Instructions</h4>
                <p className="text-gray-600 text-sm">{product.careInstructions}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <Link href={`/checkout?product=${product.slug}`} className="block">
                <Button className="relative w-full h-[56px] bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 transition-all duration-300 group">
                  <div className="absolute top-[4px] left-[4px] right-[4px] h-[48px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
                  <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-base tracking-[0.5px]">
                    ADD TO CART
                  </span>
                  <div className="absolute top-[26px] left-[8px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
                  <div className="absolute top-[26px] right-[8px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
                </Button>
              </Link>
              
              <Button className="w-full h-[56px] bg-black text-white rounded-[100px] hover:bg-gray-900 transition-colors border border-gray-800">
                CONTACT FOR INQUIRY
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl [font-family:'Rische-Demo',Helvetica] font-normal text-black mb-2">
                  You May Also Like
                </h2>
                <p className="text-gray-600">Similar products you might love</p>
              </div>
              <Link href="/products">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  View All Products
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* "Rings That Feel Like You" Section */}
      

      {/* "Ready to Glow Up" Section */}
      <section className="w-full relative h-[200px] md:h-[268px] bg-[#666666] py-8 md:py-0">
        <div className="h-full flex flex-col items-center justify-center gap-6 md:gap-[30px] px-4">
          <div className="flex flex-col items-center gap-4 md:gap-[24px] max-w-[491px]">
            <h2 className="[font-family:'Inter',Helvetica] font-semibold text-white text-2xl md:text-3xl lg:text-[34px] leading-[1.2] tracking-[-0.04em] text-center">
              Ready to Glow Up?
            </h2>
            <p className="[font-family:'Inter',Helvetica] font-semibold text-white text-base md:text-lg lg:text-[20px] leading-[1.35] tracking-[-0.04em] text-center max-w-[644px]">
              Thousands already have their sparkle. Time to get yours with Diamantra.
            </p>
          </div>
          <div className="relative w-[150px] md:w-[163px] h-[42px]">
            <Link href="/products">
              <Button className="relative w-full h-full bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 transition-all duration-300">
                <div className="absolute top-[4px] left-[4px] w-[calc(100%-8px)] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">
                  Shop Now
                </span>
                <div className="absolute top-[19px] left-[2px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
                <div className="absolute top-[19px] right-[2px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
