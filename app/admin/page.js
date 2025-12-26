'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Admin panel states
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [productForm, setProductForm] = useState({
    name: '', slug: '', price: '', category: '', material: '', collection: '', description: '', image: ''
  });
  const [collectionForm, setCollectionForm] = useState({
    name: '', slug: '', description: '', image: ''
  });
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', excerpt: '', content: '', author: '', date: '', image: ''
  });

  const [editingId, setEditingId] = useState(null);
const fetchAllData = async () => {
    setLoading(true);
    try {
      const [productsSnap, collectionsSnap, blogsSnap] = await Promise.all([
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'collections')),
        getDocs(collection(db, 'blogs'))
      ]);

      setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setCollections(collectionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setBlogs(blogsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Check console.');
    }
    setLoading(false);
  };
  // Check login status on mount
  useEffect(() => {
    const loggedIn = localStorage.getItem('luxe_admin_logged_in');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      fetchAllData();
    }
  }, []);

  // Login function
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (username === 'admin' && password === 'luxe@2024') {
      localStorage.setItem('luxe_admin_logged_in', 'true');
      setIsLoggedIn(true);
      fetchAllData();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('luxe_admin_logged_in');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // Login Page - Compact & Professional
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900">LUXE</h1>
            <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Sign in to continue</h2>
            
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-black text-white py-2.5 rounded hover:bg-gray-800 transition-colors font-medium"
              >
                Sign In
              </button>
            </form>

           
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-400 text-xs mt-6">
            © 2025 LUXE Jewellery. Admin Access Only.
          </p>
        </div>
      </div>
    );
  }

  // ADMIN PANEL FUNCTIONS
  

  // Product CRUD
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...productForm, price: parseFloat(productForm.price) };
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), data);
        alert('Product updated!');
      } else {
        await addDoc(collection(db, 'products'), data);
        alert('Product added!');
      }
      resetProductForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Check console.');
    }
  };

  const editProduct = (product) => {
    setProductForm(product);
    setEditingId(product.id);
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      alert('Product deleted!');
      fetchAllData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product.');
    }
  };

  const resetProductForm = () => {
    setProductForm({ name: '', slug: '', price: '', category: '', material: '', collection: '', description: '', image: '' });
    setEditingId(null);
  };

  // Collection CRUD
  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'collections', editingId), collectionForm);
        alert('Collection updated!');
      } else {
        await addDoc(collection(db, 'collections'), collectionForm);
        alert('Collection added!');
      }
      resetCollectionForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('Error saving collection.');
    }
  };

  const editCollection = (col) => {
    setCollectionForm(col);
    setEditingId(col.id);
  };

  const deleteCollection = async (id) => {
    if (!confirm('Delete this collection?')) return;
    try {
      await deleteDoc(doc(db, 'collections', id));
      alert('Collection deleted!');
      fetchAllData();
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const resetCollectionForm = () => {
    setCollectionForm({ name: '', slug: '', description: '', image: '' });
    setEditingId(null);
  };

  // Blog CRUD
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'blogs', editingId), blogForm);
        alert('Blog updated!');
      } else {
        await addDoc(collection(db, 'blogs'), blogForm);
        alert('Blog added!');
      }
      resetBlogForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog.');
    }
  };

  const editBlog = (blog) => {
    setBlogForm(blog);
    setEditingId(blog.id);
  };

  const deleteBlog = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
      alert('Blog deleted!');
      fetchAllData();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const resetBlogForm = () => {
    setBlogForm({ title: '', slug: '', excerpt: '', content: '', author: '', date: '', image: '' });
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // ADMIN PANEL UI
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">LUXE Admin</h1>
              <p className="text-sm text-gray-500">Manage store content</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex border-b mb-6">
          {['products', 'collections', 'blogs'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setEditingId(null); }}
              className={`px-5 py-2 text-sm font-medium capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-5">
              <h2 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Product' : 'Add Product'}
              </h2>
              <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Name *" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="px-3 py-2 border rounded text-sm" required />
                <input type="text" placeholder="Slug *" value={productForm.slug} onChange={e => setProductForm({...productForm, slug: e.target.value})} className="px-3 py-2 border rounded text-sm" required />
                <input type="number" placeholder="Price *" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="px-3 py-2 border rounded text-sm" required />
                <input type="text" placeholder="Category" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="px-3 py-2 border rounded text-sm" />
                <input type="text" placeholder="Material" value={productForm.material} onChange={e => setProductForm({...productForm, material: e.target.value})} className="px-3 py-2 border rounded text-sm" />
                <input type="text" placeholder="Collection" value={productForm.collection} onChange={e => setProductForm({...productForm, collection: e.target.value})} className="px-3 py-2 border rounded text-sm" />
                <input type="text" placeholder="Image URL" value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} className="px-3 py-2 border rounded text-sm md:col-span-2" />
                <textarea placeholder="Description" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="px-3 py-2 border rounded text-sm md:col-span-2" rows="2" />
                <div className="md:col-span-2 flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800">
                    {editingId ? 'Update' : 'Add Product'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetProductForm} className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg border p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Products ({products.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Price</th>
                      <th className="px-3 py-2 text-left">Category</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-t">
                        <td className="px-3 py-3">{product.name}</td>
                        <td className="px-3 py-3">${product.price}</td>
                        <td className="px-3 py-3">{product.category}</td>
                        <td className="px-3 py-3 text-right">
                          <button onClick={() => editProduct(product)} className="text-blue-600 hover:underline mr-3 text-sm">Edit</button>
                          <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-5">
              <h2 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Collection' : 'Add Collection'}
              </h2>
              <form onSubmit={handleCollectionSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Name *" value={collectionForm.name} onChange={e => setCollectionForm({...collectionForm, name: e.target.value})} className="px-3 py-2 border rounded text-sm" required />
                <input type="text" placeholder="Slug *" value={collectionForm.slug} onChange={e => setCollectionForm({...collectionForm, slug: e.target.value})} className="px-3 py-2 border rounded text-sm" required />
                <input type="text" placeholder="Image URL" value={collectionForm.image} onChange={e => setCollectionForm({...collectionForm, image: e.target.value})} className="px-3 py-2 border rounded text-sm md:col-span-2" />
                <textarea placeholder="Description" value={collectionForm.description} onChange={e => setCollectionForm({...collectionForm, description: e.target.value})} className="px-3 py-2 border rounded text-sm md:col-span-2" rows="2" />
                <div className="md:col-span-2 flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800">
                    {editingId ? 'Update' : 'Add Collection'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetCollectionForm} className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg border p-5">
              <h3 className="font-semibold mb-4">Collections ({collections.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Slug</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collections.map(col => (
                      <tr key={col.id} className="border-t">
                        <td className="px-3 py-3">{col.name}</td>
                        <td className="px-3 py-3">{col.slug}</td>
                        <td className="px-3 py-3 text-right">
                          <button onClick={() => editCollection(col)} className="text-blue-600 hover:underline mr-3 text-sm">Edit</button>
                          <button onClick={() => deleteCollection(col.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-5">
              <h2 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Blog Post' : 'Add Blog Post'}
              </h2>
              <form onSubmit={handleBlogSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Title *" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="px-3 py-2 border rounded text-sm md:col-span-2" required />
                <input type="text" placeholder="Slug *" value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})} className="px-3 py-2 border rounded text-sm" required />
                <input type="text" placeholder="Author" value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})} className="px-3 py-2 border rounded text-sm" />
                <input type="date" value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})} className="px-3 py-2 border rounded text-sm" />
                <input type="text" placeholder="Image URL" value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})} className="px-3 py-2 border rounded text-sm" />
                <textarea placeholder="Excerpt" value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} className="px-3 py-2 border rounded text-sm md:col-span-2" rows="2" />
                <textarea placeholder="Content" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="px-3 py-2 border rounded text-sm md:col-span-2" rows="4" />
                <div className="md:col-span-2 flex gap-2">
                  <button type="submit" className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800">
                    {editingId ? 'Update' : 'Add Post'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={resetBlogForm} className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg border p-5">
              <h3 className="font-semibold mb-4">Blog Posts ({blogs.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left">Title</th>
                      <th className="px-3 py-2 text-left">Author</th>
                      <th className="px-3 py-2 text-left">Date</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map(blog => (
                      <tr key={blog.id} className="border-t">
                        <td className="px-3 py-3">{blog.title}</td>
                        <td className="px-3 py-3">{blog.author}</td>
                        <td className="px-3 py-3">{blog.date}</td>
                        <td className="px-3 py-3 text-right">
                          <button onClick={() => editBlog(blog)} className="text-blue-600 hover:underline mr-3 text-sm">Edit</button>
                          <button onClick={() => deleteBlog(blog.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
