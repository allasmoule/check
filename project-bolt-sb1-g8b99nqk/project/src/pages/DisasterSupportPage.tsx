import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, Phone, Heart, Shield, Zap, Cloud, Wind, Droplets, Users, Baby, Download, Play, Send, Mic, MicOff, Loader2, User, Bot, Navigation, Guitar as Hospital, Pill, Home, BookOpen, Volume2, Copy, Share2, CheckCircle } from 'lucide-react';
import { generateHealthResponse } from '../utils/geminiApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'voice';
}

const DisasterSupportPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number, address: string} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `আস্সালামু আলাইকুম! আমি DisasterBot, আপনার দুর্যোগকালীন সহায়ক। বন্যা, ঘূর্ণিঝড় বা যেকোনো দুর্যোগে আমি আপনাকে সাহায্য করতে পারি। আপনি টেক্সট বা ভয়েস মেসেজের মাধ্যমে আমার সাথে কথা বলতে পারেন।`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      // Use Google Gemini API for real AI responses
      const response = await generateHealthResponse(userMessage, 'disaster-support');
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'দুঃখিত, কিছু সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    await generateResponse(input);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          const userMessage: Message = {
            id: Date.now().toString(),
            text: 'ভয়েস মেসেজ পাঠিয়েছি',
            sender: 'user',
            timestamp: new Date(),
            type: 'voice'
          };
          
          setMessages(prev => [...prev, userMessage]);
          generateResponse('আমি একটি ভয়েস মেসেজ পাঠিয়েছি। দুর্যোগ সম্পর্কে পরামর্শ দিন।');
        }
      };
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setRecordingTime(0);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert('আপনার ব্রাউজার জিওলোকেশন সাপোর্ট করে না');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get address (using a mock address for demo)
          const mockAddress = `${latitude.toFixed(6)}, ${longitude.toFixed(6)} (আনুমানিক ঠিকানা)`;
          
          setUserLocation({
            lat: latitude,
            lng: longitude,
            address: mockAddress
          });
          
          setIsGettingLocation(false);
        } catch (error) {
          console.error('Error getting address:', error);
          setUserLocation({
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          });
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('লোকেশন পেতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const shareLocation = () => {
    if (!userLocation) return;
    
    const locationText = `🆘 জরুরি সাহায্য প্রয়োজন!\n📍 আমার অবস্থান: ${userLocation.address}\n🌐 Google Maps: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}\n\nদয়া করে সাহায্য করুন!`;
    
    setShareMessage(locationText);
    setLocationShared(true);
    
    // Copy to clipboard
    navigator.clipboard.writeText(locationText).then(() => {
      // Auto share via SMS if possible
      if (navigator.share) {
        navigator.share({
          title: 'জরুরি সাহায্য প্রয়োজন',
          text: locationText
        });
      }
    });
  };

  const copyLocationText = () => {
    if (shareMessage) {
      navigator.clipboard.writeText(shareMessage).then(() => {
        alert('লোকেশন কপি হয়েছে! এখন যেকোনো জায়গায় পেস্ট করুন।');
      });
    }
  };

  const liveUpdates = [
    {
      type: 'weather',
      title: 'আবহাওয়া সতর্কতা',
      status: 'সাধারণ',
      description: 'আজ সারাদেশে হালকা বৃষ্টির সম্ভাবনা',
      color: 'from-blue-500 to-cyan-500',
      icon: Cloud
    },
    {
      type: 'cyclone',
      title: 'ঘূর্ণিঝড় সংকেত',
      status: 'নিরাপদ',
      description: 'বর্তমানে কোন ঘূর্ণিঝড়ের সংকেত নেই',
      color: 'from-green-500 to-emerald-500',
      icon: Wind
    },
    {
      type: 'flood',
      title: 'বন্যা পরিস্থিতি',
      status: 'স্বাভাবিক',
      description: 'নদীর পানি স্বাভাবিক মাত্রায় রয়েছে',
      color: 'from-teal-500 to-blue-500',
      icon: Droplets
    }
  ];

  const emergencyContacts = [
    {
      name: 'জাতীয় জরুরি সেবা',
      number: '৯৯৯',
      description: 'সব ধরনের জরুরি অবস্থার জন্য',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'ফায়ার সার্ভিস',
      number: '১৯৯',
      description: 'আগুন ও উদ্ধার কাজের জন্য',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'পুলিশ',
      number: '১০০',
      description: 'আইন শৃঙ্খলা সংক্রান্ত সমস্যার জন্য',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      name: 'স্বাস্থ্য বাতায়ন',
      number: '১৬২৬৩',
      description: 'স্বাস্থ্য সেবা ও পরামর্শের জন্য',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const firstAidTips = [
    {
      title: 'বন্যার সময় স্বাস্থ্য সুরক্ষা',
      tips: ['ফুটানো পানি পান করুন', 'খাবার ভালো করে রান্না করুন', 'ক্ষত পরিষ্কার রাখুন', 'মশার কামড় থেকে বাঁচুন'],
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'ঘূর্ণিঝড়ে আহত হলে',
      tips: ['রক্তক্ষরণ বন্ধ করুন', 'পরিষ্কার কাপড় দিয়ে বাঁধুন', 'দ্রুত হাসপাতালে নিন', 'শ্বাসকষ্ট হলে বসিয়ে রাখুন'],
      icon: Wind,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'শিশুদের বিশেষ যত্ন',
      tips: ['পানিশূন্যতা রোধ করুন', 'পরিষ্কার পরিবেশে রাখুন', 'নিয়মিত খাওয়ান', 'জ্বর হলে স্পঞ্জিং করুন'],
      icon: Baby,
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const preparednessGuide = [
    {
      title: 'দুর্যোগের আগে প্রস্তুতি',
      items: ['জরুরি কিট তৈরি করুন', 'পরিবারের সাথে পরিকল্পনা করুন', 'গুরুত্বপূর্ণ কাগজপত্র সংরক্ষণ করুন', 'যোগাযোগের মাধ্যম প্রস্তুত রাখুন'],
      icon: Shield
    },
    {
      title: 'দুর্যোগের সময় করণীয়',
      items: ['শান্ত থাকুন', 'নিরাপদ স্থানে যান', 'সরকারি নির্দেশনা মেনে চলুন', 'পরিবারের সবাইকে একসাথে রাখুন'],
      icon: AlertTriangle
    },
    {
      title: 'দুর্যোগের পরে করণীয়',
      items: ['ক্ষয়ক্ষতি মূল্যায়ন করুন', 'পরিষ্কার পানি নিশ্চিত করুন', 'স্বাস্থ্য পরীক্ষা করান', 'সাহায্যের জন্য যোগাযোগ করুন'],
      icon: Heart
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
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <AlertTriangle className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">দুর্যোগ সহায়তা</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            বন্যা, ঘূর্ণিঝড় ও অন্যান্য দুর্যোগে জরুরি সহায়তা এবং নির্দেশনা
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Live Updates */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Zap className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">লাইভ আপডেট</h2>
                <p className="text-gray-600">বর্তমান দুর্যোগ পরিস্থিতি</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {liveUpdates.map((update, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`bg-gradient-to-br ${update.color} text-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <motion.div
                      className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <update.icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="font-bold mb-2">{update.title}</h3>
                    <p className="text-sm opacity-90 mb-2">{update.description}</p>
                    <span className="inline-block px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {update.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Phone className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">জরুরি যোগাযোগ</h2>
                <p className="text-gray-600">দুর্যোগকালীন হেল্পলাইন নম্বর</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-800">{contact.name}</h3>
                      <motion.a
                        href={`tel:${contact.number}`}
                        className={`px-4 py-2 bg-gradient-to-r ${contact.color} text-white rounded-xl font-bold hover:shadow-lg transition-all`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {contact.number}
                      </motion.a>
                    </div>
                    <p className="text-gray-600 text-sm">{contact.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* First Aid Tips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Heart className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">প্রাথমিক চিকিৎসা গাইড</h2>
                <p className="text-gray-600">দুর্যোগকালীন স্বাস্থ্য সুরক্ষা</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {firstAidTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-100"
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-br ${tip.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}
                      whileHover={{ rotate: 15, scale: 1.15 }}
                    >
                      <tip.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-4 text-lg">{tip.title}</h3>
                    <div className="space-y-2">
                      {tip.tips.map((item, i) => (
                        <div key={i} className="text-gray-600 text-sm bg-white/60 rounded-lg p-2">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Preparedness Guide */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-purple-50 rounded-3xl shadow-xl p-8 border border-purple-200"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <BookOpen className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-purple-800 mb-2">দুর্যোগ প্রস্তুতি গাইড</h2>
                <p className="text-purple-600">দুর্যোগের আগে, সময় ও পরে করণীয়</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {preparednessGuide.map((guide, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-purple-200"
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <guide.icon className="w-6 h-6" />
                    </motion.div>
                    <h3 className="font-bold text-purple-800 mb-4">{guide.title}</h3>
                    <div className="space-y-2">
                      {guide.items.map((item, i) => (
                        <div key={i} className="text-purple-700 text-sm flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Location Update Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 border border-indigo-200"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MapPin className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-indigo-800 mb-2">আমার অবস্থান আপডেট</h2>
                <p className="text-indigo-600">জরুরি অবস্থায় আপনার লোকেশন শেয়ার করুন</p>
              </div>
              
              {!userLocation ? (
                <div className="text-center">
                  <motion.button
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-3 mx-auto"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isGettingLocation ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>লোকেশন খুঁজছি...</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-6 h-6" />
                        <span>আমার লোকেশন নিন</span>
                      </>
                    )}
                  </motion.button>
                  <p className="text-indigo-600 text-sm mt-4">
                    আপনার বর্তমান অবস্থান পেতে "Allow" বাটনে ক্লিক করুন
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Location Display */}
                  <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-indigo-200">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <CheckCircle className="w-6 h-6" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-indigo-800 mb-2">আপনার বর্তমান অবস্থান:</h3>
                        <p className="text-indigo-700 mb-2">{userLocation.address}</p>
                        <p className="text-indigo-600 text-sm">
                          Latitude: {userLocation.lat.toFixed(6)}, Longitude: {userLocation.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.button
                      onClick={shareLocation}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Share2 className="w-5 h-5" />
                      <span>জরুরি লোকেশন শেয়ার</span>
                    </motion.button>

                    <motion.button
                      onClick={getCurrentLocation}
                      disabled={isGettingLocation}
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isGettingLocation ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>আপডেট করছি...</span>
                        </>
                      ) : (
                        <>
                          <Navigation className="w-5 h-5" />
                          <span>লোকেশন আপডেট করুন</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Share Message Display */}
                  {locationShared && shareMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 rounded-2xl p-6 border border-green-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-green-800">শেয়ার করার জন্য প্রস্তুত:</h3>
                        <motion.button
                          onClick={copyLocationText}
                          className="bg-green-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-600 transition-all flex items-center space-x-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Copy className="w-4 h-4" />
                          <span>কপি করুন</span>
                        </motion.button>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-green-200">
                        <pre className="text-green-700 text-sm whitespace-pre-wrap font-mono">
                          {shareMessage}
                        </pre>
                      </div>
                      <p className="text-green-600 text-sm mt-3">
                        এই মেসেজটি SMS, WhatsApp, Facebook বা যেকোনো মাধ্যমে পাঠিয়ে সাহায্য চাইতে পারেন।
                      </p>
                    </motion.div>
                  )}

                  {/* Google Maps Link */}
                  <div className="text-center">
                    <motion.a
                      href={`https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-2xl font-medium hover:bg-blue-600 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MapPin className="w-5 h-5" />
                      <span>Google Maps এ দেখুন</span>
                    </motion.a>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-6 bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-indigo-200">
                <h3 className="font-bold text-indigo-800 mb-3">কিভাবে ব্যবহার করবেন:</h3>
                <div className="space-y-2 text-indigo-700 text-sm">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">১</span>
                    "আমার লোকেশন নিন\" বাটনে ক্লিক করুন
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">২</span>
                    ব্রাউজারে "Allow\" বাটনে ক্লিক করুন
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">৩</span>
                    "জরুরি লোকেশন শেয়ার\" বাটনে ক্লিক করুন
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">৪</span>
                    মেসেজ কপি করে যেকোনো জায়গায় পাঠান
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - DisasterBot Chat */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[700px]">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-yellow-400/20 animate-pulse" />
                  
                  <div className="relative flex items-center space-x-4">
                    <motion.div
                      className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl"
                      whileHover={{ scale: 1.15, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <AlertTriangle className="w-10 h-10" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">DisasterBot</h3>
                      <p className="text-red-100 text-lg">দুর্যোগকালীন সহায়ক</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-[400px] overflow-y-auto space-y-4 p-6 bg-gradient-to-br from-gray-50 to-red-50">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-3 max-w-xs ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <motion.div 
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                            message.sender === 'user' 
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                              : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {message.sender === 'user' ? (
                              <User className="w-5 h-5" />
                            ) : (
                              <Bot className="w-5 h-5" />
                            )}
                          </motion.div>

                          <motion.div 
                            className={`rounded-3xl p-4 shadow-lg backdrop-blur-sm ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                              : 'bg-white/80 text-gray-800 border border-gray-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className={`text-xs mt-2 ${
                              message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp.toLocaleTimeString('bn-BD', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Loading */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-white/80 rounded-3xl p-4 shadow-lg backdrop-blur-sm border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                            <span className="text-sm text-gray-600">উত্তর তৈরি করছি...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 p-6 bg-white">
                  {/* Recording indicator */}
                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-4 flex items-center justify-center space-x-3 text-red-500 bg-red-50 rounded-2xl p-3"
                    >
                      <motion.div 
                        className="w-3 h-3 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                      <span className="text-sm font-medium">রেকর্ড করছি... {formatTime(recordingTime)}</span>
                    </motion.div>
                  )}

                  {/* Input */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="দুর্যোগ সম্পর্কে প্রশ্ন করুন..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        disabled={isLoading}
                      />
                    </div>

                    <motion.button
                      className={`p-3 rounded-2xl transition-colors ${
                        isRecording 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'text-orange-600 hover:bg-orange-50'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseDown={startRecording}
                      onMouseUp={stopRecording}
                      onMouseLeave={stopRecording}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </motion.button>

                    <motion.button
                      className="p-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* SOS Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <motion.button
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-6 rounded-3xl font-bold text-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('tel:999')}
                >
                  <Phone className="w-8 h-8" />
                  <span>🆘 জরুরি কল (৯৯৯)</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterSupportPage;