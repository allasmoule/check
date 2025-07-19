import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, Clock, Phone, Send, Mic, MicOff, Loader2, User, Bot, Upload, Image, MapPin, Navigation, Guitar as Hospital, Stethoscope, Pill, Home } from 'lucide-react';
import { generateHealthResponse, analyzeImage } from '../utils/geminiApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'voice';
  imageUrl?: string;
}

const AnimalBitePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `আস্সালামু আলাইকুম! আমি BiteBot, প্রাণীর কামড় বিশেষজ্ঞ। আমি আপনাকে সাপ, কুকুর, বিড়াল, পোকামাকড় বা যেকোনো প্রাণীর কামড়ের সঠিক চিকিৎসা পরামর্শ দিতে পারি। আপনি টেক্সট, ছবি বা ভয়েস মেসেজের মাধ্যমে আমার সাথে কথা বলতে পারেন।`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string, imageUrl?: string) => {
    setIsLoading(true);
    
    try {
      // Use Google Gemini API for real AI responses
      const response = await generateHealthResponse(userMessage, 'animal-bite');
      
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const userMessage: Message = {
        id: Date.now().toString(),
        text: `কামড়ের ছবি আপলোড করেছি: ${file.name}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'image',
        imageUrl
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Analyze the uploaded image
      analyzeImageAndRespond(file);
    }
  };

  const analyzeImageAndRespond = async (file: File) => {
    setIsLoading(true);
    
    try {
      const response = await analyzeImage(file, 'animal-bite');
      
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
        text: 'দুঃখিত, ছবি বিশ্লেষণ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
          generateResponse('আমি একটি ভয়েস মেসেজ পাঠিয়েছি। প্রাণীর কামড় সম্পর্কে পরামর্শ দিন।');
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

  const firstAidSteps = [
    {
      step: '১',
      title: 'পরিষ্কার করুন',
      action: 'পানি ও সাবান দিয়ে ধুয়ে নিন'
    },
    {
      step: '২',
      title: 'জীবাণুমুক্ত করুন',
      action: 'অ্যান্টিসেপটিক লাগান'
    },
    {
      step: '৩',
      title: 'চিকিৎসা নিন',
      action: 'দ্রুত ডাক্তারের কাছে যান'
    }
  ];

  const animalTypes = [
    {
      animal: 'কুকুর',
      risk: 'উচ্চ',
      treatment: 'জলাতঙ্ক টিকা',
      timeline: '২৪ ঘণ্টা'
    },
    {
      animal: 'বিড়াল',
      risk: 'মাঝারি',
      treatment: 'জলাতঙ্ক টিকা',
      timeline: '৪৮ ঘণ্টা'
    },
    {
      animal: 'সাপ',
      risk: 'অত্যন্ত উচ্চ',
      treatment: 'অবিলম্বে হাসপাতাল',
      timeline: 'তুরন্ত'
    },
    {
      animal: 'বানর',
      risk: 'উচ্চ',
      treatment: 'জলাতঙ্ক ও টিটেনাস',
      timeline: '২৪ ঘণ্টা'
    }
  ];

  const warningSignals = [
    'ক্ষতস্থান ফুলে যাওয়া',
    'তীব্র ব্যথা',
    'জ্বর',
    'সংক্রমণের লক্ষণ'
  ];

  const emergencyContacts = [
    {
      name: 'জাতীয় জরুরি সেবা',
      number: '৯৯৯',
      color: 'from-red-500 to-orange-500'
    },
    {
      name: 'স্বাস্থ্য বাতায়ন',
      number: '১৬২৬৩',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const nearbyHospitals = [
    {
      name: 'ঢাকা মেডিক্যাল কলেজ হাসপাতাল',
      address: 'বকশী বাজার, ঢাকা',
      phone: '০২-৮৬২৬৮১২',
      distance: '২.৫ কিমি',
      specialty: 'জরুরি বিভাগ ২৪/৭'
    },
    {
      name: 'বারডেম হাসপাতাল',
      address: 'শাহবাগ, ঢাকা',
      phone: '০২-৮৬১৬৬৬৬',
      distance: '৩.২ কিমি',
      specialty: 'জলাতঙ্ক প্রতিরোধ কেন্দ্র'
    },
    {
      name: 'স্যার সলিমুল্লাহ মেডিক্যাল কলেজ',
      address: 'মিটফোর্ড, ঢাকা',
      phone: '০২-৭৩১৯০৪৪',
      distance: '৪.১ কিমি',
      specialty: 'বিষক্রিয়া চিকিৎসা'
    },
    {
      name: 'জাতীয় ইনস্টিটিউট অব নিউরোসায়েন্স',
      address: 'আগারগাঁও, ঢাকা',
      phone: '০২-৮১১৮০৭৩',
      distance: '৫.৮ কিমি',
      specialty: 'সাপের কামড় বিশেষজ্ঞ'
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
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Shield className="w-10 h-10" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">প্রাণীর কামড়</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            প্রাণীর কামড়ের প্রাথমিক চিকিৎসা এবং জরুরি পরামর্শ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Compact Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compact First Aid Steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">প্রাথমিক চিকিৎসা</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {firstAidSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-3 mx-auto shadow-md"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {step.step}
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">{step.title}</h3>
                    <p className="text-gray-600 text-xs">{step.action}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Compact Animal Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">প্রাণী অনুযায়ী চিকিৎসা</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {animalTypes.map((animal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gradient-to-br from-gray-50 to-yellow-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-800">{animal.animal}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        animal.risk === 'অত্যন্ত উচ্চ' ? 'bg-red-100 text-red-800' :
                        animal.risk === 'উচ্চ' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {animal.risk}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{animal.treatment}</p>
                    <div className="flex items-center text-red-600 text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {animal.timeline}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Compact Warning Signals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-red-50 rounded-2xl shadow-lg p-6 border border-red-200"
            >
              <h2 className="text-xl font-bold text-red-800 mb-4">সতর্কতা সংকেত</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {warningSignals.map((signal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center text-red-700 bg-white/60 rounded-lg p-3"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span className="text-sm">{signal}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Emergency Contacts with Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">জরুরি যোগাযোগ</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200"
                  >
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{contact.name}</h3>
                      <p className="text-gray-600 text-xs">জরুরি সেবা</p>
                    </div>
                    <motion.a
                      href={`tel:${contact.number}`}
                      className={`px-4 py-2 bg-gradient-to-r ${contact.color} text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center space-x-2`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone className="w-4 h-4" />
                      <span>{contact.number}</span>
                    </motion.a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Nearby Hospitals Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-800">নিকটস্থ হাসপাতাল</h2>
                <motion.button
                  className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-600 transition-all flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Navigation className="w-4 h-4" />
                  <span>আমার লোকেশন</span>
                </motion.button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {nearbyHospitals.map((hospital, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-blue-200 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-blue-800 text-sm mb-1">{hospital.name}</h3>
                        <div className="flex items-center text-blue-600 text-xs mb-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{hospital.address}</span>
                        </div>
                        <div className="flex items-center text-blue-600 text-xs mb-2">
                          <Navigation className="w-3 h-3 mr-1" />
                          <span>{hospital.distance}</span>
                        </div>
                        <p className="text-blue-700 text-xs bg-blue-100 rounded-lg p-2">
                          {hospital.specialty}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <motion.a
                        href={`tel:${hospital.phone}`}
                        className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg font-medium text-xs hover:bg-green-600 transition-all flex items-center justify-center space-x-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Phone className="w-3 h-3" />
                        <span>কল</span>
                      </motion.a>
                      <motion.button
                        className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg font-medium text-xs hover:bg-blue-600 transition-all flex items-center justify-center space-x-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>দিকনির্দেশ</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - BiteBot Chat */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[700px]">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-red-400/20 animate-pulse" />
                  
                  <div className="relative flex items-center space-x-4">
                    <motion.div
                      className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl"
                      whileHover={{ scale: 1.15, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Shield className="w-10 h-10" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold mb-2">BiteBot</h3>
                      <p className="text-yellow-100 text-lg">প্রাণীর কামড় বিশেষজ্ঞ</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-[400px] overflow-y-auto space-y-4 p-6 bg-gradient-to-br from-gray-50 to-yellow-50">
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
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
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
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                              : 'bg-white/80 text-gray-800 border border-gray-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            {message.type === 'image' && message.imageUrl && (
                              <img 
                                src={message.imageUrl} 
                                alt="Animal bite" 
                                className="w-full h-32 object-cover rounded-2xl mb-3"
                              />
                            )}
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className={`text-xs mt-2 ${
                              message.sender === 'user' ? 'text-yellow-100' : 'text-gray-500'
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
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="bg-white/80 rounded-3xl p-4 shadow-lg backdrop-blur-sm border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
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
                    <motion.button
                      className="p-3 text-yellow-600 hover:bg-yellow-50 rounded-2xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Image className="w-5 h-5" />
                    </motion.button>

                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="প্রাণীর কামড় সম্পর্কে প্রশ্ন করুন..."
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
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
                      className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all disabled:opacity-50 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalBitePage;