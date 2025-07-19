import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Heart, AlertTriangle, Shield } from 'lucide-react';
import AIChat from '../components/AIChat';

const AnimalTreatmentPage: React.FC = () => {
  const animalTypes = [
    {
      name: 'গরু',
      diseases: ['জ্বর', 'ডায়রিয়া', 'মুখ ও পায়ে ক্ষত', 'কাশি'],
      prevention: ['টিকা দেওয়া', 'পরিষ্কার পানি', 'সুষম খাবার', 'নিয়মিত পরিষ্কার'],
      color: 'from-brown-500 to-amber-600',
      bgColor: 'from-brown-50 to-amber-50',
      icon: '🐄'
    },
    {
      name: 'ছাগল',
      diseases: ['PPR', 'কৃমি', 'আন্ত্রিক সমস্যা', 'চর্মরোগ'],
      prevention: ['কৃমির ওষুধ', 'পরিষ্কার জায়গা', 'সময়মতো টিকা', 'সুষম খাবার'],
      color: 'from-gray-500 to-slate-600',
      bgColor: 'from-gray-50 to-slate-50',
      icon: '🐐'
    },
    {
      name: 'মুরগি',
      diseases: ['রাণীক্ষেত', 'কক্সিডিয়া', 'গামবোরো', 'ফাউল পক্স'],
      prevention: ['টিকা কার্যক্রম', 'পরিষ্কার খাঁচা', 'জীবাণুমুক্ত পানি', 'সুষম খাবার'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      icon: '🐔'
    },
    {
      name: 'মাছ',
      diseases: ['EUS', 'শ্বাসকষ্ট', 'পেট ফোলা', 'পাখনা পচা'],
      prevention: ['পানির গুণমান', 'সঠিক খাবার', 'নিয়মিত পরিষ্কার', 'ঘনত্ব নিয়ন্ত্রণ'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      icon: '🐟'
    }
  ];

  const emergencySignals = [
    {
      icon: AlertTriangle,
      title: 'জরুরি লক্ষণ',
      signs: ['হঠাৎ খাবার বন্ধ', 'শ্বাসকষ্ট', 'অস্বাভাবিক আচরণ', 'মাত্রাতিরিক্ত জ্বর'],
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Heart,
      title: 'প্রাথমিক চিকিৎসা',
      signs: ['আলাদা রাখুন', 'পানি দিন', 'ঠান্ডা জায়গায় রাখুন', 'পশু চিকিৎসকের কাছে নিন'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'প্রতিরোধ',
      signs: ['নিয়মিত টিকা', 'পরিষ্কার পরিবেশ', 'সুষম খাবার', 'স্বাস্থ্য পরীক্ষা'],
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const vaccinationSchedule = [
    { 
      animal: 'গরু ও ছাগল', 
      vaccines: [
        { name: 'তড়কা', schedule: '৬ মাস পর পর', color: 'bg-red-500' },
        { name: 'মুখ ও পায়ের ক্ষত', schedule: 'বছরে ২ বার', color: 'bg-orange-500' },
        { name: 'PPR (ছাগল)', schedule: '৩ বছর পর পর', color: 'bg-yellow-500' }
      ]
    },
    { 
      animal: 'মুরগি', 
      vaccines: [
        { name: 'রাণীক্ষেত', schedule: '৭ দিন বয়সে', color: 'bg-green-500' },
        { name: 'গামবোরো', schedule: '১৪ দিন বয়সে', color: 'bg-blue-500' },
        { name: 'ফাউল পক্স', schedule: '৮ সপ্তাহে', color: 'bg-purple-500' }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-6">
            <Stethoscope className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">পশু চিকিৎসা</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            পশু পাখির রোগ চিকিৎসা এবং স্বাস্থ্য পরামর্শ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Animal Treatment Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compact Animal Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">পশু পাখির রোগ</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {animalTypes.map((animal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`group relative bg-gradient-to-br ${animal.bgColor} rounded-2xl p-4 border border-green-200 hover:shadow-lg transition-all duration-300 overflow-hidden`}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -3,
                      boxShadow: '0 15px 30px rgba(34, 197, 94, 0.15)'
                    }}
                    style={{
                      transform: 'perspective(500px) rotateX(1deg)',
                    }}
                  >
                    {/* 3D Background Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${animal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Animal Icon */}
                    <motion.div
                      className="text-4xl mb-3 text-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {animal.icon}
                    </motion.div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-3 text-center group-hover:text-green-600 transition-colors">
                      {animal.name}
                    </h3>
                    
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm flex items-center justify-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        সাধারণ রোগ:
                      </h4>
                      <div className="space-y-1">
                        {animal.diseases.map((disease, i) => (
                          <div key={i} className="text-gray-600 text-xs bg-white/60 rounded-lg p-2 text-center">
                            {disease}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 text-sm flex items-center justify-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        প্রতিরোধ:
                      </h4>
                      <div className="space-y-1">
                        {animal.prevention.map((prevention, i) => (
                          <div key={i} className="text-gray-600 text-xs bg-white/60 rounded-lg p-2 text-center">
                            {prevention}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Compact Emergency Signals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">জরুরি তথ্য</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {emergencySignals.map((signal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`group text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 border border-green-100`}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: '0 15px 30px rgba(34, 197, 94, 0.1)'
                    }}
                  >
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-r ${signal.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <signal.icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-3 text-sm group-hover:text-green-600 transition-colors">
                      {signal.title}
                    </h3>
                    <div className="space-y-1">
                      {signal.signs.map((sign, i) => (
                        <div key={i} className="text-gray-600 text-xs bg-white/60 rounded-lg p-2">
                          • {sign}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Enhanced 3D Vaccination Schedule */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-3xl shadow-2xl p-8 border-2 border-purple-200 relative overflow-hidden"
              style={{
                transform: 'perspective(1000px) rotateX(2deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* 3D Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-blue-400/5 animate-pulse" />
              
              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-purple-300/50 rounded-full animate-bounce" />
              <div className="absolute bottom-6 left-6 w-2 h-2 bg-indigo-300/50 rounded-full animate-pulse" />
              <div className="absolute top-1/2 right-8 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-ping" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white mb-6 shadow-2xl"
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 15,
                      boxShadow: '0 25px 50px rgba(99, 102, 241, 0.4)'
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                    style={{
                      transform: 'perspective(500px) rotateX(10deg)',
                    }}
                  >
                    <span className="text-3xl">💉</span>
                  </motion.div>
                  <h2 className="text-4xl font-bold text-purple-800 mb-3">টিকা সূচি</h2>
                  <p className="text-purple-600 text-xl">পশু পাখির টিকার সময়সূচি</p>
                </div>
                
                <div className="space-y-8">
                  {vaccinationSchedule.map((schedule, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, rotateX: 10 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.2 * index, type: "spring", stiffness: 200 }}
                      className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-200/50 hover:bg-white/90 transition-all duration-500 hover:shadow-2xl"
                      whileHover={{ 
                        scale: 1.02, 
                        y: -8,
                        rotateY: 2,
                        boxShadow: '0 30px 60px rgba(147, 51, 234, 0.2)'
                      }}
                      style={{
                        transform: 'perspective(800px) rotateX(1deg)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <div className="flex items-center mb-6">
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl mr-6"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {index + 1}
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-purple-700 group-hover:text-purple-600 transition-colors">
                            {schedule.animal}
                          </h3>
                          <p className="text-purple-600">টিকা কার্যক্রম</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        {schedule.vaccines.map((vaccine, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i, type: "spring", stiffness: 300 }}
                            className="bg-white/80 rounded-2xl p-6 border border-purple-200/50 hover:shadow-lg transition-all duration-300"
                            whileHover={{ 
                              scale: 1.05, 
                              y: -3,
                              boxShadow: '0 15px 30px rgba(147, 51, 234, 0.1)'
                            }}
                          >
                            <div className="flex items-center mb-3">
                              <motion.div
                                className={`w-4 h-4 ${vaccine.color} rounded-full mr-3 shadow-sm`}
                                whileHover={{ scale: 1.2 }}
                              />
                              <h4 className="font-bold text-purple-800 text-lg">{vaccine.name}</h4>
                            </div>
                            <p className="text-purple-600 bg-purple-50 rounded-xl p-3 text-center font-medium">
                              {vaccine.schedule}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Hover Effect Border */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-300 transition-colors duration-300" />
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
                title="পশু চিকিৎসা পরামর্শ"
                placeholder="পশু পাখির স্বাস্থ্য সম্পর্কে জিজ্ঞাসা করুন..."
                context="animal-treatment"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalTreatmentPage;