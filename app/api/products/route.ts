import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// 1. GET: Lấy danh sách (Có hỗ trợ tìm kiếm ?q=...)
export async function GET(request: Request) {
  try {
    // Lấy từ khóa tìm kiếm từ URL (ví dụ: /api/products?q=áo)
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');

    let query = 'SELECT * FROM products';
    let values: any[] = [];

    // Nếu có từ khóa tìm kiếm
    if (search) {
      query += ' WHERE name ILIKE $1 OR description ILIKE $1'; // ILIKE giúp tìm không phân biệt hoa thường
      values = [`%${search}%`];
    }

    query += ' ORDER BY id DESC';

    const { rows } = await pool.query(query, values);
    return NextResponse.json(rows);
  } catch (error) {
  console.error(error);
  return NextResponse.json([], { status: 200 });
}
  }


// 2. POST: Thêm sản phẩm mới (Giữ nguyên không đổi)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image } = body;
    const priceNumber = parseFloat(price);

    const query = 'INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, description, priceNumber, image];
    
    const { rows } = await pool.query(query, values);
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi thêm mới' }, { status: 500 });
  }
}