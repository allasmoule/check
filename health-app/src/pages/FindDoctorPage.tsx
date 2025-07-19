import React, { useState } from 'react';
import { Search, MapPin, Phone, Star, Clock, Filter } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  phone: string;
  rating: number;
  experience: number;
  available: boolean;
  image: string;
}

const FindDoctorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Rahman Ahmed',
      specialty: 'Cardiologist',
      hospital: 'Dhaka Medical College Hospital',
      location: 'Dhaka',
      phone: '+880-2-123456789',
      rating: 4.8,
      experience: 15,
      available: true,
      image: 'https://images.pexels.com/photos/612807/pexels-photo-612807.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Dr. Fatima Khan',
      specialty: 'Pediatrician',
      hospital: 'Bangabandhu Sheikh Mujib Medical University',
      location: 'Dhaka',
      phone: '+880-2-987654321',
      rating: 4.9,
      experience: 12,
      available: true,
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      name: 'Dr. Mohammad Ali',
      specialty: 'Orthopedic Surgeon',
      hospital: 'Chittagong Medical College Hospital',
      location: 'Chittagong',
      phone: '+880-31-123456789',
      rating: 4.7,
      experience: 18,
      available: false,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 4,
      name: 'Dr. Nasreen Begum',
      specialty: 'Gynecologist',
      hospital: 'Sir Salimullah Medical College',
      location: 'Dhaka',
      phone: '+880-2-456789123',
      rating: 4.6,
      experience: 10,
      available: true,
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const specialties = [
    'All Specialties',
    'Cardiologist',
    'Pediatrician',
    'Orthopedic Surgeon',
    'Gynecologist',
    'Neurologist',
    'Dermatologist',
    'Psychiatrist'
  ];

  const locations = [
    'All Locations',
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barisal',
    'Rangpur'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === '' || selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === '' || selectedLocation === 'All Locations' || doctor.location === selectedLocation;
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find a Doctor</h1>
          <p className="text-xl text-gray-600">
            Connect with qualified healthcare professionals near you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by doctor name, specialty, or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Doctors List */}
        <div className="space-y-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-32 md:h-32 w-24 h-24 mx-auto md:mx-0 mb-4 md:mb-0 md:mr-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                      
                      <div className="space-y-1 text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{doctor.hospital}, {doctor.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{doctor.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>{doctor.rating} ({doctor.experience} years experience)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center md:items-end">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                        doctor.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <Clock className="h-4 w-4 inline mr-1" />
                        {doctor.available ? 'Available' : 'Busy'}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                          Book Appointment
                        </button>
                        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctorPage;