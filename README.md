# Zenith Dashboard UI

A modern, responsive dashboard built with React, TypeScript, TailwindCSS, Ant Design, and Zustand.

## Features

✨ **Modern Design**: Clean, minimal interface inspired by the Zenith dashboard
📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices  
🎨 **Beautiful Components**: Custom-styled charts, tables, and progress indicators
🔄 **State Management**: Powered by Zustand for efficient state handling
📊 **Interactive Charts**: Built with Recharts for smooth data visualization
🧩 **Component Library**: Ant Design components with custom styling

## Tech Stack

- **React 19** - Modern UI library for building interfaces
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **Ant Design 6** - Enterprise UI component library
- **Zustand** - Lightweight state management
- **Recharts** - Charts built with D3
- **Lucide React** - Beautiful icons

## Dashboard Components

### 📈 Statistics Cards
- Total Revenue, Active Users, Total Orders, Page Views
- Sparkline charts with trend indicators
- Responsive grid layout

### 📊 Overview Chart
- Interactive area chart with Revenue/Orders/Profit tabs
- Smooth animations and custom tooltips
- Connected to Zustand store

### 🎯 Traffic Sources
- Donut chart showing visitor sources
- Direct, Organic, Referral, and Social traffic breakdown
- Clean visual indicators

### 🎯 Monthly Goals
- Progress bars for Revenue, Customers, Conversion Rate
- Target vs. actual values
- Custom styling with Ant Design Progress

### 📋 Recent Orders
- Responsive data table
- Customer info with avatars
- Order status badges
- Formatted currency display

### 📰 Recent Activity
- Timeline-style activity feed
- Different activity types with themed icons
- Real-time timestamps

### 🧩 Navigation
- Collapsible sidebar with organized sections
- Mobile-responsive hamburger menu
- Search functionality in top nav

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern browser with ES6+ support

### Installation

1. Install dependencies (already done):
```bash
cd dashboard-ui
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5174](http://localhost:5174) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── StatCards.tsx
│   │   ├── OverviewChart.tsx
│   │   ├── TrafficSources.tsx
│   │   ├── MonthlyGoals.tsx
│   │   ├── RecentOrders.tsx
│   │   └── RecentActivity.tsx
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── TopNav.tsx          # Top navigation bar
├── pages/
│   └── Dashboard.tsx       # Main dashboard page
├── stores/
│   └── dashboardStore.ts   # Zustand state management
├── App.tsx                 # Root application component
├── index.css               # Global styles & Ant Design overrides
└── main.tsx                # Application entry point
```

## Responsive Design

The dashboard is designed to work seamlessly across all device sizes:

- **Desktop (1024px+)**: Full sidebar, 3-column grid layouts
- **Tablet (768px-1023px)**: Responsive grid, collapsible sidebar
- **Mobile (320px-767px)**: Hamburger menu, stacked layout, optimized touch targets

## State Management

Uses Zustand for lightweight, simple state management:

- Sidebar collapse/expand state
- Mobile menu open/closed state
- Chart tab selection
- Dashboard statistics data
- Loading states

## Customization

### Colors & Theming
Primary brand colors are defined in `src/index.css`:
```css
@theme {
  --color-brand-orange: #f4722b;
  --color-brand-orange-light: #fef1eb;
}
```

### Adding New Components
1. Create component in appropriate directory
2. Export from component file
3. Import and use in parent components
4. Add to Zustand store if state management needed

### Ant Design Customization
Component styling is customized in `src/index.css` with:
- Color overrides
- Border radius adjustments
- Shadow customizations
- Responsive modifications

## Performance

- ⚡ Vite for fast development and builds
- 🗜️ Code splitting with React lazy loading
- 📦 Optimized bundle size with tree shaking
- 🎨 CSS purging in production builds

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

---

Built with ❤️ using modern React practices and responsive design principles.
