import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Heart, Shield, AlertTriangle, Phone, MapPin, Navigation, Loader2, Copy, Share2, CheckCircle, User, UserCheck, Star, Calendar, Plus, X, Check, Send, Mic, MicOff, Bot, Upload, Edit, Save, Clock, Activity, FileText, Stethoscope, Pill, Users, BookOpen, Apple, Droplets, Moon, Sun, TrendingUp, BarChart3, ClipboardList } from 'lucide-react';
import { generateHealthResponse, analyzeImage } from '../utils/geminiApi';

interface UserProfile {
  name: string;
  age: number;
  currentWeek: number;
  dueDate: string;
  bloodGroup: string;
  emergencyContact: string;
  weight: number;
  height: number;
  lastPeriod: string;
  complications: string[];
  medications: string[];
  timestamp: Date;
}

interface WeeklyUpdate {
  id: string;
  week: number;
  date: string;
  tests: string[];
  testResults: string[];
  symptoms: string[];
  foods: string[];
  notes: string;
  weight?: number;
  bloodPressure?: string;
  timestamp: Date;
}

interface DoctorSuggestion {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  phone: string;
  rating: number;
  experience: string;
  timestamp: Date;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  imageUrl?: string;
}

const PregnancySupportPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'আসসালামু আলাইকুম! আমি আপনার গর্ভাবস্থার সহায়ক। আপনার কোন প্রশ্ন বা সমস্যা থাকলে জানান।',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWarnings, setSelectedWarnings] = useState<string[]>([]);
  const [doctorSuggestions, setDoctorSuggestions] = useState<DoctorSuggestion[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [weeklyUpdates, setWeeklyUpdates] = useState<WeeklyUpdate[]>([]);
  const [updateData, setUpdateData] = useState({
    week: '',
    foods: '',
    symptoms: '',
    tests: '',
    weight: '',
    notes: ''
  });
  const [weeklyData, setWeeklyData] = useState({
    week: '',
    tests: '',
    testResults: '',
    symptoms: '',
    foods: '',
    notes: '',
    weight: '',
    bloodPressure: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to add doctor suggestion from chatbot
  const addDoctorSuggestionFromChat = (message: string) => {
    // Mock doctor suggestions based on keywords
    const doctorKeywords = ['ডাক্তার', 'চিকিৎসক', 'বিশেষজ্ঞ', 'পরামর্শ'];
    
    if (doctorKeywords.some(keyword => message.includes(keyword))) {
      const mockDoctors = [
        {
          name: 'ডাঃ ফাতেমা খাতুন',
          specialty: 'গাইনী ও প্রসূতি বিশেষজ্ঞ',
          hospital: 'বারডেম হাসপাতাল',
          phone: '০১৮৮৭৬৫৪ৣ২১',
          rating: 4.9,
          experience: '১২ বছর'
        },
        {
          name: 'ডাঃ রাশিদা বেগম',
          specialty: 'মাতৃত্বকালীন বিশেষজ্ঞ',
          hospital: 'ঢাকা মেডিক্যাল কলেজ',
          phone: '০১৭১২৩৪৫৬৭৮',
          rating: 4.8,
          experience: '১৫ বছর'
        }
      ];
      
      const randomDoctor = mockDoctors[Math.floor(Math.random() * mockDoctors.length)];
      const newSuggestion: DoctorSuggestion = {
        ...randomDoctor,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      
      setDoctorSuggestions(prev => [newSuggestion, ...prev]);
    }
  };

  // Function to add weekly update from chatbot
  const addWeeklyUpdateFromChat = (message: string) => {
    // Parse message for test reports and other information
    const testKeywords = ['টেস্ট', 'রিপোর্ট', 'পরীক্ষা', 'আল্ট্রাসাউন্ড', 'ব্লাড টেস্ট', 'ইউরিন টেস্ট'];
    const foodKeywords = ['খেয়েছি', 'খাবার', 'খাই', 'পুষ্টি'];
    const symptomKeywords = ['সমস্যা', 'ব্যথা', 'বমি', 'মাথা ঘোরা', 'জ্বর'];
    
    let tests: string[] = [];
    let foods: string[] = [];
    let symptoms: string[] = [];
    
    if (testKeywords.some(keyword => message.includes(keyword))) {
      tests.push(message);
    }
    if (foodKeywords.some(keyword => message.includes(keyword))) {
      foods.push(message);
    }
    if (symptomKeywords.some(keyword => message.includes(keyword))) {
      symptoms.push(message);
    }
    
    if (tests.length > 0 || foods.length > 0 || symptoms.length > 0) {
      const currentWeek = userProfile?.currentWeek || 1;
      updateWeeklyRecord(currentWeek, tests, foods, symptoms, message);
    }
  };

  // Update weekly record
  const updateWeeklyRecord = (week: number, tests: string[], foods: string[], symptoms: string[], notes: string) => {
    const existingUpdateIndex = weeklyUpdates.findIndex(update => update.week === week);
    
    if (existingUpdateIndex >= 0) {
      // Update existing record
      const updatedRecord = { ...weeklyUpdates[existingUpdateIndex] };
      updatedRecord.tests = [...new Set([...updatedRecord.tests, ...tests])];
      updatedRecord.foods = [...new Set([...updatedRecord.foods, ...foods])];
      updatedRecord.symptoms = [...new Set([...updatedRecord.symptoms, ...symptoms])];
      updatedRecord.notes = updatedRecord.notes + '\n' + notes;
      updatedRecord.timestamp = new Date();
      
      const newUpdates = [...weeklyUpdates];
      newUpdates[existingUpdateIndex] = updatedRecord;
      setWeeklyUpdates(newUpdates);
    } else {
      // Create new record
      const newUpdate: WeeklyUpdate = {
        id: Date.now().toString(),
        week: week,
        date: new Date().toLocaleDateString('bn-BD'),
        tests: tests,
        testResults: [],
        symptoms: symptoms,
        foods: foods,
        notes: notes,
        timestamp: new Date()
      };
      setWeeklyUpdates(prev => [newUpdate, ...prev]);
    }
  };

  const generateResponse = async (userMessage: string, imageUrl?: string) => {
    setIsLoading(true);
    
    try {
      // Use Google Gemini API for real AI responses
      const response = await generateHealthResponse(userMessage, 'pregnancy-support');
      
      // Auto-update weekly records from chat
      addWeeklyUpdateFromChat(userMessage);
      
      // Check if message contains doctor-related keywords
      const doctorKeywords = ['ডাক্তার', 'চিকিৎসক', 'বিশেষজ্ঞ', 'পরামর্শ'];
      if (doctorKeywords.some(keyword => userMessage.includes(keyword))) {
        addDoctorSuggestionFromChat(userMessage);
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'দুঃখিত, এই মুহূর্তে আমি উত্তর দিতে পারছি না। অনুগ্রহ করে পরে আবার চেষ্টা করুন।',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !uploadedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
      imageUrl: uploadedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Generate AI response
    await generateResponse(inputMessage, uploadedImage || undefined);
    
    setInputMessage('');
    setUploadedImage(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setUploadedImage(result);
    };
    reader.readAsDataURL(file);
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
      
      mediaRecorder.ondataavailable = (event) => {
        // Handle recorded audio data
        console.log('Audio recorded:', event.data);
      };
      
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
    
    setIsRecording(false);
    setRecordingTime(0);
  };

  const toggleWarning = (warning: string) => {
    setSelectedWarnings(prev => 
      prev.includes(warning) 
        ? prev.filter(w => w !== warning)
        : [...prev, warning]
    );
  };

  const sendSelectedWarningsToChat = () => {
    if (selectedWarnings.length > 0) {
      const message = `আমার এই লক্ষণগুলো রয়েছে: ${selectedWarnings.join(', ')}। এ বিষয়ে পরামর্শ দিন।`;
      setInputMessage(message);
      setSelectedWarnings([]);
    }
  };

  const getEmergencyLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert('আপনার ব্রাউজার জিওলোকেশন সাপোর্ট করে না');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setIsGettingLocation(false);
        
        const emergencyMessage = `🆘 জরুরি অবস্থা! গর্ভবতী মায়ের জরুরি সাহায্য প্রয়োজন।\n\n📍 অবস্থান:\nঅক্ষাংশ: ${latitude.toFixed(6)}\nদ্রাঘিমাংশ: ${longitude.toFixed(6)}\n\nGoogle Maps: https://maps.google.com/?q=${latitude},${longitude}\n\n⏰ সময়: ${new Date().toLocaleString('bn-BD')}\n\n📞 জরুরি নম্বর: ৯৯৯`;
        
        setShareMessage(emergencyMessage);
        setLocationShared(true);
        
        // Auto call emergency
        setTimeout(() => {
          window.open('tel:999');
        }, 1000);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        
        const emergencyMessage = `🆘 জরুরি অবস্থা! গর্ভবতী মায়ের জরুরি সাহায্য প্রয়োজন।\n\n⚠️ লোকেশন পাওয়া যায়নি\n\n⏰ সময়: ${new Date().toLocaleString('bn-BD')}\n\n📞 জরুরি নম্বর: ৯৯৯`;
        
        setShareMessage(emergencyMessage);
        setLocationShared(true);
        
        // Call emergency without location
        window.open('tel:999');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareMessage);
    alert('জরুরি বার্তা কপি হয়েছে!');
  };

  const shareViaWhatsApp = () => {
    const encodedMessage = encodeURIComponent(shareMessage);
    window.open(`https://wa.me/?text=${encodedMessage}`);
  };

  const handleProfileSubmit = () => {
    // Validate required fields
    if (!userProfile?.name || !userProfile?.currentWeek) {
      alert('নাম এবং গর্ভাবস্থার সপ্তাহ অবশ্যই দিতে হবে');
      return;
    }
    
    setShowProfileModal(false);
    alert('প্রোফাইল সংরক্ষিত হয়েছে!');
  };

  const handleUpdateSubmit = () => {
    if (!updateData.week) {
      alert('সপ্তাহ নম্বর দিন');
      return;
    }

    // Process the update data
    const foods = updateData.foods.split(',').map(f => f.trim()).filter(f => f);
    const symptoms = updateData.symptoms.split(',').map(s => s.trim()).filter(s => s);
    const tests = updateData.tests.split(',').map(t => t.trim()).filter(t => t);

    // Add to chat as a message
    const updateMessage = `সপ্তাহ ${updateData.week} এর আপডেট:\n\nখাবার: ${foods.join(', ')}\nলক্ষণ: ${symptoms.join(', ')}\nটেস্ট: ${tests.join(', ')}\nওজন: ${updateData.weight} কেজি\nনোট: ${updateData.notes}`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: updateMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Generate AI response
    generateResponse(updateMessage);
    
    // Reset form
    setUpdateData({ week: '', foods: '', symptoms: '', tests: '', weight: '', notes: '' });
    setShowUpdateModal(false);
  };

  const handleWeeklySubmit = () => {
    if (!weeklyData.week) {
      alert('সপ্তাহ নম্বর দিন');
      return;
    }

    const tests = weeklyData.tests.split(',').map(t => t.trim()).filter(t => t);
    const testResults = weeklyData.testResults.split(',').map(t => t.trim()).filter(t => t);
    const symptoms = weeklyData.symptoms.split(',').map(t => t.trim()).filter(t => t);
    const foods = weeklyData.foods.split(',').map(t => t.trim()).filter(t => t);

    const newUpdate: WeeklyUpdate = {
      id: Date.now().toString(),
      week: parseInt(weeklyData.week),
      date: new Date().toLocaleDateString('bn-BD'),
      tests: tests,
      testResults: testResults,
      symptoms: symptoms,
      foods: foods,
      notes: weeklyData.notes,
      weight: weeklyData.weight ? parseFloat(weeklyData.weight) : undefined,
      bloodPressure: weeklyData.bloodPressure || undefined,
      timestamp: new Date()
    };

    setWeeklyUpdates(prev => [newUpdate, ...prev.filter(u => u.week !== newUpdate.week)]);
    setWeeklyData({ week: '', tests: '', testResults: '', symptoms: '', foods: '', notes: '', weight: '', bloodPressure: '' });
    setShowWeeklyModal(false);
  };

  const nutritionTips = [
    {
      icon: Apple,
      title: 'পুষ্টিকর খাবার',
      description: 'ফলিক অ্যাসিড, আয়রন ও ক্যালসিয়াম',
      foods: ['পালং শাক', 'ডিম', 'দুধ', 'মাছ'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Droplets,
      title: 'পর্যাপ্ত পানি',
      description: 'দৈনিক ৮-১০ গ্লাস পানি পান করুন',
      foods: ['পানি', 'ডাবের পানি', 'ফলের রস', 'স্যুপ'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Shield,
      title: 'এড়িয়ে চলুন',
      description: 'কাঁচা মাছ, মাংস ও অতিরিক্ত ক্যাফিন এড়িয়ে চলুন',
      foods: ['রান্না করা খাবার', 'পাস্তুরাইজড দুধ', 'ধোয়া ফল', 'সিদ্ধ পানি'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200'
    }
  ];

  const warningSignals = [
    {
      icon: AlertTriangle,
      title: 'রক্তক্ষরণ',
      description: 'অতিরিক্ত রক্তক্ষরণ বা তীব্র ব্যথা',
      actions: ['অবিলম্বে হাসপাতালে যান', 'জরুরি নম্বরে কল করুন'],
      color: 'from-red-500 to-orange-500',
      bgColor: 'from-red-50 to-orange-50',
      borderColor: 'border-red-200'
    },
    {
      icon: AlertTriangle,
      title: 'উচ্চ রক্তচাপ',
      description: 'তীব্র মাথা ব্যথা, দৃষ্টি ঝাপসা বা হাত-পা ফোলা',
      actions: ['দ্রুত ডাক্তার দেখান', 'রক্তচাপ পরীক্ষা করান'],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200'
    },
    {
      icon: Heart,
      title: 'বাচ্চার নড়াচড়া',
      description: 'বাচ্চার নড়াচড়া কমে যাওয়া বা বন্ধ হওয়া',
      actions: ['অবিলম্বে ডাক্তারের কাছে যান', 'আল্ট্রাসাউন্ড করান'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white mb-6 shadow-2xl">
            <Baby className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">গর্ভাবস্থা সহায়তা</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            গর্ভাবস্থায় মা ও শিশুর সুস্বাস্থ্যের জন্য AI চালিত সম্পূর্ণ গাইডলাইন ও পরামর্শ
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Information Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Emergency Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 animate-pulse" />
              <div className="relative text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Phone className="w-10 h-10" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-4">🆘 জরুরি সহায়তা</h2>
                <p className="text-red-100 mb-8 text-lg">গর্ভাবস্থায় জরুরি অবস্থায় তাৎক্ষণিক সাহায্যের জন্য</p>
                
                <motion.button
                  onClick={getEmergencyLocation}
                  disabled={isGettingLocation}
                  className="w-full bg-white text-red-600 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isGettingLocation ? (
                    <>
                      <motion.div
                        className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>লোকেশন নিচ্ছি...</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-8 h-8" />
                      <MapPin className="w-8 h-8" />
                      <span>জরুরি কল (৯৯৯)</span>
                    </>
                  )}
                </motion.button>
                
                <p className="text-red-100 text-sm mt-4">
                  বাটনে ক্লিক করলে আপনার লোকেশন নিয়ে জরুরি সেবায় কল করবে
                </p>
              </div>
            </motion.div>

            {/* Profile & Update Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <motion.button
                onClick={() => setShowProfileModal(true)}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 text-left"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">প্রোফাইল সেটআপ</h3>
                    <p className="text-gray-600 text-sm">আপনার তথ্য যোগ করুন</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setShowUpdateModal(true)}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 text-left"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                    <Edit className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">দ্রুত আপডেট</h3>
                    <p className="text-gray-600 text-sm">সাপ্তাহিক তথ্য দিন</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>

            {/* Compact Nutrition Tips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Apple className="w-6 h-6" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">পুষ্টি ও যত্ন</h2>
                <p className="text-gray-600 text-sm">গর্ভাবস্থায় সঠিক পুষ্টি</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {nutritionTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`text-center bg-gradient-to-br ${tip.bgColor} rounded-xl p-4 hover:shadow-lg transition-all duration-300 border ${tip.borderColor}`}
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <motion.div 
                      className={`w-10 h-10 bg-gradient-to-br ${tip.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}
                      whileHover={{ rotate: 15, scale: 1.15 }}
                    >
                      <tip.icon className="w-5 h-5" />
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">{tip.title}</h3>
                    <p className="text-gray-600 text-xs mb-3">{tip.description}</p>
                    <div className="space-y-1">
                      {tip.foods.map((food, i) => (
                        <div key={i} className="text-gray-700 text-xs bg-white/60 rounded-lg p-1">
                          • {food}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Compact Warning Signals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-red-50 rounded-2xl shadow-lg p-6 border border-red-200"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white mb-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <AlertTriangle className="w-6 h-6" />
                </motion.div>
                <h2 className="text-xl font-bold text-red-800 mb-2">জরুরি সতর্কতা</h2>
                <p className="text-red-600 text-sm">এই লক্ষণগুলো দেখা দিলে দ্রুত ডাক্তার দেখান</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {warningSignals.map((signal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`text-center bg-gradient-to-br ${signal.bgColor} rounded-xl p-4 hover:shadow-lg transition-all duration-300 border ${signal.borderColor}`}
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <motion.div 
                      className={`w-10 h-10 bg-gradient-to-br ${signal.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg`}
                      whileHover={{ rotate: 15, scale: 1.15 }}
                    >
                      <signal.icon className="w-5 h-5" />
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">{signal.title}</h3>
                    <p className="text-gray-600 text-xs mb-3">{signal.description}</p>
                    <div className="space-y-1">
                      {signal.actions.map((action, i) => (
                        <div key={i} className="text-red-700 text-xs bg-white/60 rounded-lg p-1">
                          • {action}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Updates Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 border border-indigo-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white mb-4 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <TrendingUp className="w-8 h-8" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-indigo-800 mb-2">সাপ্তাহিক আপডেট</h2>
                  <p className="text-indigo-600">আপনার গর্ভাবস্থার সাপ্তাহিক রেকর্ড</p>
                </div>
                <motion.button
                  onClick={() => setShowWeeklyModal(true)}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5" />
                  <span>নতুন আপডেট</span>
                </motion.button>
              </div>

              {weeklyUpdates.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 text-indigo-400 mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <BarChart3 className="w-10 h-10" />
                  </motion.div>
                  <p className="text-indigo-500 text-lg">এখনো কোন সাপ্তাহিক আপডেট নেই</p>
                  <p className="text-indigo-400 text-sm mt-2">চ্যাটবটে টেস্ট রিপোর্ট বা খাবারের তথ্য দিলে অটো আপডেট হবে</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {weeklyUpdates.slice(0, 4).map((update, index) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-indigo-200 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-indigo-800">সপ্তাহ {update.week}</h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                          {update.date}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        {update.tests.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-indigo-700 mb-2 flex items-center">
                              <FileText className="w-4 h-4 mr-2" />
                              টেস্ট:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {update.tests.slice(0, 3).map((test, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs">
                                  {test.length > 20 ? test.substring(0, 20) + '...' : test}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {update.foods.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-indigo-700 mb-2 flex items-center">
                              <Apple className="w-4 h-4 mr-2" />
                              খাবার:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {update.foods.slice(0, 3).map((food, i) => (
                                <span key={i} className="px-2 py-1 bg-green-100 text-green-800 rounded-lg text-xs">
                                  {food.length > 15 ? food.substring(0, 15) + '...' : food}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {update.symptoms.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-indigo-700 mb-2 flex items-center">
                              <Heart className="w-4 h-4 mr-2" />
                              লক্ষণ:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {update.symptoms.slice(0, 2).map((symptom, i) => (
                                <span key={i} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-lg text-xs">
                                  {symptom.length > 15 ? symptom.substring(0, 15) + '...' : symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {update.weight && (
                          <div className="flex items-center text-indigo-700 text-sm">
                            <Activity className="w-4 h-4 mr-2" />
                            <span>ওজন: {update.weight} কেজি</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {weeklyUpdates.length > 4 && (
                <div className="text-center mt-6">
                  <motion.button
                    className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-2xl font-medium hover:bg-indigo-200 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    আরো দেখুন ({weeklyUpdates.length - 4}টি)
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Doctor Suggestions Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white mb-4 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <UserCheck className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">ডাক্তার পরামর্শ</h2>
                <p className="text-gray-600">AI থেকে প্রাপ্ত ডাক্তারের পরামর্শ</p>
              </div>

              {doctorSuggestions.length === 0 ? (
                <div className="text-center py-8">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Stethoscope className="w-10 h-10" />
                  </motion.div>
                  <p className="text-gray-500 text-lg">এখনো কোন ডাক্তারের পরামর্শ নেই</p>
                  <p className="text-gray-400 text-sm mt-2">চ্যাটবট থেকে ডাক্তারের পরামর্শ নিন</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {doctorSuggestions.map((doctor, index) => (
                    <motion.div
                      key={doctor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
                          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                          <p className="text-gray-600 text-sm">{doctor.hospital}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(doctor.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-gray-600">অভিজ্ঞতা: {doctor.experience}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-green-500" />
                          <span className="text-gray-600">{doctor.phone}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <motion.a
                          href={`tel:${doctor.phone}`}
                          className="flex-1 bg-green-500 text-white py-2 rounded-xl font-medium text-sm hover:bg-green-600 transition-all flex items-center justify-center space-x-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Phone className="w-4 h-4" />
                          <span>কল করুন</span>
                        </motion.a>
                        <motion.button
                          className="flex-1 bg-blue-500 text-white py-2 rounded-xl font-medium text-sm hover:bg-blue-600 transition-all flex items-center justify-center space-x-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Calendar className="w-4 h-4" />
                          <span>অ্যাপয়েন্টমেন্ট</span>
                        </motion.button>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-blue-200">
                        <p className="text-xs text-gray-500">
                          AI পরামর্শ: {doctor.timestamp.toLocaleString('bn-BD')}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - AI Chat */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden h-[800px] flex flex-col">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 animate-pulse" />
                  <div className="relative flex items-center space-x-4">
                    <motion.div
                      className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <Bot className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold">AI গর্ভাবস্থা সহায়ক</h3>
                      <p className="text-pink-100 text-sm">২৪/৭ পরামর্শ সেবা</p>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl rounded-br-md' 
                          : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-md shadow-sm'
                      } p-4`}>
                        {message.imageUrl && (
                          <img 
                            src={message.imageUrl} 
                            alt="Uploaded" 
                            className="w-full h-32 object-cover rounded-xl mb-3"
                          />
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.isUser ? 'text-pink-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('bn-BD', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm p-4">
                        <div className="flex items-center space-x-2">
                          <motion.div
                            className="w-2 h-2 bg-pink-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-pink-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-pink-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-gray-100">
                  {uploadedImage && (
                    <div className="mb-4 relative">
                      <img 
                        src={uploadedImage} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded-xl border-2 border-pink-200"
                      />
                      <motion.button
                        onClick={() => setUploadedImage(null)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </div>
                  )}
                  
                  <div className="flex items-end space-x-3">
                    <div className="flex-1">
                      <textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="আপনার প্রশ্ন লিখুন..."
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-300 focus:border-pink-500 resize-none"
                        rows={2}
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      
                      <motion.button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-12 h-12 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Upload className="w-5 h-5" />
                      </motion.button>
                      
                      <motion.button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          isRecording 
                            ? 'bg-red-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </motion.button>
                      
                      <motion.button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() && !uploadedImage}
                        className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {isRecording && (
                    <div className="mt-3 text-center">
                      <p className="text-red-500 text-sm">রেকর্ডিং চলছে... {recordingTime}s</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Profile Modal */}
        <AnimatePresence>
          {showProfileModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowProfileModal(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-8 relative overflow-hidden">
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <User className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">প্রোফাইল সেটআপ</h3>
                        <p className="text-blue-100 text-lg">আপনার গর্ভাবস্থার তথ্য দিন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowProfileModal(false)}
                      className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">নাম *</label>
                        <input
                          type="text"
                          value={userProfile?.name || ''}
                          onChange={(e) => setUserProfile(prev => ({ ...prev!, name: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="আপনার নাম"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">বয়স</label>
                        <input
                          type="number"
                          value={userProfile?.age || ''}
                          onChange={(e) => setUserProfile(prev => ({ ...prev!, age: parseInt(e.target.value) }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="বয়স"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">গর্ভাবস্থার সপ্তাহ *</label>
                        <input
                          type="number"
                          value={userProfile?.currentWeek || ''}
                          onChange={(e) => setUserProfile(prev => ({ ...prev!, currentWeek: parseInt(e.target.value) }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="কত সপ্তাহ"
                          min="1"
                          max="42"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">ওজন (কেজি)</label>
                        <input
                          type="number"
                          value={userProfile?.weight || ''}
                          onChange={(e) => setUserProfile(prev => ({ ...prev!, weight: parseFloat(e.target.value) }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="বর্তমান ওজন"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">রক্তের গ্রুপ</label>
                        <select
                          value={userProfile?.bloodGroup || ''}
                          onChange={(e) => setUserProfile(prev => ({ ...prev!, bloodGroup: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                        >
                          <option value="">নির্বাচন করুন</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">শেষ মাসিকের তারিখ</label>
                        <input
                          type="date"
                          value={userProfile?.lastPeriod || ''}
                          onChange={(e) => setUserProfile(prev => ({ ...prev!, lastPeriod: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">প্রত্যাশিত প্রসবের তারিখ</label>
                        <input
                          type="date"
                          value={userProfile?.dueDate || ''}
                          onChange={(e) => setUserProfile(prev => ({ ...prev!, dueDate: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">জরুরি যোগাযোগ</label>
                        <input
                          type="tel"
                          value={userProfile?.emergencyContact || ''}
                          onChange={(e) => setUserProfile(prev => ({ ...prev!, emergencyContact: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="০১৭xxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowProfileModal(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleProfileSubmit}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Save className="w-6 h-6" />
                      <span>সংরক্ষণ করুন</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Quick Update Modal */}
        <AnimatePresence>
          {showUpdateModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowUpdateModal(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 relative overflow-hidden">
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Edit className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">দ্রুত আপডেট</h3>
                        <p className="text-green-100 text-lg">এই সপ্তাহের তথ্য দিন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowUpdateModal(false)}
                      className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">সপ্তাহ নম্বর *</label>
                        <input
                          type="number"
                          value={updateData.week}
                          onChange={(e) => setUpdateData(prev => ({ ...prev, week: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500"
                          placeholder="যেমন: ১২"
                          min="1"
                          max="42"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">এই সপ্তাহে খাওয়া খাবার</label>
                        <textarea
                          value={updateData.foods}
                          onChange={(e) => setUpdateData(prev => ({ ...prev, foods: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 h-24 resize-none"
                          placeholder="যেমন: দুধ, ডিম, মাছ, শাকসবজি (কমা দিয়ে আলাদা করুন)"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">বর্তমান ওজন (কেজি)</label>
                        <input
                          type="number"
                          value={updateData.weight}
                          onChange={(e) => setUpdateData(prev => ({ ...prev, weight: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500"
                          placeholder="৫৫"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">লক্ষণ ও সমস্যা</label>
                        <textarea
                          value={updateData.symptoms}
                          onChange={(e) => setUpdateData(prev => ({ ...prev, symptoms: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 h-24 resize-none"
                          placeholder="যেমন: বমি ভাব, মাথা ব্যথা, পেট ব্যথা (কমা দিয়ে আলাদা করুন)"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">করা পরীক্ষা</label>
                        <textarea
                          value={updateData.tests}
                          onChange={(e) => setUpdateData(prev => ({ ...prev, tests: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 h-24 resize-none"
                          placeholder="যেমন: আল্ট্রাসাউন্ড, ব্লাড টেস্ট, ইউরিন টেস্ট (কমা দিয়ে আলাদা করুন)"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">অতিরিক্ত নোট</label>
                        <textarea
                          value={updateData.notes}
                          onChange={(e) => setUpdateData(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 h-20 resize-none"
                          placeholder="অন্যান্য গুরুত্বপূর্ণ তথ্য..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowUpdateModal(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleUpdateSubmit}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-6 h-6" />
                      <span>চ্যাটে পাঠান</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Weekly Update Modal */}
        <AnimatePresence>
          {showWeeklyModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowWeeklyModal(false)}
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
                        <ClipboardList className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">সাপ্তাহিক আপডেট</h3>
                        <p className="text-indigo-100 text-lg">এই সপ্তাহের তথ্য যোগ করুন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowWeeklyModal(false)}
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
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">মৌলিক তথ্য</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">গর্ভাবস্থার সপ্তাহ *</label>
                        <input
                          type="number"
                          value={weeklyData.week}
                          onChange={(e) => setWeeklyData(prev => ({ ...prev, week: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                          placeholder="যেমন: ১২"
                          min="1"
                          max="42"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">ওজন (কেজি)</label>
                          <input
                            type="number"
                            value={weeklyData.weight}
                            onChange={(e) => setWeeklyData(prev => ({ ...prev, weight: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                            placeholder="৫৫"
                            step="0.1"
                          />
                        </div>

                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">রক্তচাপ</label>
                          <input
                            type="text"
                            value={weeklyData.bloodPressure}
                            onChange={(e) => setWeeklyData(prev => ({ ...prev, bloodPressure: e.target.value }))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500"
                            placeholder="১২০/৮০"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">এই সপ্তাহের খাবার</label>
                        <textarea
                          value={weeklyData.foods}
                          onChange={(e) => setWeeklyData(prev => ({ ...prev, foods: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 h-24 resize-none"
                          placeholder="যেমন: দুধ, ডিম, মাছ, শাকসবজি (কমা দিয়ে আলাদা করুন)"
                        />
                      </div>
                    </div>

                    {/* Medical Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">মেডিকেল তথ্য</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">এই সপ্তাহের টেস্ট</label>
                        <textarea
                          value={weeklyData.tests}
                          onChange={(e) => setWeeklyData(prev => ({ ...prev, tests: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 h-24 resize-none"
                          placeholder="যেমন: আল্ট্রাসাউন্ড, ব্লাড টেস্ট, ইউরিন টেস্ট (কমা দিয়ে আলাদা করুন)"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">টেস্টের ফলাফল</label>
                        <textarea
                          value={weeklyData.testResults}
                          onChange={(e) => setWeeklyData(prev => ({ ...prev, testResults: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 h-24 resize-none"
                          placeholder="টেস্টের ফলাফল বিস্তারিত লিখুন"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">লক্ষণ ও সমস্যা</label>
                        <textarea
                          value={weeklyData.symptoms}
                          onChange={(e) => setWeeklyData(prev => ({ ...prev, symptoms: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 h-24 resize-none"
                          placeholder="যেমন: বমি ভাব, মাথা ব্যথা, পেট ব্যথা (কমা দিয়ে আলাদা করুন)"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">অতিরিক্ত নোট</label>
                        <textarea
                          value={weeklyData.notes}
                          onChange={(e) => setWeeklyData(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 h-20 resize-none"
                          placeholder="অন্যান্য গুরুত্বপূর্ণ তথ্য..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowWeeklyModal(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleWeeklySubmit}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="w-6 h-6" />
                      <span>আপডেট সংরক্ষণ করুন</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Emergency Location Share Modal */}
        <AnimatePresence>
          {locationShared && shareMessage && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setLocationShared(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 animate-pulse" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Navigation className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">🆘 জরুরি বার্তা প্রস্তুত</h3>
                        <p className="text-red-100 text-lg">নিচের বার্তা কপি করে শেয়ার করুন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setLocationShared(false)}
                      className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                      {shareMessage}
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.button
                      onClick={copyToClipboard}
                      className="w-full bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Copy className="w-6 h-6" />
                      <span>কপি করুন</span>
                    </motion.button>

                    <motion.button
                      onClick={shareViaWhatsApp}
                      className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-all flex items-center justify-center space-x-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Share2 className="w-6 h-6" />
                      <span>WhatsApp এ শেয়ার</span>
                    </motion.button>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <p className="text-green-800 font-medium">
                        জরুরি নম্বরে (৯৯৯) কল করা হচ্ছে...
                      </p>
                    </div>
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

export default PregnancySupportPage;