import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Zap, Award, Target, Eye, Lightbulb, Globe, Stethoscope, Bot, Sparkles, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  const stats = [
    {
      number: '১০০+',
      label: 'স্বাস্থ্য বিষয়',
      icon: Heart,
      color: 'from-red-500 to-pink-500'
    },
    {
      number: '২৪/৭',
      label: 'সেবার সময়',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '৫০০+',
      label: 'সন্তুষ্ট ব্যবহারকারী',
      icon: Users,
      color: 'from-green-500 to-emerald-500'
    },
    {
      number: '৯৯%',
      label: 'নির্ভুলতা',
      icon: Award,
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const features = [
    {
      icon: Bot,
      title: 'AI চালিত পরামর্শ',
      description: 'অত্যাধুনিক কৃত্রিম বুদ্ধিমত্তার সাহায্যে তাৎক্ষণিক স্বাস্থ্য পরামর্শ পান',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      icon: Shield,
      title: 'নিরাপদ ও গোপনীয়',
      description: 'আপনার ব্যক্তিগত তথ্য সম্পূর্ণ নিরাপদ এবং গোপনীয় রাখা হয়',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Zap,
      title: 'তাৎক্ষণিক সেবা',
      description: 'যেকোনো সময় তাৎক্ষণিক স্বাস্থ্য পরামর্শ এবং জরুরি সহায়তা',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      icon: Globe,
      title: 'সর্বত্র উপলব্ধ',
      description: 'ইন্টারনেট সংযোগ থাকলেই যেকোনো জায়গা থেকে সেবা নিতে পারেন',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  const team = [
    {
      name: 'ডাঃ মোহাম্মদ রহিম',
      role: 'প্রধান চিকিৎসা পরামর্শদাতা',
      qualification: 'MBBS, MD (মেডিসিন)',
      experience: '১৫ বছর',
      image: 'https://knowledgepanelservice.com/wp-content/uploads/2023/10/IMG_5537-scaled-e1698578825600-683x1024.jpg'
    },
    {
      name: 'ডাঃ ফাতেমা খাতুন',
      role: 'গাইনী ও প্রসূতি বিশেষজ্ঞ',
      qualification: 'MBBS, FCPS (গাইনী)',
      experience: '১২ বছর',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300'
    },
    {
      name: 'ডাঃ আব্দুল করিম',
      role: 'শিশু বিশেষজ্ঞ',
      qualification: 'MBBS, DCH, FCPS',
      experience: '১০ বছর',
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=300&h=300'
    },
    {
      name: 'প্রকৌশলী সাকিব হাসান',
      role: 'AI ডেভেলপার',
      qualification: 'BSc in CSE',
      experience: '৮ বছর',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'আমাদের লক্ষ্য',
      description: 'প্রতিটি বাংলাদেশীর হাতের মুঠোয় মানসম্পন্ন স্বাস্থ্য সেবা পৌঁছে দেওয়া'
    },
    {
      icon: Eye,
      title: 'আমাদের দৃষ্টিভঙ্গি',
      description: 'একটি সুস্থ বাংলাদেশ গড়ে তোলা যেখানে সবার জন্য স্বাস্থ্য সেবা সহজলভ্য'
    },
    {
      icon: Lightbulb,
      title: 'আমাদের মূল্যবোধ',
      description: 'সততা, নির্ভরযোগ্যতা, গোপনীয়তা এবং মানবিক সেবার প্রতি অঙ্গীকার'
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Heart className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">আমাদের সম্পর্কে</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            সুস্থ আনে স্বাস্থ্য - বাংলাদেশের প্রথম AI চালিত স্বাস্থ্য সেবা প্ল্যাটফর্ম
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-3xl shadow-2xl p-12 mb-16 border border-blue-200"
        >
          <div className="text-center">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-green-500 text-white mb-6 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">আমাদের মিশন</h2>
            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              আমরা বিশ্বাস করি যে প্রতিটি মানুষের মানসম্পন্ন স্বাস্থ্য সেবা পাওয়ার অধিকার রয়েছে। 
              আমাদের AI চালিত প্ল্যাটফর্ম ব্যবহার করে আমরা বাংলাদেশের প্রতিটি মানুষের কাছে 
              সাশ্রয়ী, নির্ভরযোগ্য এবং তাৎক্ষণিক স্বাস্থ্য সেবা পৌঁছে দিতে চাই।
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="text-center bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <stat.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">আমাদের বিশেষত্ব</h2>
            <p className="text-xl text-gray-600">কেন আমাদের প্ল্যাটফর্ম আলাদা</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-gradient-to-br ${feature.bgColor} rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300`}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl shadow-2xl p-12 mb-16 border border-purple-200"
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-6 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Heart className="w-10 h-10" />
            </motion.div>
            <h2 className="text-4xl font-bold text-purple-800 mb-4">আমাদের মূল্যবোধ</h2>
            <p className="text-xl text-purple-600">যে নীতিমালায় আমরা কাজ করি</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center bg-white/60 rounded-2xl p-8 backdrop-blur-sm border border-purple-200 hover:bg-white/80 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <value.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-purple-800 mb-4">{value.title}</h3>
                <p className="text-purple-700 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-6 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Users className="w-10 h-10" />
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">আমাদের টিম</h2>
            <p className="text-xl text-gray-600">অভিজ্ঞ পেশাদারদের একটি দল</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-1">{member.qualification}</p>
                <p className="text-gray-500 text-sm">অভিজ্ঞতা: {member.experience}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl shadow-2xl p-12 text-center text-white"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 text-white mb-6 shadow-2xl backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Stethoscope className="w-10 h-10" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4">আজই শুরু করুন</h2>
          <p className="text-xl mb-8 text-blue-100">
            আমাদের AI স্বাস্থ্য সহায়কের সাথে কথা বলুন এবং তাৎক্ষণিক পরামর্শ নিন
          </p>
          <motion.button
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
          >
            AI সহায়তা নিন
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;