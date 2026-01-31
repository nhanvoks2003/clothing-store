'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  // State lưu dữ liệu form
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    image: '', 
    description: '' 
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1. Lấy dữ liệu cũ
  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name || '',
          price: data.price || '',
          image: data.image || '',
          description: data.description || ''
        });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // 2. Hàm lưu (Update)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert('Đã lưu thay đổi thành công!');
        router.push(`/products/${id}`);
      } else {
        alert('Lỗi khi lưu');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // 3. Hàm xóa (Delete)
  const handleDelete = async () => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      router.push('/');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // --- GIAO DIỆN CHUẨN THEO HTML CỦA BẠN ---
  return (
    <div className="bg-[#f5f7f8] dark:bg-[#0f1c23] text-[#111618] dark:text-white min-h-screen font-[Plus_Jakarta_Sans]">
      
      {/* HEADER */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="size-8 text-[#06a8f9]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-[#111618] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Clothify Admin</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="hidden md:flex items-center gap-9">
            <Link className="text-[#111618] dark:text-gray-300 text-sm font-medium hover:text-[#06a8f9] transition-colors" href="/admin">Dashboard</Link>
            <span className="text-[#06a8f9] text-sm font-semibold">Products</span>
            <span className="text-[#111618] dark:text-gray-300 text-sm font-medium hover:text-[#06a8f9] transition-colors cursor-pointer">Orders</span>
          </nav>
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#06a8f9]/20" style={{ backgroundImage: 'url("https://via.placeholder.com/150")' }}></div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-[640px]">
          
          <div className="mb-6">
            <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm font-medium text-[#5f7d8c] dark:text-gray-400 hover:text-[#06a8f9] transition-colors group">
              <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Back to Dashboard
            </button>
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-[#111618] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Edit Product</h1>
            <p className="text-[#5f7d8c] dark:text-gray-400 text-base font-normal leading-normal">Modify the existing product details in your catalog.</p>
          </div>

          {/* FORM AREA */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-[#dbe2e6] dark:border-gray-800 p-8">
            <form onSubmit={handleUpdate} className="space-y-6">
              
              <div className="flex flex-col gap-2">
                <label className="flex flex-col">
                  <span className="text-[#111618] dark:text-gray-200 text-sm font-semibold pb-2">Product Name</span>
                  <input 
                    className="w-full rounded-lg text-[#111618] dark:text-white dark:bg-gray-800 border border-[#dbe2e6] dark:border-gray-700 focus:border-[#06a8f9] focus:ring-2 focus:ring-[#06a8f9]/20 h-14 px-4 text-base font-normal outline-none"
                    placeholder="e.g. Vintage Denim Jacket" 
                    required 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                </label>
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex flex-col">
                  <span className="text-[#111618] dark:text-gray-200 text-sm font-semibold pb-2">Description</span>
                  <textarea 
                    className="w-full rounded-lg text-[#111618] dark:text-white dark:bg-gray-800 border border-[#dbe2e6] dark:border-gray-700 focus:border-[#06a8f9] focus:ring-2 focus:ring-[#06a8f9]/20 min-h-36 p-4 text-base font-normal resize-none outline-none"
                    placeholder="Provide details about fabric, fit, and style..."
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="flex flex-col">
                    <span className="text-[#111618] dark:text-gray-200 text-sm font-semibold pb-2">Price ($)</span>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input 
                        className="w-full rounded-lg text-[#111618] dark:text-white dark:bg-gray-800 border border-[#dbe2e6] dark:border-gray-700 focus:border-[#06a8f9] focus:ring-2 focus:ring-[#06a8f9]/20 h-14 pl-8 pr-4 text-base font-normal outline-none"
                        placeholder="0.00" 
                        required 
                        step="0.01" 
                        type="number" 
                        value={form.price}
                        onChange={(e) => setForm({...form, price: e.target.value})}
                      />
                    </div>
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="flex flex-col">
                    <span className="text-[#111618] dark:text-gray-200 text-sm font-semibold pb-2">Category</span>
                    <select className="w-full rounded-lg text-[#111618] dark:text-white dark:bg-gray-800 border border-[#dbe2e6] dark:border-gray-700 focus:border-[#06a8f9] focus:ring-2 focus:ring-[#06a8f9]/20 h-14 px-4 text-base font-normal outline-none" disabled>
                      <option value="outerwear">Outerwear (Mặc định)</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex flex-col">
                  <span className="text-[#111618] dark:text-gray-200 text-sm font-semibold pb-2">Image URL</span>
                  <div className="flex gap-4">
                    <input 
                      className="flex-1 rounded-lg text-[#111618] dark:text-white dark:bg-gray-800 border border-[#dbe2e6] dark:border-gray-700 focus:border-[#06a8f9] focus:ring-2 focus:ring-[#06a8f9]/20 h-14 px-4 text-base font-normal outline-none"
                      type="url" 
                      value={form.image}
                      onChange={(e) => setForm({...form, image: e.target.value})}
                    />
                    <div className="size-14 rounded-lg border border-[#dbe2e6] dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0 overflow-hidden">
                      {form.image ? (
                         <img alt="Thumbnail" className="w-full h-full object-cover" src={form.image} />
                      ) : (
                         <span className="material-symbols-outlined text-gray-400">image</span>
                      )}
                    </div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-[#dbe2e6] dark:border-gray-800 mt-8">
                <button 
                  type="button" 
                  onClick={() => router.back()}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-[#111618] dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#06a8f9] text-white font-bold shadow-md hover:bg-[#06a8f9]/90 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* DANGER ZONE */}
          <div className="mt-8 overflow-hidden rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10">
            <div className="px-6 py-4 border-b border-red-100 dark:border-red-900/20 bg-red-50/50 dark:bg-red-900/20">
              <h4 className="text-red-700 dark:text-red-400 font-bold text-sm uppercase tracking-wider">Danger Zone</h4>
            </div>
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h5 className="text-[#111618] dark:text-white font-semibold">Delete this product</h5>
                <p className="text-[#5f7d8c] dark:text-gray-400 text-sm">Once you delete a product, there is no going back. Please be certain.</p>
              </div>
              <button 
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-sm whitespace-nowrap"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10 text-center text-[#5f7d8c] text-sm">
        <p>© 2024 Clothify Admin Dashboard. Built for Academic Project.</p>
      </footer>
    </div>
  );
}