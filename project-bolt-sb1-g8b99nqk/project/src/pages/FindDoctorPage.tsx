import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Search, MapPin, Phone, Star, Plus, X, Check, User } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  hospital: string;
  location: string;
  phone: string;
  rating: number;
  chamber: string;
  age: number;
  weight?: number;
  email?: string;
  photo: string;
}

const FindDoctorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    qualification: '',
    experience: '',
    hospital: '',
    location: '',
    phone: '',
    chamber: '',
    email: ''
  });

  const specialties = [
    { id: 'all', name: 'সব বিশেষজ্ঞ' },
    { id: 'হৃদরোগ বিশেষজ্ঞ', name: 'হৃদরোগ বিশেষজ্ঞ' },
    { id: 'গাইনী বিশেষজ্ঞ', name: 'গাইনী বিশেষজ্ঞ' },
    { id: 'শিশু বিশেষজ্ঞ', name: 'শিশু বিশেষজ্ঞ' },
    { id: 'চর্মরোগ বিশেষজ্ঞ', name: 'চর্মরোগ বিশেষজ্ঞ' },
    { id: 'অর্থোপেডিক্স', name: 'অর্থোপেডিক্স' },
    { id: 'নিউরোলজি', name: 'নিউরোলজি' },
    { id: 'কার্ডিওলজি', name: 'কার্ডিওলজি' }
  ];

  const locations = [
    { id: 'all', name: 'সব এলাকা' },
    { id: 'ঢাকা', name: 'ঢাকা' },
    { id: 'চট্টগ্রাম', name: 'চট্টগ্রাম' },
    { id: 'রাজশাহী', name: 'রাজশাহী' },
    { id: 'সিলেট', name: 'সিলেট' },
    { id: 'খুলনা', name: 'খুলনা' },
    { id: 'বরিশাল', name: 'বরিশাল' }
  ];

  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: 'ডাঃ মোহাম্মদ রহিম',
      specialty: 'হৃদরোগ বিশেষজ্ঞ',
      qualification: 'MBBS, MD (কার্ডিওলজি)',
      experience: '১৫ বছর',
      hospital: 'ঢাকা মেডিক্যাল কলেজ হাসপাতাল',
      location: 'ঢাকা',
      phone: '০১৭১২৩৪৫৬৭৮',
      rating: 4.8,
      chamber: 'শনি-বৃহস্পতিবার, ৪:০০-৮:০০ PM',
      age: 45,
      photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    {
      id: 2,
      name: 'ডাঃ ফাতেমা খাতুন',
      specialty: 'গাইনী বিশেষজ্ঞ',
      qualification: 'MBBS, FCPS (গাইনী)',
      experience: '১২ বছর',
      hospital: 'বারডেম হাসপাতাল',
      location: 'ঢাকা',
      phone: '০১৮৮৭৬৫৪৩২১',
      rating: 4.9,
      chamber: 'রবি-বৃহস্পতিবার, ৫:০০-৯:০০ PM',
      age: 38,
      photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    {
      id: 3,
      name: 'ডাঃ আব্দুল করিম',
      specialty: 'শিশু বিশেষজ্ঞ',
      qualification: 'MBBS, DCH, FCPS (শিশু)',
      experience: '১০ বছর',
      hospital: 'চট্টগ্রাম মেডিক্যাল কলেজ',
      location: 'চট্টগ্রাম',
      phone: '০১৯৯৮৮৭৭৬৬৫',
      rating: 4.7,
      chamber: 'সোম-শুক্রবার, ৬:০০-১০:০০ PM',
      age: 42,
      photo: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    {
      id: 4,
      name: 'ডাঃ সালমা আক্তার',
      specialty: 'চর্মরোগ বিশেষজ্ঞ',
      qualification: 'MBBS, MD (চর্মরোগ)',
      experience: '৮ বছর',
      hospital: 'রাজশাহী মেডিক্যাল কলেজ',
      location: 'রাজশাহী',
      phone: '০১৫৫৪৪৩৩২২১',
      rating: 4.6,
      chamber: 'সোম-বুধবার, ৪:৩০-৮:৩০ PM',
      age: 35,
      photo: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    {
      id: 5,
      name: 'ডাঃ নাজমুল হক',
      specialty: 'অর্থোপেডিক্স',
      qualification: 'MBBS, MS (অর্থোপেডিক্স)',
      experience: '১৮ বছর',
      hospital: 'সিলেট এম এ জি ওসমানী মেডিক্যাল কলেজ',
      location: 'সিলেট',
      phone: '০১৬৬৫৫৪৪৩৩২',
      rating: 4.8,
      chamber: 'রবি-বৃহস্পতিবার, ৫:৩০-৯:৩০ PM',
      age: 50,
      photo: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    },
    {
      id: 6,
      name: 'ডাঃ রাশিদা বেগম',
      specialty: 'নিউরোলজি',
      qualification: 'MBBS, MD (নিউরোলজি)',
      experience: '১৪ বছর',
      hospital: 'খুলনা মেডিক্যাল কলেজ',
      location: 'খুলনা',
      phone: '০১৭৭৬৬৫৫৪৪৩',
      rating: 4.7,
      chamber: 'সোম-শুক্রবার, ৫:০০-৯:০০ PM',
      age: 41,
      photo: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    }
  ]);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'all' || doctor.location === selectedLocation;
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleSubmitDoctor = () => {
    if (!newDoctor.name || !newDoctor.specialty || !newDoctor.location || !newDoctor.phone || !newDoctor.qualification || !newDoctor.experience || !newDoctor.hospital || !newDoctor.chamber) {
      alert('সব প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    const doctor: Doctor = {
      id: doctors.length + 1,
      name: newDoctor.name,
      specialty: newDoctor.specialty,
      qualification: newDoctor.qualification,
      experience: newDoctor.experience,
      hospital: newDoctor.hospital,
      location: newDoctor.location,
      phone: newDoctor.phone,
      chamber: newDoctor.chamber,
      email: newDoctor.email,
      rating: 4.5,
      age: 35,
      photo: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150'
    };

    setDoctors(prev => [doctor, ...prev]);
    setNewDoctor({
      name: '',
      specialty: '',
      qualification: '',
      experience: '',
      hospital: '',
      location: '',
      phone: '',
      chamber: '',
      email: ''
    });
    setShowAddDoctorModal(false);
  };

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

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-6">
            <UserCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">ডাক্তার খোঁজা</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            আপনার এলাকার বিশেষজ্ঞ ডাক্তারদের খুঁজে নিন
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Column - Doctors List */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="ডাক্তারের নাম বা বিশেষত্ব..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {specialties.map(specialty => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Doctor List */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    {/* Doctor Photo */}
                    <motion.div
                      className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={doctor.photo} 
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                          <p className="text-indigo-600 font-medium text-sm">{doctor.specialty}</p>
                          <p className="text-gray-600 text-xs">{doctor.qualification}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(doctor.rating)}
                          <span className="text-xs text-gray-600 ml-1">{doctor.rating}</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center text-gray-600">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          অভিজ্ঞতা: {doctor.experience}
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                          {doctor.hospital}
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {doctor.location}
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {doctor.phone}
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-2 mt-2">
                          <p className="text-xs text-gray-700">
                            <strong>চেম্বারের সময়:</strong> {doctor.chamber}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-xl font-medium hover:shadow-lg transition-all text-sm"
                        >
                          অ্যাপয়েন্টমেন্ট নিন
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredDoctors.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 text-lg">কোন ডাক্তার পাওয়া যায়নি। অনুগ্রহ করে সার্চ পরিবর্তন করুন।</p>
              </motion.div>
            )}
          </div>

          {/* Right Column - Add Doctor */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl p-6 text-white sticky top-8"
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 text-white mb-4 shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Plus className="w-6 h-6" />
              </motion.div>
              <h3 className="text-xl font-bold mb-3">ডাক্তার হিসেবে যোগ দিন</h3>
              <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
                আপনি একজন ডাক্তার? আমাদের প্ল্যাটফর্মে যোগ দিয়ে রোগীদের সেবা করুন
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddDoctorModal(true)}
                className="w-full bg-white text-indigo-500 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>নিবন্ধন করুন</span>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Add Doctor Modal */}
        <AnimatePresence>
          {showAddDoctorModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowAddDoctorModal(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 animate-pulse" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <User className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">ডাক্তার নিবন্ধন</h3>
                        <p className="text-indigo-100 text-lg">আপনার তথ্য দিয়ে নিবন্ধন করুন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowAddDoctorModal(false)}
                      className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">ব্যক্তিগত তথ্য</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">পূর্ণ নাম *</label>
                        <input
                          type="text"
                          value={newDoctor.name}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                          placeholder="ডাঃ আপনার নাম"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">বিশেষত্ব *</label>
                        <select
                          value={newDoctor.specialty}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, specialty: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {specialties.slice(1).map(specialty => (
                            <option key={specialty.id} value={specialty.id}>{specialty.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">যোগ্যতা *</label>
                        <input
                          type="text"
                          value={newDoctor.qualification}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, qualification: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                          placeholder="MBBS, MD, FCPS ইত্যাদি"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">অভিজ্ঞতা *</label>
                        <input
                          type="text"
                          value={newDoctor.experience}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, experience: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                          placeholder="যেমন: ১০ বছর"
                        />
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">পেশাগত তথ্য</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">হাসপাতাল/ক্লিনিক *</label>
                        <input
                          type="text"
                          value={newDoctor.hospital}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, hospital: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                          placeholder="হাসপাতাল বা ক্লিনিকের নাম"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">এলাকা/শহর *</label>
                        <select
                          value={newDoctor.location}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {locations.slice(1).map(location => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">মোবাইল নম্বর *</label>
                        <input
                          type="tel"
                          value={newDoctor.phone}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                          placeholder="০১৭xxxxxxxx"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">চেম্বারের সময় *</label>
                        <input
                          type="text"
                          value={newDoctor.chamber}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, chamber: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                          placeholder="যেমন: সোম-শুক্র, ৫:০০-৯:০০ PM"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">ইমেইল (ঐচ্ছিক)</label>
                        <input
                          type="email"
                          value={newDoctor.email}
                          onChange={(e) => setNewDoctor(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowAddDoctorModal(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleSubmitDoctor}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="w-6 h-6" />
                      <span>নিবন্ধন সম্পন্ন করুন</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FindDoctorPage;