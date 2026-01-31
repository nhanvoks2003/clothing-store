import { NextResponse } from 'next/server';
import pool from '@/lib/db';

type Params = Promise<{ id: string }>;

// 1. GET: Lấy chi tiết
export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
    
    if (rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

// 2. DELETE: Xóa
export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    await pool.query('DELETE FROM products WHERE id = $1', [productId]);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi xóa' }, { status: 500 });
  }
}

// 3. PUT: Cập nhật (Code MỚI thêm vào)
export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    const body = await request.json();
    const { name, description, price, image } = body;

    const query = 'UPDATE products SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5';
    await pool.query(query, [name, description, parseFloat(price), image, productId]);
    
    return NextResponse.json({ message: 'Updated' });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi cập nhật' }, { status: 500 });
  }
}