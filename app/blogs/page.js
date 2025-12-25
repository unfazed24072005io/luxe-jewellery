import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import BlogCard from '@/components/BlogCard';

async function getBlogs() {
  try {
    const snapshot = await getDocs(collection(db, 'blogs'));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-serif font-bold text-yellow-500">Our Blog</h1>
          <p className="mt-4 text-gray-300">Stories, trends, and insights from the world of luxury jewellery</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No blog posts available yet.</p>
            <p className="text-gray-400 mt-2">Add blog posts via the Admin panel.</p>
          </div>
        )}
      </div>
    </div>
  );
}