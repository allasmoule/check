import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Heart, Shield, Users, CheckCircle } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'ফোন',
      details: ['+৮৮০ ১৭১২-৩৪৫৬৭৮', '+৮৮০ ১৮৮৮-৯৯৯০০০'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      icon: Mail,
      title: 'ইমেইল',
      details: ['info@sustho.com', 'support@sustho.com'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: MapPin,
      title: 'ঠিকানা',
      details: ['ধানমন্ডি, ঢাকা-১২০৫', 'বাংলাদেশ'],
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50'
    },
    {
      icon: Clock,
      title: 'সেবার সময়',
      details: ['২৪/৭ অনলাইন সেবা', 'সপ্তাহের সবদিন'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];

  const subjects = [
    'সাধারণ স্বাস্থ্য পরামর্শ',
    'গর্ভাবস্থা সহায়তা',
    'শিশু স্বাস্থ্য',
    'প্রাণীর কামড়',
    'দুর্যোগ সহায়তা',
    'টেকনিক্যাল সাপোর্ট',
    'অন্যান্য'
  ];

  const features = [
    {
      icon: Heart,
      title: '২৪/৭ সেবা',
      description: 'দিন-রাত যেকোনো সময় আমাদের সেবা পাবেন'
    },
    {
      icon: Shield,
      title: 'বিশেষজ্ঞ পরামর্শ',
      description: 'অভিজ্ঞ চিকিৎসকদের তত্ত্বাবধানে AI পরামর্শ'
    },
    {
      icon: Users,
      title: 'সম্প্রদায় সহায়তা',
      description: 'একসাথে সুস্থ থাকার জন্য কমিউনিটি সাপোর্ট'
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
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MessageCircle className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">যোগাযোগ</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            আমাদের সাথে যোগাযোগ করুন এবং আপনার স্বাস্থ্য সেবার অভিজ্ঞতা শেয়ার করুন
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Send className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">আমাদের লিখুন</h2>
                <p className="text-gray-600">আপনার মতামত ও প্রশ্ন পাঠান</p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: 3, duration: 0.5 }}
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">ধন্যবাদ!</h3>
                  <p className="text-green-600 text-lg">
                    আপনার মেসেজ সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    আরেকটি মেসেজ পাঠান
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">নাম *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all"
                        placeholder="আপনার পূর্ণ নাম"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">ইমেইল *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">ফোন</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all"
                        placeholder="০১৭xxxxxxxx"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-gray-700 mb-2">বিষয় *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all"
                      >
                        <option value="">বিষয় নির্বাচন করুন</option>
                        {subjects.map((subject, index) => (
                          <option key={index} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">বার্তা *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all resize-none"
                      placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>পাঠানো হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        <span>মেসেজ পাঠান</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Phone className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">যোগাযোগের তথ্য</h3>
                <p className="text-gray-600">আমাদের সাথে সরাসরি যোগাযোগ করুন</p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`bg-gradient-to-br ${info.bgColor} rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300`}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center text-white shadow-lg`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <info.icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">{info.title}</h4>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-2xl p-8 border border-blue-200"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Heart className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-blue-800 mb-2">আমাদের বিশেষত্ব</h3>
                <p className="text-blue-600">কেন আমাদের বেছে নিবেন</p>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/60 rounded-2xl p-4 backdrop-blur-sm border border-blue-200 hover:bg-white/80 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <feature.icon className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h4 className="font-bold text-blue-800 mb-2">{feature.title}</h4>
                        <p className="text-blue-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-red-50 rounded-3xl shadow-2xl p-8 border border-red-200"
            >
              <div className="text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Phone className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-red-800 mb-4">জরুরি যোগাযোগ</h3>
                <motion.a
                  href="tel:999"
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6" />
                  <span>🆘 জরুরি কল (৯৯৯)</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;