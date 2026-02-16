import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-[2.5rem] p-10 w-full max-w-[440px] shadow-2xl transition-all duration-300 transform scale-100 opacity-100">
        <button 
          onClick={onClose}
          className="absolute right-8 top-8 text-gray-400 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-10 mt-4">
            Create an account to continue
          </h2>
          
          <button onClick={() => navigate('/signup')} className="w-full bg-black text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-800 active:scale-95 transition-all mb-8 shadow-lg shadow-black/10">
            Create account
          </button>
          
          <p className="text-gray-500 text-base font-medium">
            Already have an account?{" "}
            <button onClick={() => navigate('/login')} className="text-black font-bold hover:underline underline-offset-4">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
