'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: [],
    material: [],
    priceRange: [0, 100000]
  });

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const productsData = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(product => 
        filters.category.includes(product.category?.toLowerCase())
      );
    }

    // Material filter
    if (filters.material.length > 0) {
      filtered = filtered.filter(product => 
        filters.material.includes(product.material?.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price) || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    setFilteredProducts(filtered);
  }, [filters, products]);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    const lowerCategory = category.toLowerCase();
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(lowerCategory)
        ? prev.category.filter(c => c !== lowerCategory)
        : [...prev.category, lowerCategory]
    }));
  };

  // Handle material filter change
  const handleMaterialChange = (material) => {
    const lowerMaterial = material.toLowerCase();
    setFilters(prev => ({
      ...prev,
      material: prev.material.includes(lowerMaterial)
        ? prev.material.filter(m => m !== lowerMaterial)
        : [...prev.material, lowerMaterial]
    }));
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: [0, value]
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      material: [],
      priceRange: [0, 100000]
    });
  };

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
              Our Collection
            </h1>
            <p className="text-sm md:text-base [font-family:'Inter',Helvetica] font-semibold text-white tracking-[1px] md:tracking-[2.52px] mt-4">
              LAB-GROWN BRILLIANCE MEETS TIMELESS SILVER ELEGANCE.
            </p>
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
                        checked={filters.category.includes(category.toLowerCase())}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-3 w-4 h-4 rounded border-gray-300 text-[#d48b00] focus:ring-[#d48b00] focus:ring-2 focus:ring-offset-2"
                      />
                      <span className="text-gray-700 group-hover:text-black transition-colors">
                        {category}
                      </span>
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
                        checked={filters.material.includes(material.toLowerCase())}
                        onChange={() => handleMaterialChange(material)}
                        className="mr-3 w-4 h-4 rounded border-gray-300 text-[#d48b00] focus:ring-[#d48b00] focus:ring-2 focus:ring-offset-2"
                      />
                      <span className="text-gray-700 group-hover:text-black transition-colors">
                        {material}
                      </span>
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
                    value={filters.priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#d48b00]"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>₹{filters.priceRange[0].toLocaleString()}</span>
                    <span>₹{filters.priceRange[1].toLocaleString()}+</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <Button 
                onClick={clearFilters}
                variant="outline" 
                className="w-full h-11 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
              >
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#d48b00]"></div>
                <p className="text-gray-500 mt-4">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                {/* Results count */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredProducts.length} of {products.length} products
                    {filters.category.length > 0 || filters.material.length > 0 || filters.priceRange[1] < 100000 ? 
                      ' (filtered)' : ''}
                  </p>
                </div>
                
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products match your filters.</p>
                <Button 
                  onClick={clearFilters}
                  className="mt-4 bg-[#d48b00] hover:bg-[#c07f00]"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* "Rings That Feel Like You" Section */}
      <section className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative w-full h-[190px] bg-[#666666] rounded-[20px] p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start justify-between h-full gap-4 md:gap-8">
              <div className="md:w-1/2">
                <h2 className="[font-family:'Rische-Demo',Helvetica] font-normal text-white text-2xl md:text-[39px] leading-[1.2] tracking-[-0.78px]">
                  Rings That Feel Like You
                </h2>
              </div>
              <div className="md:w-1/2 flex flex-col justify-between h-full">
                <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm md:text-base leading-[1.5] mb-4">
                  Minimal, meaningful, and made to last.<br />
                  Discover silver rings crafted for everyday elegance —<br />
                  with lab-grown brilliance and conscious design.
                </p>
                <div className="mt-auto">
                  <Link href="/products?category=rings">
                    <Button className="relative w-[150px] h-[42px] bg-[#d48b00] rounded-[100px] hover:bg-[#c07f00] p-0 transition-all duration-300">
                      <div className="absolute top-[4px] left-[4px] w-[142px] h-[34px] rounded-[100px] border-[0.8px] border-solid border-[#fdbe46]" />
                      <span className="relative z-10 [font-family:'Inter',Helvetica] font-semibold text-white text-xs">
                        Shop Now
                      </span>
                      <div className="absolute top-[19px] left-[2px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
                      <div className="absolute top-[19px] left-[143px] w-[5px] h-[5px] bg-[#fdbf47] rounded-[2.5px]" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
