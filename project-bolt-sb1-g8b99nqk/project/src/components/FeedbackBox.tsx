import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Send, X, User, Smile } from 'lucide-react';

interface FeedbackBoxProps {
  onFeedbackSubmit: (feedback: {
    name: string;
    email: string;
    rating: number;
    category: string;
    message: string;
  }) => void;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({ onFeedbackSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    rating: 0,
    category: 'সাধারণ',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    'সাধারণ',
    'AI সহায়তা',
    'ডাক্তার খোঁজা',
    'রক্তদান',
    'এম্বুলেন্স',
    'গর্ভাবস্থা',
    'শিশু স্বাস্থ্য',
    'অন্যান্য'
  ];

  const handleSubmit = async () => {
    if (!feedback.name || !feedback.message || feedback.rating === 0) {
      alert('সব প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      onFeedbackSubmit(feedback);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setFeedback({
          name: '',
          email: '',
          rating: 0,
          category: 'সাধারণ',
          message: ''
        });
      }, 2000);
    }, 1500);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.button
        key={i}
        onClick={() => setFeedback(prev => ({ ...prev, rating: i + 1 }))}
        className={`w-8 h-8 ${
          i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
        } hover:text-yellow-400 transition-colors`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <Star className="w-full h-full fill-current" />
      </motion.button>
    ));
  };

  return (
    <>
      {/* Floating Feedback Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl z-40 flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          y: [0, -10, 0],
          boxShadow: [
            '0 10px 30px rgba(147, 51, 234, 0.3)',
            '0 20px 40px rgba(147, 51, 234, 0.4)',
            '0 10px 30px rgba(147, 51, 234, 0.3)'
          ]
        }}
        transition={{ 
          y: { repeat: Infinity, duration: 2 },
          boxShadow: { repeat: Infinity, duration: 2 }
        }}
      >
        <MessageSquare className="w-8 h-8" />
      </motion.button>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <MessageSquare className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold">ফিডব্যাক দিন</h3>
                      <p className="text-purple-100 text-sm">আপনার মতামত জানান</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: 3, duration: 0.5 }}
                    >
                      <Smile className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">ধন্যবাদ!</h3>
                    <p className="text-green-600">আপনার ফিডব্যাক সফলভাবে জমা হয়েছে</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">নাম *</label>
                      <input
                        type="text"
                        value={feedback.name}
                        onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="আপনার নাম"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                      <input
                        type="email"
                        value={feedback.email}
                        onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="example@email.com"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">রেটিং *</label>
                      <div className="flex items-center space-x-1">
                        {renderStars()}
                        <span className="ml-2 text-sm text-gray-600">
                          {feedback.rating > 0 ? `${feedback.rating}/5` : 'রেটিং দিন'}
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">বিষয়</label>
                      <select
                        value={feedback.category}
                        onChange={(e) => setFeedback(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">মন্তব্য *</label>
                      <textarea
                        value={feedback.message}
                        onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        placeholder="আপনার মতামত লিখুন..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>জমা দিচ্ছি...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>ফিডব্যাক জমা দিন</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackBox;