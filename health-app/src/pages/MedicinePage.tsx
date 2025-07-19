import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, Package, Truck } from 'lucide-react';

interface Medicine {
  id: number;
  name: string;
  genericName: string;
  manufacturer: string;
  price: number;
  inStock: boolean;
  description: string;
}

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  distance: string;
  rating: number;
  openNow: boolean;
}

const MedicinePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'medicines' | 'pharmacies'>('medicines');

  const medicines: Medicine[] = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      genericName: 'Acetaminophen',
      manufacturer: 'Square Pharmaceuticals',
      price: 2.50,
      inStock: true,
      description: 'Pain reliever and fever reducer'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      genericName: 'Amoxicillin',
      manufacturer: 'Beximco Pharmaceuticals',
      price: 8.75,
      inStock: true,
      description: 'Antibiotic for bacterial infections'
    },
    {
      id: 3,
      name: 'Omeprazole 20mg',
      genericName: 'Omeprazole',
      manufacturer: 'Incepta Pharmaceuticals',
      price: 5.25,
      inStock: false,
      description: 'Proton pump inhibitor for acid reflux'
    },
    {
      id: 4,
      name: 'Metformin 500mg',
      genericName: 'Metformin HCl',
      manufacturer: 'Renata Limited',
      price: 3.80,
      inStock: true,
      description: 'Diabetes medication'
    }
  ];

  const pharmacies: Pharmacy[] = [
    {
      id: 1,
      name: 'Lazz Pharma',
      address: 'House 12, Road 5, Dhanmondi, Dhaka',
      phone: '+880-2-123456789',
      distance: '0.5 km',
      rating: 4.8,
      openNow: true
    },
    {
      id: 2,
      name: 'Pharmacy Plus',
      address: 'Shop 25, Gulshan Avenue, Gulshan, Dhaka',
      phone: '+880-2-987654321',
      distance: '1.2 km',
      rating: 4.6,
      openNow: true
    },
    {
      id: 3,
      name: 'City Pharmacy',
      address: 'Building 8, Uttara Sector 3, Dhaka',
      phone: '+880-2-456789123',
      distance: '2.1 km',
      rating: 4.4,
      openNow: false
    },
    {
      id: 4,
      name: 'Health Care Pharmacy',
      address: 'Plot 15, Banani Commercial Area, Dhaka',
      phone: '+880-2-789123456',
      distance: '1.8 km',
      rating: 4.7,
      openNow: true
    }
  ];

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPharmacies = pharmacies.filter(pharmacy =>
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Medicine & Pharmacy</h1>
          <p className="text-xl text-gray-600">
            Find medicines and locate nearby pharmacies
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search medicines or pharmacies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('medicines')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'medicines'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="h-5 w-5 inline mr-2" />
            Medicines
          </button>
          <button
            onClick={() => setActiveTab('pharmacies')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'pharmacies'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MapPin className="h-5 w-5 inline mr-2" />
            Pharmacies
          </button>
        </div>

        {/* Content */}
        {activeTab === 'medicines' ? (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                Found {filteredMedicines.length} medicine{filteredMedicines.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedicines.map((medicine) => (
                <div key={medicine.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{medicine.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      medicine.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Generic:</span> {medicine.genericName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Manufacturer:</span> {medicine.manufacturer}
                    </p>
                    <p className="text-gray-600">{medicine.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">৳{medicine.price}</span>
                    <button 
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        medicine.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!medicine.inStock}
                    >
                      {medicine.inStock ? 'Add to Cart' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredMedicines.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No medicines found.</p>
                <p className="text-gray-400 mt-2">Try searching with different keywords.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <p className="text-gray-600">
                Found {filteredPharmacies.length} pharmac{filteredPharmacies.length !== 1 ? 'ies' : 'y'}
              </p>
            </div>

            <div className="space-y-6">
              {filteredPharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="mb-4 md:mb-0 flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 mr-3">{pharmacy.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pharmacy.openNow 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <Clock className="h-3 w-3 inline mr-1" />
                          {pharmacy.openNow ? 'Open Now' : 'Closed'}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{pharmacy.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{pharmacy.phone}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                          {pharmacy.distance} away
                        </span>
                        <span className="text-yellow-500">
                          ★ {pharmacy.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 md:ml-6">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        <MapPin className="h-4 w-4 inline mr-2" />
                        Get Directions
                      </button>
                      <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Call Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPharmacies.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No pharmacies found.</p>
                <p className="text-gray-400 mt-2">Try searching in a different area.</p>
              </div>
            )}
          </div>
        )}

        {/* Emergency Medicine Delivery */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Truck className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-blue-800">Emergency Medicine Delivery</h3>
          </div>
          <p className="text-blue-700 mb-4">
            Need urgent medicine delivery? We provide 24/7 emergency medicine delivery service across Dhaka.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Request Emergency Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicinePage;