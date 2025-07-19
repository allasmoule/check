import React, { useState } from 'react';
import { AlertTriangle, Clock, Phone, MapPin, Shield, Zap, Heart, Book } from 'lucide-react';

interface EmergencyStep {
  step: number;
  title: string;
  description: string;
  urgent: boolean;
}

interface AnimalType {
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  immediateActions: string[];
}

const AnimalBitePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emergency' | 'prevention' | 'treatment' | 'rabies'>('emergency');

  const emergencySteps: EmergencyStep[] = [
    {
      step: 1,
      title: 'Control Bleeding',
      description: 'Apply direct pressure with a clean cloth to stop bleeding',
      urgent: true
    },
    {
      step: 2,
      title: 'Clean the Wound',
      description: 'Rinse with clean water and soap for at least 5 minutes',
      urgent: true
    },
    {
      step: 3,
      title: 'Apply Antiseptic',
      description: 'Use antiseptic solution like povidone iodine or alcohol',
      urgent: true
    },
    {
      step: 4,
      title: 'Seek Medical Attention',
      description: 'Go to nearest hospital or call emergency services immediately',
      urgent: true
    },
    {
      step: 5,
      title: 'Report the Incident',
      description: 'Inform local authorities about the animal bite incident',
      urgent: false
    }
  ];

  const animalTypes: AnimalType[] = [
    {
      name: 'Dog',
      riskLevel: 'high',
      description: 'Most common animal bite. High risk of rabies if animal is unvaccinated.',
      immediateActions: ['Clean wound thoroughly', 'Seek immediate medical care', 'Report to authorities']
    },
    {
      name: 'Cat',
      riskLevel: 'medium',
      description: 'Deep puncture wounds. Risk of bacterial infection and rabies.',
      immediateActions: ['Clean deeply', 'Monitor for infection', 'Consider antibiotics']
    },
    {
      name: 'Snake',
      riskLevel: 'high',
      description: 'Potentially venomous. Requires immediate emergency treatment.',
      immediateActions: ['Keep calm', 'Immobilize limb', 'Rush to hospital immediately']
    },
    {
      name: 'Monkey',
      riskLevel: 'high',
      description: 'High risk of various infections including rabies and herpes B.',
      immediateActions: ['Thorough cleaning', 'Immediate medical care', 'Antiviral consideration']
    }
  ];

  const rabiesInfo = [
    {
      title: 'What is Rabies?',
      content: 'Rabies is a viral infection that affects the nervous system and is almost always fatal once symptoms appear.'
    },
    {
      title: 'Transmission',
      content: 'Transmitted through saliva of infected animals, usually through bites or scratches.'
    },
    {
      title: 'Symptoms',
      content: 'Fever, headache, anxiety, confusion, difficulty swallowing, fear of water, and paralysis.'
    },
    {
      title: 'Prevention',
      content: 'Post-exposure prophylaxis (PEP) is 100% effective if given before symptoms appear.'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Animal Bite Emergency</h1>
          <p className="text-xl text-gray-600">
            Immediate care and treatment information for animal bites
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-800">Emergency Action Required</h3>
          </div>
          <p className="text-red-700 mb-4">
            Animal bites can be serious medical emergencies. Seek immediate medical attention, 
            especially for bites from unknown animals or if the wound is deep.
          </p>
          <div className="flex space-x-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
              Call Emergency: 999
            </button>
            <button className="border border-red-600 text-red-600 px-6 py-2 rounded-md hover:bg-red-50 transition-colors">
              Find Nearest Hospital
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'emergency'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Zap className="h-4 w-4 inline mr-2" />
            Emergency Steps
          </button>
          <button
            onClick={() => setActiveTab('prevention')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'prevention'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield className="h-4 w-4 inline mr-2" />
            Prevention
          </button>
          <button
            onClick={() => setActiveTab('treatment')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'treatment'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            Treatment
          </button>
          <button
            onClick={() => setActiveTab('rabies')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'rabies'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Book className="h-4 w-4 inline mr-2" />
            Rabies Info
          </button>
        </div>

        {/* Content */}
        {activeTab === 'emergency' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Immediate Emergency Steps</h2>
              <p className="text-gray-600 mb-6">
                Follow these steps immediately after an animal bite. Time is critical for preventing infection and complications.
              </p>
            </div>

            <div className="space-y-6">
              {emergencySteps.map((step) => (
                <div key={step.step} className={`bg-white rounded-lg shadow-md p-6 ${step.urgent ? 'border-l-4 border-red-500' : 'border-l-4 border-blue-500'}`}>
                  <div className="flex items-start">
                    <div className={`${step.urgent ? 'bg-red-100' : 'bg-blue-100'} w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                      <span className={`text-lg font-bold ${step.urgent ? 'text-red-600' : 'text-blue-600'}`}>
                        {step.step}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-bold text-gray-900 mr-3">{step.title}</h3>
                        {step.urgent && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            <Clock className="h-3 w-3 inline mr-1" />
                            URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">Important Information to Collect</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="text-orange-700 space-y-2">
                  <li>• Type of animal that bit you</li>
                  <li>• Location and time of incident</li>
                  <li>• Animal's behavior and appearance</li>
                  <li>• Vaccination status of animal (if known)</li>
                </ul>
                <ul className="text-orange-700 space-y-2">
                  <li>• Your tetanus vaccination status</li>
                  <li>• Depth and location of wound</li>
                  <li>• Any witnesses to the incident</li>
                  <li>• Owner information (if applicable)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prevention' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Animal Bite Prevention</h2>
              <p className="text-gray-600 mb-6">
                Learn how to prevent animal bites and reduce your risk of injury.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Around Dogs</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Never approach an unknown dog</li>
                  <li>• Ask permission before petting someone's dog</li>
                  <li>• Don't disturb dogs while eating or sleeping</li>
                  <li>• Avoid direct eye contact with aggressive dogs</li>
                  <li>• Don't run from a dog - back away slowly</li>
                  <li>• Teach children proper dog interaction</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Around Wild Animals</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Keep distance from all wild animals</li>
                  <li>• Don't feed wild animals</li>
                  <li>• Secure garbage and food sources</li>
                  <li>• Be cautious in areas with wildlife</li>
                  <li>• Report unusual animal behavior</li>
                  <li>• Vaccinate pets against rabies</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Around Cats</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Let cats approach you first</li>
                  <li>• Avoid handling stray or feral cats</li>
                  <li>• Don't corner or trap cats</li>
                  <li>• Watch for warning signs (hissing, arched back)</li>
                  <li>• Handle cats gently and calmly</li>
                  <li>• Keep cats indoors when possible</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">General Safety</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Stay up to date with tetanus vaccination</li>
                  <li>• Supervise children around animals</li>
                  <li>• Report stray or aggressive animals</li>
                  <li>• Avoid animals showing unusual behavior</li>
                  <li>• Use protective equipment when necessary</li>
                  <li>• Know emergency contact numbers</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'treatment' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Treatment by Animal Type</h2>
              <p className="text-gray-600 mb-6">
                Different animals pose different risks. Here's specific information for common animal bites.
              </p>
            </div>

            <div className="space-y-6">
              {animalTypes.map((animal, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{animal.name} Bite</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(animal.riskLevel)}`}>
                      {animal.riskLevel.charAt(0).toUpperCase() + animal.riskLevel.slice(1)} Risk
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{animal.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Immediate Actions:</h4>
                    <ul className="space-y-1">
                      {animal.immediateActions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Medical Treatment Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Wound Care</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Professional cleaning</li>
                    <li>• Suturing if needed</li>
                    <li>• Bandaging</li>
                    <li>• Follow-up care</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Medications</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Antibiotics</li>
                    <li>• Tetanus shot</li>
                    <li>• Rabies vaccination</li>
                    <li>• Pain management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Monitoring</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Infection signs</li>
                    <li>• Healing progress</li>
                    <li>• Neurological symptoms</li>
                    <li>• Regular check-ups</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rabies' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rabies Information</h2>
              <p className="text-gray-600 mb-6">
                Understanding rabies is crucial for animal bite victims. Early treatment is 100% effective.
              </p>
            </div>

            <div className="space-y-6">
              {rabiesInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                  <p className="text-gray-700">{info.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Post-Exposure Prophylaxis (PEP)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Treatment Schedule</h4>
                  <ul className="text-green-700 space-y-2">
                    <li>• Day 0: Rabies immunoglobulin + 1st vaccine</li>
                    <li>• Day 3: 2nd vaccine dose</li>
                    <li>• Day 7: 3rd vaccine dose</li>
                    <li>• Day 14: 4th vaccine dose</li>
                    <li>• Day 28: 5th vaccine dose (if needed)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Important Notes</h4>
                  <ul className="text-green-700 space-y-2">
                    <li>• Must start as soon as possible</li>
                    <li>• 100% effective if completed</li>
                    <li>• Available at major hospitals</li>
                    <li>• Don't delay treatment</li>
                    <li>• Complete the full course</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-red-800">Rabies Treatment Centers in Bangladesh</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-red-800">Dhaka Medical College Hospital</h4>
                  <p className="text-red-700">24/7 Emergency: +880-2-123456789</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800">Infectious Disease Hospital</h4>
                  <p className="text-red-700">Specialized Care: +880-2-987654321</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalBitePage;