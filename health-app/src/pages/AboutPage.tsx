import React from 'react';
import { Heart, Users, Award, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About HealthCare BD</h1>
          <p className="text-xl text-gray-600">
            Dedicated to improving healthcare accessibility across Bangladesh
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center mb-6">
            <Heart className="h-8 w-8 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            HealthCare BD is committed to revolutionizing healthcare accessibility in Bangladesh. 
            We strive to bridge the gap between patients and healthcare providers by offering 
            comprehensive digital health solutions that are accessible, affordable, and reliable.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">10,000+</div>
            <div className="text-gray-600">Registered Doctors</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6 text-center">
            <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">50,000+</div>
            <div className="text-gray-600">Patients Served</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">64</div>
            <div className="text-gray-600">Districts Covered</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-6 text-center">
            <Globe className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Doctor Consultation</h3>
              <p className="text-gray-600">Connect with qualified doctors for online and offline consultations.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Medicine Delivery</h3>
              <p className="text-gray-600">Order medicines online and get them delivered to your doorstep.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Health Information</h3>
              <p className="text-gray-600">Access reliable health information and disease prevention tips.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Services</h3>
              <p className="text-gray-600">Quick access to emergency healthcare services and ambulance booking.</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Team</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Our team consists of experienced healthcare professionals, technology experts, and 
            passionate individuals who are committed to making healthcare accessible to everyone 
            in Bangladesh. We work tirelessly to ensure that our platform provides the best 
            possible experience for both patients and healthcare providers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-900">Dr. Rahman Ahmed</h3>
              <p className="text-gray-600">Chief Medical Officer</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-900">Fatima Khan</h3>
              <p className="text-gray-600">Head of Technology</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-gray-900">Mohammad Ali</h3>
              <p className="text-gray-600">Operations Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;