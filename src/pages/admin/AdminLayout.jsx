import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Menu, X, Activity, ScrollText } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Live Tracking', href: '/admin/employees', icon: Users },
    { name: 'Session Logs', href: '/admin/sessions', icon: Activity },
    { name: 'Audit Logs', href: '/admin/auditlogs', icon: ScrollText },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md group ${
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              // TODO: Implement logout logic
              console.log("Logout");
            }}
            className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white group"
          >
            <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-8 shadow-sm">
           <div className="flex items-center space-x-4">
             <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
               A
             </div>
           </div>
        </header>
        
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
