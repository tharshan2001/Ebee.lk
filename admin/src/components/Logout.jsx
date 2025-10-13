import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Logout({ showIconOnly = false }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
    }, 600);
  };

  // Compact version for collapsed sidebar
  if (showIconOnly) {
    return (
      <button
        onClick={handleLogout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isLoggingOut}
        className={`
          relative flex items-center justify-center 
          p-3 rounded-xl 
          transition-all duration-300 ease-out
          group overflow-hidden
          ${isLoggingOut 
            ? "bg-gray-600 cursor-not-allowed" 
            : "bg-gradient-to-br from-red-500/80 to-red-600/80 hover:from-red-600 hover:to-red-700 active:scale-95"
          }
        `}
        title="Logout"
      >
        {isLoggingOut ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        )}
      </button>
    );
  }

  // Full version for expanded sidebar
  return (
    <button
      onClick={handleLogout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isLoggingOut}
      className={`
        relative flex items-center justify-start 
        w-full px-4 py-3 rounded-xl 
        transition-all duration-300 ease-out
        font-medium text-sm
        group overflow-hidden
        ${isLoggingOut 
          ? "bg-gray-600 cursor-not-allowed" 
          : "bg-gradient-to-br from-red-500/80 to-red-600/80 hover:from-red-600 hover:to-red-700 active:scale-[0.98]"
        }
      `}
    >
      {/* Animated background effect */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 
        transform transition-transform duration-300
        ${isHovered && !isLoggingOut ? "translate-x-0" : "-translate-x-full"}
      `}/>
      
      {/* Loading spinner */}
      {isLoggingOut ? (
        <div className="flex items-center space-x-3 w-full justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
          <span className="text-white text-sm">Logging out...</span>
        </div>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`
              h-5 w-5 text-white transition-all duration-300 flex-shrink-0
              ${isHovered ? "transform translate-x-1" : ""}
            `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-white ml-3 whitespace-nowrap">Logout</span>
        </>
      )}
    </button>
  );
}