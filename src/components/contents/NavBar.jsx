import { useState } from 'react';

function NavBar () {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="flex items-center justify-between py-4 px-8 bg-white border-b ">
      <a href="/" className="text-2xl font-bold">
        Jamies P<span className="text-purple-500">.</span>
      </a>
      <div className="hidden md:flex space-x-4">
        <a href="/login" className="px-9 py-2  rounded-full border">
          Log in
        </a>
        <a
          href="/signup"
          className="px-8 py-2 bg-black text-white rounded-full hover:bg-purple-600 transition-colors"
        >
          Sign up
        </a>
      </div>
      <div className="relative md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="font-medium text-gray-600 hover:text-black focus:outline-none"
        >
          Menu
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden z-50">
            <div className="flex flex-col py-1">
              <a 
                href="/login" 
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </a>
              <a 
                href="/signup" 
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign up
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
    );
}

export default NavBar;