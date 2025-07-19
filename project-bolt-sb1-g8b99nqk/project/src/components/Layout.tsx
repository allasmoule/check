import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Menu, X, Home } from 'lucide-react';
import FeedbackBox from './FeedbackBox';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [feedbacks, setFeedbacks] = React.useState<any[]>([]);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'হোম', icon: Home },
    { path: '/health-disease', label: 'স্বাস্থ্য বিষয়ক রোগ' },
    { path: '/pregnancy-support', label: 'গর্ভাবস্থা সহায়তা' },
    { path: '/period-support', label: 'মাসিক সহায়তা' },
    { path: '/animal-bite', label: 'প্রাণীর কামড়' },
    { path: '/disaster-support', label: 'দুর্যোগ সহায়তা' },
    { path: '/child-health', label: 'শিশু স্বাস্থ্য পরামর্শ' },
    { path: '/medicine', label: 'ওষুধ পরামর্শ' },
    { path: '/find-doctor', label: 'ডাক্তার খোঁজা' },
    { path: '/blood-donation', label: 'রক্তদান সহায়তা' },
    { path: '/health-alert', label: 'স্বাস্থ্য সতর্ক বার্তা' },
    { path: '/animal-treatment', label: 'পশু চিকিৎসা' },
    { path: '/abortion-support', label: 'গর্ভপাত সহায়তা' },
    { path: '/ambulance', label: 'এম্বুলেন্স সেবা' },
    { path: '/contact', label: 'যোগাযোগ' },
    { path: '/about', label: 'আমাদের সম্পর্কে' },
    { path: '/feedback', label: 'Feedback System' },
    { path: '/notification', label: 'Notification System' },
  ];

  const handleFeedbackSubmit = (feedback: any) => {
    const newFeedback = {
      ...feedback,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'pending',
      sentiment: feedback.rating >= 4 ? 'positive' : feedback.rating >= 3 ? 'neutral' : 'negative'
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-blue-100 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  সুস্থ আনে স্বাস্থ্য
                </h1>
                <p className="text-sm text-gray-600">স্বাস্থ্য সহায়তা সেবা</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {menuItems.slice(0, 7).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                to="/about"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === '/about'
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                আমাদের সম্পর্কে
              </Link>
              
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg bg-blue-50 text-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-blue-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="grid grid-cols-1 gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-blue-900 to-green-900 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">সুস্থ আনে স্বাস্থ্য</h3>
              <p className="text-blue-100">আপনার স্বাস্থ্য সেবার নির্ভরযোগ্য সহায়ক</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">গুরুত্বপূর্ণ লিংক</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-blue-100 hover:text-white transition-colors">
                  আমাদের সম্পর্কে
                </Link>
                <Link to="/contact" className="block text-blue-100 hover:text-white transition-colors">
                  যোগাযোগ
                </Link>
                <Link to="/health-alert" className="block text-blue-100 hover:text-white transition-colors">
                  স্বাস্থ্য সতর্কতা
                </Link>
                <Link to="/disaster-support" className="block text-blue-100 hover:text-white transition-colors">
                  দুর্যোগ সহায়তা
                </Link>
                <Link to="/feedback" className="block text-blue-100 hover:text-white transition-colors">
                  Feedback System
                </Link>
                <Link to="/notification" className="block text-blue-100 hover:text-white transition-colors">
                  Notification System
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">যোগাযোগ</h4>
              <div className="text-blue-100 space-y-2">
                <p>ইমেইল: info@sustho.com</p>
                <p>ফোন: +৮৮০ ১২৩৪-৫৬৭৮৯০</p>
                <p>ঠিকানা: ধানমন্ডি, ঢাকা</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">সেবা সময়</h4>
              <div className="text-blue-100 space-y-2">
                <p>সপ্তাহের সবদিন</p>
                <p>২৪/৭ অনলাইন সেবা</p>
                <p>জরুরি সেবা: ৯৯৯</p>
                <p>স্বাস্থ্য বাতায়ন: ১৬২৬৩</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-100">
            <p>&copy; ২০২৫ সুস্থ আনে স্বাস্থ্য। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </motion.footer>

      {/* Floating Feedback Box */}
      <FeedbackBox onFeedbackSubmit={handleFeedbackSubmit} />
    </div>
  );
};

export default Layout;