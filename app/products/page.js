import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function getProducts() {
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[350px] md:h-[400px] bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
        <div className="absolute inset-0 bg-grey/70 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0"></div>
        </div>

        <div className="relative z-10 px-4 h-full flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl md:text-5xl lg:text-[65px] [font-family:'Rische-Demo',Helvetica] font-normal text-white tracking-[-1px] md:tracking-[-3.90px] leading-tight">
              Our Collection
            </h1>
            <p className="text-sm md:text-base [font-family:'Inter',Helvetica] font-semibold text-white tracking-[1px] md:tracking-[2.52px] mt-4">
              LAB-GROWN BRILLIANCE MEETS TIMELESS SILVER ELEGANCE.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <Link href="/collections">
                <Button className="relative w-[165px] h-[42px] bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 transition-all duration-200">
                  <div className="absolute top-1 left-1 w-[155px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
                  <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">
                    Shop the Collection
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white p-8 shadow-lg border border-gray-100">
              {/* Filter Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-0.5 h-8 bg-red-600"></div>
                  <h3 className="[font-family:'Inter',Helvetica] font-bold text-2xl text-black">FILTERS</h3>
                </div>
                <p className="text-sm text-gray-600 ml-4">Narrow down your perfect piece</p>
              </div>
              
              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-0.5 h-6 bg-red-500"></div>
                  <h4 className="[font-family:'Inter',Helvetica] font-semibold text-gray-800">CATEGORY</h4>
                </div>
                <div className="space-y-3 ml-4">
                  {['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Charms'].map((category) => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="mr-3 w-4 h-4 rounded border-gray-300 text-[#d48b00] focus:ring-[#d48b00] focus:ring-2 focus:ring-offset-2"
                      />
                      <span className="text-gray-700 group-hover:text-black transition-colors">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material Filter */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-0.5 h-6 bg-red-500"></div>
                  <h4 className="[font-family:'Inter',Helvetica] font-semibold text-gray-800">MATERIAL</h4>
                </div>
                <div className="space-y-3 ml-4">
                  {['Gold', 'Silver', 'Platinum', 'Diamond', 'Lab Diamond'].map((material) => (
                    <label key={material} className="flex items-center cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="mr-3 w-4 h-4 rounded border-gray-300 text-[#d48b00] focus:ring-[#d48b00] focus:ring-2 focus:ring-offset-2"
                      />
                      <span className="text-gray-700 group-hover:text-black transition-colors">{material}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-0.5 h-6 bg-red-500"></div>
                  <h4 className="[font-family:'Inter',Helvetica] font-semibold text-gray-800">PRICE RANGE</h4>
                </div>
                <div className="ml-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100000" 
                    step="1000"
                    className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#d48b00]"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹0</span>
                    <span>₹1,00,000+</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <Button 
                variant="outline" 
                className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products available yet.</p>
                <p className="text-gray-400 mt-2">Add products via the Admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "Rings That Feel Like You" Section - Below Products */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative bg-gray-100 rounded-[25px] p-8 md:p-12 border border-gray-200 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-0.5 h-12 bg-red-600"></div>
                  <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-black text-3xl md:text-4xl lg:text-[48px] tracking-[-1px] md:tracking-[-2px] leading-tight">
                    Rings That Feel Like You
                  </h2>
                </div>
                
                <p className="[font-family:'Inter',Helvetica] font-medium text-gray-700 text-lg md:text-xl leading-relaxed">
                  Minimal, meaningful, and made to last.<br />
                  Discover silver rings crafted for everyday elegance —<br />
                  with lab-grown brilliance and conscious design.
                </p>
              </div>

              {/* Right Column - Image/Placeholder */}
              <div className="relative h-[300px] md:h-[350px] rounded-[20px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-gradient-to-br from-[#d48b00]/20 to-transparent flex items-center justify-center">
                      <div className="text-6xl md:text-8xl">💍</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SHOP NOW Button in Grey Box Below */}
            <div className="mt-10 pt-8 border-t border-gray-300">
              <div className="bg-gray-800 rounded-[15px] p-6 md:p-8 max-w-md mx-auto">
                <Link href="/products?category=rings">
                  <Button className="relative w-full h-[50px] bg-black hover:bg-gray-900 rounded-[100px] p-0 transition-all duration-300 hover:scale-105 group">
                    <div className="absolute inset-1 rounded-[100px] border-[0.8px] border-solid border-gray-600" />
                    <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-sm md:text-base tracking-[0.5px] flex items-center justify-center gap-2">
                      SHOP NOW
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Glow Up Section - Exactly like Home */}
      <section className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 py-16 md:py-20">
        <div className="w-full bg-color-3 py-8 md:py-[66px]">
          <div className="flex flex-col items-center gap-6 md:gap-[30px] w-full max-w-[491px] mx-auto px-4">
            <div className="flex flex-col items-center gap-4 md:gap-6 w-full">
              <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal color-white text-4xl md:text-5xl lg:text-[60px] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3.60px] text-center leading-tight">
                Ready to Glow Up?
              </h2>
              <p className="[font-family:'Inter',Helvetica] font-medium color-white text-base md:text-lg lg:text-xl text-center">
                Thousands already have their sparkle. Time to get yours with Diamantra.
              </p>
            </div>
            <Link href="/products">
              <Button className="relative h-[42px] w-[165px] bg-[#d48b00] rounded-[100px] hover:bg-[#d48b00]/90">
                <div className="absolute inset-1 rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
                <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">Shop Now</span>
                <div className="absolute top-[19px] left-0.5 w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
                <div className="absolute top-[19px] left-[156px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
