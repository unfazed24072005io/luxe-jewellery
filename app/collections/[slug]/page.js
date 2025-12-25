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

async function getCollectionProducts(collectionName) {
  try {
    const q = query(collection(db, 'products'), where('collection', '==', collectionName));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return [];
  }
}

export default async function CollectionDetailPage({ params }) {
  const collectionData = await getCollection(params.slug);
  
  if (!collectionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Collection Not Found</h1>
          <Link href="/collections" className="btn-primary">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const products = await getCollectionProducts(collectionData.name);

  return (
    <div className="min-h-screen bg-white">
      {/* Collection Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-yellow-500">
            {collectionData.name}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {collectionData.description || 'A curated collection of exquisite pieces'}
          </p>
        </div>
      </div>

      {/* Products in Collection */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">
          Products in this Collection
        </h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products in this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}