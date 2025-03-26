
import { Home, Video, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomMenu() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-4 shadow-lg z-50">
      <Link 
        to="/" 
        className={`flex flex-col items-center p-2 ${isActive('/') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Home className="h-6 w-6" />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link 
        to="/training" 
        className={`flex flex-col items-center p-2 ${isActive('/training') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Video className="h-6 w-6" />
        <span className="text-xs mt-1">Training</span>
      </Link>
      <Link 
        to="/group-training" 
        className={`flex flex-col items-center p-2 ${isActive('/group-training') ? 'text-primary' : 'text-gray-500'}`}
      >
        <Users className="h-6 w-6" />
        <span className="text-xs mt-1">Group</span>
      </Link>
    </div>
  );
}
