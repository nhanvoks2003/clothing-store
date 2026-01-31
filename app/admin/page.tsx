'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Lấy dữ liệu sản phẩm
  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Hàm xóa sản phẩm
  const handleDelete = async (id: number) => {
    if (!confirm('⚠️ CẢNH BÁO: Bạn có chắc chắn muốn xóa sản phẩm này không?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Đã xóa thành công!');
        fetchProducts(); // Load lại danh sách
      } else {
        alert('Lỗi khi xóa');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 3. Lọc sản phẩm theo tìm kiếm
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#f5f7f8] dark:bg-[#0f1c23] min-h-screen text-[#111618] dark:text-white font-[Plus_Jakarta_Sans]">
      <div className="flex h-full flex-col">
        
        {/* TOP NAVIGATION */}
        <header className="flex items-center justify-between border-b border-[#dbe2e6] dark:border-[#2d3a43] px-10 py-3 bg-white dark:bg-[#1a2b34] sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="size-6 text-[#06a8f9]">
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">inventory_2</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">Admin Store</h2>
          </Link>
          <div className="flex flex-1 justify-end gap-8">
            <nav className="flex items-center gap-9 max-md:hidden">
              <span className="text-[#06a8f9] text-sm font-bold cursor-pointer">Dashboard</span>
              <Link href="/" className="text-sm font-medium hover:text-[#06a8f9] transition-colors">View Shop</Link>
            </nav>
            <div className="flex items-center gap-4">
               <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#dbe2e6]" style={{ backgroundImage: 'url("https://via.placeholder.com/150")' }}></div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex flex-1 justify-center py-8">
          <div className="flex flex-col w-full max-w-[1200px] px-6 lg:px-10">
            
            {/* PAGE HEADING */}
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-[#111618] dark:text-white text-4xl font-black tracking-tight">Product Management</h1>
                <p className="text-[#5f7d8c] dark:text-[#a0aec0] text-base">Monitor stock levels and manage your retail inventory.</p>
              </div>
              
              {/* NÚT THÊM MỚI (Dẫn sang trang create mà bạn cần tạo ở bước sau) */}
              <Link href="/products/create" className="flex items-center gap-2 min-w-[160px] justify-center rounded-lg h-12 px-6 bg-[#06a8f9] text-white text-sm font-bold hover:shadow-lg hover:bg-[#0590d6] transition-all">
                <span className="material-symbols-outlined">add</span>
                <span className="truncate">Add New Product</span>
              </Link>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2b34] border border-[#dbe2e6] dark:border-[#2d3a43] shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[#5f7d8c] dark:text-[#a0aec0] text-sm font-semibold uppercase tracking-wider">Total Products</p>
                  <span className="material-symbols-outlined text-[#06a8f9]">checkroom</span>
                </div>
                <p className="text-[#111618] dark:text-white text-3xl font-bold">{products.length}</p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2b34] border border-[#dbe2e6] dark:border-[#2d3a43] shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[#5f7d8c] dark:text-[#a0aec0] text-sm font-semibold uppercase tracking-wider">Low Stock</p>
                  <span className="material-symbols-outlined text-amber-500">warning</span>
                </div>
                <p className="text-[#111618] dark:text-white text-3xl font-bold">3</p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#1a2b34] border border-[#dbe2e6] dark:border-[#2d3a43] shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-[#5f7d8c] dark:text-[#a0aec0] text-sm font-semibold uppercase tracking-wider">Active Categories</p>
                  <span className="material-symbols-outlined text-green-500">category</span>
                </div>
                <p className="text-[#111618] dark:text-white text-3xl font-bold">4</p>
              </div>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="flex items-center h-12 w-full bg-white dark:bg-[#1a2b34] rounded-lg border border-[#dbe2e6] dark:border-[#2d3a43] px-4 shadow-sm group focus-within:border-[#06a8f9]">
                  <span className="material-symbols-outlined text-[#5f7d8c] mr-2 group-focus-within:text-[#06a8f9]">search</span>
                  <input 
                    className="flex w-full bg-transparent border-none focus:ring-0 text-[#111618] dark:text-white placeholder:text-[#5f7d8c] text-base" 
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 h-12 px-4 bg-white dark:bg-[#1a2b34] rounded-lg border border-[#dbe2e6] dark:border-[#2d3a43] text-[#5f7d8c] hover:bg-gray-50 transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                  <span className="text-sm font-semibold">Filters</span>
                </button>
              </div>
            </div>

            {/* PRODUCT TABLE */}
            <div className="bg-white dark:bg-[#1a2b34] rounded-xl border border-[#dbe2e6] dark:border-[#2d3a43] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8fafb] dark:bg-[#13222b] border-b border-[#dbe2e6] dark:border-[#2d3a43]">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#5f7d8c]">ID</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#5f7d8c]">Thumbnail</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#5f7d8c]">Product Name</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#5f7d8c]">Category</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#5f7d8c]">Price</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#5f7d8c] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dbe2e6] dark:divide-[#2d3a43]">
                    
                    {loading ? (
                      <tr><td colSpan={6} className="p-10 text-center text-gray-500">Đang tải dữ liệu...</td></tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr><td colSpan={6} className="p-10 text-center text-gray-500">Không tìm thấy sản phẩm nào.</td></tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-[#253641] transition-colors group">
                          <td className="px-6 py-4 text-sm font-medium text-[#5f7d8c]">#{product.id}</td>
                          <td className="px-6 py-4">
                            <div 
                                className="size-12 rounded-lg bg-cover bg-center border border-[#dbe2e6]" 
                                style={{ backgroundImage: `url("${product.image || 'https://via.placeholder.com/150'}")` }}
                            ></div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-[#111618] dark:text-white truncate max-w-[200px]">{product.name}</div>
                            <div className="text-xs text-[#5f7d8c]">SKU: PRD-{product.id}-X</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wide rounded bg-blue-100 text-blue-600">Fashion</span>
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-[#111618] dark:text-white">${Number(product.price).toLocaleString()}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              {/* Nút Sửa */}
                              <Link href={`/products/${product.id}/edit`} className="p-2 text-[#5f7d8c] hover:text-[#06a8f9] transition-colors">
                                <span className="material-symbols-outlined">edit</span>
                              </Link>
                              {/* Nút Xóa */}
                              <button onClick={() => handleDelete(product.id)} className="p-2 text-[#5f7d8c] hover:text-red-500 transition-colors">
                                <span className="material-symbols-outlined">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}

                  </tbody>
                </table>
              </div>
              
              {/* Pagination (Tĩnh) */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#dbe2e6] dark:border-[#2d3a43]">
                <span className="text-sm text-[#5f7d8c]">Showing {filteredProducts.length} results</span>
                <div className="flex gap-2">
                   <button className="flex items-center justify-center size-10 rounded border border-[#dbe2e6] hover:bg-gray-50"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                   <button className="flex items-center justify-center size-10 rounded bg-[#06a8f9] text-white font-bold text-sm">1</button>
                   <button className="flex items-center justify-center size-10 rounded border border-[#dbe2e6] hover:bg-gray-50"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                </div>
              </div>
            </div>

            {/* Note Alert */}
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 flex items-start gap-4">
              <span className="material-symbols-outlined text-red-500 mt-1">info</span>
              <div>
                {/* ĐÃ SỬA LỖI TẠI ĐÂY: class -> className */}
                <h4 className="text-sm font-bold text-red-800 dark:text-red-400">Important Note</h4>
                <p className="text-xs text-red-700 dark:text-red-400/80">Deleting a product is permanent. All associated sales data will be archived.</p>
              </div>
            </div>

          </div>
        </main>

        <footer className="mt-auto py-8 border-t border-[#dbe2e6] bg-white dark:bg-[#1a2b34] text-center">
          <p className="text-[#5f7d8c] text-sm">© 2024 Academic Project - Store Manager Dashboard</p>
        </footer>
      </div>
    </div>
  );
}