import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Home, User, Phone, Stethoscope, Pill, Activity, Droplets, Baby, Calendar, Shield, Zap, Truck, AlertTriangle, Bell, MessageSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/find-doctor', icon: Stethoscope, label: 'Find Doctor' },
    { path: '/medicine', icon: Pill, label: 'Medicine' },
    { path: '/health-disease', icon: Activity, label: 'Health & Disease' },
    { path: '/blood-donation', icon: Droplets, label: 'Blood Donation' },
    { path: '/child-health', icon: Baby, label: 'Child Health' },
    { path: '/period-support', icon: Calendar, label: 'Period Support' },
    { path: '/abortion-support', icon: Shield, label: 'Abortion Support' },
    { path: '/animal-bite', icon: Zap, label: 'Animal Bite' },
    { path: '/animal-treatment', icon: Truck, label: 'Animal Treatment' },
    { path: '/disaster-support', icon: AlertTriangle, label: 'Disaster Support' },
    { path: '/health-alert', icon: Bell, label: 'Health Alert' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/feedback', icon: MessageSquare, label: 'Feedback' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/contact', icon: Phone, label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">HealthCare BD</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className={`${location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
                Home
              </Link>
              <Link to="/find-doctor" className={`${location.pathname === '/find-doctor' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
                Find Doctor
              </Link>
              <Link to="/medicine" className={`${location.pathname === '/medicine' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
                Medicine
              </Link>
              <Link to="/about" className={`${location.pathname === '/about' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
                About
              </Link>
              <Link to="/contact" className={`${location.pathname === '/contact' ? 'text-blue-600' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
                Contact
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    } flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-red-500 mr-2" />
                <span className="text-xl font-bold">HealthCare BD</span>
              </div>
              <p className="text-gray-300 mb-4">
                Your trusted healthcare companion in Bangladesh. Providing comprehensive health services and information to keep you and your family healthy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/find-doctor" className="text-gray-300 hover:text-white transition-colors">Find Doctor</Link></li>
                <li><Link to="/medicine" className="text-gray-300 hover:text-white transition-colors">Medicine</Link></li>
                <li><Link to="/blood-donation" className="text-gray-300 hover:text-white transition-colors">Blood Donation</Link></li>
                <li><Link to="/health-alert" className="text-gray-300 hover:text-white transition-colors">Health Alerts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Emergency: 999</li>
                <li>Health Line: 16263</li>
                <li>Email: info@healthcarebd.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; 2024 HealthCare BD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;