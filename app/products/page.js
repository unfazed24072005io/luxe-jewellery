import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '@/components/ProductCard';

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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-bold text-yellow-500">Our Products</h1>
          <p className="mt-4 text-gray-300">Discover our exquisite collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Filters</h3>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-sm text-gray-700">CATEGORY</h4>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Rings</span>
                </label>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Necklaces</span>
                </label>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Earrings</span>
                </label>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Bracelets</span>
                </label>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-sm text-gray-700">MATERIAL</h4>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Gold</span>
                </label>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Silver</span>
                </label>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Platinum</span>
                </label>
                <label className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Diamond</span>
                </label>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-sm text-gray-700">PRICE RANGE</h4>
                <input type="range" min="0" max="10000" className="w-full" />
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>$0</span>
                  <span>$10,000+</span>
                </div>
              </div>
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
    </div>
  );
}