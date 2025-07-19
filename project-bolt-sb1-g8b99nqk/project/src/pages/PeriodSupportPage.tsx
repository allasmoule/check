import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Shield, ChevronLeft, ChevronRight, MessageCircle, Image, Mic, Type, Plus } from 'lucide-react';
import AIChat from '../components/AIChat';

const PeriodSupportPage: React.FC = () => {
  const [currentCycleStage, setCurrentCycleStage] = useState(0);
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const menstrualCycle = [
    {
      phase: 'মাসিক পর্যায়',
      days: 'দিন ১-৫',
      description: 'জরায়ুর আস্তরণ ঝরে যাওয়া',
      symptoms: ['রক্তপাত', 'পেট ব্যথা', 'মাথা ব্যথা', 'মুড সুইং'],
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      icon: '🩸'
    },
    {
      phase: 'ফলিকুলার পর্যায়',
      days: 'দিন ১-১৩',
      description: 'নতুন ডিম্বাণু তৈরি হওয়া',
      symptoms: ['শক্তি বৃদ্ধি', 'ভাল মুড', 'পরিষ্কার ত্বক'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      icon: '🌱'
    },
    {
      phase: 'ওভুলেশন',
      days: 'দিন ১৪',
      description: 'ডিম্বাণু নিঃসরণ',
      symptoms: ['সামান্য ব্যথা', 'স্রাব বৃদ্ধি', 'তাপমাত্রা বৃদ্ধি'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      icon: '🥚'
    },
    {
      phase: 'লুটিয়াল পর্যায়',
      days: 'দিন ১৫-২৮',
      description: 'জরায়ু প্রস্তুতি',
      symptoms: ['PMS লক্ষণ', 'স্তন ব্যথা', 'খিদে বৃদ্ধি'],
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      icon: '🌙'
    }
  ];

  const painRelief = [
    {
      icon: Heart,
      title: 'প্রাকৃতিক উপায়',
      tips: ['গরম সেঁক', 'যোগব্যায়াম', 'ম্যাসাজ', 'হালকা ব্যায়াম'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'খাদ্য পরামর্শ',
      tips: ['আয়রন সমৃদ্ধ খাবার', 'ক্যালসিয়াম', 'পানি বেশি পান', 'চা কম খান'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const hygieneTips = [
    'পরিষ্কার প্যাড বা ট্যাম্পন ব্যবহার করুন',
    'প্রতি ৪-৬ ঘণ্টা পর পর পরিবর্তন করুন',
    'নিয়মিত গোসল করুন',
    'সুতি অন্তর্বাস পরুন',
    'হাত ধোয়ার অভ্যাস করুন',
    'পরিষ্কার পানি ব্যবহার করুন'
  ];

  const nextCycleStage = () => {
    if (currentCycleStage < menstrualCycle.length - 1) {
      setCurrentCycleStage(currentCycleStage + 1);
    }
  };

  const prevCycleStage = () => {
    if (currentCycleStage > 0) {
      setCurrentCycleStage(currentCycleStage - 1);
    }
  };

  const sendHygieneTipToChat = (tip: string) => {
    const message = `${tip} - এই বিষয়ে বিস্তারিত পরামর্শ দিন।`;
    setChatMessages(prev => [...prev, message]);
  };

  const currentStage = menstrualCycle[currentCycleStage];

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
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Calendar className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">মাসিক সহায়তা</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            মাসিক চক্র সম্পর্কে সঠিক তথ্য এবং স্বাস্থ্যকর জীবনযাত্রার পরামর্শ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Period Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Menstrual Cycle Wizard */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Wizard Header */}
              <div className={`bg-gradient-to-r ${currentStage.color} text-white p-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="text-6xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentStage.icon}
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{currentStage.phase}</h2>
                      <p className="text-white/90 text-lg">{currentStage.days}</p>
                    </div>
                  </div>
                  
                  {/* Stage Indicator */}
                  <div className="flex space-x-2">
                    {menstrualCycle.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-4 h-4 rounded-full ${
                          index === currentCycleStage ? 'bg-white shadow-lg' : 'bg-white/30'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setCurrentCycleStage(index)}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Wizard Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCycleStage}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-gradient-to-br ${currentStage.bgColor} rounded-3xl p-8`}
                  >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentStage.description}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentStage.symptoms.map((symptom, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/95 transition-all duration-300 border border-white/50"
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <div className="flex items-center">
                            <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mr-3"></span>
                            <span className="text-gray-700 font-medium">{symptom}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8">
                  <motion.button
                    onClick={prevCycleStage}
                    disabled={currentCycleStage === 0}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                      currentCycleStage === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:shadow-lg'
                    }`}
                    whileHover={currentCycleStage > 0 ? { scale: 1.05 } : {}}
                    whileTap={currentCycleStage > 0 ? { scale: 0.95 } : {}}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>পূর্ববর্তী</span>
                  </motion.button>

                  <div className="text-center">
                    <span className="text-gray-600 font-medium">
                      {currentCycleStage + 1} / {menstrualCycle.length}
                    </span>
                  </div>

                  <motion.button
                    onClick={nextCycleStage}
                    disabled={currentCycleStage === menstrualCycle.length - 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                      currentCycleStage === menstrualCycle.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : `bg-gradient-to-r ${currentStage.color} text-white hover:shadow-lg`
                    }`}
                    whileHover={currentCycleStage < menstrualCycle.length - 1 ? { scale: 1.05 } : {}}
                    whileTap={currentCycleStage < menstrualCycle.length - 1 ? { scale: 0.95 } : {}}
                  >
                    <span>পরবর্তী</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Pain Relief - Compact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 text-white mb-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Heart className="w-6 h-6" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">ব্যথা উপশম ও যত্ন</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {painRelief.map((relief, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-purple-100"
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-br ${relief.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                      whileHover={{ rotate: 15, scale: 1.15 }}
                    >
                      <relief.icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-3 text-lg">{relief.title}</h3>
                    <div className="space-y-2">
                      {relief.tips.map((tip, i) => (
                        <div key={i} className="text-gray-600 text-sm bg-white/60 rounded-lg p-2">
                          • {tip}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Clickable Hygiene Tips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 rounded-3xl shadow-xl p-8 border border-blue-200"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Shield className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-blue-800 mb-2">পরিচ্ছন্নতার নিয়ম</h2>
                <p className="text-blue-600">টিপসে ক্লিক করুন এবং AI থেকে বিস্তারিত পরামর্শ নিন</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {hygieneTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between text-blue-700 bg-white/60 rounded-2xl p-4 backdrop-blur-sm border border-blue-200/50 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
                    onClick={() => sendHygieneTipToChat(tip)}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 shadow-sm"></span>
                      <span className="flex-1">{tip}</span>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Plus className="w-5 h-5 text-blue-500" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Support Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 border border-purple-200"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MessageCircle className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-purple-800 mb-2">AI সহায়তা</h2>
                <p className="text-purple-600 text-lg">বিভিন্ন মাধ্যমে আমাদের AI এর সাথে যোগাযোগ করুন</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  className="text-center bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-purple-200/50 hover:bg-white/80 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Type className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-bold text-purple-800 mb-2 text-lg">টেক্সট মেসেজ</h3>
                  <p className="text-purple-600 text-sm">লিখে আপনার প্রশ্ন করুন</p>
                </motion.div>

                <motion.div
                  className="text-center bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-purple-200/50 hover:bg-white/80 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Image className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-bold text-purple-800 mb-2 text-lg">ছবি আপলোড</h3>
                  <p className="text-purple-600 text-sm">ছবি পাঠিয়ে পরামর্শ নিন</p>
                </motion.div>

                <motion.div
                  className="text-center bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-purple-200/50 hover:bg-white/80 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Mic className="w-8 h-8" />
                  </motion.div>
                  <h3 className="font-bold text-purple-800 mb-2 text-lg">ভয়েস মেসেজ</h3>
                  <p className="text-purple-600 text-sm">কথা বলে প্রশ্ন করুন</p>
                </motion.div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-purple-700 font-medium text-lg">
                  আপনি টেক্সট, ছবি এবং ভয়েস - তিনটি মাধ্যমেই আমাদের AI এর কাছে প্রশ্ন করতে পারেন
                </p>
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
                title="মাসিক সহায়তা"
                placeholder="মাসিক সংক্রান্ত প্রশ্ন করুন..."
                context="period-support"
                externalMessages={chatMessages}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodSupportPage;