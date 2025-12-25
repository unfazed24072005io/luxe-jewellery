import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import CollectionCard from '@/components/CollectionCard';

async function getCollections() {
  try {
    const snapshot = await getDocs(collection(db, 'collections'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-bold text-yellow-500">Our Collections</h1>
          <p className="mt-4 text-gray-300">Curated selections of our finest pieces</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No collections available yet.</p>
            <p className="text-gray-400 mt-2">Add collections via the Admin panel.</p>
          </div>
        )}
      </div>
    </div>
  );
}