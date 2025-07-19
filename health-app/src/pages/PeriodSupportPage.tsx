import React, { useState } from 'react';
import { Calendar, Heart, AlertTriangle, Book, Thermometer, Clock, Shield } from 'lucide-react';

interface PeriodTip {
  category: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const PeriodSupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'tips' | 'health' | 'myths'>('tracker');

  const periodTips: PeriodTip[] = [
    {
      category: 'Pain Management',
      title: 'Natural Pain Relief',
      description: 'Use heat therapy, gentle exercise, and relaxation techniques to manage cramps.',
      icon: Heart
    },
    {
      category: 'Hygiene',
      title: 'Proper Hygiene',
      description: 'Change pads/tampons regularly, wash hands before and after, and maintain cleanliness.',
      icon: Shield
    },
    {
      category: 'Nutrition',
      title: 'Healthy Diet',
      description: 'Eat iron-rich foods, stay hydrated, and avoid excessive caffeine and sugar.',
      icon: Book
    },
    {
      category: 'Exercise',
      title: 'Stay Active',
      description: 'Light exercise like walking or yoga can help reduce cramps and improve mood.',
      icon: Clock
    }
  ];

  const healthConcerns = [
    {
      symptom: 'Extremely Heavy Bleeding',
      description: 'Changing pad/tampon every hour for several hours',
      action: 'Consult a gynecologist'
    },
    {
      symptom: 'Severe Pain',
      description: 'Pain that interferes with daily activities',
      action: 'Seek medical evaluation'
    },
    {
      symptom: 'Irregular Cycles',
      description: 'Cycles shorter than 21 days or longer than 35 days',
      action: 'Track and discuss with doctor'
    },
    {
      symptom: 'Missing Periods',
      description: 'No period for 3+ months (if not pregnant)',
      action: 'Consult healthcare provider'
    }
  ];

  const myths = [
    {
      myth: 'You can\'t exercise during periods',
      fact: 'Light to moderate exercise can actually help reduce cramps and improve mood.'
    },
    {
      myth: 'Periods sync up when women live together',
      fact: 'Scientific studies have not found evidence to support menstrual synchrony.'
    },
    {
      myth: 'You can\'t get pregnant during your period',
      fact: 'While less likely, pregnancy can occur during menstruation, especially with irregular cycles.'
    },
    {
      myth: 'PMS is just in your head',
      fact: 'PMS is a real medical condition caused by hormonal changes and affects many women.'
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Period Support</h1>
          <p className="text-xl text-gray-600">
            Comprehensive menstrual health information and support
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'tracker'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="h-4 w-4 inline mr-2" />
            Tracker
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'tips'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            Tips
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'health'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Thermometer className="h-4 w-4 inline mr-2" />
            Health
          </button>
          <button
            onClick={() => setActiveTab('myths')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'myths'
                ? 'bg-white text-pink-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Book className="h-4 w-4 inline mr-2" />
            Myths
          </button>
        </div>

        {/* Content */}
        {activeTab === 'tracker' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Period Tracker</h2>
              <p className="text-gray-600 mb-6">
                Track your menstrual cycle to better understand your body and predict your next period.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Log</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Period Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cycle Length (days)
                    </label>
                    <input
                      type="number"
                      placeholder="28"
                      min="21"
                      max="35"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period Duration (days)
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      min="3"
                      max="7"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <button className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors">
                    Calculate Next Period
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cycle Information</h3>
                <div className="space-y-4">
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                    <h4 className="font-semibold text-pink-800 mb-2">Normal Cycle Range</h4>
                    <p className="text-pink-700 text-sm">
                      A normal menstrual cycle ranges from 21 to 35 days, with periods lasting 3-7 days.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Tracking Benefits</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Predict your next period</li>
                      <li>• Identify irregular patterns</li>
                      <li>• Plan activities and travel</li>
                      <li>• Monitor symptoms</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Symptoms Tracker</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Cramps', 'Headache', 'Mood Changes', 'Bloating', 'Fatigue', 'Breast Tenderness', 'Acne', 'Food Cravings'].map((symptom) => (
                  <label key={symptom} className="flex items-center">
                    <input type="checkbox" className="mr-2 text-pink-600" />
                    <span className="text-sm text-gray-700">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Period Care Tips</h2>
              <p className="text-gray-600 mb-6">
                Practical advice to help you manage your period comfortably and confidently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {periodTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-pink-100 p-3 rounded-lg mr-4">
                        <Icon className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{tip.title}</h3>
                        <p className="text-pink-600 text-sm">{tip.category}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{tip.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Period Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pads</h4>
                  <p className="text-gray-600 text-sm">External protection, easy to use, various absorbency levels</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Tampons</h4>
                  <p className="text-gray-600 text-sm">Internal protection, discreet, good for active lifestyles</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Menstrual Cups</h4>
                  <p className="text-gray-600 text-sm">Eco-friendly, reusable, long-lasting protection</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Seek Medical Help</h2>
              <p className="text-gray-600 mb-6">
                Know the warning signs that require medical attention.
              </p>
            </div>

            <div className="space-y-6">
              {healthConcerns.map((concern, index) => (
                <div key={index} className="bg-white border-l-4 border-orange-500 rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="bg-orange-100 p-3 rounded-lg mr-4">
                      <AlertTriangle className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-orange-800 mb-2">{concern.symptom}</h3>
                      <p className="text-gray-700 mb-3">{concern.description}</p>
                      <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                        <p className="text-orange-800 font-semibold">Recommendation: {concern.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Regular Check-ups</h3>
              <p className="text-blue-700 mb-4">
                Regular gynecological check-ups are important for maintaining reproductive health. 
                Discuss any concerns about your menstrual cycle with your healthcare provider.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Find Gynecologist
              </button>
            </div>
          </div>
        )}

        {activeTab === 'myths' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Period Myths vs Facts</h2>
              <p className="text-gray-600 mb-6">
                Let's debunk common myths about menstruation with scientific facts.
              </p>
            </div>

            <div className="space-y-6">
              {myths.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-bold text-red-800 mb-2">❌ Myth</h3>
                      <p className="text-red-700">{item.myth}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h3 className="font-bold text-green-800 mb-2">✅ Fact</h3>
                      <p className="text-green-700">{item.fact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4">Education is Key</h3>
              <p className="text-purple-700 mb-4">
                Understanding your body and menstrual cycle helps you make informed decisions about your health. 
                Don't hesitate to ask questions and seek reliable information from healthcare professionals.
              </p>
              <div className="flex space-x-4">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                  Learn More
                </button>
                <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition-colors">
                  Ask a Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodSupportPage;