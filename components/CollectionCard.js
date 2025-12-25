import Link from 'next/link';

export default function CollectionCard({ collection }) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group">
      <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden relative">
          {collection.image ? (
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="font-serif font-bold text-2xl mb-2">{collection.name}</h3>
            <p className="text-sm text-gray-200 line-clamp-2">{collection.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}