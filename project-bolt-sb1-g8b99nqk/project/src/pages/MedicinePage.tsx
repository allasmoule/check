import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Search, AlertTriangle, Info } from 'lucide-react';

const MedicinePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const medicines = [
    {
      name: 'প্যারাসিটামল',
      category: 'ব্যথানাশক',
      uses: ['জ্বর', 'মাথা ব্যথা', 'শরীর ব্যথা'],
      dosage: 'প্রাপ্তবয়স্ক: ৫০০মিগ্রা ৬-৮ ঘণ্টা পর পর',
      sideEffects: ['পেট ব্যথা', 'বমি ভাব'],
      warnings: ['অতিরিক্ত সেবন লিভারের ক্ষতি করতে পারে']
    },
    {
      name: 'অ্যামোক্সিসিলিন',
      category: 'অ্যান্টিবায়োটিক',
      uses: ['সংক্রমণ', 'গলা ব্যথা', 'নিউমোনিয়া'],
      dosage: 'প্রাপ্তবয়স্ক: ২৫০-৫০০মিগ্রা ৮ ঘণ্টা পর পর',
      sideEffects: ['ডায়রিয়া', 'বমি', 'অ্যালার্জি'],
      warnings: ['সম্পূর্ণ কোর্স শেষ করুন', 'ডাক্তারের পরামর্শ ছাড়া সেবন করবেন না']
    },
    {
      name: 'ওআরএস',
      category: 'তরল পরিপূরক',
      uses: ['ডায়রিয়া', 'বমি', 'পানিশূন্যতা'],
      dosage: 'প্রয়োজন অনুযায়ী বার বার',
      sideEffects: ['খুব কম'],
      warnings: ['তাজা পানিতে গুলে নিন']
    },
    {
      name: 'অ্যান্টাসিড',
      category: 'পেটের ওষুধ',
      uses: ['অম্বল', 'পেট ব্যথা', 'বুক জ্বালা'],
      dosage: 'খাবারের ১ ঘণ্টা পর',
      sideEffects: ['কোষ্ঠকাঠিন্য', 'ডায়রিয়া'],
      warnings: ['অন্যান্য ওষুধের সাথে ব্যবধান রাখুন']
    },
    {
      name: 'আয়রন ট্যাবলেট',
      category: 'ভিটামিন ও খনিজ',
      uses: ['রক্তশূন্যতা', 'আয়রনের অভাব'],
      dosage: 'দৈনিক ১টি খাবারের সাথে',
      sideEffects: ['কোষ্ঠকাঠিন্য', 'বমি ভাব'],
      warnings: ['খালি পেটে খাবেন না']
    }
  ];

  const categories = [
    { id: 'all', name: 'সব' },
    { id: 'ব্যথানাশক', name: 'ব্যথানাশক' },
    { id: 'অ্যান্টিবায়োটিক', name: 'অ্যান্টিবায়োটিক' },
    { id: 'তরল পরিপূরক', name: 'তরল পরিপূরক' },
    { id: 'পেটের ওষুধ', name: 'পেটের ওষুধ' },
    { id: 'ভিটামিন ও খনিজ', name: 'ভিটামিন ও খনিজ' }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const safetyTips = [
    'ডাক্তারের পরামর্শ ছাড়া কোন ওষুধ খাবেন না',
    'নির্দিষ্ট সময়ে নির্দিষ্ট পরিমাণে খান',
    'এক্সপায়ার ডেট চেক করুন',
    'শিশুদের নাগালের বাইরে রাখুন',
    'ওষুধের পার্শ্বপ্রতিক্রিয়া সম্পর্কে জানুন'
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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-green-500 text-white mb-6">
            <Pill className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">ওষুধ পরামর্শ</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            সাধারণ ওষুধ সম্পর্কে তথ্য এবং নিরাপদ ব্যবহারের পরামর্শ
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ওষুধের নাম বা রোগের নাম লিখুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Medicine List */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {filteredMedicines.map((medicine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{medicine.name}</h3>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
                  {medicine.category}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-1" />
                    ব্যবহার:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {medicine.uses.map((use, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">মাত্রা:</h4>
                  <p className="text-gray-600 text-sm">{medicine.dosage}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">পার্শ্বপ্রতিক্রিয়া:</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {medicine.sideEffects.map((effect, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></span>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    সতর্কতা:
                  </h4>
                  <ul className="text-red-600 text-sm space-y-1">
                    {medicine.warnings.map((warning, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Safety Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-50 rounded-3xl shadow-xl p-8 border border-red-200"
        >
          <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            ওষুধ ব্যবহারের নিরাপত্তা
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {safetyTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center text-red-700"
              >
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                {tip}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MedicinePage;