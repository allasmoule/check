import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

const HealthAlertPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const alerts = [
    {
      id: 1,
      type: 'জরুরি',
      title: 'ডেঙ্গু সতর্কতা',
      description: 'ঢাকা শহরে ডেঙ্গু রোগীর সংখ্যা বৃদ্ধি পেয়েছে। সতর্ক থাকুন এবং প্রতিরোধমূলক ব্যবস্থা নিন।',
      date: '২৫ জানুয়ারি ২০২৫',
      time: '২ ঘণ্টা আগে',
      location: 'ঢাকা',
      recommendations: [
        'পানি জমতে দেবেন না',
        'মশারি ব্যবহার করুন',
        'জ্বর হলে দ্রুত চিকিৎসক দেখান'
      ]
    },
    {
      id: 2,
      type: 'সাধারণ',
      title: 'শীতকালীন স্বাস্থ্য সতর্কতা',
      description: 'শীতকালে সর্দি, কাশি ও নিউমোনিয়া প্রতিরোধে বিশেষ সতর্কতা অবলম্বন করুন।',
      date: '২৪ জানুয়ারি ২০২৫',
      time: '৫ ঘণ্টা আগে',
      location: 'সারাদেশ',
      recommendations: [
        'গরম কাপড় পরুন',
        'গরম পানি পান করুন',
        'ধূমপান থেকে বিরত থাকুন'
      ]
    },
    {
      id: 3,
      type: 'তথ্য',
      title: 'বিনামূল্যে স্বাস্থ্য পরীক্ষা',
      description: 'আগামী সপ্তাহে সরকারি হাসপাতালে বিনামূল্যে স্বাস্থ্য পরীক্ষা ক্যাম্প অনুষ্ঠিত হবে।',
      date: '২৩ জানুয়ারি ২০২৫',
      time: '১ দিন আগে',
      location: 'সারাদেশ',
      recommendations: [
        'সকাল ৯টা থেকে বিকেল ৫টা',
        'পরিচয়পত্র সাথে নিন',
        'খালি পেটে আসুন'
      ]
    },
    {
      id: 4,
      type: 'জরুরি',
      title: 'হেপাটাইটিস A প্রাদুর্ভাব',
      description: 'চট্টগ্রাম এলাকায় হেপাটাইটিস A এর প্রাদুর্ভাব দেখা দিয়েছে। খাবার ও পানিতে সতর্কতা অবলম্বন করুন।',
      date: '২২ জানুয়ারি ২০২৫',
      time: '২ দিন আগে',
      location: 'চট্টগ্রাম',
      recommendations: [
        'পানি ফুটিয়ে পান করুন',
        'খাবার ভালোভাবে রান্না করুন',
        'হাত নিয়মিত ধুয়ে নিন'
      ]
    },
    {
      id: 5,
      type: 'সাধারণ',
      title: 'টিকা সপ্তাহ',
      description: 'জাতীয় টিকা সপ্তাহ উপলক্ষে সকল শিশুর টিকা সম্পূর্ণ করার জন্য বিশেষ ব্যবস্থা।',
      date: '২০ জানুয়ারি ২০২৫',
      time: '৫ দিন আগে',
      location: 'সারাদেশ',
      recommendations: [
        'শিশুর টিকা কার্ড নিন',
        'নিকটস্থ স্বাস্থ্যকেন্দ্রে যান',
        'টিকার তারিখ মনে রাখুন'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'সব সতর্কতা', color: 'gray' },
    { id: 'জরুরি', name: 'জরুরি', color: 'red' },
    { id: 'সাধারণ', name: 'সাধারণ', color: 'blue' },
    { id: 'তথ্য', name: 'তথ্য', color: 'green' }
  ];

  const filteredAlerts = selectedCategory === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === selectedCategory);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'জরুরি':
        return <AlertTriangle className="w-5 h-5" />;
      case 'তথ্য':
        return <Info className="w-5 h-5" />;
      case 'সাধারণ':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'জরুরি':
        return 'from-red-500 to-orange-500';
      case 'তথ্য':
        return 'from-green-500 to-emerald-500';
      case 'সাধারণ':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'জরুরি':
        return 'bg-red-100 text-red-800';
      case 'তথ্য':
        return 'bg-green-100 text-green-800';
      case 'সাধারণ':
        return 'bg-blue-100 text-blue-800';
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white mb-6">
            <Bell className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">স্বাস্থ্য সতর্ক বার্তা</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            গুরুত্বপূর্ণ স্বাস্থ্য সতর্কতা এবং জরুরি তথ্য পান
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Alert Header */}
              <div className={`bg-gradient-to-r ${getAlertColor(alert.type)} text-white p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <h3 className="text-xl font-bold">{alert.title}</h3>
                      <p className="text-white/90 text-sm">{alert.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/90 text-sm">{alert.date}</p>
                    <div className="flex items-center text-white/80 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {alert.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-gray-700 flex-1 pr-4">{alert.description}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(alert.type)}`}>
                    {alert.type}
                  </span>
                </div>

                {/* Recommendations */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">সুপারিশ:</h4>
                  <ul className="space-y-2">
                    {alert.recommendations.map((recommendation, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-medium hover:shadow-lg transition-all"
                  >
                    বিস্তারিত পড়ুন
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-all"
                  >
                    শেয়ার করুন
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-50 rounded-3xl shadow-xl p-8 border border-red-200 mt-8"
        >
          <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            জরুরি যোগাযোগ
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-700 mb-3">জাতীয় জরুরি সেবা</h3>
              <ul className="space-y-2">
                <li className="text-red-600 text-sm">• জরুরি সেবা: ৯৯৯</li>
                <li className="text-red-600 text-sm">• স্বাস্থ্য বাতায়ন: ১৬২৬৩</li>
                <li className="text-red-600 text-sm">• বিষক্রিয়া: ১৬২৬৩</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-red-700 mb-3">স্বাস্থ্য অধিদপ্তর</h3>
              <ul className="space-y-2">
                <li className="text-red-600 text-sm">• কন্ট্রোল রুম: ০২-৫৫০৮৬৯০৮</li>
                <li className="text-red-600 text-sm">• ইমেইল: info@dghs.gov.bd</li>
                <li className="text-red-600 text-sm">• ওয়েবসাইট: www.dghs.gov.bd</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthAlertPage;