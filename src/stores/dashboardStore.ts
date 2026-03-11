import { create } from 'zustand';

interface DashboardStats {
  totalRevenue: string;
  revenueChange: string;
  activeUsers: number;
  usersChange: string;
  totalOrders: number;
  ordersChange: string;
  pageViews: string;
  viewsChange: string;
}

interface DashboardState {
  // Sidebar state
  isSidebarCollapsed: boolean;
  isMobileMenuOpen: boolean;
  
  // Navigation
  currentPage: string;
  
  // Dashboard data
  stats: DashboardStats;
  isLoading: boolean;
  
  // Active filters/tabs
  activeChartTab: 'Revenue' | 'Orders' | 'Profit';
  
  // Actions
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  setCurrentPage: (page: string) => void;
  setActiveChartTab: (tab: 'Revenue' | 'Orders' | 'Profit') => void;
  updateStats: (stats: Partial<DashboardStats>) => void;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial states
  isSidebarCollapsed: false,
  isMobileMenuOpen: false,
  currentPage: 'Dashboard',
  stats: {
    totalRevenue: '$48,295',
    revenueChange: '+12.5%',
    activeUsers: 2847,
    usersChange: '+8.2%',
    totalOrders: 1432,
    ordersChange: '-3.1%',
    pageViews: '284K',
    viewsChange: '+24.7%',
  },
  isLoading: false,
  activeChartTab: 'Revenue',
  
  // Actions
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    
  setCurrentPage: (page) =>
    set({ currentPage: page }),
    
  setActiveChartTab: (tab) =>
    set({ activeChartTab: tab }),
    
  updateStats: (newStats) =>
    set((state) => ({ stats: { ...state.stats, ...newStats } })),
    
  setLoading: (loading) =>
    set({ isLoading: loading }),
}));