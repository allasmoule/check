import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AIPopup from '../components/AIPopup';
import { 
  Heart, 
  Baby, 
  Calendar, 
  Stethoscope, 
  AlertTriangle, 
  Shield,
  Users,
  Pill,
  UserCheck,
  Droplets,
  Bell,
  Sparkles,
  Type,
  Image,
  Mic,
  Truck,
  MessageCircle
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [isAIPopupOpen, setIsAIPopupOpen] = React.useState(false);

  const services = [
    {
      icon: Heart,
      title: 'স্বাস্থ্য বিষয়ক রোগ',
      description: 'সাধারণ স্বাস্থ্য সমস্যা ও রোগের পরামর্শ',
      path: '/health-disease',
      gradient: 'from-red-500 to-pink-500',
      hasChat: true
    },
    {
      icon: Baby,
      title: 'গর্ভাবস্থা সহায়তা',
      description: 'গর্ভাবস্থায় যত্ন ও পরামর্শ',
      path: '/pregnancy-support',
      gradient: 'from-pink-500 to-purple-500',
      hasChat: true
    },
    {
      icon: Calendar,
      title: 'মাসিক সহায়তা',
      description: 'মাসিক চক্র সংক্রান্ত পরামর্শ',
      path: '/period-support',
      gradient: 'from-purple-500 to-indigo-500',
      hasChat: true
    },
    {
      icon: Stethoscope,
      title: 'পশু চিকিৎসা',
      description: 'পশু পাখির চিকিৎসা পরামর্শ',
      path: '/animal-treatment',
      gradient: 'from-green-500 to-emerald-500',
      hasChat: true
    },
    {
      icon: AlertTriangle,
      title: 'গর্ভপাত সহায়তা',
      description: 'গর্ভপাত পরবর্তী যত্ন ও পরামর্শ',
      path: '/abortion-support',
      gradient: 'from-orange-500 to-red-500',
      hasChat: true
    },
    {
      icon: Shield,
      title: 'প্রাণীর কামড়',
      description: 'প্রাণীর কামড়ের প্রাথমিক চিকিৎসা',
      path: '/animal-bite',
      gradient: 'from-yellow-500 to-orange-500',
      hasChat: true
    },
    {
      icon: Users,
      title: 'শিশু স্বাস্থ্য পরামর্শ',
      description: 'শিশুদের স্বাস্থ্য যত্ন ও পরামর্শ',
      path: '/child-health',
      gradient: 'from-blue-500 to-cyan-500',
      hasChat: true
    },
    {
      icon: Pill,
      title: 'ওষুধ পরামর্শ',
      description: 'ওষুধ সংক্রান্ত তথ্য ও পরামর্শ',
      path: '/medicine',
      gradient: 'from-teal-500 to-green-500',
      hasChat: false
    },
    {
      icon: UserCheck,
      title: 'ডাক্তার খোঁজা',
      description: 'আপনার এলাকার ডাক্তার খুঁজুন',
      path: '/find-doctor',
      gradient: 'from-indigo-500 to-purple-500',
      hasChat: false
    },
    {
      icon: Droplets,
      title: 'রক্তদান সহায়তা',
      description: 'রক্তদান ও গ্রহণের তথ্য',
      path: '/blood-donation',
      gradient: 'from-red-500 to-rose-500',
      hasChat: false
    },
    {
      icon: Bell,
      title: 'স্বাস্থ্য সতর্ক বার্তা',
      description: 'জরুরি স্বাস্থ্য সতর্কতা',
      path: '/health-alert',
      gradient: 'from-amber-500 to-yellow-500',
      hasChat: false
    },
    {
      icon: Truck,
      title: 'এম্বুলেন্স সেবা',
      description: 'জরুরি এম্বুলেন্স সেবা ও AI সহায়তা',
      path: '/ambulance',
      gradient: 'from-red-500 to-orange-500',
      hasChat: true
    },
    {
      icon: AlertTriangle,
      title: 'দুর্যোগ সহায়তা',
      description: 'বন্যা, ঘূর্ণিঝড় ও দুর্যোগকালীন সহায়তা',
      path: '/disaster-support',
      gradient: 'from-red-500 to-orange-500',
      hasChat: true
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
              সুস্থ আনে স্বাস্থ্য
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              আধুনিক প্রযুক্তির সাহায্যে স্বাস্থ্য সেবা পান ঘরে বসে
            </p>
            <motion.div
              className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg cursor-pointer"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAIPopupOpen(true)}
            >
              AI চালিত স্বাস্থ্য সহায়ক
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              আমাদের সেবাসমূহ
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              বিশেষজ্ঞ পরামর্শ থেকে শুরু করে জরুরি সহায়তা - সব এক জায়গায়
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={service.path}>
                  <motion.div
                    className="group relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                      y: -5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Icon */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} text-white mb-6`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="w-8 h-8" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>

                    {/* AI Chat Badge */}
                    {service.hasChat && (
                      <motion.div
                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        AI চ্যাট সহায়তা
                      </motion.div>
                    )}

                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-blue-600 font-bold">→</span>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              কেন আমাদের বেছে নিবেন?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'AI চালিত পরামর্শ',
                description: 'অত্যাধুনিক কৃত্রিম বুদ্ধিমত্তার সাহায্যে তাৎক্ষণিক স্বাস্থ্য পরামর্শ'
              },
              {
                icon: Shield,
                title: '২৪/৭ উপলব্ধ',
                description: 'দিন-রাত যেকোনো সময় আমাদের সেবা পাবেন'
              },
              {
                icon: Users,
                title: 'বিশেষজ্ঞ পরামর্শ',
                description: 'অভিজ্ঞ চিকিৎসকদের তত্ত্বাবধানে তৈরি পরামর্শ'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-green-600 text-white mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Support Information Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white mb-6 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{
                transform: 'perspective(1000px) rotateX(5deg)',
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)'
              }}
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">AI সহায়তার মাধ্যম</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              আমাদের AI স্বাস্থ্য সহায়কের সাথে তিনটি ভিন্ন মাধ্যমে যোগাযোগ করুন
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Type,
                title: 'টেক্সট মেসেজ',
                description: 'লিখে আপনার স্বাস্থ্য সমস্যার কথা জানান এবং তাৎক্ষণিক পরামর্শ পান',
                color: 'from-blue-500 to-indigo-500',
                bgColor: 'from-blue-50 to-indigo-50',
                borderColor: 'border-blue-200',
                features: ['তাৎক্ষণিক উত্তর', 'বিস্তারিত পরামর্শ', '২৪/৭ উপলব্ধ']
              },
              {
                icon: Image,
                title: 'ছবি আপলোড',
                description: 'প্রেসক্রিপশন, টেস্ট রিপোর্ট বা স্বাস্থ্য সমস্যার ছবি পাঠিয়ে পরামর্শ নিন',
                color: 'from-green-500 to-emerald-500',
                bgColor: 'from-green-50 to-emerald-50',
                borderColor: 'border-green-200',
                features: ['ছবি বিশ্লেষণ', 'রিপোর্ট পর্যালোচনা', 'দ্রুত সমাধান']
              },
              {
                icon: Mic,
                title: 'ভয়েস মেসেজ',
                description: 'কথা বলে আপনার সমস্যা বর্ণনা করুন এবং কণ্ঠস্বরে পরামর্শ পান',
                color: 'from-red-500 to-pink-500',
                bgColor: 'from-red-50 to-pink-50',
                borderColor: 'border-red-200',
                features: ['কণ্ঠ চিনতে পারে', 'প্রাকৃতিক কথোপকথন', 'সহজ ব্যবহার']
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className={`group relative bg-gradient-to-br ${method.bgColor} rounded-3xl p-8 border-2 ${method.borderColor} hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
                }}
                style={{
                  transform: 'perspective(1000px) rotateX(2deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 3D Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Floating particles */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-bounce" />
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" />
                
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${method.color} rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl relative overflow-hidden`}
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{
                    transform: 'perspective(500px) rotateX(10deg)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <method.icon className="w-10 h-10 relative z-10" />
                </motion.div>
                
                <h3 className="font-bold text-gray-800 mb-4 text-2xl group-hover:text-indigo-600 transition-colors duration-300 text-center">
                  {method.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed text-center mb-6 text-lg">
                  {method.description}
                </p>
                
                <div className="space-y-3">
                  {method.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-center text-gray-600 bg-white/60 rounded-xl p-3 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <span className={`w-3 h-3 bg-gradient-to-r ${method.color} rounded-full mr-3 shadow-sm`}></span>
                      {feature}
                    </motion.div>
                  ))}
                </div>
                
                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:${method.borderColor} transition-colors duration-300`} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">কিভাবে ব্যবহার করবেন?</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                নিচের "AI চালিত স্বাস্থ্য সহায়ক" বাটনে ক্লিক করুন এবং আপনার পছন্দের মাধ্যমে (টেক্সট, ছবি বা ভয়েস) 
                আমাদের AI এর সাথে কথা বলুন। আমাদের উন্নত AI সিস্টেম আপনার প্রশ্নের সঠিক উত্তর দিতে সক্ষম।
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Popup */}
      <AIPopup 
        isOpen={isAIPopupOpen} 
        onClose={() => setIsAIPopupOpen(false)} 
      />
    </div>
  );
};

export default HomePage;