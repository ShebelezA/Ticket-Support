# Travel Booking Support Portal

A premium support portal for a fake travel company, simulating Booking.com's support system. Built with Next.js 14, TypeScript, Prisma, Tailwind CSS, and Shadcn/ui.

## ✨ Features

### 🏠 Home Page
- Premium, luxury SaaS-style hero section
- Beautiful glassmorphism design with gradients
- Responsive design with modern animations
- Statistics and feature highlights

### 📝 Submit Ticket Page
- Comprehensive form with all required fields:
  - Name and Email
  - Booking Reference
  - Category dropdown (Payment, Cancellation, Change Dates, Other)
  - Description textarea
  - Optional file upload area
- Form validation with Zod
- Success/error toast notifications
- Beautiful glassmorphism UI

### 🔐 Admin Dashboard
- Basic authentication (admin/admin123)
- View all tickets in a clean table format
- Filter tickets by category or status
- Search functionality
- Click to view full ticket details
- Mark tickets as resolved or pending
- Real-time statistics dashboard

### 🗄️ Database
- SQLite database with Prisma ORM
- Ticket model with all required fields
- Automatic timestamps and status management

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner toast
- **Authentication**: Basic client-side auth (demo)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── tickets/
│   │       ├── route.ts          # API routes for tickets
│   │       └── [id]/route.ts     # Individual ticket operations
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   ├── submit/
│   │   └── page.tsx              # Submit ticket form
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Loading component
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/                       # Shadcn/ui components
│   └── navigation.tsx            # Navigation component
├── lib/
│   ├── prisma.ts                 # Prisma client
│   └── utils.ts                  # Utility functions
└── prisma/
    └── schema.prisma             # Database schema
```

## 🎨 Design Features

### Glassmorphism Effects
- Semi-transparent backgrounds with backdrop blur
- Subtle borders and shadows
- Gradient overlays and backgrounds

### Premium UI Elements
- Gradient buttons with hover effects
- Smooth animations and transitions
- Modern card designs with shadows
- Responsive grid layouts

### Color Scheme
- Blue to purple gradients
- Neutral grays for text
- Semantic colors for status indicators
- Consistent spacing and typography

## 🔧 API Endpoints

### POST /api/tickets
Submit a new support ticket
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "reference": "BK123456789",
  "category": "Payment",
  "description": "Issue description..."
}
```

### GET /api/tickets
Fetch all tickets (admin only)

### PATCH /api/tickets/[id]
Update ticket status
```json
{
  "status": "resolved"
}
```

### GET /api/tickets/[id]
Get individual ticket details

## 🗄️ Database Schema

```prisma
model Ticket {
  id          String   @id @default(cuid())
  name        String
  email       String
  reference   String
  category    String
  description String
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔐 Authentication

The admin dashboard uses basic client-side authentication for demo purposes:
- **Username**: `admin`
- **Password**: `admin123`

In a production environment, you should implement proper authentication with NextAuth.js or similar.

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎯 Key Features Implemented

✅ **Home page with premium hero section**  
✅ **Submit ticket form with all required fields**  
✅ **Admin dashboard with authentication**  
✅ **Database integration with Prisma**  
✅ **Beautiful UI with glassmorphism effects**  
✅ **Mobile responsive design**  
✅ **Form validation and error handling**  
✅ **Toast notifications**  
✅ **Search and filter functionality**  
✅ **Ticket status management**  

## 🚀 Deployment

This application can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- Any platform supporting Node.js

### Environment Variables
Create a `.env` file:
```env
DATABASE_URL="file:./dev.db"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Demo

Visit the live demo to see the application in action:
- **Home Page**: Beautiful landing page with hero section
- **Submit Ticket**: Form with validation and file upload
- **Admin Dashboard**: Login with `admin/admin123` to manage tickets

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
