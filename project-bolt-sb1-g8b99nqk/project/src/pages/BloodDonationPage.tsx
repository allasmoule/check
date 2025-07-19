import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Plus, Search, MapPin, Phone, Clock, Upload, User, Calendar, AlertCircle, Heart, X, Check, UserPlus } from 'lucide-react';

interface BloodRequest {
  id: number;
  patientName: string;
  bloodGroup: string;
  location: string;
  urgency: string;
  contact: string;
  needed: string;
  date: string;
  hospital?: string;
  reason?: string;
  image?: string;
}

interface BloodDonor {
  id: number;
  name: string;
  bloodGroup: string;
  location: string;
  phone: string;
  lastDonation: string;
  availability: string;
  age: number;
  weight: number;
  email?: string;
}

const BloodDonationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donors' | 'requests'>('donors');
  const [searchBloodGroup, setSearchBloodGroup] = useState('all');
  const [searchLocation, setSearchLocation] = useState('all');
  const [showAddRequestModal, setShowAddRequestModal] = useState(false);
  const [showAddDonorModal, setShowAddDonorModal] = useState(false);
  
  const [newRequest, setNewRequest] = useState({
    patientName: '',
    bloodGroup: '',
    location: '',
    urgency: 'জরুরি',
    contact: '',
    needed: '',
    hospital: '',
    reason: '',
    image: null as File | null
  });

  const [newDonor, setNewDonor] = useState({
    name: '',
    bloodGroup: '',
    location: '',
    phone: '',
    age: '',
    weight: '',
    email: '',
    lastDonation: 'কখনো দেইনি'
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const locations = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'সিলেট', 'খুলনা', 'বরিশাল'];
  const urgencyLevels = ['অতি জরুরি', 'জরুরি', 'মাঝারি'];

  const [donors, setDonors] = useState<BloodDonor[]>([
    {
      id: 1,
      name: 'মোহাম্মদ আলী',
      bloodGroup: 'A+',
      location: 'ঢাকা',
      phone: '০১৭১২৩৪৫৬৭৮',
      lastDonation: '৩ মাস আগে',
      availability: 'উপলব্ধ',
      age: 28,
      weight: 65
    },
    {
      id: 2,
      name: 'ফাতেমা খাতুন',
      bloodGroup: 'B+',
      location: 'চট্টগ্রাম',
      phone: '০১৮৮৭৬৫৪৩২১',
      lastDonation: '৪ মাস আগে',
      availability: 'উপলব্ধ',
      age: 25,
      weight: 55
    },
    {
      id: 3,
      name: 'আব্দুর রহমান',
      bloodGroup: 'O+',
      location: 'রাজশাহী',
      phone: '০১৯৯৮৮৭৭৬৬৫',
      lastDonation: '২ মাস আগে',
      availability: 'ব্যস্ত',
      age: 32,
      weight: 70
    },
    {
      id: 4,
      name: 'সালমা আক্তার',
      bloodGroup: 'AB+',
      location: 'সিলেট',
      phone: '০১৫৫৪৪৩৩২২১',
      lastDonation: '৫ মাস আগে',
      availability: 'উপলব্ধ',
      age: 30,
      weight: 58
    }
  ]);

  const [requests, setRequests] = useState<BloodRequest[]>([
    {
      id: 1,
      patientName: 'করিম উদ্দিন',
      bloodGroup: 'A+',
      location: 'ঢাকা মেডিক্যাল কলেজ',
      urgency: 'জরুরি',
      contact: '০১৭১২৩৪৫৬৭৮',
      needed: '২ ব্যাগ',
      date: 'আজ',
      hospital: 'ঢাকা মেডিক্যাল কলেজ হাসপাতাল',
      reason: 'অপারেশনের জন্য'
    },
    {
      id: 2,
      patientName: 'রহিমা খাতুন',
      bloodGroup: 'B-',
      location: 'চট্টগ্রাম মেডিক্যাল কলেজ',
      urgency: 'অতি জরুরি',
      contact: '০১৮৮৭৬৫৪৩২১',
      needed: '৩ ব্যাগ',
      date: 'আজ',
      hospital: 'চট্টগ্রাম মেডিক্যাল কলেজ হাসপাতাল',
      reason: 'দুর্ঘটনার কারণে'
    }
  ]);

  const filteredDonors = donors.filter(donor => {
    const matchesBloodGroup = searchBloodGroup === 'all' || donor.bloodGroup === searchBloodGroup;
    const matchesLocation = searchLocation === 'all' || donor.location === searchLocation;
    return matchesBloodGroup && matchesLocation;
  });

  const filteredRequests = requests.filter(request => {
    const matchesBloodGroup = searchBloodGroup === 'all' || request.bloodGroup === searchBloodGroup;
    const matchesLocation = searchLocation === 'all' || request.location.includes(searchLocation);
    return matchesBloodGroup && matchesLocation;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewRequest(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmitRequest = () => {
    if (!newRequest.patientName || !newRequest.bloodGroup || !newRequest.location || !newRequest.contact || !newRequest.needed) {
      alert('সব তথ্য পূরণ করুন');
      return;
    }

    const request: BloodRequest = {
      id: requests.length + 1,
      patientName: newRequest.patientName,
      bloodGroup: newRequest.bloodGroup,
      location: newRequest.location,
      urgency: newRequest.urgency,
      contact: newRequest.contact,
      needed: newRequest.needed,
      date: 'আজ',
      hospital: newRequest.hospital,
      reason: newRequest.reason,
      image: newRequest.image ? URL.createObjectURL(newRequest.image) : undefined
    };

    setRequests(prev => [request, ...prev]);
    setNewRequest({
      patientName: '',
      bloodGroup: '',
      location: '',
      urgency: 'জরুরি',
      contact: '',
      needed: '',
      hospital: '',
      reason: '',
      image: null
    });
    setShowAddRequestModal(false);
    setActiveTab('requests');
  };

  const handleSubmitDonor = () => {
    if (!newDonor.name || !newDonor.bloodGroup || !newDonor.location || !newDonor.phone || !newDonor.age || !newDonor.weight) {
      alert('সব প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    const donor: BloodDonor = {
      id: donors.length + 1,
      name: newDonor.name,
      bloodGroup: newDonor.bloodGroup,
      location: newDonor.location,
      phone: newDonor.phone,
      age: parseInt(newDonor.age),
      weight: parseInt(newDonor.weight),
      email: newDonor.email,
      lastDonation: newDonor.lastDonation,
      availability: 'উপলব্ধ'
    };

    setDonors(prev => [donor, ...prev]);
    setNewDonor({
      name: '',
      bloodGroup: '',
      location: '',
      phone: '',
      age: '',
      weight: '',
      email: '',
      lastDonation: 'কখনো দেইনি'
    });
    setShowAddDonorModal(false);
    setActiveTab('donors');
  };

  const donationRequirements = [
    'বয়স ১৮-৬৫ বছর',
    'ওজন কমপক্ষে ৫০ কেজি',
    'হিমোগ্লোবিন ১২.৫ গ্রাম/ডেসিলিটার',
    'সুস্থ ও সক্রিয়',
    'গত ৩ মাসে রক্তদান করেননি',
    'কোন সংক্রামক রোগ নেই'
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{
              transform: 'perspective(1000px) rotateX(5deg)',
              boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3)'
            }}
          >
            <Droplets className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">রক্তদান সহায়তা</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            জীবন বাঁচানোর মহান কাজে অংশগ্রহণ করুন। রক্তদাতা হিসেবে নিবন্ধন করুন অথবা রক্তের প্রয়োজন পোস্ট করুন।
          </p>
        </motion.div>

        {/* Enhanced Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-3 mb-8 border border-gray-100"
          style={{
            transform: 'perspective(1000px) rotateX(2deg)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.1)'
          }}
        >
          <div className="flex">
            <motion.button
              onClick={() => setActiveTab('donors')}
              className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 ${
                activeTab === 'donors'
                  ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-xl'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search className="w-6 h-6" />
              <span>রক্তদাতা খুঁজুন</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all flex items-center justify-center space-x-3 ${
                activeTab === 'requests'
                  ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-xl'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className="w-6 h-6" />
              <span>রক্তের অনুরোধ</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100"
          style={{
            transform: 'perspective(1000px) rotateX(1deg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">রক্তের গ্রুপ</label>
              <select
                value={searchBloodGroup}
                onChange={(e) => setSearchBloodGroup(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 text-lg font-medium"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}
              >
                <option value="all">সব গ্রুপ</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-bold text-gray-700 mb-3">এলাকা</label>
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 text-lg font-medium"
                style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}
              >
                <option value="all">সব এলাকা</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {activeTab === 'donors' ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredDonors.map((donor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.02, 
                      y: -3,
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div
                            className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center text-white shadow-md"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                          >
                            <User className="w-5 h-5" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{donor.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                                {donor.bloodGroup}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                donor.availability === 'উপলব্ধ' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {donor.availability}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-red-500" />
                            <span>{donor.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2 text-green-500" />
                            <span>{donor.phone}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                            <span>শেষ রক্তদান: {donor.lastDonation}</span>
                          </div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-all"
                      >
                        যোগাযোগ
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredRequests.map((request, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.02, 
                      y: -3,
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div
                            className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center text-white shadow-md"
                            whileHover={{ rotate: 10, scale: 1.1 }}
                          >
                            <Heart className="w-5 h-5" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{request.patientName}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                                {request.bloodGroup}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                request.urgency === 'অতি জরুরি' 
                                  ? 'bg-red-100 text-red-800' 
                                  : request.urgency === 'জরুরি'
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {request.urgency}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {request.image && (
                          <div className="mb-3">
                            <img 
                              src={request.image} 
                              alt="Patient" 
                              className="w-full h-24 object-cover rounded-xl shadow-md"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-red-500" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                            <span>প্রয়োজন: {request.needed}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-purple-500" />
                            <span>তারিখ: {request.date}</span>
                          </div>
                        </div>
                        
                        {request.hospital && (
                          <div className="mt-2 bg-blue-50 rounded-lg p-2">
                            <p className="text-blue-800 text-xs font-medium">
                              <strong>হাসপাতাল:</strong> {request.hospital}
                            </p>
                          </div>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-all"
                      >
                        সাহায্য করুন
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Add Donor Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse" />
              <div className="relative">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 text-white mb-4 shadow-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <UserPlus className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">রক্তদাতা হন</h3>
                <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                  রক্তদাতা হিসেবে নিবন্ধন করুন এবং জীবন বাঁচান
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddDonorModal(true)}
                  className="w-full bg-white text-blue-500 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>নিবন্ধন করুন</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Add Request Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20 animate-pulse" />
              <div className="relative">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 text-white mb-4 shadow-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Plus className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">রক্তের প্রয়োজন?</h3>
                <p className="text-red-100 text-sm mb-4 leading-relaxed">
                  আপনার রক্তের প্রয়োজন হলে বিস্তারিত তথ্য সহ অনুরোধ পোস্ট করুন
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddRequestModal(true)}
                  className="w-full bg-white text-red-500 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>অনুরোধ পোস্ট করুন</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Donation Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              <div className="text-center mb-4">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Heart className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-800">রক্তদানের যোগ্যতা</h3>
              </div>
              <ul className="space-y-2">
                {donationRequirements.map((requirement, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center text-gray-600 text-sm bg-blue-50 rounded-lg p-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                    {requirement}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-green-50 rounded-2xl shadow-xl p-6 border border-green-200"
            >
              <div className="text-center mb-4">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Phone className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-bold text-green-800">জরুরি যোগাযোগ</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-green-700 text-sm bg-white/60 rounded-lg p-2 backdrop-blur-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-medium">জাতীয় জরুরি সেবা: ৯৯৯</span>
                </div>
                <div className="flex items-center text-green-700 text-sm bg-white/60 rounded-lg p-2 backdrop-blur-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-medium">রেড ক্রিসেন্ট: ০২-৯৩৩৬৬৬৬</span>
                </div>
                <div className="flex items-center text-green-700 text-sm bg-white/60 rounded-lg p-2 backdrop-blur-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-medium">স্বাস্থ্য বাতায়ন: ১৬২৬৩</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Add Donor Modal */}
        <AnimatePresence>
          {showAddDonorModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowAddDonorModal(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <UserPlus className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">রক্তদাতা নিবন্ধন</h3>
                        <p className="text-blue-100 text-lg">রক্তদাতা হিসেবে নিবন্ধন করুন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowAddDonorModal(false)}
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
                          value={newDonor.name}
                          onChange={(e) => setNewDonor(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="আপনার পূর্ণ নাম লিখুন"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">বয়স *</label>
                          <input
                            type="number"
                            value={newDonor.age}
                            onChange={(e) => setNewDonor(prev => ({ ...prev, age: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                            placeholder="বয়স"
                            min="18"
                            max="65"
                          />
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">ওজন (কেজি) *</label>
                          <input
                            type="number"
                            value={newDonor.weight}
                            onChange={(e) => setNewDonor(prev => ({ ...prev, weight: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                            placeholder="ওজন"
                            min="50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">রক্তের গ্রুপ *</label>
                        <select
                          value={newDonor.bloodGroup}
                          onChange={(e) => setNewDonor(prev => ({ ...prev, bloodGroup: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">যোগাযোগের তথ্য</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">মোবাইল নম্বর *</label>
                        <input
                          type="tel"
                          value={newDonor.phone}
                          onChange={(e) => setNewDonor(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="০১৭xxxxxxxx"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">ইমেইল (ঐচ্ছিক)</label>
                        <input
                          type="email"
                          value={newDonor.email}
                          onChange={(e) => setNewDonor(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="example@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">এলাকা/শহর *</label>
                        <select
                          value={newDonor.location}
                          onChange={(e) => setNewDonor(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">শেষ রক্তদান</label>
                        <select
                          value={newDonor.lastDonation}
                          onChange={(e) => setNewDonor(prev => ({ ...prev, lastDonation: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                        >
                          <option value="কখনো দেইনি">কখনো দেইনি</option>
                          <option value="৩ মাসের বেশি আগে">৩ মাসের বেশি আগে</option>
                          <option value="৬ মাসের বেশি আগে">৬ মাসের বেশি আগে</option>
                          <option value="১ বছরের বেশি আগে">১ বছরের বেশি আগে</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowAddDonorModal(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleSubmitDonor}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-2"
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

        {/* Add Request Modal */}
        <AnimatePresence>
          {showAddRequestModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowAddRequestModal(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-red-500 to-rose-500 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20 animate-pulse" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Plus className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">রক্তের অনুরোধ পোস্ট করুন</h3>
                        <p className="text-red-100 text-lg">বিস্তারিত তথ্য দিয়ে অনুরোধ করুন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowAddRequestModal(false)}
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
                    {/* Patient Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">রোগীর তথ্য</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">রোগীর নাম *</label>
                        <input
                          type="text"
                          value={newRequest.patientName}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, patientName: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500"
                          placeholder="রোগীর পূর্ণ নাম লিখুন"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">রক্তের গ্রুপ *</label>
                          <select
                            value={newRequest.bloodGroup}
                            onChange={(e) => setNewRequest(prev => ({ ...prev, bloodGroup: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500"
                          >
                            <option value="">নির্বাচন করুন</option>
                            {bloodGroups.map(group => (
                              <option key={group} value={group}>{group}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">প্রয়োজনীয় পরিমাণ *</label>
                          <input
                            type="text"
                            value={newRequest.needed}
                            onChange={(e) => setNewRequest(prev => ({ ...prev, needed: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500"
                            placeholder="যেমন: ২ ব্যাগ"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">জরুরি অবস্থা *</label>
                        <select
                          value={newRequest.urgency}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500"
                        >
                          {urgencyLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Contact & Location */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">যোগাযোগ ও অবস্থান</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">যোগাযোগ নম্বর *</label>
                        <input
                          type="tel"
                          value={newRequest.contact}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, contact: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500"
                          placeholder="০১৭xxxxxxxx"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">এলাকা/শহর *</label>
                        <select
                          value={newRequest.location}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">হাসপাতালের নাম</label>
                        <input
                          type="text"
                          value={newRequest.hospital}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, hospital: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500"
                          placeholder="হাসপাতালের নাম (ঐচ্ছিক)"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">রক্তের প্রয়োজনের কারণ</label>
                        <textarea
                          value={newRequest.reason}
                          onChange={(e) => setNewRequest(prev => ({ ...prev, reason: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 h-24 resize-none"
                          placeholder="যেমন: অপারেশনের জন্য, দুর্ঘটনার কারণে (ঐচ্ছিক)"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="mt-8">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">ছবি আপলোড (ঐচ্ছিক)</h4>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-red-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <motion.div
                          className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl text-gray-400 mb-4"
                          whileHover={{ scale: 1.1, backgroundColor: '#fee2e2', color: '#dc2626' }}
                        >
                          <Upload className="w-8 h-8" />
                        </motion.div>
                        <p className="text-gray-600 text-lg">রোগীর ছবি বা প্রেসক্রিপশন আপলোড করুন</p>
                        <p className="text-gray-400 text-sm mt-2">JPG, PNG ফরম্যাট সাপোর্টেড</p>
                      </label>
                      {newRequest.image && (
                        <div className="mt-4">
                          <img 
                            src={URL.createObjectURL(newRequest.image)} 
                            alt="Preview" 
                            className="w-32 h-32 object-cover rounded-2xl mx-auto shadow-lg"
                          />
                          <p className="text-green-600 font-medium mt-2">ছবি আপলোড হয়েছে</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowAddRequestModal(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleSubmitRequest}
                      className="px-8 py-4 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="w-6 h-6" />
                      <span>অনুরোধ পোস্ট করুন</span>
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

export default BloodDonationPage;