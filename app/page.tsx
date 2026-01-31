'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Hàm lấy dữ liệu từ API
  const fetchProducts = (keyword = '') => {
    setLoading(true);
    fetch(`/api/products?q=${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  // 2. Chạy lần đầu
  useEffect(() => {
    fetchProducts();
  }, []);

  // 3. Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  return (
    <div className="bg-[#f5f7f8] dark:bg-[#0f1c23] min-h-screen font-[Plus_Jakarta_Sans]">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0f1c23]/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-[#06a8f9] p-1.5 rounded-lg text-white">
                <span className="material-symbols-outlined block">checkroom</span>
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">CLOTHIER</h1>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-semibold text-[#06a8f9]">Home</Link>
              <Link href="/admin" className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-[#06a8f9] transition-colors">Manage Products</Link>
            </nav>
          </div>

          {/* SEARCH BAR & FILTER */}
          <div className="flex items-center gap-4 flex-1 max-w-2xl ml-8">
            {/* Form tìm kiếm */}
            <form onSubmit={handleSearch} className="relative flex-1 group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#06a8f9] transition-colors">search</span>
              <input 
                className="w-full bg-gray-100 dark:bg-gray-800 border-2 border-transparent focus:border-[#06a8f9]/20 focus:bg-white dark:focus:bg-gray-900 rounded-xl py-2.5 pl-11 pr-4 text-sm text-gray-900 dark:text-white focus:ring-4 focus:ring-[#06a8f9]/10 transition-all outline-none" 
                placeholder="Search products..." 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>

            <div className="flex items-center gap-2 hidden sm:flex">
              <div className="relative">
                <select className="appearance-none bg-gray-100 dark:bg-gray-800 border-none rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#06a8f9]/50 cursor-pointer outline-none">
                  <option>All Categories</option>
                  <option>New Arrivals</option>
                  <option>Men's Apparel</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg">filter_list</span>
              </div>
              <div className="relative">
                <select className="appearance-none bg-gray-100 dark:bg-gray-800 border-none rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-[#06a8f9]/50 cursor-pointer outline-none">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg">swap_vert</span>
              </div>
            </div>
          </div>

          {/* USER ACTIONS */}
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <Link href="/admin" className="p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-[1200px] mx-auto px-6 py-8">
        
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Our Collection</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">Curated essentials for the modern wardrobe.</p>
          </div>
          <Link href="/admin" className="flex items-center gap-2 bg-[#06a8f9] hover:bg-[#06a8f9]/90 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-[#06a8f9]/20">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add New Product</span>
          </Link>
        </div>

        {/* TABS (Giao diện tĩnh) */}
        <div className="mb-10 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
          <div className="flex gap-8 whitespace-nowrap min-w-max">
            <a className="pb-4 border-b-2 border-[#06a8f9] text-[#06a8f9] font-bold text-sm px-1" href="#">All Collections</a>
            <a className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-bold text-sm px-1 transition-colors" href="#">New Arrivals</a>
            <a className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-bold text-sm px-1 transition-colors" href="#">Men's Apparel</a>
            <a className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-bold text-sm px-1 transition-colors" href="#">Women's Apparel</a>
            <a className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 font-bold text-sm px-1 transition-colors" href="#">Accessories</a>
          </div>
        </div>

        {/* PRODUCT GRID */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">Đang tải sản phẩm...</div>
        ) : (
          <>
            {products.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào khớp với "{searchTerm}"</p>
                  <button onClick={() => {setSearchTerm(''); fetchProducts('');}} className="mt-2 text-[#06a8f9] font-bold hover:underline">Xem tất cả</button>
               </div>
            ) : (
              // GRID ĐÃ CHỈNH SỬA: lg:grid-cols-4 (4 cột trên máy tính)
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="group flex flex-col bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                    
                    {/* HÌNH ẢNH */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <div 
                        className="w-full h-full bg-center bg-no-repeat bg-cover group-hover:scale-105 transition-transform duration-500" 
                        style={{ backgroundImage: `url('${product.image || 'https://via.placeholder.com/400'}')` }}
                      ></div>
                      {/* Badge giả lập (chỉ hiện cho một số item để demo) */}
                      {product.id % 3 === 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-900 shadow-sm">Premium</span>
                        </div>
                      )}
                    </div>
                    
                    {/* THÔNG TIN */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg truncate w-full">{product.name}</h3>
                        <span className="font-bold text-[#06a8f9] whitespace-nowrap">${Number(product.price).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 min-h-[40px]">{product.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                        <Link href={`/products/${product.id}`} className="w-full bg-gray-900 dark:bg-[#06a8f9] text-white py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                          <span>View Details</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* PAGINATION (Giao diện tĩnh) */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <button className="p-2 flex items-center justify-center text-gray-500 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-[#06a8f9] text-white font-bold rounded-lg shadow-md shadow-[#06a8f9]/20">1</button>
          <button className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 font-bold hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">3</button>
          <span className="text-gray-400 px-2">...</span>
          <button className="p-2 flex items-center justify-center text-gray-500 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f1c23] py-12">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-[#06a8f9]/20 p-1 rounded text-[#06a8f9]">
                <span className="material-symbols-outlined text-sm block">checkroom</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">CLOTHIER</span>
            </div>
            <p className="text-xs text-gray-400">© 2024 Academic Project Store. Minimalist UI Design.</p>
          </div>
          <div className="flex gap-8">
            <a className="text-xs font-bold text-gray-500 hover:text-[#06a8f9] transition-colors" href="#">Privacy Policy</a>
            <a className="text-xs font-bold text-gray-500 hover:text-[#06a8f9] transition-colors" href="#">Terms of Service</a>
            <a className="text-xs font-bold text-gray-500 hover:text-[#06a8f9] transition-colors" href="#">Contact Admin</a>
          </div>
        </div>
      </footer>
    </div>
  );
}