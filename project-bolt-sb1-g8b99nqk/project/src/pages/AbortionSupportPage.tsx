import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Heart, Shield, Phone, Plus } from 'lucide-react';
import AIChat from '../components/AIChat';

const AbortionSupportPage: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const postAbortionCare = [
    {
      title: 'শারীরিক যত্ন',
      points: ['পর্যাপ্ত বিশ্রাম নিন', 'ভারী কাজ এড়িয়ে চলুন', 'পুষ্টিকর খাবার খান', 'নিয়মিত ওষুধ সেবন'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-300'
    },
    {
      title: 'মানসিক স্বাস্থ্য',
      points: ['মানসিক সহায়তা নিন', 'পরিবারের সাথে কথা বলুন', 'প্রয়োজনে কাউন্সেলিং', 'নিজেকে দোষ দিবেন না'],
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-300'
    },
    {
      title: 'খাদ্য ও পুষ্টি',
      points: ['আয়রন সমৃদ্ধ খাবার', 'প্রোটিন জাতীয় খাবার', 'ভিটামিন C', 'প্রচুর পানি পান'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-300'
    }
  ];

  const warningSignals = [
    'অতিরিক্ত রক্তক্ষরণ',
    'তীব্র পেট ব্যথা',
    'উচ্চ জ্বর',
    'দুর্গন্ধযুক্ত স্রাব',
    '২৪ ঘণ্টার বেশি জ্বর',
    'শ্বাসকষ্ট',
    'অজ্ঞান হওয়া',
    'তীব্র বমি'
  ];

  const recoveryTimeline = [
    { time: 'প্রথম ২৪ ঘণ্টা', activity: 'সম্পূর্ণ বিশ্রাম, পানি পান, হালকা খাবার' },
    { time: 'প্রথম সপ্তাহ', activity: 'বিশ্রাম, নিয়মিত ওষুধ, পুষ্টিকর খাবার' },
    { time: 'দ্বিতীয় সপ্তাহ', activity: 'হালকা কাজ শুরু, ডাক্তারের পরামর্শ' },
    { time: 'তৃতীয় সপ্তাহ', activity: 'স্বাভাবিক জীবনযাত্রা, ফলোআপ চেকআপ' }
  ];

  const supportOrganizations = [
    {
      name: 'জাতীয় জরুরি সেবা',
      number: '৯৯৯',
      description: 'সব ধরনের জরুরি অবস্থার জন্য',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'স্বাস্থ্য বাতায়ন',
      number: '১৬২৬৩',
      description: 'স্বাস্থ্য সেবা ও পরামর্শের জন্য',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'মহিলা সহায়তা',
      number: '১০৯',
      description: 'মহিলাদের জন্য বিশেষ সহায়তা',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'মানসিক স্বাস্থ্য হেল্পলাইন',
      number: '০৯৬১১৬৭৭৭৭৭',
      description: 'মানসিক সহায়তা ও কাউন্সেলিং',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const sendCareInfoToChat = (careTitle: string, points: string[]) => {
    const message = `${careTitle} সম্পর্কে বিস্তারিত জানতে চাই। বিশেষ করে: ${points.join(', ')}`;
    setChatMessages(prev => [...prev, message]);
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white mb-6">
            <Heart className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">গর্ভপাত সহায়তা</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            গর্ভপাত পরবর্তী শারীরিক ও মানসিক যত্ন এবং সহায়তা
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Support Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compact Post Abortion Care */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">গর্ভপাত পরবর্তী যত্ন</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {postAbortionCare.map((care, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`group cursor-pointer bg-gradient-to-br ${care.bgColor} rounded-xl p-4 border-2 ${care.borderColor} hover:shadow-lg transition-all duration-300`}
                    onClick={() => sendCareInfoToChat(care.title, care.points)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${care.color} rounded-xl flex items-center justify-center text-white mb-3 shadow-md`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Heart className="w-6 h-6" />
                    </motion.div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                      {care.title}
                    </h3>
                    <div className="space-y-2">
                      {care.points.map((point, i) => (
                        <div key={i} className="text-gray-600 text-sm bg-white/60 rounded-lg p-2">
                          • {point}
                        </div>
                      ))}
                    </div>
                    
                    <motion.div
                      className="mt-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Plus className="w-4 h-4 text-orange-600 mr-1" />
                      <span className="text-orange-600 text-sm font-medium">চ্যাটবটে জিজ্ঞাসা করুন</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Compact Warning Signals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-red-50 rounded-2xl shadow-lg p-6 border border-red-200"
            >
              <h2 className="text-xl font-bold text-red-800 mb-4">সতর্কতা সংকেত</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {warningSignals.map((signal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center text-red-700 bg-white/60 rounded-lg p-3"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span className="text-sm">{signal}</span>
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-red-600 font-semibold text-center">
                এই লক্ষণগুলো দেখা দিলে অবিলম্বে ডাক্তারের সাথে যোগাযোগ করুন।
              </p>
            </motion.div>

            {/* Side by Side Recovery Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200"
            >
              <h2 className="text-xl font-bold text-blue-800 mb-4">সুস্থতার সময়সূচি</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {recoveryTimeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start space-x-3 bg-white/60 rounded-lg p-4"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-700 mb-1">{item.time}</h3>
                      <p className="text-blue-600 text-sm">{item.activity}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Support Organizations with Call Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-green-50 rounded-2xl shadow-lg p-6 border border-green-200"
            >
              <h2 className="text-xl font-bold text-green-800 mb-4">সহায়তা সংস্থা</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {supportOrganizations.map((org, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-green-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-green-800 text-sm">{org.name}</h3>
                        <p className="text-green-600 text-xs">{org.description}</p>
                      </div>
                      <motion.a
                        href={`tel:${org.number}`}
                        className={`px-4 py-2 bg-gradient-to-r ${org.color} text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center space-x-2`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Phone className="w-4 h-4" />
                        <span>{org.number}</span>
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - AI Chat */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <AIChat
                title="গর্ভপাত সহায়তা"
                placeholder="গর্ভপাত পরবর্তী যত্ন সম্পর্কে জিজ্ঞাসা করুন..."
                context="abortion-support"
                externalMessages={chatMessages}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbortionSupportPage;