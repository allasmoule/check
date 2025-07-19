import React, { useState } from 'react';
import { Baby, Calendar, Thermometer, Scale, Ruler, Heart, AlertTriangle, Book } from 'lucide-react';

interface VaccinationSchedule {
  age: string;
  vaccines: string[];
  description: string;
}

interface GrowthMilestone {
  ageRange: string;
  physical: string[];
  cognitive: string[];
  social: string[];
}

const ChildHealthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vaccination' | 'growth' | 'nutrition' | 'emergency'>('vaccination');

  const vaccinationSchedule: VaccinationSchedule[] = [
    {
      age: 'Birth',
      vaccines: ['BCG', 'Hepatitis B (1st dose)', 'OPV (Birth dose)'],
      description: 'Vaccines given immediately after birth'
    },
    {
      age: '6 weeks',
      vaccines: ['DPT (1st dose)', 'OPV (1st dose)', 'Hepatitis B (2nd dose)', 'Hib (1st dose)', 'PCV (1st dose)'],
      description: 'First round of routine immunizations'
    },
    {
      age: '10 weeks',
      vaccines: ['DPT (2nd dose)', 'OPV (2nd dose)', 'Hib (2nd dose)', 'PCV (2nd dose)'],
      description: 'Second round of routine immunizations'
    },
    {
      age: '14 weeks',
      vaccines: ['DPT (3rd dose)', 'OPV (3rd dose)', 'Hepatitis B (3rd dose)', 'Hib (3rd dose)', 'PCV (3rd dose)'],
      description: 'Third round of routine immunizations'
    },
    {
      age: '9 months',
      vaccines: ['Measles (1st dose)', 'Vitamin A'],
      description: 'Measles vaccination and vitamin A supplementation'
    },
    {
      age: '15 months',
      vaccines: ['MMR (1st dose)', 'PCV Booster'],
      description: 'Measles, Mumps, Rubella vaccination'
    }
  ];

  const growthMilestones: GrowthMilestone[] = [
    {
      ageRange: '0-3 months',
      physical: ['Lifts head when on tummy', 'Opens and closes hands', 'Brings hands to mouth'],
      cognitive: ['Focuses on faces', 'Follows objects with eyes', 'Recognizes familiar voices'],
      social: ['Smiles responsively', 'Enjoys playing with people', 'Copies some movements']
    },
    {
      ageRange: '4-6 months',
      physical: ['Rolls over', 'Sits with support', 'Reaches for toys'],
      cognitive: ['Responds to own name', 'Shows curiosity', 'Puts things in mouth'],
      social: ['Knows familiar faces', 'Likes to play', 'Responds to emotions']
    },
    {
      ageRange: '7-12 months',
      physical: ['Sits without support', 'Crawls', 'Pulls to stand'],
      cognitive: ['Finds hidden objects', 'Looks at correct picture when named', 'Copies gestures'],
      social: ['Shy with strangers', 'Cries when parent leaves', 'Has favorite toys']
    },
    {
      ageRange: '1-2 years',
      physical: ['Walks alone', 'Climbs stairs', 'Runs'],
      cognitive: ['Says several single words', 'Points to things', 'Follows simple instructions'],
      social: ['Shows independence', 'Plays simple pretend games', 'Shows affection']
    }
  ];

  const nutritionGuidelines = [
    {
      age: '0-6 months',
      title: 'Exclusive Breastfeeding',
      description: 'Breast milk only, no water or other foods needed',
      tips: ['Feed on demand', 'Ensure proper latch', 'Stay hydrated as mother']
    },
    {
      age: '6-12 months',
      title: 'Introduction of Solid Foods',
      description: 'Continue breastfeeding while introducing complementary foods',
      tips: ['Start with single ingredients', 'Introduce new foods gradually', 'Avoid honey and choking hazards']
    },
    {
      age: '1-2 years',
      title: 'Family Foods',
      description: 'Transition to family foods with continued breastfeeding',
      tips: ['Offer variety of foods', 'Limit sugar and salt', 'Encourage self-feeding']
    }
  ];

  const emergencyWarnings = [
    {
      symptom: 'High Fever',
      description: 'Temperature above 100.4°F (38°C) in infants under 3 months',
      action: 'Seek immediate medical attention'
    },
    {
      symptom: 'Difficulty Breathing',
      description: 'Fast breathing, wheezing, or blue lips/face',
      action: 'Call emergency services immediately'
    },
    {
      symptom: 'Severe Dehydration',
      description: 'No wet diapers for 6+ hours, sunken eyes, lethargy',
      action: 'Go to emergency room'
    },
    {
      symptom: 'Persistent Vomiting',
      description: 'Unable to keep fluids down for 12+ hours',
      action: 'Contact pediatrician immediately'
    }
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Child Health</h1>
          <p className="text-xl text-gray-600">
            Comprehensive healthcare information for your child's wellbeing
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('vaccination')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'vaccination'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calendar className="h-4 w-4 inline mr-2" />
            Vaccination
          </button>
          <button
            onClick={() => setActiveTab('growth')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'growth'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Ruler className="h-4 w-4 inline mr-2" />
            Growth
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'nutrition'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="h-4 w-4 inline mr-2" />
            Nutrition
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'emergency'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertTriangle className="h-4 w-4 inline mr-2" />
            Emergency
          </button>
        </div>

        {/* Content */}
        {activeTab === 'vaccination' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vaccination Schedule</h2>
              <p className="text-gray-600 mb-6">
                Follow the recommended vaccination schedule to protect your child from preventable diseases.
              </p>
            </div>

            <div className="space-y-6">
              {vaccinationSchedule.map((schedule, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{schedule.age}</h3>
                      <p className="text-gray-600">{schedule.description}</p>
                    </div>
                  </div>
                  
                  <div className="ml-16">
                    <h4 className="font-semibold text-gray-900 mb-2">Vaccines:</h4>
                    <div className="flex flex-wrap gap-2">
                      {schedule.vaccines.map((vaccine, vIndex) => (
                        <span key={vIndex} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {vaccine}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3" />
                <h3 className="text-lg font-semibold text-yellow-800">Important Note</h3>
              </div>
              <p className="text-yellow-700">
                Always consult with your pediatrician before vaccination. Some children may have specific medical conditions 
                that require modified vaccination schedules.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Growth & Development Milestones</h2>
              <p className="text-gray-600 mb-6">
                Track your child's development with these important milestones. Remember, every child develops at their own pace.
              </p>
            </div>

            <div className="space-y-6">
              {growthMilestones.map((milestone, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Baby className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{milestone.ageRange}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Scale className="h-4 w-4 mr-2 text-blue-600" />
                        Physical Development
                      </h4>
                      <ul className="space-y-2">
                        {milestone.physical.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-gray-700">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Book className="h-4 w-4 mr-2 text-green-600" />
                        Cognitive Development
                      </h4>
                      <ul className="space-y-2">
                        {milestone.cognitive.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-gray-700">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-pink-600" />
                        Social Development
                      </h4>
                      <ul className="space-y-2">
                        {milestone.social.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-gray-700">
                            <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nutrition Guidelines</h2>
              <p className="text-gray-600 mb-6">
                Proper nutrition is essential for your child's healthy growth and development.
              </p>
            </div>

            <div className="space-y-6">
              {nutritionGuidelines.map((guideline, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{guideline.age}</h3>
                      <h4 className="text-green-600 font-semibold">{guideline.title}</h4>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 ml-16">{guideline.description}</p>
                  
                  <div className="ml-16">
                    <h5 className="font-semibold text-gray-900 mb-2">Tips:</h5>
                    <ul className="space-y-1">
                      {guideline.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-gray-700">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Breastfeeding Support</h3>
              <p className="text-blue-700 mb-4">
                Breastfeeding provides the best nutrition for your baby. If you're having difficulties, 
                don't hesitate to seek help from healthcare professionals or lactation consultants.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Find Lactation Support
              </button>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Warning Signs</h2>
              <p className="text-gray-600 mb-6">
                Know when to seek immediate medical attention for your child.
              </p>
            </div>

            <div className="space-y-6">
              {emergencyWarnings.map((warning, index) => (
                <div key={index} className="bg-white border-l-4 border-red-500 rounded-lg shadow-md p-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-red-800 mb-2">{warning.symptom}</h3>
                      <p className="text-gray-700 mb-3">{warning.description}</p>
                      <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <p className="text-red-800 font-semibold">Action: {warning.action}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Thermometer className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="text-lg font-semibold text-red-800">Emergency Contacts</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">999</div>
                  <div className="text-red-800">National Emergency</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">16263</div>
                  <div className="text-red-800">Health Line</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">199</div>
                  <div className="text-red-800">Poison Control</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildHealthPage;