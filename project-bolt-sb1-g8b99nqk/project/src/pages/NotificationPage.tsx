import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, Pill, Calendar, Upload, FileText, Plus, X, Check, AlertCircle, Volume2, VolumeX, Settings, Trash2, Edit, User } from 'lucide-react';

interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  medicines: Medicine[];
  uploadDate: Date;
  nextVisit?: Date;
}

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timing: string[];
  duration: number;
  instructions: string;
  startDate: Date;
}

interface Notification {
  id: string;
  type: 'medicine' | 'doctor_visit' | 'test_reminder';
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
  prescriptionId?: string;
  medicineId?: string;
}

const NotificationPage: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      patientName: 'রহিমা খাতুন',
      doctorName: 'ডাঃ মোহাম্মদ রহিম',
      uploadDate: new Date('2025-01-25'),
      nextVisit: new Date('2025-02-01'),
      medicines: [
        {
          id: '1',
          name: 'প্যারাসিটামল',
          dosage: '৫০০মিগ্রা',
          frequency: 'দিনে ৩ বার',
          timing: ['08:00', '14:00', '20:00'],
          duration: 7,
          instructions: 'খাবারের পর',
          startDate: new Date('2025-01-25')
        },
        {
          id: '2',
          name: 'অ্যামোক্সিসিলিন',
          dosage: '২৫০মিগ্রা',
          frequency: 'দিনে ২ বার',
          timing: ['09:00', '21:00'],
          duration: 5,
          instructions: 'খাবারের আগে',
          startDate: new Date('2025-01-25')
        }
      ]
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'medicine',
      title: 'ওষুধ খাওয়ার সময়',
      message: 'প্যারাসিটামল ৫০০মিগ্রা খাওয়ার সময় হয়েছে',
      time: new Date(),
      isRead: false,
      prescriptionId: '1',
      medicineId: '1'
    }
  ]);

  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [newPrescription, setNewPrescription] = useState({
    patientName: '',
    doctorName: '',
    prescriptionText: '',
    nextVisit: ''
  });

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Generate notifications for medicines
  useEffect(() => {
    const generateNotifications = () => {
      const now = new Date();
      const newNotifications: Notification[] = [];

      prescriptions.forEach(prescription => {
        prescription.medicines.forEach(medicine => {
          medicine.timing.forEach(time => {
            const [hours, minutes] = time.split(':').map(Number);
            const medicineTime = new Date();
            medicineTime.setHours(hours, minutes, 0, 0);

            // Check if it's time for medicine (within 5 minutes)
            const timeDiff = Math.abs(now.getTime() - medicineTime.getTime());
            if (timeDiff <= 5 * 60 * 1000) { // 5 minutes
              const notification: Notification = {
                id: `${prescription.id}-${medicine.id}-${time}`,
                type: 'medicine',
                title: 'ওষুধ খাওয়ার সময়',
                message: `${medicine.name} ${medicine.dosage} খাওয়ার সময় হয়েছে`,
                time: medicineTime,
                isRead: false,
                prescriptionId: prescription.id,
                medicineId: medicine.id
              };
              newNotifications.push(notification);
            }
          });
        });

        // Doctor visit reminder
        if (prescription.nextVisit) {
          const visitDate = new Date(prescription.nextVisit);
          const daysBefore = Math.ceil((visitDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysBefore <= 1 && daysBefore >= 0) {
            const notification: Notification = {
              id: `visit-${prescription.id}`,
              type: 'doctor_visit',
              title: 'ডাক্তার দেখানোর সময়',
              message: `আগামীকাল ডাঃ ${prescription.doctorName} এর সাথে অ্যাপয়েন্টমেন্ট`,
              time: visitDate,
              isRead: false,
              prescriptionId: prescription.id
            };
            newNotifications.push(notification);
          }
        }
      });

      if (newNotifications.length > 0) {
        setNotifications(prev => [...newNotifications, ...prev]);
        
        // Show browser notification
        if (isNotificationEnabled && 'Notification' in window && Notification.permission === 'granted') {
          newNotifications.forEach(notification => {
            new Notification(notification.title, {
              body: notification.message,
              icon: '/favicon.ico'
            });
          });
        }
      }
    };

    const interval = setInterval(generateNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [prescriptions, isNotificationEnabled]);

  const parsePrescription = (text: string): Medicine[] => {
    const medicines: Medicine[] = [];
    const lines = text.split('\n');
    
    lines.forEach((line, index) => {
      if (line.toLowerCase().includes('প্যারাসিটামল') || 
          line.toLowerCase().includes('paracetamol') ||
          line.toLowerCase().includes('অ্যামোক্সিসিলিন') ||
          line.toLowerCase().includes('amoxicillin')) {
        
        const medicine: Medicine = {
          id: (index + 1).toString(),
          name: line.includes('প্যারাসিটামল') ? 'প্যারাসিটামল' : 
                line.includes('অ্যামোক্সিসিলিন') ? 'অ্যামোক্সিসিলিন' : 'ওষুধ',
          dosage: '৫০০মিগ্রা',
          frequency: 'দিনে ৩ বার',
          timing: ['08:00', '14:00', '20:00'],
          duration: 7,
          instructions: 'খাবারের পর',
          startDate: new Date()
        };
        medicines.push(medicine);
      }
    });

    return medicines.length > 0 ? medicines : [
      {
        id: '1',
        name: 'নির্ধারিত ওষুধ',
        dosage: 'নির্দেশ অনুযায়ী',
        frequency: 'দিনে ৩ বার',
        timing: ['08:00', '14:00', '20:00'],
        duration: 7,
        instructions: 'ডাক্তারের পরামর্শ অনুযায়ী',
        startDate: new Date()
      }
    ];
  };

  const handleAddPrescription = () => {
    if (!newPrescription.patientName || !newPrescription.prescriptionText) {
      alert('সব প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    const medicines = parsePrescription(newPrescription.prescriptionText);
    
    const prescription: Prescription = {
      id: (prescriptions.length + 1).toString(),
      patientName: newPrescription.patientName,
      doctorName: newPrescription.doctorName || 'ডাক্তার',
      medicines: medicines,
      uploadDate: new Date(),
      nextVisit: newPrescription.nextVisit ? new Date(newPrescription.nextVisit) : undefined
    };

    setPrescriptions(prev => [prescription, ...prev]);
    setNewPrescription({
      patientName: '',
      doctorName: '',
      prescriptionText: '',
      nextVisit: ''
    });
    setShowAddPrescription(false);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medicine':
        return <Pill className="w-5 h-5" />;
      case 'doctor_visit':
        return <User className="w-5 h-5" />;
      case 'test_reminder':
        return <FileText className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-6 shadow-2xl relative"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Bell className="w-12 h-12" />
            {unreadCount > 0 && (
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {unreadCount}
              </motion.div>
            )}
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Notification System</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            ওষুধ খাওয়ার সময় এবং ডাক্তার দেখানোর রিমাইন্ডার সিস্টেম
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Prescriptions & Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Settings className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">নোটিফিকেশন সেটিংস</h2>
                    <p className="text-gray-600">আপনার রিমাইন্ডার কাস্টমাইজ করুন</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setIsNotificationEnabled(!isNotificationEnabled)}
                  className={`flex items-center space-x-3 px-6 py-3 rounded-2xl font-bold transition-all ${
                    isNotificationEnabled 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isNotificationEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  <span>{isNotificationEnabled ? 'চালু' : 'বন্ধ'}</span>
                </motion.button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-200">
                  <motion.div
                    className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Pill className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-bold text-blue-800 mb-2">ওষুধ রিমাইন্ডার</h3>
                  <p className="text-blue-600 text-sm">সময়মতো ওষুধ খাওয়ার জন্য</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-200">
                  <motion.div
                    className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <User className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-bold text-green-800 mb-2">ডাক্তার ভিজিট</h3>
                  <p className="text-green-600 text-sm">অ্যাপয়েন্টমেন্ট রিমাইন্ডার</p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-200">
                  <motion.div
                    className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <FileText className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-bold text-purple-800 mb-2">টেস্ট রিমাইন্ডার</h3>
                  <p className="text-purple-600 text-sm">পরীক্ষার জন্য রিমাইন্ডার</p>
                </div>
              </div>
            </motion.div>

            {/* Add Prescription Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Upload className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">প্রেসক্রিপশন যোগ করুন</h2>
                    <p className="text-blue-100 text-lg">অটো রিমাইন্ডার সেট করতে প্রেসক্রিপশন আপলোড করুন</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => setShowAddPrescription(true)}
                  className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-3"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-6 h-6" />
                  <span>যোগ করুন</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Prescriptions List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-teal-500 to-green-500 text-white mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <FileText className="w-8 h-8" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">আপনার প্রেসক্রিপশন</h2>
                <p className="text-gray-600">সংরক্ষিত প্রেসক্রিপশন ও ওষুধের তালিকা</p>
              </div>

              {prescriptions.length === 0 ? (
                <div className="text-center py-12">
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FileText className="w-10 h-10" />
                  </motion.div>
                  <p className="text-gray-500 text-lg">কোন প্রেসক্রিপশন নেই</p>
                  <p className="text-gray-400 text-sm mt-2">প্রেসক্রিপশন যোগ করে রিমাইন্ডার সেট করুন</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {prescriptions.map((prescription, index) => (
                    <motion.div
                      key={prescription.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl p-6 border border-teal-200 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{prescription.patientName}</h3>
                          <p className="text-teal-600 font-medium">ডাক্তার: {prescription.doctorName}</p>
                          <p className="text-gray-500 text-sm">
                            আপলোড: {prescription.uploadDate.toLocaleDateString('bn-BD')}
                          </p>
                        </div>
                        
                        {prescription.nextVisit && (
                          <div className="text-right">
                            <p className="text-sm text-gray-600">পরবর্তী ভিজিট:</p>
                            <p className="font-bold text-purple-600">
                              {prescription.nextVisit.toLocaleDateString('bn-BD')}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-bold text-gray-700 mb-2">ওষুধের তালিকা:</h4>
                        {prescription.medicines.map((medicine, i) => (
                          <div key={medicine.id} className="bg-white/60 rounded-xl p-4 border border-teal-200">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-bold text-gray-800">{medicine.name}</h5>
                              <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                                {medicine.frequency}
                              </span>
                            </div>
                            <div className="grid md:grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">মাত্রা: </span>
                                <span className="font-medium">{medicine.dosage}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">সময়: </span>
                                <span className="font-medium">{medicine.timing.join(', ')}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">নির্দেশনা: </span>
                                <span className="font-medium">{medicine.instructions}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Live Notifications */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[700px]">
                {/* Notifications Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-pink-400/20 animate-pulse" />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg relative"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Bell className="w-8 h-8" />
                        {unreadCount > 0 && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            {unreadCount}
                          </motion.div>
                        )}
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold">লাইভ নোটিফিকেশন</h3>
                        <p className="text-blue-100">রিয়েল টাইম রিমাইন্ডার</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50">
                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 text-gray-400 mb-4"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Bell className="w-10 h-10" />
                      </motion.div>
                      <p className="text-gray-500 text-lg">কোন নোটিফিকেশন নেই</p>
                      <p className="text-gray-400 text-sm mt-2">প্রেসক্রিপশন যোগ করলে রিমাইন্ডার পাবেন</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: 20, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -20, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className={`rounded-2xl p-4 shadow-lg border transition-all duration-300 ${
                            notification.isRead 
                              ? 'bg-gray-50 border-gray-200' 
                              : 'bg-white border-blue-200 shadow-xl'
                          }`}
                          whileHover={{ scale: 1.02, y: -2 }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <motion.div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                                  notification.type === 'medicine' 
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                                    : notification.type === 'doctor_visit'
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                    : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                                }`}
                                whileHover={{ rotate: 10, scale: 1.1 }}
                              >
                                {getNotificationIcon(notification.type)}
                              </motion.div>
                              <div className="flex-1">
                                <h4 className={`font-bold ${notification.isRead ? 'text-gray-600' : 'text-gray-800'}`}>
                                  {notification.title}
                                </h4>
                                <p className={`text-sm ${notification.isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <motion.button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Check className="w-4 h-4" />
                                </motion.button>
                              )}
                              <motion.button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-gray-500 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {notification.time.toLocaleTimeString('bn-BD', { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                            
                            {!notification.isRead && (
                              <motion.div
                                className="w-2 h-2 bg-blue-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                              />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="border-t border-gray-200 p-6 bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    <motion.button
                      onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
                      className="bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-all text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      সব পড়া হয়েছে
                    </motion.button>
                    <motion.button
                      onClick={() => setNotifications([])}
                      className="bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-all text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      সব মুছে দিন
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Add Prescription Modal */}
        <AnimatePresence>
          {showAddPrescription && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowAddPrescription(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Upload className="w-8 h-8" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold">প্রেসক্রিপশন যোগ করুন</h3>
                        <p className="text-blue-100 text-lg">অটো রিমাইন্ডার সেট করুন</p>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setShowAddPrescription(false)}
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
                          value={newPrescription.patientName}
                          onChange={(e) => setNewPrescription(prev => ({ ...prev, patientName: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="রোগীর পূর্ণ নাম"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">ডাক্তারের নাম</label>
                        <input
                          type="text"
                          value={newPrescription.doctorName}
                          onChange={(e) => setNewPrescription(prev => ({ ...prev, doctorName: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                          placeholder="ডাক্তারের নাম (ঐচ্ছিক)"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">পরবর্তী ভিজিট</label>
                        <input
                          type="date"
                          value={newPrescription.nextVisit}
                          onChange={(e) => setNewPrescription(prev => ({ ...prev, nextVisit: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Prescription Details */}
                    <div className="space-y-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-4">প্রেসক্রিপশন বিবরণ</h4>
                      
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">প্রেসক্রিপশন টেক্সট *</label>
                        <textarea
                          value={newPrescription.prescriptionText}
                          onChange={(e) => setNewPrescription(prev => ({ ...prev, prescriptionText: e.target.value }))}
                          rows={8}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 resize-none"
                          placeholder="প্রেসক্রিপশনের সম্পূর্ণ টেক্সট এখানে লিখুন বা পেস্ট করুন..."
                        />
                      </div>

                      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
                        <h5 className="font-bold text-blue-800 mb-2">উদাহরণ:</h5>
                        <div className="text-blue-700 text-sm space-y-1">
                          <p>• প্যারাসিটামল ৫০০মিগ্রা - দিনে ৩ বার</p>
                          <p>• অ্যামোক্সিসিলিন ২৫০মিগ্রা - দিনে ২ বার</p>
                          <p>• খাবারের পর সেবন করুন</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8 flex justify-end space-x-4">
                    <motion.button
                      onClick={() => setShowAddPrescription(false)}
                      className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      বাতিল
                    </motion.button>
                    <motion.button
                      onClick={handleAddPrescription}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Check className="w-6 h-6" />
                      <span>রিমাইন্ডার সেট করুন</span>
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

export default NotificationPage;