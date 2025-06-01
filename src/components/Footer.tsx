
interface FooterProps {
  onLanguageSelect: () => void;
}

const Footer = ({ onLanguageSelect }: FooterProps) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">AirCover</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Anti-discrimination</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Disability support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Cancellation options</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Report neighborhood concern</a></li>
            </ul>
          </div>

          {/* Hosting Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Airbnb your home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">AirCover for Hosts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Hosting resources</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community forum</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Hosting responsibly</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Join a free Hosting class</a></li>
            </ul>
          </div>

          {/* Airbnb Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Newsroom</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">New features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Investors</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Gift cards</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-600">© 2025 Airbnb, Inc.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Sitemap</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Your Privacy Choices</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button 
                onClick={onLanguageSelect}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>🌐</span>
                <span>English (US)</span>
              </button>
              <span className="text-gray-600">$ USD</span>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">📱</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">📘</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">🐦</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
