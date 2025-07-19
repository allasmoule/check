import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Image, MicOff, Loader2, User, Bot } from 'lucide-react';
import { generateHealthResponse, analyzeImage } from '../utils/geminiApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'voice';
  imageUrl?: string;
}

interface AIChatProps {
  title: string;
  placeholder: string;
  context: string;
  externalMessages?: string[];
}

const AIChat: React.FC<AIChatProps> = ({ title, placeholder, context, externalMessages = [] }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `আস্সালামু আলাইকুম! আমি ${title} বিষয়ে আপনার সহায়তা করতে এসেছি। আপনি টেক্সট, ছবি অথবা ভয়েস মেসেজের মাধ্যমে আমার সাথে কথা বলতে পারেন।`,
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

  // Handle external messages
  useEffect(() => {
    if (externalMessages.length > 0) {
      const lastMessage = externalMessages[externalMessages.length - 1];
      const userMessage: Message = {
        id: Date.now().toString(),
        text: lastMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, userMessage]);
      generateResponse(lastMessage);
    }
  }, [externalMessages]);

  const generateResponse = async (userMessage: string, imageUrl?: string) => {
    setIsLoading(true);
    
    try {
      // Use Google Gemini API for real AI responses
      const response = await generateHealthResponse(userMessage, context);
      
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
      const response = await analyzeImage(file, context);
      
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 min-h-[600px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 animate-pulse" />
        <div className="relative flex items-center space-x-4">
          <motion.div
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Bot className="w-8 h-8" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold">AI স্বাস্থ্য সহায়ক</h3>
            <p className="text-blue-100 text-sm">{title}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50">
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
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                {/* Avatar */}
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

                {/* Message */}
                <motion.div 
                  className={`rounded-3xl p-4 shadow-lg backdrop-blur-sm ${
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
                      className="w-full h-32 object-cover rounded-2xl mb-3"
                    />
                  )}
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
            className="p-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors"
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
              placeholder="আপনার স্বাস্থ্য সমস্যার কথা বলুন..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
          </div>

          <motion.button
            className={`p-3 rounded-2xl transition-colors ${
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
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </motion.button>

          <motion.button
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 shadow-lg"
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
  );
};

export default AIChat;