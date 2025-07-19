import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Heart, Shield, Truck, Users, Clock } from 'lucide-react';

interface EmergencyContact {
  service: string;
  number: string;
  description: string;
  available: string;
}

interface DisasterType {
  name: string;
  icon: React.ComponentType<any>;
  healthRisks: string[];
  immediateActions: string[];
  medicalNeeds: string[];
}

const DisasterSupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'emergency' | 'preparation' | 'health' | 'resources'>('emergency');

  const emergencyContacts: EmergencyContact[] = [
    {
      service: 'National Emergency',
      number: '999',
      description: 'Fire, police, and medical emergencies',
      available: '24/7'
    },
    {
      service: 'Disaster Management',
      number: '1090',
      description: 'Disaster response and coordination',
      available: '24/7'
    },
    {
      service: 'Health Emergency',
      number: '16263',
      description: 'Medical emergency and health information',
      available: '24/7'
    },
    {
      service: 'Fire Service',
      number: '333',
      description: 'Fire emergencies and rescue operations',
      available: '24/7'
    },
    {
      service: 'Cyclone Warning',
      number: '1090',
      description: 'Weather warnings and evacuation alerts',
      available: '24/7'
    },
    {
      service: 'Red Crescent',
      number: '+880-2-9353235',
      description: 'Humanitarian aid and disaster relief',
      available: '24/7'
    }
  ];

  const disasterTypes: DisasterType[] = [
    {
      name: 'Flood',
      icon: AlertTriangle,
      healthRisks: ['Waterborne diseases', 'Skin infections', 'Vector-borne diseases', 'Respiratory infections'],
      immediateActions: ['Move to higher ground', 'Avoid flood water', 'Boil water before drinking', 'Seek medical help if injured'],
      medicalNeeds: ['Water purification tablets', 'First aid supplies', 'Antibiotics', 'Oral rehydration salts']
    },
    {
      name: 'Cyclone',
      icon: Shield,
      healthRisks: ['Physical injuries', 'Respiratory problems', 'Contaminated water', 'Mental health issues'],
      immediateActions: ['Stay indoors', 'Avoid windows', 'Have emergency supplies ready', 'Follow evacuation orders'],
      medicalNeeds: ['Trauma care supplies', 'Respiratory medications', 'Pain relievers', 'Psychological support']
    },
    {
      name: 'Earthquake',
      icon: Truck,
      healthRisks: ['Crush injuries', 'Fractures', 'Head injuries', 'Psychological trauma'],
      immediateActions: ['Drop, cover, hold', 'Check for injuries', 'Turn off utilities', 'Evacuate if building damaged'],
      medicalNeeds: ['Trauma supplies', 'Splints and bandages', 'Pain medications', 'Emergency surgery']
    },
    {
      name: 'Fire',
      icon: Heart,
      healthRisks: ['Burns', 'Smoke inhalation', 'Carbon monoxide poisoning', 'Respiratory damage'],
      immediateActions: ['Evacuate immediately', 'Stay low to avoid smoke', 'Cool burns with water', 'Call fire service'],
      medicalNeeds: ['Burn treatment', 'Oxygen therapy', 'Pain management', 'Respiratory support']
    }
  ];

  const preparationChecklist = [
    {
      category: 'Medical Supplies',
      items: [
        'First aid kit with bandages, antiseptics',
        'Prescription medications (7-day supply)',
        'Over-the-counter medications',
        'Medical devices (glasses, hearing aids)',
        'Emergency medical information cards'
      ]
    },
    {
      category: 'Emergency Kit',
      items: [
        'Water (1 gallon per person per day for 3 days)',
        'Non-perishable food (3-day supply)',
        'Battery-powered radio',
        'Flashlights and extra batteries',
        'Emergency contact information'
      ]
    },
    {
      category: 'Important Documents',
      items: [
        'Medical records and insurance cards',
        'Identification documents',
        'Emergency contact list',
        'Bank account and credit card information',
        'Insurance policies'
      ]
    },
    {
      category: 'Communication Plan',
      items: [
        'Family emergency contact information',
        'Out-of-area contact person',
        'Meeting places (local and regional)',
        'School and workplace emergency plans',
        'Social media emergency pages to follow'
      ]
    }
  ];

  const healthGuidelines = [
    {
      title: 'Water Safety',
      description: 'Ensure safe drinking water during disasters',
      tips: [
        'Boil water for at least 1 minute before drinking',
        'Use water purification tablets if available',
        'Avoid ice unless made from safe water',
        'Use bottled water when possible',
        'Disinfect water containers before use'
      ]
    },
    {
      title: 'Food Safety',
      description: 'Prevent foodborne illness during emergencies',
      tips: [
        'Eat only properly cooked and hot food',
        'Avoid raw or undercooked foods',
        'Discard food that has been at room temperature for 2+ hours',
        'Use canned or packaged foods when possible',
        'Wash hands before eating'
      ]
    },
    {
      title: 'Hygiene & Sanitation',
      description: 'Maintain hygiene to prevent disease',
      tips: [
        'Wash hands frequently with soap and clean water',
        'Use alcohol-based hand sanitizer if soap unavailable',
        'Dispose of waste properly',
        'Keep living areas clean and dry',
        'Avoid contact with flood water'
      ]
    },
    {
      title: 'Mental Health',
      description: 'Cope with disaster-related stress',
      tips: [
        'Stay connected with family and friends',
        'Maintain routines when possible',
        'Limit exposure to disaster news',
        'Seek professional help if needed',
        'Practice stress-reduction techniques'
      ]
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disaster Support & Emergency Health</h1>
          <p className="text-xl text-gray-600">
            Emergency healthcare information and disaster preparedness
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-800">Emergency Situation?</h3>
          </div>
          <p className="text-red-700 mb-4">
            If you are in immediate danger or need emergency medical assistance, call emergency services now.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
              Call 999 - Emergency
            </button>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors">
              Call 1090 - Disaster Management
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
            <Phone className="h-4 w-4 inline mr-2" />
            Emergency
          </button>
          <button
            onClick={() => setActiveTab('preparation')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'preparation'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Shield className="h-4 w-4 inline mr-2" />
            Preparation
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'health'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            Health Guidelines
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'resources'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Resources
          </button>
        </div>

        {/* Content */}
        {activeTab === 'emergency' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Contacts</h2>
              <p className="text-gray-600 mb-6">
                Keep these emergency numbers readily available during disasters and emergencies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
                  <div className="flex items-center mb-3">
                    <Phone className="h-6 w-6 text-red-600 mr-3" />
                    <h3 className="text-lg font-bold text-gray-900">{contact.service}</h3>
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{contact.number}</div>
                  <p className="text-gray-700 mb-2">{contact.description}</p>
                  <div className="flex items-center text-sm text-green-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {contact.available}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disaster-Specific Health Risks</h2>
              <div className="space-y-6">
                {disasterTypes.map((disaster, index) => {
                  const Icon = disaster.icon;
                  return (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-3 rounded-lg mr-4">
                          <Icon className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{disaster.name}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Health Risks</h4>
                          <ul className="space-y-1">
                            {disaster.healthRisks.map((risk, riskIndex) => (
                              <li key={riskIndex} className="flex items-start text-gray-700">
                                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {risk}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Immediate Actions</h4>
                          <ul className="space-y-1">
                            {disaster.immediateActions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start text-gray-700">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Medical Needs</h4>
                          <ul className="space-y-1">
                            {disaster.medicalNeeds.map((need, needIndex) => (
                              <li key={needIndex} className="flex items-start text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {need}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preparation' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disaster Preparedness</h2>
              <p className="text-gray-600 mb-6">
                Being prepared can save lives and reduce the impact of disasters on your health and safety.
              </p>
            </div>

            <div className="space-y-8">
              {preparationChecklist.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, itemIndex) => (
                      <label key={itemIndex} className="flex items-start">
                        <input type="checkbox" className="mt-1 mr-3 text-blue-600" />
                        <span className="text-gray-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Emergency Plan Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Before Disaster</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Create family emergency plan</li>
                    <li>• Prepare emergency kit</li>
                    <li>• Know evacuation routes</li>
                    <li>• Practice emergency drills</li>
                    <li>• Stay informed about local risks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">During Disaster</h4>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Follow emergency instructions</li>
                    <li>• Stay calm and help others</li>
                    <li>• Use emergency supplies wisely</li>
                    <li>• Monitor emergency broadcasts</li>
                    <li>• Avoid unnecessary risks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'health' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Guidelines During Disasters</h2>
              <p className="text-gray-600 mb-6">
                Maintain your health and prevent disease during and after disasters.
              </p>
            </div>

            <div className="space-y-8">
              {healthGuidelines.map((guideline, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{guideline.title}</h3>
                  <p className="text-gray-600 mb-4">{guideline.description}</p>
                  <ul className="space-y-2">
                    {guideline.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start text-gray-700">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-yellow-800">Special Health Considerations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Vulnerable Populations</h4>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Elderly individuals</li>
                    <li>• Children and infants</li>
                    <li>• Pregnant women</li>
                    <li>• People with chronic conditions</li>
                    <li>• People with disabilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Additional Precautions</h4>
                  <ul className="text-yellow-700 space-y-1">
                    <li>• Extra medication supplies</li>
                    <li>• Medical equipment backup power</li>
                    <li>• Accessible evacuation plans</li>
                    <li>• Caregiver arrangements</li>
                    <li>• Medical alert systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disaster Support Resources</h2>
              <p className="text-gray-600 mb-6">
                Organizations and services providing disaster relief and support in Bangladesh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Government Agencies</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Department of Disaster Management</h4>
                    <p className="text-gray-600 text-sm">Coordinates national disaster response</p>
                    <p className="text-blue-600">Phone: 1090</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ministry of Health</h4>
                    <p className="text-gray-600 text-sm">Health emergency coordination</p>
                    <p className="text-blue-600">Phone: 16263</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fire Service & Civil Defence</h4>
                    <p className="text-gray-600 text-sm">Emergency rescue operations</p>
                    <p className="text-blue-600">Phone: 333</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">NGOs & Relief Organizations</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Bangladesh Red Crescent Society</h4>
                    <p className="text-gray-600 text-sm">Humanitarian aid and disaster relief</p>
                    <p className="text-blue-600">Phone: +880-2-9353235</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">BRAC</h4>
                    <p className="text-gray-600 text-sm">Community-based disaster response</p>
                    <p className="text-blue-600">Phone: +880-2-9881265</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Oxfam Bangladesh</h4>
                    <p className="text-gray-600 text-sm">Emergency response and recovery</p>
                    <p className="text-blue-600">Phone: +880-2-8824180</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Medical Support</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Emergency Medical Services</h4>
                    <p className="text-gray-600 text-sm">Ambulance and emergency care</p>
                    <p className="text-blue-600">Phone: 999</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dhaka Medical College Hospital</h4>
                    <p className="text-gray-600 text-sm">Major trauma and emergency center</p>
                    <p className="text-blue-600">Phone: +880-2-123456789</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Mobile Medical Teams</h4>
                    <p className="text-gray-600 text-sm">Deployed during disasters</p>
                    <p className="text-blue-600">Contact: Local health authorities</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Information Sources</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Bangladesh Meteorological Department</h4>
                    <p className="text-gray-600 text-sm">Weather warnings and forecasts</p>
                    <p className="text-blue-600">Website: bmd.gov.bd</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">National Emergency Broadcast</h4>
                    <p className="text-gray-600 text-sm">Radio and TV emergency updates</p>
                    <p className="text-blue-600">Tune to local stations</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Social Media Alerts</h4>
                    <p className="text-gray-600 text-sm">Follow official accounts for updates</p>
                    <p className="text-blue-600">@DMBangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Community Support</h3>
              <p className="text-green-700 mb-4">
                Strong communities are more resilient to disasters. Get involved in local preparedness efforts 
                and help your neighbors during emergencies.
              </p>
              <div className="flex space-x-4">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Join Community Group
                </button>
                <button className="border border-green-600 text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors">
                  Volunteer for Relief
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisasterSupportPage;