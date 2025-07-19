import React, { useState } from 'react';
import { Search, Book, AlertTriangle, Heart, Brain, Lungs, Shield } from 'lucide-react';

interface HealthCondition {
  id: number;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  prevention: string[];
  severity: 'low' | 'medium' | 'high';
  icon: React.ComponentType<any>;
}

const HealthDiseasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<HealthCondition | null>(null);

  const healthConditions: HealthCondition[] = [
    {
      id: 1,
      name: 'Hypertension (High Blood Pressure)',
      category: 'Cardiovascular',
      description: 'A condition where blood pressure in the arteries is persistently elevated.',
      symptoms: ['Headaches', 'Shortness of breath', 'Nosebleeds', 'Chest pain', 'Dizziness'],
      prevention: ['Regular exercise', 'Healthy diet', 'Limit salt intake', 'Maintain healthy weight', 'Avoid smoking'],
      severity: 'high',
      icon: Heart
    },
    {
      id: 2,
      name: 'Diabetes Type 2',
      category: 'Endocrine',
      description: 'A chronic condition that affects the way your body metabolizes sugar (glucose).',
      symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Slow healing wounds'],
      prevention: ['Healthy diet', 'Regular exercise', 'Maintain healthy weight', 'Regular health checkups'],
      severity: 'high',
      icon: Shield
    },
    {
      id: 3,
      name: 'Asthma',
      category: 'Respiratory',
      description: 'A condition in which airways narrow and swell and may produce extra mucus.',
      symptoms: ['Shortness of breath', 'Chest tightness', 'Wheezing', 'Coughing', 'Difficulty sleeping'],
      prevention: ['Avoid triggers', 'Take prescribed medications', 'Regular exercise', 'Maintain clean environment'],
      severity: 'medium',
      icon: Lungs
    },
    {
      id: 4,
      name: 'Depression',
      category: 'Mental Health',
      description: 'A mental health disorder characterized by persistently depressed mood or loss of interest.',
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep problems', 'Difficulty concentrating'],
      prevention: ['Regular exercise', 'Social connections', 'Stress management', 'Healthy lifestyle', 'Professional help'],
      severity: 'medium',
      icon: Brain
    },
    {
      id: 5,
      name: 'Dengue Fever',
      category: 'Infectious',
      description: 'A mosquito-borne viral infection common in tropical and subtropical areas.',
      symptoms: ['High fever', 'Severe headache', 'Eye pain', 'Muscle aches', 'Skin rash'],
      prevention: ['Eliminate standing water', 'Use mosquito repellent', 'Wear protective clothing', 'Use bed nets'],
      severity: 'high',
      icon: AlertTriangle
    }
  ];

  const categories = ['All Categories', 'Cardiovascular', 'Endocrine', 'Respiratory', 'Mental Health', 'Infectious'];

  const filteredConditions = healthConditions.filter(condition => {
    const matchesSearch = condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All Categories' || condition.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Disease Information</h1>
          <p className="text-xl text-gray-600">
            Learn about common health conditions, symptoms, and prevention
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search health conditions, symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found {filteredConditions.length} health condition{filteredConditions.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Health Conditions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredConditions.map((condition) => {
            const Icon = condition.icon;
            return (
              <div 
                key={condition.id} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCondition(condition)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{condition.name}</h3>
                      <p className="text-blue-600 text-sm">{condition.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(condition.severity)}`}>
                    {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)} Risk
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{condition.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Common Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {condition.symptoms.slice(0, 3).map((symptom, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {symptom}
                      </span>
                    ))}
                    {condition.symptoms.length > 3 && (
                      <span className="text-blue-600 text-sm">+{condition.symptoms.length - 3} more</span>
                    )}
                  </div>
                </div>
                
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>

        {filteredConditions.length === 0 && (
          <div className="text-center py-12">
            <Book className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No health conditions found.</p>
            <p className="text-gray-400 mt-2">Try searching with different keywords.</p>
          </div>
        )}

        {/* Emergency Warning */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-800">Medical Emergency</h3>
          </div>
          <p className="text-red-700 mb-4">
            If you are experiencing a medical emergency, do not rely on this information. 
            Call emergency services immediately or visit the nearest hospital.
          </p>
          <div className="flex space-x-4">
            <span className="bg-red-600 text-white px-4 py-2 rounded font-bold">Emergency: 999</span>
            <span className="bg-red-600 text-white px-4 py-2 rounded font-bold">Health Line: 16263</span>
          </div>
        </div>

        {/* Detailed View Modal */}
        {selectedCondition && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <selectedCondition.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCondition.name}</h2>
                      <p className="text-blue-600">{selectedCondition.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCondition(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedCondition.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Symptoms</h3>
                    <ul className="space-y-2">
                      {selectedCondition.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Prevention</h3>
                    <ul className="space-y-2">
                      {selectedCondition.prevention.map((tip, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500">
                    <strong>Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. 
                    Always consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthDiseasePage;