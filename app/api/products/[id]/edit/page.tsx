'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({ name: '', price: '', image: '', description: '' });
  const [loading, setLoading] = useState(true);

  // 1. Lấy dữ liệu cũ để điền vào form
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // 2. Hàm lưu thay đổi
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert('Cập nhật thành công!');
      router.push(`/products/${id}`); // Quay lại trang chi tiết
    } else {
      alert('Có lỗi xảy ra');
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 font-[Plus_Jakarta_Sans]">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Chỉnh sửa sản phẩm</h1>
        
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tên sản phẩm</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Giá ($)</label>
            <input 
              type="number" 
              className="w-full p-2 border rounded-lg"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link Ảnh</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg"
              value={form.image}
              onChange={(e) => setForm({...form, image: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea 
              rows={4}
              className="w-full p-2 border rounded-lg"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
            />
          </div>

          <div className="flex gap-3 mt-4">
             <button type="button" onClick={() => router.back()} className="flex-1 bg-gray-200 py-3 rounded-lg font-bold">Hủy</button>
             <button type="submit" className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
}