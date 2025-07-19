import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Upload, FileText, Loader2, User, Stethoscope, Send, Mic, Image, MicOff, Bot, Heart } from 'lucide-react';
import { generateHealthResponse, analyzePrescription, analyzeImage } from '../utils/geminiApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'prescription' | 'image' | 'voice';
  imageUrl?: string;
}

interface AIPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIPopup: React.FC<AIPopupProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'prescription'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `আস্সালামু আলাইকুম! আমি আপনার AI স্বাস্থ্য সহায়ক। আমি আপনাকে স্বাস্থ্য বিষয়ক প্রশ্নের উত্তর দিতে পারি এবং প্রেসক্রিপশন বিশ্লেষণ করতে পারি। আপনি টেক্সট, ছবি অথবা ভয়েস মেসেজের মাধ্যমে আমার সাথে কথা বলতে পারেন।`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [prescriptionText, setPrescriptionText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
      const response = await generateHealthResponse(userMessage, 'general-health');
      
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
        text: `ছবি আপলোড করেছি: ${file.name}`,
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
      const response = await analyzeImage(file, 'general-health');
      
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
          generateResponse('আমি একটি ভয়েস মেসেজ পাঠিয়েছি। অনুগ্রহ করে সাধারণ স্বাস্থ্য পরামর্শ দিন।');
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

  const handlePrescriptionSubmit = async () => {
    if (!prescriptionText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `প্রেসক্রিপশন বিশ্লেষণের জন্য: ${prescriptionText}`,
      sender: 'user',
      timestamp: new Date(),
      type: 'prescription'
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI analysis
    setTimeout(() => {
      analyzePrescriptionAndRespond(prescriptionText);
    }, 500);
  };

  const analyzePrescriptionAndRespond = async (prescriptionText: string) => {
    try {
      const analysis = await analyzePrescription(prescriptionText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: analysis,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'দুঃখিত, প্রেসক্রিপশন বিশ্লেষণ করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
      setPrescriptionText('');
      setActiveTab('chat'); // Switch to chat tab to see the response
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />
          
          {/* Enhanced Popup with Better Responsive Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-6 lg:inset-12 xl:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
            style={{
              maxHeight: '90vh',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Enhanced Header with 3D Effect */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white p-4 md:p-6 lg:p-8 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 animate-pulse" />
              
              {/* Enhanced Floating particles */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-bounce" />
              <div className="absolute top-8 right-8 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
              <div className="absolute bottom-6 left-12 w-1.5 h-1.5 bg-white/40 rounded-full animate-ping" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <motion.div
                    className="w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 bg-white/20 rounded-2xl md:rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl"
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
                    <Sparkles className="w-6 h-6 md:w-8 lg:w-10 md:h-8 lg:h-10" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">AI স্বাস্থ্য সহায়ক</h3>
                    <p className="text-blue-100 text-sm md:text-base lg:text-lg">স্বাস্থ্য পরামর্শ ও প্রেসক্রিপশন বিশ্লেষণ</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
              </div>
            </div>

            {/* Enhanced Tab Navigation */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-3 md:p-4 lg:p-6 flex-shrink-0">
              <div className="flex bg-white rounded-xl md:rounded-2xl p-1 md:p-2 shadow-inner">
                <motion.button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2 md:py-3 lg:py-4 px-3 md:px-4 lg:px-6 rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg transition-all flex items-center justify-center space-x-2 ${
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
                  <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  <span>স্বাস্থ্য চ্যাট</span>
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab('prescription')}
                  className={`flex-1 py-2 md:py-3 lg:py-4 px-3 md:px-4 lg:px-6 rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg transition-all flex items-center justify-center space-x-2 ${
                    activeTab === 'prescription'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    transform: activeTab === 'prescription' ? 'perspective(500px) rotateX(-2deg)' : 'none'
                  }}
                >
                  <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  <span>প্রেসক্রিপশন বিশ্লেষণ</span>
                </motion.button>
              </div>
            </div>

            {/* Enhanced Content Area */}
            <div className="p-3 md:p-4 lg:p-6 flex flex-col flex-1 min-h-0">
              {activeTab === 'chat' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col h-full min-h-0"
                >
                  {/* Enhanced Messages Container */}
                  <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 mb-3 md:mb-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl md:rounded-2xl p-3 md:p-4 min-h-0">
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
                          <div className={`flex items-start space-x-2 md:space-x-3 max-w-[85%] md:max-w-xs ${
                            message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <motion.div 
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                              message.sender === 'user' 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {message.sender === 'user' ? (
                                <User className="w-4 h-4 md:w-5 md:h-5" />
                              ) : (
                                <Bot className="w-4 h-4 md:w-5 md:h-5" />
                              )}
                            </motion.div>

                            <motion.div 
                              className={`rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-lg backdrop-blur-sm ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                : 'bg-white/80 text-gray-800 border border-gray-200'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              style={{
                                boxShadow: message.sender === 'user' 
                                  ? '0 10px 25px rgba(59, 130, 246, 0.3)' 
                                  : '0 10px 25px rgba(0, 0, 0, 0.1)'
                              }}
                            >
                              {message.type === 'image' && message.imageUrl && (
                                <img 
                                  src={message.imageUrl} 
                                  alt="Uploaded" 
                                  className="w-full h-24 md:h-32 object-cover rounded-xl md:rounded-2xl mb-2 md:mb-3"
                                />
                              )}
                              <p className="text-xs md:text-sm leading-relaxed">{message.text}</p>
                              <p className={`text-xs mt-1 md:mt-2 ${
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

                    {/* Enhanced Loading */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center">
                            <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </div>
                          <div className="bg-white/80 rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-lg backdrop-blur-sm border border-gray-200">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin text-blue-500" />
                              <span className="text-xs md:text-sm text-gray-600">উত্তর তৈরি করছি...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Enhanced Recording indicator */}
                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-3 md:mb-4 flex items-center justify-center space-x-2 md:space-x-3 text-red-500 bg-red-50 rounded-xl md:rounded-2xl p-2 md:p-3"
                    >
                      <motion.div 
                        className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                      <span className="text-xs md:text-sm font-medium">রেকর্ড করছি... {formatTime(recordingTime)}</span>
                    </motion.div>
                  )}

                  {/* Enhanced Input Area */}
                  <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
                    <motion.button
                      className="p-2 md:p-3 text-blue-600 hover:bg-blue-50 rounded-xl md:rounded-2xl transition-colors flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Image className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.button>

                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="আপনার স্বাস্থ্য সমস্যার কথা বলুন..."
                        className="w-full p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-2xl md:rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm md:text-base"
                        disabled={isLoading}
                      />
                    </div>

                    <motion.button
                      className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-colors flex-shrink-0 ${
                        isRecording 
                          ? 'bg-red-500 text-white hover:bg-red-600' 
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseDown={startRecording}
                      onMouseUp={stopRecording}
                      onMouseLeave={stopRecording}
                    >
                      {isRecording ? <MicOff className="w-4 h-4 md:w-5 md:h-5" /> : <Mic className="w-4 h-4 md:w-5 md:h-5" />}
                    </motion.button>

                    <motion.button
                      className="p-2 md:p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl md:rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 shadow-lg flex-shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                    >
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col h-full space-y-4 md:space-y-6 min-h-0"
                >
                  {/* Enhanced Prescription Upload Area */}
                  <div 
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-dashed border-emerald-300 flex-1 min-h-0"
                    style={{
                      transform: 'perspective(800px) rotateX(2deg)',
                      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)'
                    }}
                  >
                    <div className="text-center mb-3 md:mb-4">
                      <motion.div
                        className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl md:rounded-3xl text-white mb-3 md:mb-4 shadow-2xl"
                        whileHover={{ 
                          scale: 1.15, 
                          rotate: 10,
                          boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)'
                        }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Upload className="w-6 h-6 md:w-8 md:h-8" />
                      </motion.div>
                      <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">প্রেসক্রিপশন আপলোড করুন</h4>
                      <p className="text-gray-600 text-sm md:text-base">আপনার মেডিকেল প্রেসক্রিপশনের টেক্সট এখানে পেস্ট করুন</p>
                    </div>
                    
                    <textarea
                      value={prescriptionText}
                      onChange={(e) => setPrescriptionText(e.target.value)}
                      placeholder="এখানে আপনার প্রেসক্রিপশনের বিস্তারিত লিখুন বা পেস্ট করুন..."
                      className="w-full h-24 md:h-32 p-3 md:p-4 border-2 border-emerald-200 rounded-xl md:rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300 resize-none text-sm md:text-base"
                      style={{
                        boxShadow: 'inset 0 4px 8px rgba(16, 185, 129, 0.1)'
                      }}
                    />
                    
                    <motion.button
                      onClick={handlePrescriptionSubmit}
                      disabled={!prescriptionText.trim() || isAnalyzing}
                      className="w-full mt-3 md:mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 md:py-3 rounded-xl md:rounded-2xl font-bold hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-2 text-sm md:text-base"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                          <span>বিশ্লেষণ করা হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="w-4 h-4 md:w-5 md:h-5" />
                          <span>প্রেসক্রিপশন বিশ্লেষণ করুন</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* Enhanced Messages for Prescription Analysis */}
                  <div className="flex-1 overflow-y-auto space-y-3 md:space-y-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl md:rounded-2xl p-3 md:p-4 min-h-0">
                    <AnimatePresence>
                      {messages.filter(msg => msg.type === 'prescription' || (msg.sender === 'bot' && messages.some(m => m.type === 'prescription'))).map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-2 md:space-x-3 max-w-[85%] md:max-w-xs ${
                            message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            <motion.div 
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                              message.sender === 'user' 
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                                : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {message.sender === 'user' ? (
                                <User className="w-4 h-4 md:w-5 md:h-5" />
                              ) : (
                                <Stethoscope className="w-4 h-4 md:w-5 md:h-5" />
                              )}
                            </motion.div>

                            <motion.div 
                              className={`rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-lg backdrop-blur-sm ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                                : 'bg-white/80 text-gray-800 border border-gray-200'
                              }`}
                              whileHover={{ scale: 1.02 }}
                            >
                              <p className="text-xs md:text-sm leading-relaxed">{message.text}</p>
                              <p className={`text-xs mt-1 md:mt-2 ${
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

                    {/* Enhanced Loading for Prescription Analysis */}
                    {isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl md:rounded-2xl flex items-center justify-center">
                            <Stethoscope className="w-4 h-4 md:w-5 md:h-5 text-white" />
                          </div>
                          <div className="bg-white/80 rounded-2xl md:rounded-3xl p-3 md:p-4 shadow-lg backdrop-blur-sm border border-gray-200">
                            <div className="flex items-center space-x-2">
                              <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin text-emerald-500" />
                              <span className="text-xs md:text-sm text-gray-600">প্রেসক্রিপশন বিশ্লেষণ করছি...</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIPopup;