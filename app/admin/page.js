'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  // Admin panel states
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // File upload refs
  const fileInputRefs = useRef([]);
  const collectionFileInputRef = useRef(null);

  // Form states with additional fields
  const [productForm, setProductForm] = useState({
    name: '', 
    slug: '', 
    price: '', 
    category: 'earrings', 
    gender: 'both', // men, women, both
    material: '925 Silver', 
    collection: '', 
    description: '', 
    images: [], // Array of uploaded image URLs
    imageFiles: [], // Array of File objects for upload
    featured: false,
    inStock: true,
    sku: '',
    weight: '',
    dimensions: '',
    style: '', // style field
    stones: '',
    careInstructions: ''
  });

  const [collectionForm, setCollectionForm] = useState({
    name: '', 
    slug: '', 
    description: '', 
    image: '',
    imageFile: null, // File object for upload
    gender: 'both', // who the collection is for
    style: '', // collection style/theme
    featured: false,
    products: [] // Array of product IDs in this collection
  });

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
  // Category and style options
  const categories = ['Earrings', 'Pendants', 'Bracelets', 'Rings', 'Chains', 'Charms', 'Studs'];
  const genderOptions = [
    { value: 'men', label: 'For Men' },
    { value: 'women', label: 'For Women' },
    { value: 'both', label: 'For Men & Women' }
  ];
  const styleOptions = ['Minimalist', 'Modern', 'Vintage', 'Statement', 'Everyday', 'Festival', 'Bridal'];

  useEffect(() => {
    const loggedIn = localStorage.getItem('luxe_admin_logged_in');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [productsSnap, collectionsSnap] = await Promise.all([
        getDocs(collection(db, 'products')),
        getDocs(collection(db, 'collections'))
      ]);

      setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setCollections(collectionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Check console.');
    }
    setLoading(false);
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file) => {
    if (!file) return null;
    
    try {
      const storage = getStorage();
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
      const storageRef = ref(storage, `products/${fileName}`);
      
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      return null;
    }
  };

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
    setUploading(true);
    
    try {
      // Upload product images
      const uploadedImageUrls = [];
      for (const file of productForm.imageFiles) {
        if (file) {
          const url = await uploadImage(file);
          if (url) uploadedImageUrls.push(url);
        }
      }

      const data = { 
        ...productForm,
        price: parseFloat(productForm.price),
        weight: parseFloat(productForm.weight) || 0,
        featured: Boolean(productForm.featured),
        inStock: Boolean(productForm.inStock),
        createdAt: new Date().toISOString(),
        images: [...productForm.images, ...uploadedImageUrls] // Combine existing and new images
      };
      
      // Remove file objects from data before saving to Firestore
      delete data.imageFiles;
      
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), data);
        alert('Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), data);
        alert('Product added successfully!');
      }
      resetProductForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Check console.');
    } finally {
      setUploading(false);
    }
  };

  const editProduct = (product) => {
    setProductForm({
      ...product,
      images: product.images || [],
      imageFiles: [],
      price: product.price?.toString() || '',
      weight: product.weight?.toString() || ''
    });
    setEditingId(product.id);
  };

  const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      alert('Product deleted successfully!');
      fetchAllData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product.');
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '', slug: '', price: '', category: 'earrings', gender: 'both',
      material: '925 Silver', collection: '', description: '', 
      images: [], imageFiles: [], featured: false, inStock: true,
      sku: '', weight: '', dimensions: '', style: '', stones: '', careInstructions: ''
    });
    setEditingId(null);
  };

  // Handle product image file selection
  const handleProductImageChange = (e, index) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImageFiles = [...productForm.imageFiles];
      const file = files[0];
      
      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...productForm.images];
        if (index >= newImages.length) {
          newImages.push(e.target.result);
        } else {
          newImages[index] = e.target.result;
        }
        setProductForm({...productForm, images: newImages});
      };
      reader.readAsDataURL(file);
      
      newImageFiles[index] = file;
      setProductForm({...productForm, imageFiles: newImageFiles });
    }
  };

  // Handle collection image file selection
  const handleCollectionImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setCollectionForm({
          ...collectionForm, 
          image: e.target.result,
          imageFile: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Collection CRUD
  const handleCollectionSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // Upload collection image if exists
      let imageUrl = collectionForm.image;
      if (collectionForm.imageFile) {
        const url = await uploadImage(collectionForm.imageFile);
        if (url) imageUrl = url;
      }

      const data = { 
        ...collectionForm,
        image: imageUrl,
        featured: Boolean(collectionForm.featured),
        createdAt: new Date().toISOString(),
        products: collectionForm.products || []
      };
      
      // Remove file object from data before saving to Firestore
      delete data.imageFile;
      
      if (editingId) {
        await updateDoc(doc(db, 'collections', editingId), data);
        alert('Collection updated successfully!');
      } else {
        await addDoc(collection(db, 'collections'), data);
        alert('Collection added successfully!');
      }
      resetCollectionForm();
      fetchAllData();
    } catch (error) {
      console.error('Error saving collection:', error);
      alert('Error saving collection.');
    } finally {
      setUploading(false);
    }
  };

  const editCollection = (col) => {
    setCollectionForm({
      ...col,
      products: col.products || []
    });
    setEditingId(col.id);
  };

  const deleteCollection = async (id) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;
    try {
      await deleteDoc(doc(db, 'collections', id));
      alert('Collection deleted successfully!');
      fetchAllData();
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  };

  const resetCollectionForm = () => {
    setCollectionForm({
      name: '', slug: '', description: '', image: '',
      imageFile: null, gender: 'both', style: '', featured: false, products: []
    });
    setEditingId(null);
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gray-800">Dia</span>
              <span className="text-cyan-600">Mantra</span>
            </h1>
            <p className="text-gray-600">Admin Dashboard</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
            
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-gray-900 text-white py-3.5 rounded-lg hover:bg-black transition-colors font-semibold shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </form>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            © 2025 DiaMantra. Admin Access Only.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-gray-800">Dia</span>
                <span className="text-cyan-600">Mantra</span> Admin
              </h1>
              <p className="text-sm text-gray-500">Manage products, collections, and more</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-black transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b mb-8 overflow-x-auto">
          {['products', 'collections'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setEditingId(null); }}
              className={`px-6 py-3 text-sm font-medium capitalize whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-cyan-600 text-cyan-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              
              <form onSubmit={handleProductSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      placeholder="Product name"
                      value={productForm.name}
                      onChange={e => setProductForm({...productForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      placeholder="product-slug"
                      value={productForm.slug}
                      onChange={e => setProductForm({...productForm, slug: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="99.99"
                      value={productForm.price}
                      onChange={e => setProductForm({...productForm, price: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Category & Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={productForm.category}
                      onChange={e => setProductForm({...productForm, category: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select
                      value={productForm.gender}
                      onChange={e => setProductForm({...productForm, gender: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    >
                      {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                    <select
                      value={productForm.style}
                      onChange={e => setProductForm({...productForm, style: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="">Select style</option>
                      {styleOptions.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Material & Collection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                    <input
                      type="text"
                      placeholder="925 Silver, Gold Plated, etc."
                      value={productForm.material}
                      onChange={e => setProductForm({...productForm, material: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Collection</label>
                    <select
                      value={productForm.collection}
                      onChange={e => setProductForm({...productForm, collection: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="">No collection</option>
                      {collections.map(col => (
                        <option key={col.id} value={col.slug}>{col.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Product Images - File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images (Upload from computer)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="relative">
                        <input
                          type="file"
                          ref={el => fileInputRefs.current[index] = el}
                          onChange={(e) => handleProductImageChange(e, index)}
                          accept="image/*"
                          className="hidden"
                          id={`product-image-${index}`}
                        />
                        <label
                          htmlFor={`product-image-${index}`}
                          className="block w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-cyan-500 transition-colors overflow-hidden"
                        >
                          {productForm.images[index] ? (
                            <div className="relative w-full h-full">
                              <img
                                src={productForm.images[index]}
                                alt={`Product ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const newImages = [...productForm.images];
                                  const newImageFiles = [...productForm.imageFiles];
                                  newImages.splice(index, 1);
                                  newImageFiles.splice(index, 1);
                                  setProductForm({
                                    ...productForm,
                                    images: newImages,
                                    imageFiles: newImageFiles
                                  });
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs">Upload Image {index + 1}</span>
                            </div>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload up to 4 images. First image will be the main product image.
                  </p>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                    <input
                      type="text"
                      placeholder="DM-001"
                      value={productForm.sku}
                      onChange={e => setProductForm({...productForm, sku: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (g)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="5.2"
                      value={productForm.weight}
                      onChange={e => setProductForm({...productForm, weight: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Stones & Care */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stones</label>
                    <input
                      type="text"
                      placeholder="Lab diamonds, cubic zirconia, etc."
                      value={productForm.stones}
                      onChange={e => setProductForm({...productForm, stones: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
                    <input
                      type="text"
                      placeholder="Avoid water, store in box, etc."
                      value={productForm.careInstructions}
                      onChange={e => setProductForm({...productForm, careInstructions: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Detailed product description..."
                    value={productForm.description}
                    onChange={e => setProductForm({...productForm, description: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-32"
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={productForm.featured}
                      onChange={e => setProductForm({...productForm, featured: e.target.checked})}
                      className="rounded text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">Featured Product</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={e => setProductForm({...productForm, inStock: e.target.checked})}
                      className="rounded text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">In Stock</span>
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={uploading}
                    className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                      uploading
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700'
                    }`}
                  >
                    {uploading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : editingId ? 'Update Product' : 'Add Product'}
                  </button>
                  
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetProductForm}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-xl shadow border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">All Products ({products.length})</h3>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-cyan-100 text-cyan-800 rounded">Featured: {products.filter(p => p.featured).length}</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    Men: {products.filter(p => p.gender === 'men').length}
                  </span>
                  <span className="text-xs px-2 py-1 bg-pink-100 text-pink-800 rounded">
                    Women: {products.filter(p => p.gender === 'women').length}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                    Both: {products.filter(p => p.gender === 'both').length}
                  </span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                      <th className="px-4py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {product.images?.[0] && (
                              <img src={product.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              {product.featured && (
                                <span className="text-xs text-cyan-600">★ Featured</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">${product.price}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded capitalize">{product.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded capitalize ${
                            product.gender === 'men' ? 'bg-blue-100 text-blue-800' :
                            product.gender === 'women' ? 'bg-pink-100 text-pink-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {product.gender}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded ${
                            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => editProduct(product)}
                              className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
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
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow border p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {editingId ? '✏️ Edit Collection' : '➕ Add New Collection'}
              </h2>
              
              <form onSubmit={handleCollectionSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      placeholder="Collection name"
                      value={collectionForm.name}
                      onChange={e => setCollectionForm({...collectionForm, name: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                    <input
                      type="text"
                      placeholder="collection-slug"
                      value={collectionForm.slug}
                      onChange={e => setCollectionForm({...collectionForm, slug: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Gender & Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Gender *</label>
                    <select
                      value={collectionForm.gender}
                      onChange={e => setCollectionForm({...collectionForm, gender: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      required
                    >
                      {genderOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Style/Theme</label>
                    <select
                      value={collectionForm.style}
                      onChange={e => setCollectionForm({...collectionForm, style: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="">Select style</option>
                      {styleOptions.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image *</label>
                  <div className="mt-1 flex items-center gap-4">
                    <input
                      type="file"
                      ref={collectionFileInputRef}
                      onChange={handleCollectionImageChange}
                      accept="image/*"
                      className="hidden"
                      id="collection-image"
                    />
                    <label
                      htmlFor="collection-image"
                      className="cursor-pointer"
                    >
                      <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-cyan-500 transition-colors">
                        {collectionForm.image ? (
                          <div className="relative w-full h-full">
                            <img
                              src={collectionForm.image}
                              alt="Collection preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setCollectionForm({...collectionForm, image: '', imageFile: null});
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">Upload Image</span>
                          </div>
                        )}
                      </div>
                    </label>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Upload a cover image for this collection</p>
                      <p className="text-xs text-gray-500">Recommended: 1200x800px, JPG or PNG</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Collection description..."
                    value={collectionForm.description}
                    onChange={e => setCollectionForm({...collectionForm, description: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent h-32"
                  />
                </div>

                {/* Products in Collection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Add Products to Collection</label>
                  <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                    {products.length === 0 ? (
                      <p className="text-sm text-gray-500">No products available. Add products first.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {products.map(product => (
                          <label key={product.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                            <input
                              type="checkbox"
                              checked={collectionForm.products?.includes(product.id) || false}
                              onChange={(e) => {
                                const newProducts = e.target.checked
                                  ? [...(collectionForm.products || []), product.id]
                                  : (collectionForm.products || []).filter(id => id !== product.id);
                                setCollectionForm({...collectionForm, products: newProducts});
                              }}
                              className="mt-1 rounded text-cyan-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                {product.images?.[0] && (
                                  <img src={product.images[0]} alt="" className="w-8 h-8 rounded object-cover" />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                  <div className="text-xs text-gray-500">${product.price} • {product.gender}</div>
                                </div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {collectionForm.products?.length || 0} products selected
                  </p>
                </div>

                {/* Featured */}
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={collectionForm.featured}
                      onChange={e => setCollectionForm({...collectionForm, featured: e.target.checked})}
                      className="rounded text-cyan-600 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">Featured Collection</span>
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    disabled={uploading || !collectionForm.image}
                    className={`px-6 py-3 font-medium rounded-lg transition-colors ${
                      uploading || !collectionForm.image
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-cyan-600 text-white hover:bg-cyan-700'
                    }`}
                  >
                    {uploading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </span>
                    ) : editingId ? 'Update Collection' : 'Create Collection'}
                  </button>
                  
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetCollectionForm}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Collections List */}
            <div className="bg-white rounded-xl shadow border p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">All Collections ({collections.length})</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collection</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Style</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {collections.map(collection => (
                      <tr key={collection.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {collection.image && (
                              <img src={collection.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{collection.name}</div>
                              {collection.featured && (
                                <span className="text-xs text-cyan-600">★ Featured</span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-700">{collection.products?.length || 0} products</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded capitalize ${
                            collection.gender === 'men' ? 'bg-blue-100 text-blue-800' :
                            collection.gender === 'women' ? 'bg-pink-100 text-pink-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {collection.gender}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 text-xs bg-gray-100 rounded">{collection.style || 'N/A'}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => editCollection(collection)}
                              className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCollection(collection.id)}
                              className="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
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
