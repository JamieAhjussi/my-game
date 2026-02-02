import { LayoutDashboard, FileText, FolderTree, Bell, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: FileText, label: "Article management", path: "/admin/article-management" },
    { icon: FolderTree, label: "Category management", path: "/admin/category-management" },
    { icon: Bell, label: "Notification", path: "/admin/notification" },
    { icon: User, label: "Profile", path: "/admin/profile" },
  ];

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-orange-500 text-white p-1 rounded">JS</span>
          Admin Panel
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-orange-500 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <button 
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
