import React, { useState } from 'react';
import { MessageSquare, Star, Send, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface FeedbackItem {
  id: number;
  type: 'suggestion' | 'complaint' | 'compliment' | 'bug_report';
  title: string;
  message: string;
  rating: number;
  status: 'pending' | 'reviewed' | 'resolved';
  date: string;
  response?: string;
}

const FeedbackPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'submit' | 'history' | 'community'>('submit');
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'complaint' | 'compliment' | 'bug_report'>('suggestion');
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    category: '',
    anonymous: false
  });

  const [feedbackHistory] = useState<FeedbackItem[]>([
    {
      id: 1,
      type: 'suggestion',
      title: 'Add telemedicine feature',
      message: 'It would be great to have video consultation with doctors.',
      rating: 5,
      status: 'reviewed',
      date: '2024-03-10',
      response: 'Thank you for your suggestion. We are working on implementing telemedicine features in our next update.'
    },
    {
      id: 2,
      type: 'complaint',
      title: 'Slow loading times',
      message: 'The app takes too long to load doctor information.',
      rating: 2,
      status: 'resolved',
      date: '2024-03-08',
      response: 'We have optimized our servers and the loading times should be significantly improved now.'
    },
    {
      id: 3,
      type: 'compliment',
      title: 'Excellent blood donation feature',
      message: 'The blood donation finder helped me find donors quickly during an emergency.',
      rating: 5,
      status: 'reviewed',
      date: '2024-03-05'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Feedback submitted:', { ...formData, type: feedbackType, rating });
    alert('Thank you for your feedback! We will review it and get back to you soon.');
    setFormData({ title: '', message: '', category: '', anonymous: false });
    setRating(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return MessageSquare;
      case 'complaint': return AlertTriangle;
      case 'compliment': return ThumbsUp;
      case 'bug_report': return AlertTriangle;
      default: return MessageSquare;
    }
  };

  const categories = [
    'Doctor Services',
    'Medicine & Pharmacy',
    'Blood Donation',
    'Health Information',
    'User Interface',
    'Performance',
    'Other'
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Feedback & Support</h1>
          <p className="text-xl text-gray-600">
            Help us improve HealthCare BD with your valuable feedback
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'submit'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Send className="h-5 w-5 inline mr-2" />
            Submit Feedback
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="h-5 w-5 inline mr-2" />
            My Feedback
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'community'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ThumbsUp className="h-5 w-5 inline mr-2" />
            Community
          </button>
        </div>

        {/* Content */}
        {activeTab === 'submit' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Feedback</h2>
              
              {/* Feedback Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type of Feedback
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { type: 'suggestion', label: 'Suggestion', icon: MessageSquare, color: 'blue' },
                    { type: 'complaint', label: 'Complaint', icon: AlertTriangle, color: 'red' },
                    { type: 'compliment', label: 'Compliment', icon: ThumbsUp, color: 'green' },
                    { type: 'bug_report', label: 'Bug Report', icon: AlertTriangle, color: 'orange' }
                  ].map(({ type, label, icon: Icon, color }) => (
                    <button
                      key={type}
                      onClick={() => setFeedbackType(type as any)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        feedbackType === type
                          ? `border-${color}-500 bg-${color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`h-6 w-6 mx-auto mb-2 ${
                        feedbackType === type ? `text-${color}-600` : 'text-gray-400'
                      }`} />
                      <span className={`text-sm font-medium ${
                        feedbackType === type ? `text-${color}-800` : 'text-gray-600'
                      }`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief summary of your feedback"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide detailed feedback..."
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 ${
                          star <= rating ? 'text-yellow-500' : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'No rating'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                    className="mr-2 text-blue-600"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    Submit anonymously
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">My Feedback History</h2>
              <p className="text-gray-600">Track the status of your submitted feedback</p>
            </div>

            <div className="space-y-6">
              {feedbackHistory.map((feedback) => {
                const Icon = getTypeIcon(feedback.type);
                return (
                  <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-lg mr-4">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{feedback.title}</h3>
                          <p className="text-sm text-gray-500 capitalize">{feedback.type.replace('_', ' ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feedback.status)}`}>
                          {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                        </span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{feedback.message}</p>
                    
                    {feedback.response && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-semibold text-blue-800">Response from HealthCare BD</span>
                        </div>
                        <p className="text-blue-700">{feedback.response}</p>
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-500">
                      Submitted on {new Date(feedback.date).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>

            {feedbackHistory.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No feedback submitted yet</p>
                <p className="text-gray-400 mt-2">Share your thoughts to help us improve!</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'community' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Feedback</h2>
              <p className="text-gray-600">See what others are saying and vote on suggestions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Suggestions</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Add telemedicine feature', votes: 45, status: 'In Progress' },
                    { title: 'Improve search functionality', votes: 32, status: 'Under Review' },
                    { title: 'Mobile app development', votes: 28, status: 'Planned' }
                  ].map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{suggestion.title}</p>
                        <p className="text-sm text-gray-600">{suggestion.status}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-700">{suggestion.votes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Fixed loading issues', date: '2024-03-15', type: 'Bug Fix' },
                    { title: 'Added new blood banks', date: '2024-03-12', type: 'Feature' },
                    { title: 'Improved search speed', date: '2024-03-10', type: 'Enhancement' }
                  ].map((update, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900">{update.title}</p>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {update.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{update.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Thank You!</h3>
              <p className="text-green-700 mb-4">
                Your feedback helps us improve HealthCare BD for everyone. We've implemented over 50 user suggestions 
                in the past year, making our platform more user-friendly and effective.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">150+</div>
                  <div className="text-green-700">Feedback Received</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-green-700">Features Implemented</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-green-700">User Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;