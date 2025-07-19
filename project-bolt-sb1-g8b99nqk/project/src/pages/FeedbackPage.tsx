import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Send, User, Clock, ThumbsUp, ThumbsDown, Heart, CheckCircle, AlertCircle, Smile, Frown, Meh } from 'lucide-react';

interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  category: string;
  message: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'resolved';
  sentiment: 'positive' | 'negative' | 'neutral';
}

const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      name: 'রহিমা খাতুন',
      email: 'rahima@email.com',
      rating: 5,
      category: 'AI সহায়তা',
      message: 'AI চ্যাটবট খুবই সহায়ক। গর্ভাবস্থায় অনেক ভাল পরামর্শ পেয়েছি।',
      timestamp: new Date('2025-01-25T10:30:00'),
      status: 'reviewed',
      sentiment: 'positive'
    },
    {
      id: '2',
      name: 'করিম উদ্দিন',
      email: 'karim@email.com',
      rating: 4,
      category: 'ডাক্তার খোঁজা',
      message: 'ডাক্তার খোঁজার সেবা ভাল। তবে আরো বেশি ডাক্তার যোগ করলে ভাল হয়।',
      timestamp: new Date('2025-01-24T15:45:00'),
      status: 'pending',
      sentiment: 'positive'
    },
    {
      id: '3',
      name: 'ফাতেমা বেগম',
      email: 'fatema@email.com',
      rating: 3,
      category: 'রক্তদান',
      message: 'রক্তদান সেকশন ভাল কিন্তু আরো দ্রুত রেসপন্স পেলে ভাল হত।',
      timestamp: new Date('2025-01-23T09:20:00'),
      status: 'resolved',
      sentiment: 'neutral'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');

  const categories = [
    { id: 'all', name: 'সব ক্যাটাগরি' },
    { id: 'AI সহায়তা', name: 'AI সহায়তা' },
    { id: 'ডাক্তার খোঁজা', name: 'ডাক্তার খোঁজা' },
    { id: 'রক্তদান', name: 'রক্তদান' },
    { id: 'এম্বুলেন্স', name: 'এম্বুলেন্স' },
    { id: 'গর্ভাবস্থা', name: 'গর্ভাবস্থা' },
    { id: 'অন্যান্য', name: 'অন্যান্য' }
  ];

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesCategory = selectedCategory === 'all' || feedback.category === selectedCategory;
    const matchesRating = selectedRating === 'all' || feedback.rating.toString() === selectedRating;
    return matchesCategory && matchesRating;
  });

  const averageRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;
  const totalFeedbacks = feedbacks.length;
  const positiveFeedbacks = feedbacks.filter(f => f.sentiment === 'positive').length;
  const satisfactionRate = (positiveFeedbacks / totalFeedbacks) * 100;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MessageSquare className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Feedback System</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            আপনার মতামত ও পরামর্শ আমাদের সেবা উন্নত করতে সাহায্য করে
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800">{totalFeedbacks}</h3>
            <p className="text-gray-600">মোট ফিডব্যাক</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Star className="w-6 h-6" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</h3>
            <p className="text-gray-600">গড় রেটিং</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <ThumbsUp className="w-6 h-6" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800">{satisfactionRate.toFixed(0)}%</h3>
            <p className="text-gray-600">সন্তুষ্টির হার</p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Heart className="w-6 h-6" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800">{positiveFeedbacks}</h3>
            <p className="text-gray-600">পজিটিভ রিভিউ</p>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">ক্যাটাগরি</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">রেটিং</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500"
              >
                <option value="all">সব রেটিং</option>
                <option value="5">৫ স্টার</option>
                <option value="4">৪ স্টার</option>
                <option value="3">৩ স্টার</option>
                <option value="2">২ স্টার</option>
                <option value="1">১ স্টার</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Feedback List */}
        <div className="space-y-6">
          {filteredFeedbacks.map((feedback, index) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <User className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{feedback.name}</h3>
                    <p className="text-gray-600">{feedback.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        {renderStars(feedback.rating)}
                      </div>
                      <span className="text-sm text-gray-500">({feedback.rating}/5)</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    {getSentimentIcon(feedback.sentiment)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feedback.status)}`}>
                      {feedback.status === 'pending' ? 'পেন্ডিং' : 
                       feedback.status === 'reviewed' ? 'পর্যালোচিত' : 'সমাধান হয়েছে'}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {feedback.timestamp.toLocaleDateString('bn-BD')}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-3">
                  {feedback.category}
                </span>
                <p className="text-gray-700 leading-relaxed text-lg">{feedback.message}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <motion.button
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">সহায়ক</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm font-medium">সহায়ক নয়</span>
                  </motion.button>
                </div>
                
                <motion.button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  উত্তর দিন
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <MessageSquare className="w-10 h-10" />
            </motion.div>
            <p className="text-gray-500 text-lg">কোন ফিডব্যাক পাওয়া যায়নি</p>
            <p className="text-gray-400 text-sm mt-2">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 text-center text-white mt-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 text-white mb-6 shadow-2xl backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Heart className="w-10 h-10" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">আপনার মতামত গুরুত্বপূর্ণ</h2>
          <p className="text-xl mb-8 text-purple-100">
            আমাদের সেবা উন্নত করতে আপনার ফিডব্যাক দিন
          </p>
          <motion.button
            className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ফিডব্যাক দিন
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackPage;