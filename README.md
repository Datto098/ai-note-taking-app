# AI Note Taking App

Ứng dụng ghi chú thông minh được xây dựng với Next.js, MongoDB và OpenAI API.

## Tính năng

-   🔐 Xác thực người dùng với NextAuth.js
-   📝 Tạo và quản lý ghi chú
-   🏷️ Thêm thẻ cho ghi chú
-   🤖 Tự động tạo tóm tắt với OpenAI API
-   🔍 Tìm kiếm ghi chú
-   📱 Giao diện responsive
-   🌙 Chế độ tối/sáng

## Công nghệ sử dụng

-   **Frontend**: Next.js 14, React, Tailwind CSS
-   **Backend**: Next.js API Routes
-   **Database**: MongoDB
-   **Authentication**: NextAuth.js
-   **AI**: OpenAI API
-   **Deployment**: Vercel

## Yêu cầu hệ thống

-   Node.js 18.x trở lên
-   MongoDB
-   Tài khoản OpenAI (để sử dụng API)

## Cài đặt

1. Clone repository:

```bash
git clone https://github.com/Datto098/ai-note-taking-app.git
cd ai-note-taking-app
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file `.env.local` và thêm các biến môi trường:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key
```

4. Khởi động development server:

```bash
npm run dev
```

## Cấu trúc thư mục

```
app/
├── api/              # API routes
├── components/       # React components
├── contexts/         # React contexts
├── hooks/            # Custom hooks
├── lib/              # Utility functions
├── styles/           # Global styles
└── (auth)/           # Authentication pages
```

## API Endpoints

-   `POST /api/notes` - Tạo ghi chú mới
-   `GET /api/notes` - Lấy danh sách ghi chú
-   `GET /api/notes/[id]` - Lấy chi tiết ghi chú
-   `PUT /api/notes/[id]` - Cập nhật ghi chú
-   `DELETE /api/notes/[id]` - Xóa ghi chú

## Đóng góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add some amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## Giấy phép

MIT License

## Liên hệ

[Your Name] - [Your Email]

Project Link: [https://github.com/Datto098/ai-note-taking-app](https://github.com/Datto098/ai-note-taking-app)
