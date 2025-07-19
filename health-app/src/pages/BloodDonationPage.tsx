import React, { useState } from 'react';
import { Search, MapPin, Phone, Droplets, Clock, User, Calendar } from 'lucide-react';

interface BloodDonor {
  id: number;
  name: string;
  bloodType: string;
  location: string;
  phone: string;
  lastDonation: string;
  available: boolean;
  distance: string;
}

interface BloodBank {
  id: number;
  name: string;
  address: string;
  phone: string;
  bloodTypes: string[];
  openHours: string;
  emergency: boolean;
}

const BloodDonationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [activeTab, setActiveTab] = useState<'donors' | 'banks'>('donors');

  const bloodTypes = ['All Types', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const donors: BloodDonor[] = [
    {
      id: 1,
      name: 'Ahmed Rahman',
      bloodType: 'O+',
      location: 'Dhanmondi, Dhaka',
      phone: '০১৮৮৭৬৫৪৩২১',
      lastDonation: '2024-01-15',
      available: true,
      distance: '2.1 km'
    },
    {
      id: 2,
      name: 'Fatima Khan',
      bloodType: 'A+',
      location: 'Gulshan, Dhaka',
      phone: '০১৭১২৩৪৫৬৭৮',
      lastDonation: '2023-12-20',
      available: true,
      distance: '3.5 km'
    },
    {
      id: 3,
      name: 'Mohammad Ali',
      bloodType: 'B+',
      location: 'Uttara, Dhaka',
      phone: '০১৯৮৭৬৫৪৩২১',
      lastDonation: '2024-02-10',
      available: false,
      distance: '5.2 km'
    },
    {
      id: 4,
      name: 'Nasreen Begum',
      bloodType: 'AB+',
      location: 'Banani, Dhaka',
      phone: '০১৫১২৩৪৫৬৭৮',
      lastDonation: '2023-11-30',
      available: true,
      distance: '1.8 km'
    }
  ];

  const bloodBanks: BloodBank[] = [
    {
      id: 1,
      name: 'Dhaka Medical College Blood Bank',
      address: 'Dhaka Medical College Hospital, Dhaka',
      phone: '+880-2-123456789',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      openHours: '24/7',
      emergency: true
    },
    {
      id: 2,
      name: 'Bangabandhu Sheikh Mujib Medical University Blood Bank',
      address: 'BSMMU, Shahbag, Dhaka',
      phone: '+880-2-987654321',
      bloodTypes: ['A+', 'B+', 'O+', 'AB+'],
      openHours: '8:00 AM - 8:00 PM',
      emergency: false
    },
    {
      id: 3,
      name: 'Red Crescent Blood Bank',
      address: 'Red Crescent Building, Dhaka',
      phone: '+880-2-456789123',
      bloodTypes: ['A+', 'A-', 'B+', 'O+', 'O-'],
      openHours: '9:00 AM - 6:00 PM',
      emergency: false
    }
  ];

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodType = selectedBloodType === '' || selectedBloodType === 'All Types' || donor.bloodType === selectedBloodType;
    
    return matchesSearch && matchesBloodType;
  });

  const filteredBloodBanks = bloodBanks.filter(bank => {
    const matchesSearch = bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bank.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodType = selectedBloodType === '' || selectedBloodType === 'All Types' || 
                            bank.bloodTypes.includes(selectedBloodType);
    
    return matchesSearch && matchesBloodType;
  });

  const getBloodTypeColor = (bloodType: string) => {
    const colors: { [key: string]: string } = {
      'A+': 'bg-red-100 text-red-800',
      'A-': 'bg-red-200 text-red-900',
      'B+': 'bg-blue-100 text-blue-800',
      'B-': 'bg-blue-200 text-blue-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900',
      'O+': 'bg-green-100 text-green-800',
      'O-': 'bg-green-200 text-green-900'
    };
    return colors[bloodType] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blood Donation</h1>
          <p className="text-xl text-gray-600">
            Find blood donors and blood banks near you
          </p>
        </div>

        {/* Emergency Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Droplets className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold text-red-800">Emergency Blood Request</h3>
          </div>
          <p className="text-red-700 mb-4">
            Need blood urgently? Contact our 24/7 emergency blood service.
          </p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors">
            Emergency Request
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <select
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('donors')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === 'donors'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Donors
              </button>
              <button
                onClick={() => setActiveTab('banks')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === 'banks'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Droplets className="h-4 w-4 inline mr-2" />
                Banks
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'donors' ? (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                Found {filteredDonors.length} donor{filteredDonors.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
                <div key={donor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{donor.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBloodTypeColor(donor.bloodType)}`}>
                          {donor.bloodType}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      donor.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {donor.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{donor.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{donor.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">Last donation: {donor.lastDonation}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">{donor.distance} away</span>
                    <button 
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        donor.available
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!donor.available}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredDonors.length === 0 && (
              <div className="text-center py-12">
                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No donors found.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                Found {filteredBloodBanks.length} blood bank{filteredBloodBanks.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="space-y-6">
              {filteredBloodBanks.map((bank) => (
                <div key={bank.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="mb-4 md:mb-0 flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 mr-3">{bank.name}</h3>
                        {bank.emergency && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            24/7 Emergency
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{bank.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{bank.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{bank.openHours}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Available Blood Types:</p>
                        <div className="flex flex-wrap gap-2">
                          {bank.bloodTypes.map((type) => (
                            <span key={type} className={`px-2 py-1 rounded text-xs font-medium ${getBloodTypeColor(type)}`}>
                              {type}
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

            {filteredBloodBanks.length === 0 && (
              <div className="text-center py-12">
                <Droplets className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No blood banks found.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        )}

        {/* Become a Donor */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Become a Blood Donor</h3>
            <p className="text-blue-700 mb-4">
              Join our community of life-savers. Your donation can save up to 3 lives.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
              Register as Donor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonationPage;