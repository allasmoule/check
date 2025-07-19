import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, Heart, Stethoscope, Truck, Star } from 'lucide-react';

interface VetClinic {
  id: number;
  name: string;
  address: string;
  phone: string;
  services: string[];
  emergency: boolean;
  rating: number;
  hours: string;
  distance: string;
}

interface VetService {
  category: string;
  services: string[];
  description: string;
  icon: React.ComponentType<any>;
}

const AnimalTreatmentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [activeTab, setActiveTab] = useState<'clinics' | 'services' | 'emergency'>('clinics');

  const vetClinics: VetClinic[] = [
    {
      id: 1,
      name: 'Dhaka Veterinary Hospital',
      address: 'House 45, Road 12, Dhanmondi, Dhaka',
      phone: '+880-2-123456789',
      services: ['General Care', 'Surgery', 'Emergency', 'Vaccination'],
      emergency: true,
      rating: 4.8,
      hours: '24/7',
      distance: '2.1 km'
    },
    {
      id: 2,
      name: 'Pet Care Center',
      address: 'Shop 15, Gulshan Avenue, Gulshan, Dhaka',
      phone: '+880-2-987654321',
      services: ['General Care', 'Grooming', 'Vaccination', 'Dental'],
      emergency: false,
      rating: 4.6,
      hours: '9:00 AM - 8:00 PM',
      distance: '3.5 km'
    },
    {
      id: 3,
      name: 'Animal Medical Center',
      address: 'Building 8, Uttara Sector 7, Dhaka',
      phone: '+880-2-456789123',
      services: ['Surgery', 'X-Ray', 'Laboratory', 'Emergency'],
      emergency: true,
      rating: 4.7,
      hours: '24/7',
      distance: '5.2 km'
    },
    {
      id: 4,
      name: 'Companion Animal Clinic',
      address: 'Plot 25, Banani, Dhaka',
      phone: '+880-2-789123456',
      services: ['General Care', 'Vaccination', 'Grooming', 'Boarding'],
      emergency: false,
      rating: 4.5,
      hours: '8:00 AM - 6:00 PM',
      distance: '1.8 km'
    }
  ];

  const vetServices: VetService[] = [
    {
      category: 'General Care',
      services: ['Health checkups', 'Vaccination', 'Deworming', 'Flea treatment'],
      description: 'Routine healthcare to keep your pets healthy',
      icon: Heart
    },
    {
      category: 'Emergency Care',
      services: ['Accident treatment', 'Poisoning', 'Breathing difficulties', 'Severe injuries'],
      description: '24/7 emergency treatment for critical conditions',
      icon: Truck
    },
    {
      category: 'Surgery',
      services: ['Spaying/Neutering', 'Tumor removal', 'Fracture repair', 'Dental surgery'],
      description: 'Surgical procedures performed by qualified veterinarians',
      icon: Stethoscope
    },
    {
      category: 'Specialized Care',
      services: ['X-Ray', 'Laboratory tests', 'Ultrasound', 'Cardiology'],
      description: 'Advanced diagnostic and treatment services',
      icon: Search
    }
  ];

  const emergencySymptoms = [
    {
      symptom: 'Difficulty Breathing',
      description: 'Labored breathing, gasping, or blue gums',
      action: 'Seek immediate veterinary care'
    },
    {
      symptom: 'Severe Bleeding',
      description: 'Uncontrolled bleeding from wounds',
      action: 'Apply pressure and rush to vet'
    },
    {
      symptom: 'Unconsciousness',
      description: 'Animal is unresponsive or collapsed',
      action: 'Emergency veterinary attention needed'
    },
    {
      symptom: 'Suspected Poisoning',
      description: 'Vomiting, seizures, or unusual behavior',
      action: 'Contact poison control and vet immediately'
    },
    {
      symptom: 'Severe Pain',
      description: 'Crying, inability to move, or extreme distress',
      action: 'Immediate pain management required'
    },
    {
      symptom: 'Bloated Abdomen',
      description: 'Swollen, hard abdomen with distress',
      action: 'Emergency surgery may be needed'
    }
  ];

  const filteredClinics = vetClinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === '' || clinic.services.includes(selectedService);
    
    return matchesSearch && matchesService;
  });

  const allServices = ['All Services', ...Array.from(new Set(vetClinics.flatMap(clinic => clinic.services)))];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Animal Treatment & Veterinary Care</h1>
          <p className="text-xl text-gray-600">
            Find qualified veterinarians and animal healthcare services
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Truck className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-800">Animal Emergency</h3>
          </div>
          <p className="text-red-700 mb-4">
            If your pet is experiencing a medical emergency, contact the nearest 24/7 veterinary clinic immediately.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
            Find Emergency Vet
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('clinics')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'clinics'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MapPin className="h-5 w-5 inline mr-2" />
            Vet Clinics
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'services'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Stethoscope className="h-5 w-5 inline mr-2" />
            Services
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'emergency'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Truck className="h-5 w-5 inline mr-2" />
            Emergency
          </button>
        </div>

        {/* Content */}
        {activeTab === 'clinics' && (
          <div>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search clinics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {allServices.map((service) => (
                      <option key={service} value={service === 'All Services' ? '' : service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">24/7 Emergency Only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-4">
              <p className="text-gray-600">
                Found {filteredClinics.length} veterinary clinic{filteredClinics.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Clinics List */}
            <div className="space-y-6">
              {filteredClinics.map((clinic) => (
                <div key={clinic.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="mb-4 md:mb-0 flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 mr-3">{clinic.name}</h3>
                        {clinic.emergency && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            24/7 Emergency
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{clinic.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{clinic.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{clinic.hours}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {clinic.services.map((service, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                          {clinic.distance} away
                        </span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{clinic.rating}</span>
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

            {filteredClinics.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No veterinary clinics found.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Veterinary Services</h2>
              <p className="text-gray-600 mb-6">
                Comprehensive healthcare services available for your pets and animals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vetServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{service.category}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Available Services:</h4>
                      <ul className="space-y-1">
                        {service.services.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-gray-700">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Preventive Care</h3>
              <p className="text-green-700 mb-4">
                Regular preventive care is essential for your pet's health. Schedule routine checkups, 
                vaccinations, and health screenings to catch problems early and keep your animals healthy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-800">Annual Checkups</h4>
                  <p className="text-green-700 text-sm">Comprehensive health examinations</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Stethoscope className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-800">Vaccinations</h4>
                  <p className="text-green-700 text-sm">Protection against diseases</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Search className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-green-800">Health Screening</h4>
                  <p className="text-green-700 text-sm">Early detection of health issues</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Animal Emergency Care</h2>
              <p className="text-gray-600 mb-6">
                Recognize emergency symptoms and know when to seek immediate veterinary care.
              </p>
            </div>

            <div className="space-y-6">
              {emergencySymptoms.map((emergency, index) => (
                <div key={index} className="bg-white border-l-4 border-red-500 rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <Truck className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-800 mb-2">{emergency.symptom}</h3>
                      <p className="text-gray-700 mb-3">{emergency.description}</p>
                      <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <p className="text-red-800 font-semibold">Action: {emergency.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">Emergency Preparedness</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Emergency Kit</h4>
                  <ul className="text-orange-700 space-y-1">
                    <li>• First aid supplies</li>
                    <li>• Emergency contact numbers</li>
                    <li>• Pet carrier or restraints</li>
                    <li>• Medical records</li>
                    <li>• Current medications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-800 mb-2">Important Information</h4>
                  <ul className="text-orange-700 space-y-1">
                    <li>• Know nearest 24/7 vet clinic</li>
                    <li>• Keep vet contact readily available</li>
                    <li>• Know animal poison control number</li>
                    <li>• Have transportation plan</li>
                    <li>• Keep calm during emergencies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">24/7 Emergency Contacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-800">Dhaka Veterinary Hospital</h4>
                  <p className="text-blue-700">Emergency: +880-2-123456789</p>
                  <p className="text-blue-700 text-sm">24/7 Emergency Services</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-800">Animal Medical Center</h4>
                  <p className="text-blue-700">Emergency: +880-2-456789123</p>
                  <p className="text-blue-700 text-sm">Specialized Emergency Care</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalTreatmentPage;