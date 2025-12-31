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
      <section className="w-full relative py-12 md:py-16">
  <div className="max-w-7xl mx-auto px-4">
    {/* Grey Rectangle Box */}
    <div className="relative w-full h-[157px] bg-[#666666] rounded-[20px]">
      
      {/* Left Text: "Rings That Feel Like You" */}
      <div className="absolute left-[38px] md:left-[457px] top-[38px] md:top-[1961px]">
        <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-white text-3xl md:text-[39px] leading-[41px] tracking-[-0.78px]">
          Rings That Feel Like You
        </h2>
      </div>

      {/* Right Text Container */}
      <div className="absolute left-[337px] md:left-[756px] top-[25px] md:top-[1948px] w-[358px]">
        
        {/* Right Text */}
        <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm leading-[18px] mb-[19px]">
          Minimal, meaningful, and made to last.<br />
          Discover silver rings crafted for everyday elegance —<br />
          with lab-grown brilliance and conscious design.
        </p>

        {/* Shop Now Button */}
        <Link href="/products?category=rings">
          <Button className="relative w-[150px] h-[42px] bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 transition-all duration-300">
            {/* Outer Border */}
            <div className="absolute top-[4px] left-[4px] w-[142px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
            
            {/* Button Text */}
            <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">
              Shop Now
            </span>
            
            {/* Left Dot */}
            <div className="absolute top-[19px] left-[2px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
            
            {/* Right Dot */}
            <div className="absolute top-[19px] left-[143px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>
      {/* Ready to Glow Up Section - Exactly like Home */}
      <section className="w-full relative h-[268px] bg-[#666666]">
  {/* Container */}
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-[30px]">
    
    {/* Text Container */}
    <div className="flex flex-col items-center gap-[24px] w-[491px]">
      
      {/* Heading */}
      <h2 className="[font-family:'Inter',Helvetica] font-semibold text-white text-[34px] leading-[41px] tracking-[-0.04em] text-center">
        Ready to Glow Up?
      </h2>
      
      {/* Subtitle */}
      <p className="[font-family:'Inter',Helvetica] font-semibold text-white text-[20px] leading-[27px] tracking-[-0.04em] text-center w-[644px]">
        Thousands already have their sparkle. Time to get yours with Diamantra.
      </p>
    </div>

    {/* Button Container */}
    <div className="relative w-[163px] h-[42px]">
      <Link href="/products">
        <Button className="relative w-[163px] h-[42px] bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 transition-all duration-300">
          
          {/* Border */}
          <div className="absolute top-[4px] left-[4px] w-[155px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
          
          {/* Text */}
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">
            Shop Now
          </span>
          
          {/* Left Dot */}
          <div className="absolute top-[19px] left-[2px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
          
          {/* Right Dot */}
          <div className="absolute top-[19px] left-[156px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
        </Button>
      </Link>
    </div>
  </div>
</section>
