import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, MapPin, Phone, Clock, Star, Send, Mic, MicOff, Loader2, User, Bot, Navigation, Search, Filter, Heart, Snowflake, Activity, AlertTriangle, Play, Volume2, ThumbsUp, ThumbsDown, Share2, Copy, CheckCircle, X, Plus, Calendar, Users, Shield } from 'lucide-react';
import { generateHealthResponse } from '../utils/geminiApi';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'voice';
}

interface AmbulanceService {
  id: number;
  name: string;
  phone: string;
  district: string;
  area: string;
  available24x7: boolean;
  types: string[];
  rating: number;
  responseTime: string;
  price: string;
  verified: boolean;
}

interface BookingForm {
  name: string;
  phone: string;
  address: string;
  ambulanceType: string;
  patientCondition: string;
  urgency: string;
  notes: string;
}

const AmbulancePage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number, address: string} | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{rating: number, comment: string} | null>(null);
  const [showAddAmbulanceModal, setShowAddAmbulanceModal] = useState(false);
  const [newAmbulance, setNewAmbulance] = useState({
    name: '',
    phone: '',
    area: '',
    type: 'Regular',
    price: '',
    available24: true,
    rating: 4.5,
    responseTime: '১৫-২০ মিনিট'
  });
  
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    phone: '',
    address: '',
    ambulanceType: '',
    patientCondition: '',
    urgency: 'জরুরি',
    notes: ''
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `আস্সালামু আলাইকুম! আমি AmbulanceBot। আমি আপনাকে এম্বুলেন্স সেবা খুঁজে দিতে পারি। আপনি বলতে পারেন "আমার এলাকায় এম্বুলেন্স লাগবে" বা "ঢাকা মেডিকেলের জন্য এম্বুলেন্স চাই"। আমি তাৎক্ষণিক সাহায্য করব।`,
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

  const districts = [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'সিলেট', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ'
  ];

  const ambulanceTypes = [
    {
      type: 'Regular Ambulance',
      icon: '🚐',
      description: 'সাধারণ রোগী পরিবহনের জন্য',
      features: ['বেসিক মেডিকেল সরঞ্জাম', 'অক্সিজেন সিলিন্ডার', 'স্ট্রেচার'],
      price: '৫০০-১০০০ টাকা',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'AC Ambulance',
      icon: '❄️',
      description: 'শীতাতপ নিয়ন্ত্রিত এম্বুলেন্স',
      features: ['এয়ার কন্ডিশন', 'কমফোর্ট সিট', 'পরিষ্কার পরিবেশ'],
      price: '১০০০-১৫০০ টাকা',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      type: 'ICU/CCU Ambulance',
      icon: '❤️‍🩹',
      description: 'গুরুতর রোগীর জন্য',
      features: ['ভেন্টিলেটর', 'কার্ডিয়াক মনিটর', 'ডিফিব্রিলেটর', 'প্রশিক্ষিত নার্স'],
      price: '২০০০-৫০০০ টাকা',
      color: 'from-red-500 to-pink-500'
    },
    {
      type: 'Dead Body Freezer Van',
      icon: '⚰️',
      description: 'মৃতদেহ পরিবহনের জন্য',
      features: ['ফ্রিজার সুবিধা', 'সম্মানজনক পরিবহন', 'পরিবার সহায়তা'],
      price: '১৫০০-৩০০০ টাকা',
      color: 'from-gray-500 to-slate-500'
    }
  ];

  const ambulanceServices: AmbulanceService[] = [
    {
      id: 1,
      name: 'ঢাকা মেডিকেল এম্বুলেন্স',
      phone: '০১৭১২৩৪৫৬৭৮',
      district: 'ঢাকা',
      area: 'ধানমন্ডি, নিউমার্কেট',
      available24x7: true,
      types: ['Regular', 'AC', 'ICU'],
      rating: 4.8,
      responseTime: '১০-১৫ মিনিট',
      price: '৫০০-২০০০ টাকা',
      verified: true
    },
    {
      id: 2,
      name: 'রেড ক্রিসেন্ট এম্বুলেন্স',
      phone: '০১৮৮৭৬৫৪ৣ২১',
      district: 'ঢাকা',
      area: 'মিরপুর, উত্তরা',
      available24x7: true,
      types: ['Regular', 'ICU', 'Freezer'],
      rating: 4.9,
      responseTime: '৮-১২ মিনিট',
      price: '৪০০-১৮০০ টাকা',
      verified: true
    },
    {
      id: 3,
      name: 'চট্টগ্রাম মেডিকেল এম্বুলেন্স',
      phone: '০১৯৯৮৮৭৭৬৬৫',
      district: 'চট্টগ্রাম',
      area: 'আগ্রাবাদ, নাসিরাবাদ',
      available24x7: true,
      types: ['Regular', 'AC'],
      rating: 4.6,
      responseTime: '১৫-২০ মিনিট',
      price: '৬০০-১২০০ টাকা',
      verified: true
    },
    {
      id: 4,
      name: 'সিলেট জেনারেল এম্বুলেন্স',
      phone: '০১৫৫৪৪৩৩২২১',
      district: 'সিলেট',
      area: 'জিন্দাবাজার, আম্বরখানা',
      available24x7: false,
      types: ['Regular', 'AC'],
      rating: 4.4,
      responseTime: '২০-২৫ মিনিট',
      price: '৭০০-১৫০০ টাকা',
      verified: false
    },
    {
      id: 5,
      name: 'রাজশাহী মেডিকেল এম্বুলেন্স',
      phone: '০১৬৬৫৫৪৪৩৩২',
      district: 'রাজশাহী',
      area: 'সাহেব বাজার, রেলওয়ে',
      available24x7: true,
      types: ['Regular', 'ICU'],
      rating: 4.7,
      responseTime: '১২-১৮ মিনিট',
      price: '৫৫০-২২০০ টাকা',
      verified: true
    },
    {
      id: 6,
      name: 'খুলনা সিটি এম্বুলেন্স',
      phone: '০১৭৭৬৬৫৫৪৪৩',
      district: 'খুলনা',
      area: 'রয়েল, সোনাডাঙ্গা',
      available24x7: true,
      types: ['Regular', 'AC', 'Freezer'],
      rating: 4.5,
      responseTime: '১৫-২২ মিনিট',
      price: '৬৫০-১৮০০ টাকা',
      verified: true
    }
  ];

  const emergencyTips = [
    {
      title: '৯৯৯-এ কল করার নিয়ম',
      tips: ['শান্ত থাকুন', 'স্পষ্ট করে বলুন', 'ঠিকানা দিন', 'রোগীর অবস্থা বর্ণনা করুন'],
      icon: Phone,
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'এম্বুলেন্স আসার আগে',
      tips: ['রোগীকে নিরাপদ রাখুন', 'শ্বাসপথ পরিষ্কার রাখুন', 'রক্তক্ষরণ বন্ধ করুন', 'জরুরি কাগজপত্র প্রস্তুত রাখুন'],
      icon: Heart,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'জ্যামে ফেঁসে গেলে',
      tips: ['বিকল্প রাস্তা খোঁজুন', 'ট্রাফিক পুলিশকে জানান', 'হর্ন বাজান', 'জরুরি লেন ব্যবহার করুন'],
      icon: AlertTriangle,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const videoGuides = [
    {
      title: 'কীভাবে ৯৯৯-এ কল করবেন?',
      duration: '২:৩০',
      thumbnail: '📞',
      description: 'জরুরি অবস্থায় সঠিক তথ্য দিয়ে কল করার পদ্ধতি'
    },
    {
      title: 'প্রাথমিক চিকিৎসা',
      duration: '৫:১৫',
      thumbnail: '🩹',
      description: 'এম্বুলেন্স আসার আগে করণীয় প্রাথমিক চিকিৎসা'
    },
    {
      title: 'এম্বুলেন্স টাইপ চেনার উপায়',
      duration: '৩:৪৫',
      thumbnail: '🚐',
      description: 'কোন অবস্থায় কোন ধরনের এম্বুলেন্স দরকার'
    }
  ];

  const filteredServices = ambulanceServices.filter(service => {
    const matchesDistrict = selectedDistrict === 'all' || service.district === selectedDistrict;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.area.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const handleSubmitAmbulance = () => {
    if (!newAmbulance.name || !newAmbulance.phone || !newAmbulance.area || !newAmbulance.price) {
      alert('সব প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    const ambulance = {
      id: ambulanceServices.length + 1,
      name: newAmbulance.name,
      phone: newAmbulance.phone,
      area: newAmbulance.area,
      type: newAmbulance.type,
      price: newAmbulance.price,
      available24: newAmbulance.available24,
      rating: newAmbulance.rating,
      responseTime: newAmbulance.responseTime,
      verified: false
    };

    setAmbulanceServices(prev => [ambulance, ...prev]);
    setNewAmbulance({
      name: '',
      phone: '',
      area: '',
      type: 'Regular',
      price: '',
      available24: true,
      rating: 4.5,
      responseTime: '১৫-২০ মিনিট'
    });
    setShowAddAmbulanceModal(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      // Custom responses for ambulance-related queries
      let response = '';
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('এম্বুলেন্স') || lowerMessage.includes('ambulance')) {
        if (lowerMessage.includes('ঢাকা')) {
          response = `ঢাকায় এম্বুলেন্স সেবা:\n\n🚐 ঢাকা মেডিকেল এম্বুলেন্স\n📞 ০১৭১২৩৪৫৬৭৮\n⭐ রেটিং: ৪.৮/৫\n⏰ রেসপন্স টাইম: ১০-১৫ মিনিট\n💰 মূল্য: ৫০০-২০০০ টাকা\n\n🚐 রেড ক্রিসেন্ট এম্বুলেন্স\n📞 ০১৮৮৭৬৫৪৩২১\n⭐ রেটিং: ৪.৯/৫\n⏰ রেসপন্স টাইম: ৮-১২ মিনিট\n💰 মূল্য: ৪০০-১৮০০ টাকা\n\nজরুরি অবস্থায় ৯৯৯ নম্বরে কল করুন।`;
        } else if (lowerMessage.includes('চট্টগ্রাম')) {
          response = `চট্টগ্রামে এম্বুলেন্স সেবা:\n\n🚐 চট্টগ্রাম মেডিকেল এম্বুলেন্স\n📞 ০১৯৯৮৮৭৭৬৬৫\n⭐ রেটিং: ৪.৬/৫\n⏰ রেসপন্স টাইম: ১৫-২০ মিনিট\n💰 মূল্য: ৬০০-১২০০ টাকা\n\nজরুরি অবস্থায় ৯৯৯ নম্বরে কল করুন।`;
        } else {
          response = `আপনার এলাকার এম্বুলেন্স সেবা খুঁজে দিচ্ছি...\n\n🚨 জরুরি নম্বর: ৯৯৯\n🏥 স্বাস্থ্য বাতায়ন: ১৬২৬৩\n\nনিচের তালিকা থেকে আপনার এলাকার এম্বুলেন্স সেবা দেখুন। আপনি চাইলে আপনার লোকেশন শেয়ার করতে পারেন নিকটস্থ সেবা পেতে।`;
        }
      } else {
        // Use Gemini API for other queries
        response = await generateHealthResponse(userMessage, 'general-health');
      }
      
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
          generateResponse('আমি একটি ভয়েস মেসেজ পাঠিয়েছি। এম্বুলেন্স সেবা সম্পর্কে পরামর্শ দিন।');
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
    
    const locationText = `🚨 জরুরি এম্বুলেন্স প্রয়োজন!\n📍 আমার অবস্থান: ${userLocation.address}\n🌐 Google Maps: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}\n\nদয়া করে এম্বুলেন্স পাঠান!`;
    
    setShareMessage(locationText);
    setLocationShared(true);
    
    navigator.clipboard.writeText(locationText).then(() => {
      if (navigator.share) {
        navigator.share({
          title: 'জরুরি এম্বুলেন্স প্রয়োজন',
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

  const handleBookingSubmit = () => {
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.address || !bookingForm.ambulanceType) {
      alert('সব প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    setBookingSubmitted(true);
    setShowBookingForm(false);
    
    // Reset form
    setBookingForm({
      name: '',
      phone: '',
      address: '',
      ambulanceType: '',
      patientCondition: '',
      urgency: 'জরুরি',
      notes: ''
    });
  };

  const submitFeedback = (rating: number, comment: string) => {
    setFeedback({ rating, comment });
    alert('ধন্যবাদ! আপনার ফিডব্যাক গ্রহণ করা হয়েছে।');
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
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white mb-6 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Truck className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">AmbulanceBot</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            জরুরি অবস্থায় তাৎক্ষণিক এম্বুলেন্স সেবা খুঁজে পান। AI সহায়তা ও লাইভ লোকেশন শেয়ার করুন।
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Auto Location Share Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 rounded-3xl shadow-xl p-8 border border-red-200"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MapPin className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-red-800 mb-2">জরুরি লোকেশন শেয়ার</h2>
                <p className="text-red-600">তাৎক্ষণিক এম্বুলেন্স সেবার জন্য আপনার অবস্থান শেয়ার করুন</p>
              </div>
              
              {!userLocation ? (
                <div className="text-center">
                  <motion.button
                    onClick={getCurrentLocation}
                    disabled={isGettingLocation}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center space-x-3 mx-auto"
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
                        <span>🆘 জরুরি লোকেশন শেয়ার</span>
                      </>
                    )}
                  </motion.button>
                  <p className="text-red-600 text-sm mt-4">
                    আপনার বর্তমান অবস্থান পেতে "Allow" বাটনে ক্লিক করুন
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-red-200">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <CheckCircle className="w-6 h-6" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-bold text-red-800 mb-2">আপনার বর্তমান অবস্থান:</h3>
                        <p className="text-red-700 mb-2">{userLocation.address}</p>
                        <p className="text-red-600 text-sm">
                          Latitude: {userLocation.lat.toFixed(6)}, Longitude: {userLocation.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>

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

                    <motion.a
                      href={`https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MapPin className="w-5 h-5" />
                      <span>Google Maps এ দেখুন</span>
                    </motion.a>
                  </div>

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
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Search className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">এম্বুলেন্স সেবা খুঁজুন</h2>
                <p className="text-gray-600">আপনার এলাকার এম্বুলেন্স সেবা খুঁজে নিন</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="এলাকার নাম বা সেবার নাম লিখুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">সব জেলা</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </motion.div>

            {/* Ambulance Services Directory */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">এম্বুলেন্স সেবা ডিরেক্টরি</h2>
                  <p className="text-gray-600 text-sm">আপনার এলাকার এম্বুলেন্স সেবা</p>
                </div>
                <motion.button
                  onClick={() => setShowAddAmbulanceModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-xl font-medium text-sm hover:shadow-lg transition-all flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  <span>এম্বুলেন্স যোগ করুন</span>
                </motion.button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200 hover:shadow-md transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-gray-800 mb-1">{service.name}</h3>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            {service.types[0]}
                          </span>
                          {service.available24x7 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              ২৪/৭
                            </span>
                          )}
                        </div>
                      </div>
                      {service.verified && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1 text-xs mb-3">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-3 h-3 mr-1 text-red-500" />
                        <span>{service.area}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-3 h-3 mr-1 text-green-500" />
                        <span>{service.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="w-3 h-3 mr-1 text-blue-500" />
                        <span>{service.price}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-3 h-3 mr-1 text-purple-500" />
                        <span>{service.responseTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <motion.a
                        href={`tel:${service.phone}`}
                        className="flex-1 bg-green-500 text-white py-1 px-2 rounded-lg font-medium text-xs hover:bg-green-600 transition-all text-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        কল করুন
                      </motion.a>
                      <motion.button
                        className="flex-1 bg-blue-500 text-white py-1 px-2 rounded-lg font-medium text-xs hover:bg-blue-600 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        বুক করুন
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Ambulance Types */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">এম্বুলেন্সের ধরন</h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                {ambulanceTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`text-center bg-gradient-to-br ${type.color} rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300`}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="text-2xl mb-2">
                      {type.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">{type.type}</h3>
                    <p className="text-gray-600 text-xs mb-2">{type.description}</p>
                    <div className="bg-white/60 rounded-lg p-2">
                      <p className="text-gray-700 font-medium text-xs">{type.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Emergency Tips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-yellow-50 rounded-2xl shadow-lg p-6 border border-yellow-200"
            >
              <h2 className="text-xl font-bold text-yellow-800 mb-4">জরুরি টিপস</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {emergencyTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-yellow-200"
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${tip.color} rounded-lg flex items-center justify-center text-white mb-3 shadow-md`}>
                      <tip.icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-yellow-800 mb-3 text-sm">{tip.title}</h3>
                    <div className="space-y-1">
                      {tip.tips.map((item, i) => (
                        <div key={i} className="text-yellow-700 text-xs flex items-center">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Video Guides */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-purple-50 rounded-2xl shadow-lg p-6 border border-purple-200"
            >
              <h2 className="text-xl font-bold text-purple-800 mb-4">ভিডিও গাইড</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {videoGuides.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white/60 rounded-xl p-4 backdrop-blur-sm border border-purple-200 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="relative bg-gray-200 rounded-lg mb-3 h-20 flex items-center justify-center">
                      <motion.div
                        className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="w-5 h-5 ml-1" />
                      </motion.div>
                    </div>
                    <h3 className="font-bold text-purple-800 mb-2 text-sm">{video.title}</h3>
                    <p className="text-purple-600 text-xs mb-2">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-500 font-medium text-xs">{video.duration}</span>
                      <motion.button
                        className="bg-purple-500 text-white px-3 py-1 rounded-lg font-medium text-xs hover:bg-purple-600 transition-all flex items-center space-x-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-3 h-3" />
                        <span>দেখুন</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - AmbulanceBot Chat */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8 space-y-6"
            >
              {/* AmbulanceBot Chat */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[600px]">
                <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-yellow-400/20 animate-pulse" />
                  
                  <div className="relative flex items-center space-x-4">
                    <motion.div
                      className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl"
                      whileHover={{ scale: 1.15, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Truck className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">AmbulanceBot</h3>
                      <p className="text-red-100 text-sm">এম্বুলেন্স সেবা সহায়ক</p>
                    </div>
                  </div>
                </div>

                <div className="h-[350px] overflow-y-auto space-y-4 p-4 bg-gradient-to-br from-gray-50 to-red-50">
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
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${
                            message.sender === 'user' 
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                              : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                            }`}
                            whileHover={{ scale: 1.1 }}
                          >
                            {message.sender === 'user' ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <Bot className="w-4 h-4" />
                            )}
                          </motion.div>

                          <motion.div 
                            className={`rounded-2xl p-3 shadow-lg backdrop-blur-sm ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                              : 'bg-white/80 text-gray-800 border border-gray-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            <p className="text-xs leading-relaxed whitespace-pre-line">{message.text}</p>
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

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white/80 rounded-2xl p-3 shadow-lg backdrop-blur-sm border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-3 h-3 animate-spin text-red-500" />
                            <span className="text-xs text-gray-600">উত্তর তৈরি করছি...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-gray-200 p-4 bg-white">
                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-3 flex items-center justify-center space-x-2 text-red-500 bg-red-50 rounded-xl p-2"
                    >
                      <motion.div 
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      />
                      <span className="text-xs font-medium">রেকর্ড করছি... {formatTime(recordingTime)}</span>
                    </motion.div>
                  )}

                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="এম্বুলেন্স সেবা সম্পর্কে প্রশ্ন করুন..."
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                        disabled={isLoading}
                      />
                    </div>

                    <motion.button
                      className={`p-2 rounded-xl transition-colors ${
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
                      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </motion.button>

                    <motion.button
                      className="p-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-50 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Emergency Call Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="tel:999"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-6 rounded-3xl font-bold text-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-3 block"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="w-8 h-8" />
                  <span>🆘 জরুরি কল (৯৯৯)</span>
                </motion.a>
              </motion.div>

              {/* Quick Booking Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Calendar className="w-5 h-5" />
                  <span>এম্বুলেন্স বুক করুন</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Add Ambulance Modal */}
        <AnimatePresence>
          {showAddAmbulanceModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowAddAmbulanceModal(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-green-400/20 animate-pulse" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Truck className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">এম্বুলেন্স সেবা যোগ করুন</h3>
                        <p className="text-blue-100 text-lg">নতুন এম্বুলেন্স সেবা নিবন্ধন করুন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowAddAmbulanceModal(false)}
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
                    {/* Service Information */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">সেবার তথ্য</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">সেবার নাম *</label>
                        <input
                          type="text"
                          value={newAmbulance.name}
                          onChange={(e) => setNewAmbulance(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="যেমন: ঢাকা এম্বুলেন্স সেবা"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">ফোন নম্বর *</label>
                        <input
                          type="tel"
                          value={newAmbulance.phone}
                          onChange={(e) => setNewAmbulance(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="০১৭xxxxxxxx"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">এলাকা *</label>
                        <input
                          type="text"
                          value={newAmbulance.area}
                          onChange={(e) => setNewAmbulance(prev => ({ ...prev, area: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="যেমন: ঢাকা, চট্টগ্রাম"
                        />
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">সেবার বিবরণ</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">এম্বুলেন্সের ধরন *</label>
                        <select
                          value={newAmbulance.type}
                          onChange={(e) => setNewAmbulance(prev => ({ ...prev, type: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                        >
                          <option value="Regular">Regular Ambulance</option>
                          <option value="AC">AC Ambulance</option>
                          <option value="ICU">ICU/CCU Ambulance</option>
                          <option value="Freezer">Dead Body Freezer Van</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">মূল্য *</label>
                        <input
                          type="text"
                          value={newAmbulance.price}
                          onChange={(e) => setNewAmbulance(prev => ({ ...prev, price: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="যেমন: ৫০০-১০০০ টাকা"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">রেসপন্স টাইম</label>
                        <input
                          type="text"
                          value={newAmbulance.responseTime}
                          onChange={(e) => setNewAmbulance(prev => ({ ...prev, responseTime: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="যেমন: ১৫-২০ মিনিট"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="available24"
                          checked={newAmbulance.available24}
                          onChange={(e) => setNewAmbulance(prev => ({ ...prev, available24: e.target.checked }))}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="available24" className="ml-3 text-lg font-medium text-gray-700">
                          ২৪/৭ উপলব্ধ
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowAddAmbulanceModal(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleSubmitAmbulance}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CheckCircle className="w-6 h-6" />
                      <span>এম্বুলেন্স যোগ করুন</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Booking Form Modal */}
        <AnimatePresence>
          {showBookingForm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowBookingForm(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 relative overflow-hidden">
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Calendar className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold">এম্বুলেন্স বুকিং</h3>
                        <p className="text-blue-100">আগে থেকে এম্বুলেন্স বুক করুন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowBookingForm(false)}
                      className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-gray-800">ব্যক্তিগত তথ্য</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">নাম *</label>
                        <input
                          type="text"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="আপনার পূর্ণ নাম"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">মোবাইল নম্বর *</label>
                        <input
                          type="tel"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="০১৭xxxxxxxx"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ঠিকানা *</label>
                        <textarea
                          value={bookingForm.address}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                          placeholder="বিস্তারিত ঠিকানা লিখুন"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-gray-800">সেবার তথ্য</h4>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">এম্বুলেন্সের ধরন *</label>
                        <select
                          value={bookingForm.ambulanceType}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, ambulanceType: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">নির্বাচন করুন</option>
                          {ambulanceTypes.map(type => (
                            <option key={type.type} value={type.type}>{type.type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">জরুরি অবস্থা</label>
                        <select
                          value={bookingForm.urgency}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, urgency: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="জরুরি">জরুরি</option>
                          <option value="অতি জরুরি">অতি জরুরি</option>
                          <option value="পরিকল্পিত">পরিকল্পিত</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">রোগীর অবস্থা</label>
                        <input
                          type="text"
                          value={bookingForm.patientCondition}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, patientCondition: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="যেমন: হার্ট অ্যাটাক, দুর্ঘটনা"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">অতিরিক্ত তথ্য</label>
                        <textarea
                          value={bookingForm.notes}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
                          placeholder="অন্য কোন বিশেষ তথ্য"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowBookingForm(false)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleBookingSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>বুকিং নিশ্চিত করুন</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Booking Success Modal */}
        <AnimatePresence>
          {bookingSubmitted && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setBookingSubmitted(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-4 md:inset-1/4 bg-white rounded-3xl shadow-2xl z-50 flex items-center justify-center"
              >
                <div className="text-center p-8">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: 3, duration: 0.5 }}
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-800 mb-4">বুকিং সফল!</h3>
                  <p className="text-green-600 text-lg mb-6">
                    আপনার এম্বুলেন্স বুকিং সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                  </p>
                  <motion.button
                    onClick={() => setBookingSubmitted(false)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ধন্যবাদ
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AmbulancePage;