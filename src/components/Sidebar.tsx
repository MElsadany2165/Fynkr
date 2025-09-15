import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  LayoutDashboard, 
  Users, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  MessageCircle, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
  CreditCard,
  Shield,
  Palette,
  Globe,
  Mail
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface SidebarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Sidebar({ darkMode, onToggleDarkMode }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const mainNavItems = [
    { icon: Home, label: 'Home', path: '/', badge: null },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: FolderOpen, label: 'Projects', path: '/projects', badge: '4' },
    { icon: Users, label: 'Clients', path: '/clients', badge: null },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', badge: 'New' },
  ];

  const bottomNavItems = [
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: MessageCircle, label: 'Contact Us', path: '/contact' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
  ];

  const settingsItems = [
    { icon: User, label: 'Profile', action: () => toast.success('👤 Profile settings opened!') },
    { icon: Bell, label: 'Notifications', action: () => toast.success('🔔 Notification settings opened!') },
    { icon: CreditCard, label: 'Billing', action: () => toast.success('💳 Billing settings opened!') },
    { icon: Shield, label: 'Security', action: () => toast.success('🔒 Security settings opened!') },
    { icon: Palette, label: 'Appearance', action: onToggleDarkMode },
    { icon: Globe, label: 'Language', action: () => toast.success('🌍 Language settings opened!') },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    toast.success(`Navigating to ${path === '/' ? 'Home' : path.substring(1)}`);
  };

  const handleLogout = () => {
    toast.success('👋 Logged out successfully!');
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} border-r shadow-xl`}>
      
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  Fynkr
                </h1>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Pro Dashboard
                </p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'} transition-colors`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <div className="flex-1 p-4 space-y-2">
          <div className={`${isCollapsed ? 'hidden' : 'block'} mb-4`}>
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Navigation
            </h3>
          </div>
          
          {mainNavItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className={`w-full justify-start gap-3 ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                  : darkMode 
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
              } transition-all duration-200 ${isCollapsed ? 'px-2' : 'px-3'}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      variant={item.badge === 'New' ? 'default' : 'secondary'} 
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}

          {/* Settings Section */}
          {!isCollapsed && (
            <div className="mt-8">
              <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Settings
              </h3>
              <div className="space-y-1">
                {settingsItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="sm"
                    onClick={item.action}
                    className={`w-full justify-start gap-3 ${
                      darkMode 
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    } transition-all duration-200`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
          {bottomNavItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation(item.path)}
              className={`w-full justify-start gap-3 ${
                darkMode 
                  ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                  : 'text-slate-600 hover:bg-slate-100'
              } transition-all duration-200 ${isCollapsed ? 'px-2' : 'px-3'}`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="flex-1 text-left">{item.label}</span>}
            </Button>
          ))}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className={`w-full justify-start gap-3 ${
              darkMode 
                ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' 
                : 'text-red-600 hover:bg-red-50'
            } transition-all duration-200 ${isCollapsed ? 'px-2' : 'px-3'}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="flex-1 text-left">Logout</span>}
          </Button>
        </div>

        {/* User Profile (when not collapsed) */}
        {!isCollapsed && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <Card className={`p-3 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Alex Johnson
                  </p>
                  <p className={`text-xs truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    alex@fynkr.com
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}