import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

async function getCollection(slug) {
  try {
    const q = query(collection(db, 'collections'), where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

async function getCollectionProducts(collectionSlug) {
  try {
    // Query products where 'collection' field matches the collection slug
    const q = query(collection(db, 'products'), where('collection', '==', collectionSlug));
    const snapshot = await getDocs(q);
    
    console.log(`Found ${snapshot.docs.length} products for collection: ${collectionSlug}`);
    
    return snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error('Error fetching collection products:', error);
    return [];
  }
}

export default async function CollectionDetailPage({ params }) {
  const { slug } = params;
  const collectionData = await getCollection(slug);
  
  if (!collectionData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The collection you're looking for doesn't exist.</p>
          <Link 
            href="/collections" 
            className="inline-block px-6 py-3 bg-[#d48b00] text-white font-medium rounded-lg hover:bg-[#c07f00] transition-colors"
          >
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const products = await getCollectionProducts(slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Collection Hero Section */}
      <section className="relative w-full min-h-[350px] md:h-[400px] bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0">
          {collectionData.image && (
            <img 
              src={collectionData.image} 
              alt={collectionData.name}
              className="w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-center px-4 py-20">
          <div className="max-w-7xl mx-auto w-full text-center">
            <h1 className="text-4xl md:text-5xl lg:text-[65px] [font-family:'Rische-Demo',Helvetica] font-normal text-white tracking-[-1px] md:tracking-[-3.90px] leading-tight">
              {collectionData.name}
            </h1>
            <p className="text-sm md:text-base [font-family:'Inter',Helvetica] font-semibold text-white tracking-[1px] md:tracking-[2.52px] mt-4 max-w-3xl mx-auto">
              {collectionData.description || 'A curated collection of exquisite pieces'}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl [font-family:'Rische-Demo',Helvetica] font-normal text-black text-center mb-4">
            Products in this Collection
          </h2>
          <p className="text-gray-600 text-center">
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </p>
        </div>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                This collection doesn't have any products yet.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left">
                <h4 className="font-medium text-gray-800 mb-2">Admin Instructions:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>1. Go to Admin Panel → Products</li>
                  <li>2. Edit existing products or add new ones</li>
                  <li>3. Set "Collection" field to: <code className="bg-gray-200 px-2 py-1 rounded">{slug}</code></li>
                  <li>4. Save and refresh this page</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Collections */}
      {collections.length > 1 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl [font-family:'Rische-Demo',Helvetica] font-normal text-black text-center mb-12">
              Explore Other Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections
                .filter(col => col.slug !== slug)
                .slice(0, 3)
                .map(collection => (
                  <Link 
                    key={collection.id} 
                    href={`/collections/${collection.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="relative h-48 overflow-hidden">
                        {collection.image ? (
                          <img 
                            src={collection.image} 
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">{collection.name}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-xl font-semibold text-white">{collection.name}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
