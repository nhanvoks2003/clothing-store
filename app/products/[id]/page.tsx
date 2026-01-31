'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Lấy dữ liệu từ API
  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  // 2. Hàm xóa sản phẩm
  const handleDelete = async () => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này không?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      router.push('/'); // Xóa xong về trang chủ
    }
  };

  // --- GIAO DIỆN LOADING ---
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#06a8f9]"></div>
    </div>
  );

  // --- GIAO DIỆN KHI KHÔNG TÌM THẤY ---
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Không tìm thấy sản phẩm</h2>
      <Link href="/" className="text-[#06a8f9] hover:underline">Về trang chủ</Link>
    </div>
  );

  // --- GIAO DIỆN CHÍNH (Code HTML của bạn đã chuyển đổi) ---
  return (
    <div className="min-h-screen text-[#111618] bg-[#f5f7f8] font-[Plus_Jakarta_Sans]">
      
      {/* NAVBAR */}
      <div className="w-full bg-white border-b border-[#f0f3f5]">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-10 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="size-6 text-[#06a8f9]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path></svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Clothier</h2>
          </Link>
          <div className="flex gap-4">
             {/* Nút giả lập */}
             <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-gray-100 hover:bg-gray-200">
                <span className="material-symbols-outlined">shopping_cart</span>
             </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-[1200px] mx-auto py-8 px-4 lg:px-10 flex flex-col gap-6">
        
        {/* Back Link */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1 text-[#06a8f9] text-sm font-medium hover:underline">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Shop
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          
          {/* CỘT TRÁI: ẢNH SẢN PHẨM */}
          <div className="flex flex-col gap-4">
            <div 
                className="w-full bg-center bg-no-repeat aspect-[4/5] bg-contain rounded-xl shadow-inner border border-gray-50"
                style={{ backgroundImage: `url("${product.image || 'https://via.placeholder.com/500'}")` }}
            >
            </div>
            {/* Thumbnails (Giả lập để cho đẹp giống mẫu) */}
            <div className="grid grid-cols-4 gap-2">
               {[1,2,3,4].map((i) => (
                  <div key={i} className="aspect-square bg-cover bg-center rounded-lg border border-gray-200 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" 
                       style={{ backgroundImage: `url("${product.image}")` }}></div>
               ))}
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#06a8f9]/10 text-[#06a8f9] w-fit uppercase tracking-wider">
                  New Arrival
                </span>
                <h1 className="text-[#111618] text-4xl font-extrabold leading-tight tracking-tight">
                    {product.name}
                </h1>
                <p className="text-[#06a8f9] text-2xl font-bold">
                    ${Number(product.price).toLocaleString('en-US')}
                </p>
              </div>

              <div className="h-px bg-[#f0f3f5]"></div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[#111618] text-lg font-bold">Description</h3>
                <p className="text-[#5f7d8c] text-base font-normal leading-relaxed whitespace-pre-line">
                    {product.description}
                </p>
              </div>

              {/* Thông tin tĩnh (Để cho đẹp giống mẫu) */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[#111618] text-lg font-bold">Product Details</h3>
                <ul className="list-disc list-inside text-[#5f7d8c] space-y-1">
                  <li>100% Genuine Quality</li>
                  <li>Standard regular fit</li>
                  <li>Free shipping worldwide</li>
                  <li>30-day return policy</li>
                </ul>
              </div>
            </div>

            {/* ACTION BUTTONS (SỬA / XÓA) */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => router.push(`/products/${id}/edit`)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#06a8f9] hover:bg-[#0590d6] text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">edit</span>
                Edit Product
              </button>
              
              <button 
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-bold py-3 px-6 rounded-lg transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">delete</span>
                Delete Product
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-10 border-t border-[#f0f3f5] mt-20 text-center text-[#5f7d8c]">
        <p className="text-sm">© 2024 Clothier E-Commerce. Academic Project.</p>
      </footer>
    </div>
  );
}