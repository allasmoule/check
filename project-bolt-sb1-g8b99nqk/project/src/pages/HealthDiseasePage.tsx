import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, AlertCircle, BookOpen, Users, Shield, FileText, Upload, Stethoscope, Activity, Send, Mic, Image, MicOff, Loader2, User, Bot, X, Sparkles, Plus, Pill, Check } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'voice';
  imageUrl?: string;
}

interface MedicineSuggestion {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  purpose: string;
  timestamp: Date;
}

const HealthDiseasePage: React.FC = () => {
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [medicineSuggestions, setMedicineSuggestions] = useState<MedicineSuggestion[]>([]);

  const commonDiseases = [
    {
      name: 'জ্বর',
      icon: '🌡️',
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50',
      borderColor: 'border-red-300',
      hoverBg: 'hover:bg-red-100',
      description: 'শরীরের তাপমাত্রা বৃদ্ধি'
    },
    {
      name: 'সর্দি-কাশি',
      icon: '🤧',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-300',
      hoverBg: 'hover:bg-blue-100',
      description: 'নাক বন্ধ ও কাশি'
    },
    {
      name: 'মাথা ব্যথা',
      icon: '🧠',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-300',
      hoverBg: 'hover:bg-purple-100',
      description: 'মাথায় ব্যথা'
    },
    {
      name: 'পেট ব্যথা',
      icon: '🤢',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-300',
      hoverBg: 'hover:bg-green-100',
      description: 'পেটে ব্যথা'
    },
    {
      name: 'ডায়রিয়া',
      icon: '💧',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-300',
      hoverBg: 'hover:bg-yellow-100',
      description: 'পাতলা পায়খানা'
    },
    {
      name: 'শ্বাসকষ্ট',
      icon: '🫁',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50',
      borderColor: 'border-teal-300',
      hoverBg: 'hover:bg-teal-100',
      description: 'শ্বাস নিতে কষ্ট'
    },
    {
      name: 'চর্মরোগ',
      icon: '🩹',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      borderColor: 'border-pink-300',
      hoverBg: 'hover:bg-pink-100',
      description: 'ত্বকের সমস্যা'
    },
    {
      name: 'অ্যাসিডিটি',
      icon: '🔥',
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-300',
      hoverBg: 'hover:bg-orange-100',
      description: 'বুক জ্বালা'
    }
  ];

  const healthTips = [
    {
      icon: Heart,
      title: 'নিয়মিত ব্যায়াম',
      description: 'সপ্তাহে ৩০ মিনিট হাঁটুন',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'সুষম খাদ্য',
      description: 'সবজি ও ফলমূল খান',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'পর্যাপ্ত ঘুম',
      description: '৭-৮ ঘণ্টা ঘুমান',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: AlertCircle,
      title: 'নিয়মিত চেকআপ',
      description: 'বছরে একবার পরীক্ষা',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const toggleDisease = (diseaseName: string) => {
    setSelectedDiseases(prev => 
      prev.includes(diseaseName) 
        ? prev.filter(d => d !== diseaseName)
        : [...prev, diseaseName]
    );
  };

  const sendSelectedDiseasesToChat = () => {
    if (selectedDiseases.length > 0) {
      const message = `আমার এই স্বাস্থ্য সমস্যাগুলো রয়েছে: ${selectedDiseases.join(', ')}। এ বিষয়ে বিস্তারিত পরামর্শ এবং চিকিৎসা সম্পর্কে জানতে চাই।`;
      setChatMessages(prev => [...prev, message]);
      setSelectedDiseases([]); // Clear selection after sending
    }
  };

  // Function to add medicine suggestion from chatbot
  const addMedicineSuggestion = (medicine: Omit<MedicineSuggestion, 'id' | 'timestamp'>) => {
    const newSuggestion: MedicineSuggestion = {
      ...medicine,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setMedicineSuggestions(prev => [newSuggestion, ...prev]);
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
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Heart className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">স্বাস্থ্য বিষয়ক রোগ</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            সাধারণ স্বাস্থ্য সমস্যা সম্পর্কে জানুন এবং AI সহায়তা নিন। রোগ সিলেক্ট করুন অথবা টেস্ট রিপোর্ট আপলোড করে বিশ্লেষণ করান।
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Disease Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Common Diseases Selection - Compact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-r from-red-500 to-pink-500 text-white mb-4 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Stethoscope className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">সাধারণ রোগসমূহ</h2>
                <p className="text-gray-600">আপনার সমস্যা সিলেক্ট করুন</p>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {commonDiseases.map((disease, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`group relative cursor-pointer rounded-2xl p-4 border-2 transition-all duration-300 overflow-hidden ${
                      selectedDiseases.includes(disease.name)
                        ? `bg-gradient-to-br ${disease.bgColor} ${disease.borderColor} shadow-lg ${disease.hoverBg}`
                        : `bg-gradient-to-br ${disease.bgColor} ${disease.borderColor} hover:shadow-lg ${disease.hoverBg}`
                    }`}
                    onClick={() => toggleDisease(disease.name)}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Selection Indicator */}
                    {selectedDiseases.includes(disease.name) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                    
                    {/* Disease Icon */}
                    <motion.div
                      className="text-3xl mb-3 text-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {disease.icon}
                    </motion.div>
                    
                    <h3 className="text-lg font-bold mb-2 text-center text-gray-800">
                      {disease.name}
                    </h3>
                    
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      {disease.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Send to Chat Button */}
              {selectedDiseases.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.button
                    onClick={sendSelectedDiseasesToChat}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className="w-5 h-5" />
                    <span>চ্যাটবটে পাঠান ({selectedDiseases.length}টি রোগ)</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Health Tips - Compact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-500 to-green-500 text-white mb-4 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Shield className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">স্বাস্থ্য টিপস</h2>
                <p className="text-gray-600">সুস্থ থাকার পরামর্শ</p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4">
                {healthTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="group text-center bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: '0 15px 30px rgba(59, 130, 246, 0.1)'
                    }}
                  >
                    <motion.div 
                      className={`w-12 h-12 bg-gradient-to-br ${tip.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <tip.icon className="w-6 h-6" />
                    </motion.div>
                    
                    <h3 className="font-bold text-gray-800 mb-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {tip.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Medicine Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-r from-teal-500 to-green-500 text-white mb-4 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Pill className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">ওষুধ পরামর্শ</h2>
                <p className="text-gray-600">AI থেকে প্রাপ্ত ওষুধের পরামর্শ</p>
              </div>

              {medicineSuggestions.length === 0 ? (
                <div className="text-center py-8">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Pill className="w-10 h-10" />
                  </motion.div>
                  <p className="text-gray-500 text-lg">এখনো কোন ওষুধের পরামর্শ নেই</p>
                  <p className="text-gray-400 text-sm mt-2">চ্যাটবট থেকে ওষুধের পরামর্শ নিন</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {medicineSuggestions.map((medicine, index) => (
                    <motion.div
                      key={medicine.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-4 border border-teal-200 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-800">{medicine.name}</h3>
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                          নতুন
                        </span>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                          <span className="text-gray-600">মাত্রা: {medicine.dosage}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-gray-600">সময়: {medicine.frequency}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-600">মেয়াদ: {medicine.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          <span className="text-gray-600">কারণ: {medicine.purpose}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-teal-200">
                        <p className="text-xs text-gray-500">
                          {medicine.timestamp.toLocaleString('bn-BD')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Unified AI Chat */}
          <div className="lg:col-span-1">
            <UnifiedHealthChatbot 
              selectedDiseases={chatMessages}
              onMedicineSuggestion={addMedicineSuggestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Unified Health Chatbot Component
const UnifiedHealthChatbot: React.FC<{ 
  selectedDiseases: string[];
  onMedicineSuggestion: (medicine: Omit<MedicineSuggestion, 'id' | 'timestamp'>) => void;
}> = ({ selectedDiseases, onMedicineSuggestion }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'report'>('chat');
  const [reportText, setReportText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `আস্সালামু আলাইকুম! আমি আপনার AI স্বাস্থ্য সহায়ক। আমি আপনাকে স্বাস্থ্য বিষয়ক প্রশ্নের উত্তর দিতে পারি এবং টেস্ট রিপোর্ট বিশ্লেষণ করতে পারি।`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReportSubmit = async () => {
    if (!reportText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `টেস্ট রিপোর্ট: ${reportText}`,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = `রিপোর্ট বিশ্লেষণ সম্পন্ন হয়েছে। আপনার রিপোর্টে কিছু গুরুত্বপূর্ণ বিষয় লক্ষ্য করা গেছে। বিস্তারিত পরামর্শের জন্য একজন বিশেষজ্ঞ ডাক্তারের সাথে যোগাযোগ করুন।`;
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: mockAnalysis,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);
      setIsAnalyzing(false);
      setReportText('');
    }, 2000);
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
    setIsLoading(true);
    
    // Simulate AI response with medicine suggestion
    setTimeout(() => {
      const responses = [
        'আপনার প্রশ্নের জবাবে আমি বলতে পারি যে এটি একটি সাধারণ স্বাস্থ্য সমস্যা। আরও তথ্যের জন্য একজন বিশেষজ্ঞ ডাক্তারের সাথে যোগাযোগ করুন।',
        'এই বিষয়ে আমার পরামর্শ হলো প্রয়োজনীয় সতর্কতা অবলম্বন করুন এবং নিয়মিত চেকআপ করান।',
        'আপনার বর্ণিত লক্ষণগুলো বিবেচনা করে কিছু প্রাথমিক পরামর্শ দিতে পারি। তবে চূড়ান্ত পরামর্শের জন্য একজন ডাক্তারের সাথে দেখা করুন।'
      ];
      
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Randomly add medicine suggestion
      if (Math.random() > 0.5) {
        const medicines = [
          {
            name: 'প্যারাসিটামল',
            dosage: '৫০০মিগ্রা',
            frequency: 'দিনে ৩ বার',
            duration: '৩-৫ দিন',
            purpose: 'জ্বর ও ব্যথার জন্য'
          },
          {
            name: 'অ্যান্টাসিড',
            dosage: '১ চামচ',
            frequency: 'খাবারের ১ ঘণ্টা পর',
            duration: '৭ দিন',
            purpose: 'অম্বলের জন্য'
          },
          {
            name: 'ওআরএস',
            dosage: '১ প্যাকেট',
            frequency: 'প্রয়োজন অনুযায়ী',
            duration: 'যতক্ষণ প্রয়োজন',
            purpose: 'পানিশূন্যতার জন্য'
          }
        ];
        
        const randomMedicine = medicines[Math.floor(Math.random() * medicines.length)];
        onMedicineSuggestion(randomMedicine);
      }
      
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  // Handle external messages
  useEffect(() => {
    if (selectedDiseases.length > 0) {
      const lastMessage = selectedDiseases[selectedDiseases.length - 1];
      const userMessage: Message = {
        id: Date.now().toString(),
        text: lastMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Generate AI response
      setIsLoading(true);
      setTimeout(() => {
        generateAIResponse(lastMessage);
      }, 1500);
    }
  }, [selectedDiseases]);

  const generateAIResponse = async (message: string) => {
    try {
      const response = await generateHealthResponse(message, 'general-health');
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'দুঃখিত, এই মুহূর্তে পরামর্শ দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন।',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky top-8"
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[700px]"
        style={{
          transform: 'perspective(1000px) rotateY(-2deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 3D Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 animate-pulse" />
          
          {/* Floating particles */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-bounce" />
          <div className="absolute top-8 right-8 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl"
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 15,
                  boxShadow: '0 20px 40px rgba(255,255,255,0.3)'
                }}
                transition={{ type: "spring", stiffness: 400 }}
                style={{
                  transform: 'perspective(500px) rotateX(10deg)',
                }}
              >
                <Sparkles className="w-10 h-10" />
              </motion.div>
              <div>
                <h3 className="text-3xl font-bold mb-2">AI স্বাস্থ্য সহায়ক</h3>
                <p className="text-blue-100 text-lg">স্বাস্থ্য পরামর্শ ও রিপোর্ট বিশ্লেষণ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6">
          <div className="flex bg-white rounded-2xl p-2 shadow-inner">
            <motion.button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                transform: activeTab === 'chat' ? 'perspective(500px) rotateX(-2deg)' : 'none'
              }}
            >
              <Heart className="w-5 h-5" />
              <span>স্বাস্থ্য চ্যাট</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('report')}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'report'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                transform: activeTab === 'report' ? 'perspective(500px) rotateX(-2deg)' : 'none'
              }}
            >
              <FileText className="w-5 h-5" />
              <span>রিপোর্ট বিশ্লেষণ</span>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-[500px]">
          {activeTab === 'chat' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col h-full"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4">
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
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
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
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            : 'bg-white/80 text-gray-800 border border-gray-200'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
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
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/80 rounded-3xl p-4 shadow-lg backdrop-blur-sm border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                          <span className="text-sm text-gray-600">উত্তর তৈরি করছি...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="আপনার স্বাস্থ্য সমস্যার কথা বলুন..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={isLoading}
                  />
                </div>

                <motion.button
                  className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col h-full space-y-6"
            >
              {/* Report Upload Area */}
              <div 
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-dashed border-emerald-300 flex-1"
                style={{
                  transform: 'perspective(800px) rotateX(2deg)',
                  boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)'
                }}
              >
                <div className="text-center mb-4">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl text-white mb-4 shadow-2xl"
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: 10,
                      boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)'
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Upload className="w-8 h-8" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">টেস্ট রিপোর্ট আপলোড করুন</h4>
                  <p className="text-gray-600">আপনার মেডিকেল টেস্ট রিপোর্টের টেক্সট এখানে পেস্ট করুন</p>
                </div>
                
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="এখানে আপনার টেস্ট রিপোর্টের বিস্তারিত লিখুন বা পেস্ট করুন..."
                  className="w-full h-32 p-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300 resize-none"
                  style={{
                    boxShadow: 'inset 0 4px 8px rgba(16, 185, 129, 0.1)'
                  }}
                />
                
                <motion.button
                  onClick={handleReportSubmit}
                  disabled={!reportText.trim() || isAnalyzing}
                  className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-2xl font-bold hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAnalyzing ? (
                    <>
                      <Activity className="w-5 h-5 animate-spin" />
                      <span>বিশ্লেষণ করা হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      <span>রিপোর্ট বিশ্লেষণ করুন</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Messages for Report Analysis */}
              <div className="flex-1 overflow-y-auto space-y-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4">
                <AnimatePresence>
                  {messages.filter(msg => msg.text.includes('টেস্ট রিপোর্ট') || msg.text.includes('রিপোর্ট বিশ্লেষণ')).map((message) => (
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
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {message.sender === 'user' ? (
                            <User className="w-5 h-5" />
                          ) : (
                            <Stethoscope className="w-5 h-5" />
                          )}
                        </motion.div>

                        <motion.div 
                          className={`rounded-3xl p-4 shadow-lg backdrop-blur-sm ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                            : 'bg-white/80 text-gray-800 border border-gray-200'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
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

                {/* Loading for Report Analysis */}
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/80 rounded-3xl p-4 shadow-lg backdrop-blur-sm border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                          <span className="text-sm text-gray-600">রিপোর্ট বিশ্লেষণ করছি...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HealthDiseasePage;