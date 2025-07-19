import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Pill, Activity, Droplets, Baby, Calendar, Shield, Zap, Truck, AlertTriangle, Bell, MessageSquare, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const services = [
    {
      icon: Stethoscope,
      title: 'Find Doctor',
      description: 'Find qualified doctors near you',
      path: '/find-doctor',
      color: 'bg-blue-500'
    },
    {
      icon: Pill,
      title: 'Medicine',
      description: 'Search for medicines and pharmacies',
      path: '/medicine',
      color: 'bg-green-500'
    },
    {
      icon: Activity,
      title: 'Health & Disease',
      description: 'Learn about health conditions',
      path: '/health-disease',
      color: 'bg-purple-500'
    },
    {
      icon: Droplets,
      title: 'Blood Donation',
      description: 'Find blood donors and donation centers',
      path: '/blood-donation',
      color: 'bg-red-500'
    },
    {
      icon: Baby,
      title: 'Child Health',
      description: 'Healthcare for children',
      path: '/child-health',
      color: 'bg-pink-500'
    },
    {
      icon: Calendar,
      title: 'Period Support',
      description: 'Menstrual health support',
      path: '/period-support',
      color: 'bg-indigo-500'
    },
    {
      icon: Shield,
      title: 'Abortion Support',
      description: 'Safe abortion information',
      path: '/abortion-support',
      color: 'bg-orange-500'
    },
    {
      icon: Zap,
      title: 'Animal Bite',
      description: 'Emergency animal bite treatment',
      path: '/animal-bite',
      color: 'bg-yellow-500'
    },
    {
      icon: Truck,
      title: 'Animal Treatment',
      description: 'Veterinary services',
      path: '/animal-treatment',
      color: 'bg-teal-500'
    },
    {
      icon: AlertTriangle,
      title: 'Disaster Support',
      description: 'Emergency disaster healthcare',
      path: '/disaster-support',
      color: 'bg-red-600'
    },
    {
      icon: Bell,
      title: 'Health Alert',
      description: 'Important health notifications',
      path: '/health-alert',
      color: 'bg-amber-500'
    },
    {
      icon: MessageSquare,
      title: 'Feedback',
      description: 'Share your feedback with us',
      path: '/feedback',
      color: 'bg-gray-500'
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mb-12 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          HealthCare BD
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          Your Complete Healthcare Solution in Bangladesh
        </p>
        <Link
          to="/find-doctor"
          className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Services Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={service.path}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border hover:border-blue-200"
              >
                <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Emergency Section */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">999</div>
            <div className="text-red-800">National Emergency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">16263</div>
            <div className="text-red-800">Health Line</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">333</div>
            <div className="text-red-800">Fire Service</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Expert Doctors</h3>
          <p className="text-gray-600">Connect with qualified healthcare professionals across Bangladesh</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Round-the-clock healthcare assistance and emergency support</p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Trusted Care</h3>
          <p className="text-gray-600">Reliable and comprehensive healthcare information and services</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;