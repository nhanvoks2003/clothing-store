import { Pool } from 'pg';

// Kiểm tra xem biến môi trường có tồn tại không
if (!process.env.DATABASE_URL) {
  console.error("❌ LỖI: Không tìm thấy DATABASE_URL. Hãy kiểm tra file .env.local");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Cấu hình SSL bắt buộc cho Supabase
  ssl: {
    rejectUnauthorized: false 
  }
});

export default pool;