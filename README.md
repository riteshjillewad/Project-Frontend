# Filmy Creatives Platform

A modern storytelling and creative content platform built with Next.js and Tailwind CSS, featuring an Instagram/TikTok-style UI for writers and readers to share and discover amazing stories.

## 🎯 Project Overview

Filmy Creatives is a storytelling platform for DHEY Productions that enables:
- Writers to register, create, and publish stories
- Readers to discover, engage with, and share content
- Admins to manage content approval and user activity
- Showcase of DHEY Productions' work and competitions

## ✨ Features

### Core Features
- **📱 Social Media Style UI** - Instagram/TikTok inspired design
- **📝 Story Creation** - Rich story submission with images and hashtags
- **🔍 Advanced Search** - Search by title, author, and hashtags
- **👤 User Profiles** - Personal profiles with story grids
- **❤️ Engagement** - Like, save, share, and comment on stories
- **📊 DHEY Showcase** - Company portfolio and competitions

### Pages Included
- **Home Feed** - Latest and featured stories
- **Search & Discovery** - Advanced filtering and search
- **Story Creation** - Form-based story submission
- **Profile Pages** - User stories, saved, and liked content
- **Story Reading** - Optimized reading experience
- **DHEY Production** - Company showcase and contact

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React
- **Images:** Next.js Image Optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd filmy-creatives
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── create/            # Story creation page
│   ├── dhey-production/   # DHEY showcase pages
│   ├── profile/           # User profile pages
│   ├── search/            # Search and discovery
│   ├── story/[id]/        # Individual story pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── create/           # Story creation components
│   ├── dhey/             # DHEY showcase components
│   ├── home/             # Homepage components
│   ├── layout/           # Navigation components
│   ├── profile/          # Profile page components
│   ├── search/           # Search components
│   └── story/            # Story reading components
```

## 🎨 Design System

### Colors
- **Primary:** Purple gradient (purple-500 to pink-500)
- **Secondary:** Gray scale for text and backgrounds
- **Accent:** Yellow/Orange for DHEY branding

### Typography
- **Font:** Inter (Google Fonts)
- **Sizes:** Responsive typography with Tailwind classes

### Components
- **Mobile-first:** Responsive design for all screen sizes
- **Interactive:** Hover states and smooth transitions
- **Accessible:** Proper contrast and semantic HTML

## 📱 Responsive Design

The platform is built mobile-first with breakpoints:
- **Mobile:** < 768px (Bottom navigation)
- **Tablet:** 768px - 1024px (Hybrid navigation)
- **Desktop:** > 1024px (Top navigation)

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Component-based architecture

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS/DigitalOcean** (Custom server)

### Environment Variables
Create a `.env.local` file for environment variables:
```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## 📋 TODO / Future Enhancements

### Backend Integration
- [ ] User authentication system
- [ ] Story CRUD API endpoints
- [ ] Database integration (PostgreSQL)
- [ ] File upload for images
- [ ] Email notifications

### Additional Features
- [ ] Real-time comments
- [ ] Story analytics
- [ ] Admin dashboard
- [ ] Push notifications
- [ ] Social media sharing
- [ ] Advanced text editor

### Performance
- [ ] Image optimization
- [ ] Caching strategy
- [ ] SEO optimization
- [ ] PWA features
