import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import CheatProof from '../assets/CheatProof.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src={CheatProof}
              alt="CheatProof Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="ml-2 text-xl font-bold text-fore">CheatProof</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/register')}
              className="px-4 py-2 text-fore font-semibold hover:bg-gray-100 rounded-lg transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-fore text-white font-semibold hover:bg-color2 rounded-lg transition-colors"
            >
              Log In
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                navigate('/register');
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-fore hover:bg-gray-50 rounded-md"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                navigate('/login');
                setIsOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-fore hover:bg-gray-50 rounded-md"
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;