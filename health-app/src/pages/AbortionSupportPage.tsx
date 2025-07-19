import React, { useState } from 'react';
import { Shield, Heart, Phone, MapPin, Clock, AlertTriangle, Lock, Book } from 'lucide-react';

const AbortionSupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'information' | 'support' | 'legal' | 'aftercare'>('information');

  const supportServices = [
    {
      name: 'Marie Stopes Bangladesh',
      type: 'Healthcare Provider',
      phone: '+880-2-8833388',
      address: 'House 7, Road 2, Dhanmondi, Dhaka',
      services: ['Safe abortion', 'Counseling', 'Contraception'],
      hours: '9:00 AM - 5:00 PM'
    },
    {
      name: 'BAPSA (Bangladesh Association for Prevention of Septic Abortion)',
      type: 'Support Organization',
      phone: '+880-2-9661265',
      address: 'Dhaka Medical College Area, Dhaka',
      services: ['Information', 'Referrals', 'Support'],
      hours: '24/7 Helpline'
    },
    {
      name: 'Family Planning Association of Bangladesh',
      type: 'Healthcare Provider',
      phone: '+880-2-9116688',
      address: 'Multiple locations across Bangladesh',
      services: ['Family planning', 'Safe abortion', 'Counseling'],
      hours: 'Varies by location'
    }
  ];

  const legalInformation = [
    {
      title: 'Legal Status in Bangladesh',
      content: 'Abortion is legal in Bangladesh under specific circumstances as per the Penal Code and medical guidelines.'
    },
    {
      title: 'Permitted Circumstances',
      content: 'Abortion is permitted to save the life of the mother, protect physical and mental health, and in cases of rape or incest.'
    },
    {
      title: 'Time Limits',
      content: 'Medical abortion is generally permitted up to 12 weeks of pregnancy, with exceptions for maternal health risks.'
    },
    {
      title: 'Provider Requirements',
      content: 'Procedures must be performed by qualified medical professionals in licensed healthcare facilities.'
    }
  ];

  const aftercareGuidelines = [
    {
      category: 'Physical Care',
      items: [
        'Rest for 24-48 hours after the procedure',
        'Avoid heavy lifting for 1-2 weeks',
        'Take prescribed medications as directed',
        'Monitor for signs of infection or complications'
      ]
    },
    {
      category: 'Emotional Support',
      items: [
        'Allow yourself to process emotions',
        'Seek counseling if needed',
        'Connect with support groups',
        'Talk to trusted friends or family'
      ]
    },
    {
      category: 'Follow-up Care',
      items: [
        'Attend scheduled follow-up appointments',
        'Discuss contraception options',
        'Monitor menstrual cycle return',
        'Address any concerns with healthcare provider'
      ]
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Abortion Support & Information</h1>
          <p className="text-xl text-gray-600">
            Confidential, non-judgmental support and accurate information
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Lock className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-800">Privacy & Confidentiality</h3>
          </div>
          <p className="text-blue-700">
            All information and services are provided with complete confidentiality. 
            Your privacy is protected, and you have the right to make informed decisions about your healthcare.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('information')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'information'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Book className="h-4 w-4 inline mr-2" />
            Information
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'support'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            Support Services
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'legal'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield className="h-4 w-4 inline mr-2" />
            Legal Information
          </button>
          <button
            onClick={() => setActiveTab('aftercare')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'aftercare'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            Aftercare
          </button>
        </div>

        {/* Content */}
        {activeTab === 'information' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Safe Abortion Information</h2>
              <p className="text-gray-600 mb-6">
                Access to safe, legal abortion is a fundamental healthcare right. Here's what you need to know.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Medical Abortion</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>What it is:</strong> Uses medication to end a pregnancy, typically effective up to 10 weeks.
                  </p>
                  <p className="text-gray-700">
                    <strong>Process:</strong> Usually involves taking two different medications 24-48 hours apart.
                  </p>
                  <p className="text-gray-700">
                    <strong>Effectiveness:</strong> 95-98% effective when used correctly.
                  </p>
                  <p className="text-gray-700">
                    <strong>Recovery:</strong> Most people return to normal activities within a few days.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Surgical Abortion</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>What it is:</strong> A minor surgical procedure performed in a healthcare facility.
                  </p>
                  <p className="text-gray-700">
                    <strong>Process:</strong> Usually takes 5-10 minutes and can be done with local anesthesia.
                  </p>
                  <p className="text-gray-700">
                    <strong>Effectiveness:</strong> Over 99% effective.
                  </p>
                  <p className="text-gray-700">
                    <strong>Recovery:</strong> Most people can resume normal activities the next day.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-yellow-800">Important Safety Information</h3>
              </div>
              <ul className="text-yellow-700 space-y-2">
                <li>• Always seek care from qualified healthcare providers</li>
                <li>• Avoid unsafe or illegal procedures</li>
                <li>• Be aware of warning signs that require immediate medical attention</li>
                <li>• Follow all pre and post-procedure instructions</li>
              </ul>
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Contraception Counseling</h3>
              <p className="text-green-700 mb-4">
                After an abortion, it's important to discuss contraception options to prevent unintended pregnancy. 
                Healthcare providers can help you choose the best method for your needs and lifestyle.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Learn About Contraception
              </button>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Support Services</h2>
              <p className="text-gray-600 mb-6">
                Find trusted healthcare providers and support organizations in Bangladesh.
              </p>
            </div>

            <div className="space-y-6">
              {supportServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="mb-4 md:mb-0 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{service.type}</p>
                      
                      <div className="space-y-2 text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{service.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{service.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{service.hours}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.services.map((serviceItem, serviceIndex) => (
                            <span key={serviceIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {serviceItem}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 md:ml-6">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Call Now
                      </button>
                      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">24/7 Support Helplines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-purple-800">Crisis Support</h4>
                  <p className="text-purple-700">999 (National Emergency)</p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-800">Women's Helpline</h4>
                  <p className="text-purple-700">10921 (Violence Against Women)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Legal Information</h2>
              <p className="text-gray-600 mb-6">
                Understanding your legal rights regarding abortion in Bangladesh.
              </p>
            </div>

            <div className="space-y-6">
              {legalInformation.map((info, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                  <p className="text-gray-700">{info.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-blue-800">Your Rights</h3>
              </div>
              <ul className="text-blue-700 space-y-2">
                <li>• Right to confidential healthcare</li>
                <li>• Right to informed consent</li>
                <li>• Right to safe medical procedures</li>
                <li>• Right to non-discriminatory treatment</li>
                <li>• Right to privacy and dignity</li>
              </ul>
            </div>

            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-red-800">Legal Disclaimer</h3>
              </div>
              <p className="text-red-700">
                This information is for educational purposes only and should not be considered legal advice. 
                Laws and regulations may change. Always consult with qualified legal and medical professionals 
                for specific guidance regarding your situation.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'aftercare' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Post-Abortion Care</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive care guidelines for physical and emotional recovery.
              </p>
            </div>

            <div className="space-y-8">
              {aftercareGuidelines.map((guideline, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{guideline.category}</h3>
                  <ul className="space-y-2">
                    {guideline.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold text-orange-800">When to Seek Immediate Medical Care</h3>
              </div>
              <ul className="text-orange-700 space-y-2">
                <li>• Heavy bleeding (soaking more than 2 pads per hour for 2+ hours)</li>
                <li>• Severe abdominal or back pain</li>
                <li>• Fever above 100.4°F (38°C)</li>
                <li>• Foul-smelling vaginal discharge</li>
                <li>• Signs of infection or allergic reaction</li>
              </ul>
              <div className="mt-4">
                <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                  Emergency Contact: 999
                </button>
              </div>
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Emotional Support Resources</h3>
              <p className="text-green-700 mb-4">
                It's normal to experience a range of emotions after an abortion. Professional counseling 
                and support groups can help you process these feelings in a healthy way.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Find Counseling
                </button>
                <button className="border border-green-600 text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors">
                  Support Groups
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AbortionSupportPage;