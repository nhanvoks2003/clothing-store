import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/* =========================
   GET: Lấy danh sách sản phẩm
   Có hỗ trợ ?q=...
========================= */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('q');

    let query = supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false });

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase GET error:', error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    console.error('API GET error:', err);
    return NextResponse.json([], { status: 200 });
  }
}

/* =========================
   POST: Thêm sản phẩm mới
========================= */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image } = body;

    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price: Number(price),
          image,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase POST error:', error);
      return NextResponse.json({ error: 'Lỗi thêm mới' }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('API POST error:', err);
    return NextResponse.json({ error: 'Lỗi thêm mới' }, { status: 500 });
  }
}
