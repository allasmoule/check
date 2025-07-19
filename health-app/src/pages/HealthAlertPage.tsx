import React, { useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock, MapPin, Calendar } from 'lucide-react';

interface HealthAlert {
  id: number;
  title: string;
  type: 'emergency' | 'warning' | 'info' | 'success';
  description: string;
  location: string;
  date: string;
  urgent: boolean;
  source: string;
}

interface Disease {
  name: string;
  status: 'outbreak' | 'monitoring' | 'controlled';
  cases: number;
  areas: string[];
  lastUpdate: string;
}

const HealthAlertPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'outbreaks' | 'prevention' | 'subscribe'>('alerts');
  const [selectedType, setSelectedType] = useState<string>('all');

  const healthAlerts: HealthAlert[] = [
    {
      id: 1,
      title: 'Dengue Fever Outbreak Alert',
      type: 'emergency',
      description: 'Significant increase in dengue cases reported in Dhaka. Take immediate precautions against mosquito breeding.',
      location: 'Dhaka Division',
      date: '2024-03-15',
      urgent: true,
      source: 'Ministry of Health'
    },
    {
      id: 2,
      title: 'Water Contamination Warning',
      type: 'warning',
      description: 'Water supply contamination detected in several areas. Boil water before consumption.',
      location: 'Chittagong',
      date: '2024-03-14',
      urgent: true,
      source: 'Local Health Authority'
    },
    {
      id: 3,
      title: 'Vaccination Campaign Update',
      type: 'info',
      description: 'Free COVID-19 booster shots available at all government health centers.',
      location: 'Nationwide',
      date: '2024-03-13',
      urgent: false,
      source: 'Directorate General of Health Services'
    },
    {
      id: 4,
      title: 'Air Quality Improvement',
      type: 'success',
      description: 'Air quality index has improved significantly in Dhaka after recent rainfall.',
      location: 'Dhaka',
      date: '2024-03-12',
      urgent: false,
      source: 'Department of Environment'
    },
    {
      id: 5,
      title: 'Heat Wave Advisory',
      type: 'warning',
      description: 'Extreme heat conditions expected. Stay hydrated and avoid outdoor activities during peak hours.',
      location: 'Rajshahi Division',
      date: '2024-03-11',
      urgent: false,
      source: 'Bangladesh Meteorological Department'
    }
  ];

  const diseaseOutbreaks: Disease[] = [
    {
      name: 'Dengue Fever',
      status: 'outbreak',
      cases: 1250,
      areas: ['Dhaka', 'Chittagong', 'Sylhet'],
      lastUpdate: '2024-03-15'
    },
    {
      name: 'Chikungunya',
      status: 'monitoring',
      cases: 89,
      areas: ['Dhaka', 'Barisal'],
      lastUpdate: '2024-03-14'
    },
    {
      name: 'Diarrheal Disease',
      status: 'controlled',
      cases: 45,
      areas: ['Cox\'s Bazar'],
      lastUpdate: '2024-03-13'
    },
    {
      name: 'Influenza A (H1N1)',
      status: 'monitoring',
      cases: 156,
      areas: ['Dhaka', 'Chittagong', 'Khulna'],
      lastUpdate: '2024-03-12'
    }
  ];

  const preventionMeasures = [
    {
      disease: 'Dengue Fever',
      measures: [
        'Eliminate standing water around homes',
        'Use mosquito nets and repellents',
        'Wear long-sleeved clothing',
        'Keep surroundings clean',
        'Seek medical attention for fever'
      ]
    },
    {
      disease: 'Waterborne Diseases',
      measures: [
        'Boil water before drinking',
        'Use water purification tablets',
        'Wash hands frequently',
        'Eat properly cooked food',
        'Avoid street food during outbreaks'
      ]
    },
    {
      disease: 'Respiratory Infections',
      measures: [
        'Wear masks in crowded places',
        'Maintain social distancing',
        'Cover mouth when coughing/sneezing',
        'Wash hands regularly',
        'Get vaccinated when available'
      ]
    },
    {
      disease: 'Food Poisoning',
      measures: [
        'Cook food thoroughly',
        'Store food at proper temperatures',
        'Wash fruits and vegetables',
        'Avoid expired products',
        'Practice good kitchen hygiene'
      ]
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'emergency': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      case 'success': return CheckCircle;
      default: return Bell;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-orange-500 bg-orange-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      case 'success': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'outbreak': return 'bg-red-100 text-red-800';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800';
      case 'controlled': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = selectedType === 'all' 
    ? healthAlerts 
    : healthAlerts.filter(alert => alert.type === selectedType);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Health Alerts & Notifications</h1>
          <p className="text-xl text-gray-600">
            Stay informed about health emergencies and disease outbreaks
          </p>
        </div>

        {/* Urgent Alerts Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-800">Urgent Health Alerts</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthAlerts.filter(alert => alert.urgent).map((alert) => (
              <div key={alert.id} className="bg-white border border-red-200 rounded-md p-4">
                <h4 className="font-semibold text-red-800 mb-1">{alert.title}</h4>
                <p className="text-red-700 text-sm mb-2">{alert.description}</p>
                <div className="flex items-center text-xs text-red-600">
                  <MapPin className="h-3 w-3 mr-1" />
                  {alert.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'alerts'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="h-4 w-4 inline mr-2" />
            Alerts
          </button>
          <button
            onClick={() => setActiveTab('outbreaks')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'outbreaks'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            Outbreaks
          </button>
          <button
            onClick={() => setActiveTab('prevention')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'prevention'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle className="h-4 w-4 inline mr-2" />
            Prevention
          </button>
          <button
            onClick={() => setActiveTab('subscribe')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'subscribe'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="h-4 w-4 inline mr-2" />
            Subscribe
          </button>
        </div>

        {/* Content */}
        {activeTab === 'alerts' && (
          <div>
            {/* Filter */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Filter by type:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Alerts</option>
                  <option value="emergency">Emergency</option>
                  <option value="warning">Warning</option>
                  <option value="info">Information</option>
                  <option value="success">Good News</option>
                </select>
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-6">
              {filteredAlerts.map((alert) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start">
                      <div className="mr-4">
                        <Icon className={`h-6 w-6 ${
                          alert.type === 'emergency' ? 'text-red-600' :
                          alert.type === 'warning' ? 'text-orange-600' :
                          alert.type === 'info' ? 'text-blue-600' :
                          'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{alert.title}</h3>
                          {alert.urgent && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              URGENT
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{alert.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {alert.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {alert.date}
                          </div>
                          <div className="flex items-center">
                            <Info className="h-4 w-4 mr-1" />
                            {alert.source}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'outbreaks' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disease Outbreak Monitoring</h2>
              <p className="text-gray-600 mb-6">
                Current status of disease outbreaks and surveillance in Bangladesh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diseaseOutbreaks.map((disease, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{disease.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(disease.status)}`}>
                      {disease.status.charAt(0).toUpperCase() + disease.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Cases:</span>
                      <span className="font-semibold text-gray-900">{disease.cases}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600 block mb-2">Affected Areas:</span>
                      <div className="flex flex-wrap gap-2">
                        {disease.areas.map((area, areaIndex) => (
                          <span key={areaIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 pt-2 border-t">
                      <Clock className="h-4 w-4 mr-1" />
                      Last updated: {disease.lastUpdate}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Outbreak Response</h3>
              <p className="text-blue-700 mb-4">
                Health authorities are actively monitoring and responding to disease outbreaks. 
                Follow prevention guidelines and report suspected cases to local health centers.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Report Case
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                  Find Health Center
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prevention' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prevention Guidelines</h2>
              <p className="text-gray-600 mb-6">
                Follow these prevention measures to protect yourself and your community from diseases.
              </p>
            </div>

            <div className="space-y-8">
              {preventionMeasures.map((prevention, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{prevention.disease}</h3>
                  <ul className="space-y-2">
                    {prevention.measures.map((measure, measureIndex) => (
                      <li key={measureIndex} className="flex items-start text-gray-700">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">General Health Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Personal Hygiene</h4>
                  <ul className="text-green-700 space-y-1">
                    <li>• Wash hands frequently with soap</li>
                    <li>• Use hand sanitizer when soap unavailable</li>
                    <li>• Cover mouth when coughing/sneezing</li>
                    <li>• Avoid touching face with unwashed hands</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 mb-2">Environmental Health</h4>
                  <ul className="text-green-700 space-y-1">
                    <li>• Keep surroundings clean and dry</li>
                    <li>• Eliminate mosquito breeding sites</li>
                    <li>• Ensure proper waste disposal</li>
                    <li>• Maintain good ventilation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subscribe' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to Health Alerts</h2>
              <p className="text-gray-600 mb-6">
                Get timely health alerts and notifications delivered to your phone or email.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">SMS Alerts</h3>
                <p className="text-gray-600 mb-4">
                  Receive urgent health alerts via SMS. Standard messaging rates apply.
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+880 1XXXXXXXXX"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Select your division</option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Sylhet</option>
                      <option>Rajshahi</option>
                      <option>Khulna</option>
                      <option>Barisal</option>
                      <option>Rangpur</option>
                      <option>Mymensingh</option>
                    </select>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    Subscribe to SMS Alerts
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Email Notifications</h3>
                <p className="text-gray-600 mb-4">
                  Get detailed health bulletins and weekly summaries via email.
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Frequency
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Immediate (urgent alerts only)</option>
                      <option>Daily digest</option>
                      <option>Weekly summary</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Alert Types
                    </label>
                    {['Disease Outbreaks', 'Environmental Health', 'Food Safety', 'Vaccination Updates'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox"  defaultChecked className="mr-2 text-blue-600" />
                        <span className="text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                    Subscribe to Email Alerts
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">Social Media Alerts</h3>
              <p className="text-yellow-700 mb-4">
                Follow official health authorities on social media for real-time updates and health information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <h4 className="font-semibold text-yellow-800">Facebook</h4>
                  <p className="text-yellow-700 text-sm">@HealthMinistryBD</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-yellow-800">Twitter</h4>
                  <p className="text-yellow-700 text-sm">@MoHFWBangladesh</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-yellow-800">WhatsApp</h4>
                  <p className="text-yellow-700 text-sm">+880-1XXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAlertPage;