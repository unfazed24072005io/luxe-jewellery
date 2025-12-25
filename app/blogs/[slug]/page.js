import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import Link from 'next/link';

async function getBlog(slug) {
  try {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export default async function BlogDetailPage({ params }) {
  const blog = await getBlog(params.slug);
  
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/blogs" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Blog Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-serif font-bold mb-6">{blog.title}</h1>
          <div className="flex items-center text-gray-600 text-sm">
            <time>{blog.date || 'Recent'}</time>
            <span className="mx-3">•</span>
            <span>{blog.author || 'LUXE Team'}</span>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-12">
            <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover" />
          </div>
        )}

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            {blog.excerpt || 'Discover the latest trends and stories from the world of luxury jewellery.'}
          </p>
          
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {blog.content || 'Blog content goes here. This is a placeholder for the full article content.'}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-16 pt-8 border-t">
          <Link href="/blogs" className="text-yellow-600 hover:text-yellow-700 font-semibold">
            ← Back to Blog
          </Link>
        </div>
      </article>
    </div>
  );
}