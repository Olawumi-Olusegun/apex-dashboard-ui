import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart2,
  ShoppingBag,
  Briefcase,
  Rocket,
  LineChart,
  ShoppingCart,
  Package,
  Users,
  FileText,
  Mail,
  MessageSquare,
  Folder,
  Columns,
  Calendar,
  Wand2,
  CheckSquare,
  Bell,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useDashboardStore } from '../stores/dashboardStore';

const OVERVIEW_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'eCommerce', icon: ShoppingBag, path: '/ecommerce' },
  { name: 'CRM', icon: Briefcase, path: '/crm' },
  { name: 'SaaS', icon: Rocket, path: '/saas' },
  { name: 'Charts', icon: LineChart, path: '/charts' },
];

const COMMERCE_ITEMS = [
  { name: 'Orders', icon: ShoppingCart, badge: '12', path: '/orders' },
  { name: 'Products', icon: Package, path: '/products' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Invoices', icon: FileText, path: '/invoices' },
];

const APPS_ITEMS = [
  { name: 'Mail', icon: Mail, path: '/mail' },
  { name: 'Chat', icon: MessageSquare, path: '/chat' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
  { name: 'Files', icon: Folder, path: '/files' },
  { name: 'Kanban', icon: Columns, path: '/kanban' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Wizard', icon: Wand2, path: '/wizard' },
  { name: 'Forms', icon: CheckSquare, path: '/forms' },
];

interface NavGroupProps {
  title: string;
  items: { 
    name: string; 
    icon: React.ComponentType<{ className?: string }>; 
    badge?: string;
    path: string;
  }[];
  activePath: string;
  onNavigate: (path: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const NavGroup = ({ title, items, activePath, onNavigate, isCollapsed, onToggle }: NavGroupProps) => (
  <div className="mb-6">
    <button 
      onClick={onToggle}
      className="w-full px-4 mb-2 flex items-center justify-between text-xs font-semibold text-slate-400 tracking-wider hover:text-slate-600 transition-colors cursor-pointer"
    >
      {title}
      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors text-left cursor-pointer ${
                activePath === item.path
                  ? 'bg-white text-slate-900 shadow-sm font-medium'
                  : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${activePath === item.path ? 'text-slate-900' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleMobileMenu } = useDashboardStore();
  
  // State for collapsible sections
  const [collapsedSections, setCollapsedSections] = useState({
    overview: false,
    commerce: false,
    apps: false,
  });

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close mobile menu when item is clicked on mobile
    if (window.innerWidth < 1024) {
      toggleMobileMenu();
    }
  };

  const toggleSection = (section: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-64 sm:w-72 h-screen bg-[#f8fafc] flex flex-col border-r border-slate-200 shrink-0">
      {/* Logo */}
      <div className="h-16 sm:h-20 flex items-center px-4 sm:px-6 border-b border-transparent shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rotate-45" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-lg leading-tight">Apex</h1>
            <p className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
        <NavGroup 
          title="OVERVIEW" 
          items={OVERVIEW_ITEMS} 
          activePath={location.pathname} 
          onNavigate={handleNavigation}
          isCollapsed={collapsedSections.overview}
          onToggle={() => toggleSection('overview')}
        />
        <NavGroup 
          title="COMMERCE" 
          items={COMMERCE_ITEMS} 
          activePath={location.pathname} 
          onNavigate={handleNavigation}
          isCollapsed={collapsedSections.commerce}
          onToggle={() => toggleSection('commerce')}
        />
        <NavGroup 
          title="APPS" 
          items={APPS_ITEMS} 
          activePath={location.pathname} 
          onNavigate={handleNavigation}
          isCollapsed={collapsedSections.apps}
          onToggle={() => toggleSection('apps')}
        />
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200 mt-auto shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm">
              AS
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">Aigars S.</p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};