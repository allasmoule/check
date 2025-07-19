import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Baby, Heart, Shield, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import AIChat from '../components/AIChat';

const ChildHealthPage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const ageGroups = [
    {
      age: '০-৬ মাস',
      subtitle: 'নবজাতক পর্যায়',
      feeding: 'শুধুমাত্র বুকের দুধ',
      checkup: 'মাসিক ওজন পরীক্ষা',
      vaccination: 'BCG, পোলিও, DPT, হেপাটাইটিস B',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      icon: '👶'
    },
    {
      age: '৬-১২ মাস',
      subtitle: 'সম্পূরক খাবার শুরু',
      feeding: 'বুকের দুধ + সম্পূরক খাবার',
      checkup: 'মাসিক বৃদ্ধি পরীক্ষা',
      vaccination: 'হাম, MR, নিউমোনিয়া',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      icon: '🍼'
    },
    {
      age: '১-২ বছর',
      subtitle: 'হাঁটাচলা শেখার সময়',
      feeding: 'পারিবারিক খাবার',
      checkup: 'তিন মাস পর পর',
      vaccination: 'ডিপথেরিয়া, টিটেনাস',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      icon: '🚶‍♂️'
    },
    {
      age: '২-৫ বছর',
      subtitle: 'প্রাক-স্কুল পর্যায়',
      feeding: 'সুষম খাবার',
      checkup: 'ছয় মাস পর পর',
      vaccination: 'বার্ষিক টিকা',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      icon: '🎒'
    }
  ];

  const commonProblems = [
    {
      icon: '🌡️',
      title: 'জ্বর',
      symptoms: ['উচ্চ তাপমাত্রা', 'শীত শীত ভাব'],
      treatment: ['প্যারাসিটামল', 'স্পঞ্জিং'],
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: '🤧',
      title: 'সর্দি-কাশি',
      symptoms: ['নাক বন্ধ', 'কাশি'],
      treatment: ['নরম তরল', 'গরম বাষ্প'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💧',
      title: 'ডায়রিয়া',
      symptoms: ['পাতলা পায়খানা', 'বমি'],
      treatment: ['ORS', 'জিঙ্ক'],
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  const nutritionTips = [
    '০-৬ মাস: শুধুমাত্র বুকের দুধ',
    '৬ মাস পর: বুকের দুধ + সম্পূরক খাবার',
    'আয়রন সমৃদ্ধ খাবার দিন',
    'ভিটামিন A সমৃদ্ধ খাবার',
    'প্রতিদিন পানি পান করান',
    'চিনি ও লবণ কম দিন'
  ];

  const vaccinationSchedule = [
    { age: 'জন্মের পর', vaccines: 'BCG, পোলিও-০, হেপাটাইটিস B-১' },
    { age: '৬ সপ্তাহ', vaccines: 'পোলিও-১, DPT-১, হেপাটাইটিস B-২, হিব-১' },
    { age: '১০ সপ্তাহ', vaccines: 'পোলিও-২, DPT-২, হেপাটাইটিস B-৩, হিব-২' },
    { age: '১৪ সপ্তাহ', vaccines: 'পোলিও-৩, DPT-৩, হিব-৩' },
    { age: '৯ মাস', vaccines: 'হাম, MR' },
    { age: '১৮ মাস', vaccines: 'DPT বুস্টার, পোলিও বুস্টার' }
  ];

  const nextStage = () => {
    if (currentStage < ageGroups.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  const sendNutritionTipToChat = (tip: string) => {
    const message = `${tip} - এই বিষয়ে বিস্তারিত পরামর্শ দিন।`;
    setChatMessages(prev => [...prev, message]);
  };

  const currentStageData = ageGroups[currentStage];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-6">
            <Baby className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">শিশু স্বাস্থ্য পরামর্শ</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            শিশুদের সুস্বাস্থ্য ও সঠিক বৃদ্ধির জন্য সম্পূর্ণ গাইডলাইন
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Child Health Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Age Groups Wizard */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
              style={{
                transform: 'perspective(1000px) rotateY(-1deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Wizard Header */}
              <div className={`bg-gradient-to-r ${currentStageData.color} text-white p-8 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
                
                {/* Floating particles */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-bounce" />
                <div className="absolute top-8 right-8 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
                <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" />
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className="text-6xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentStageData.icon}
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{currentStageData.age}</h2>
                      <p className="text-white/90 text-lg">{currentStageData.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Stage Indicator with Animation */}
                  <div className="flex space-x-2">
                    {ageGroups.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`w-4 h-4 rounded-full cursor-pointer ${
                          index === currentStage ? 'bg-white shadow-lg' : 'bg-white/30'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setCurrentStage(index)}
                        animate={index === currentStage ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.5, repeat: index === currentStage ? Infinity : 0 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Wizard Content with Animation */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStage}
                    initial={{ opacity: 0, x: 50, rotateY: 10 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -50, rotateY: -10 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className={`bg-gradient-to-br ${currentStageData.bgColor} rounded-3xl p-8`}
                    style={{
                      transform: 'perspective(800px) rotateX(2deg)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { title: 'খাদ্য', content: currentStageData.feeding, icon: '🍼' },
                        { title: 'চেকআপ', content: currentStageData.checkup, icon: '👩‍⚕️' },
                        { title: 'টিকা', content: currentStageData.vaccination, icon: '💉' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                          className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/95 transition-all duration-300 border border-white/50 hover:shadow-xl"
                          whileHover={{ 
                            scale: 1.05, 
                            y: -5,
                            rotateY: 5,
                            boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                          }}
                          style={{
                            transform: 'perspective(500px) rotateX(1deg)',
                          }}
                        >
                          <motion.div
                            className="text-4xl mb-4 text-center"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                          >
                            {item.icon}
                          </motion.div>
                          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors text-center">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-center bg-white/60 rounded-xl p-3">
                            {item.content}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons with 3D Effect */}
                <div className="flex justify-between items-center mt-8">
                  <motion.button
                    onClick={prevStage}
                    disabled={currentStage === 0}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                      currentStage === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:shadow-xl'
                    }`}
                    whileHover={currentStage > 0 ? { scale: 1.05, y: -2 } : {}}
                    whileTap={currentStage > 0 ? { scale: 0.95 } : {}}
                    style={{
                      transform: currentStage > 0 ? 'perspective(500px) rotateX(-2deg)' : 'none'
                    }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>পূর্ববর্তী</span>
                  </motion.button>

                  <div className="text-center">
                    <span className="text-gray-600 font-medium text-lg">
                      {currentStage + 1} / {ageGroups.length}
                    </span>
                  </div>

                  <motion.button
                    onClick={nextStage}
                    disabled={currentStage === ageGroups.length - 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                      currentStage === ageGroups.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : `bg-gradient-to-r ${currentStageData.color} text-white hover:shadow-xl`
                    }`}
                    whileHover={currentStage < ageGroups.length - 1 ? { scale: 1.05, y: -2 } : {}}
                    whileTap={currentStage < ageGroups.length - 1 ? { scale: 0.95 } : {}}
                    style={{
                      transform: currentStage < ageGroups.length - 1 ? 'perspective(500px) rotateX(-2deg)' : 'none'
                    }}
                  >
                    <span>পরবর্তী</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Compact Common Problems */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">সাধারণ সমস্যা</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {commonProblems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-blue-100"
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <motion.div
                      className="text-3xl mb-3"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {problem.icon}
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-2">{problem.title}</h3>
                    <div className="space-y-1">
                      {problem.symptoms.map((symptom, i) => (
                        <div key={i} className="text-gray-600 text-xs bg-white/60 rounded-lg p-1">
                          • {symptom}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Clickable Nutrition Tips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-green-50 rounded-2xl shadow-lg p-6 border border-green-200"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">পুষ্টি পরামর্শ</h2>
              <p className="text-green-600 mb-4 text-center">টিপসে ক্লিক করুন এবং AI থেকে বিস্তারিত পরামর্শ নিন</p>
              <div className="grid md:grid-cols-2 gap-3">
                {nutritionTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between text-green-700 bg-white/60 rounded-xl p-3 backdrop-blur-sm border border-green-200/50 hover:bg-white/80 transition-all duration-200 cursor-pointer group"
                    onClick={() => sendNutritionTipToChat(tip)}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 shadow-sm"></span>
                      <span className="flex-1">{tip}</span>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Plus className="w-4 h-4 text-green-500" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* 3D Vaccination Schedule - Side by Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-purple-50 rounded-3xl shadow-2xl p-8 border border-purple-200 relative overflow-hidden"
              style={{
                transform: 'perspective(1000px) rotateX(2deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* 3D Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-indigo-400/5 animate-pulse" />
              
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-purple-300/50 rounded-full animate-bounce" />
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-indigo-300/50 rounded-full animate-pulse" />
              
              <div className="relative">
                <div className="text-center mb-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-4 shadow-2xl"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    style={{
                      transform: 'perspective(500px) rotateX(10deg)',
                    }}
                  >
                    <span className="text-2xl">💉</span>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-purple-800 mb-2">টিকা সূচি</h2>
                  <p className="text-purple-600">শিশুর টিকার সময়সূচি</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {vaccinationSchedule.map((schedule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, rotateX: 10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
                      className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50 hover:bg-white/80 transition-all duration-300 hover:shadow-xl"
                      whileHover={{ 
                        scale: 1.05, 
                        y: -5,
                        rotateY: 5,
                        boxShadow: '0 25px 50px rgba(147, 51, 234, 0.15)'
                      }}
                      style={{
                        transform: 'perspective(800px) rotateX(1deg)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {index + 1}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-purple-700 mb-2 text-lg group-hover:text-purple-600 transition-colors">
                            {schedule.age}
                          </h3>
                          <p className="text-purple-600 text-sm leading-relaxed bg-white/60 rounded-xl p-3">
                            {schedule.vaccines}
                          </p>
                        </div>
                      </div>
                      
                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-200 transition-colors duration-300" />
                    </motion.div>
                  ))}
                </div>
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
                title="শিশু স্বাস্থ্য পরামর্শ"
                placeholder="শিশুর স্বাস্থ্য সম্পর্কে জিজ্ঞাসা করুন..."
                context="child-health"
                externalMessages={chatMessages}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildHealthPage;