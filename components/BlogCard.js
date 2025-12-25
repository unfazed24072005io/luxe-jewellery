import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group">
      <article className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        <div className="aspect-video bg-gray-200 overflow-hidden">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="text-sm text-gray-500 mb-2">
            {blog.date || 'Recent'} • {blog.author || 'LUXE Team'}
          </div>
          <h3 className="font-serif font-bold text-xl mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 flex-1">
            {blog.excerpt || 'Discover the latest trends and stories from the world of luxury jewellery...'}
          </p>
          <div className="mt-4">
            <span className="text-yellow-600 font-semibold text-sm group-hover:underline">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}