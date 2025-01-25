import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-fore mb-4">About CheatProof</h3>
            <p className="text-gray-600 mb-6">
              Transforming online assessments with advanced AI proctoring and monitoring techniques.
              Ensuring integrity and reliability for educational institutions worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-fore transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-fore transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-fore transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-fore mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-fore transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-fore transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-fore transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-fore transition-colors">Support</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-fore mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">support@cheatproof.com</li>
              <li className="text-gray-600">+1 (555) 123-4567</li>
              <li className="text-gray-600">
                123 Education Street<br />
                Suite 100
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} CheatProof. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default  Footer;