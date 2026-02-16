import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/authentication";

function NavBar () {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { state, logout } = useAuth();
    const { user } = state;

    return (
        <nav className="flex items-center justify-between py-4 px-8 bg-white border-b ">
      <button onClick={() => navigate("/")} className="text-2xl font-bold">
        Jamies P<span className="text-purple-500">.</span>
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        {!user ? (
          <>
            <button onClick={() => navigate("/login")} className="px-9 py-2 rounded-full border">
              Log in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-2 bg-black text-white rounded-full hover:bg-purple-600 transition-colors"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            <span className="text-sm font-medium text-gray-600">
              Welcome, {user.email}
            </span>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              Profile
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              Log out
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="relative md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="font-medium text-gray-600 hover:text-black focus:outline-none"
        >
          {user ? `Hi, ${user.email.split('@')[0]}` : "Menu"}
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50">
            <div className="flex flex-col py-1">
              {!user ? (
                <>
                  <button 
                    onClick={() => { navigate("/login"); setIsOpen(false); }} 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={() => { navigate("/signup"); setIsOpen(false); }} 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { navigate("/profile"); setIsOpen(false); }} 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </button>
                  <button 
                    onClick={() => { logout(); setIsOpen(false); }} 
                    className="px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Log out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
    );
}

export default NavBar;
