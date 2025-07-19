import React, { useState } from 'react';
import { Bell, Check, Trash2, Settings, Filter, Calendar, AlertTriangle, Info, Heart } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'appointment' | 'health_alert' | 'medication' | 'general';
  read: boolean;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'Your appointment with Dr. Rahman is scheduled for tomorrow at 2:00 PM',
      type: 'appointment',
      read: false,
      timestamp: '2024-03-15T10:30:00',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Dengue Alert',
      message: 'Dengue cases increasing in your area. Take preventive measures.',
      type: 'health_alert',
      read: false,
      timestamp: '2024-03-15T09:15:00',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Medication Reminder',
      message: 'Time to take your blood pressure medication',
      type: 'medication',
      read: true,
      timestamp: '2024-03-15T08:00:00',
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Health Tip',
      message: 'Stay hydrated! Drink at least 8 glasses of water daily.',
      type: 'general',
      read: true,
      timestamp: '2024-03-14T16:45:00',
      priority: 'low'
    },
    {
      id: 5,
      title: 'Vaccination Due',
      message: 'Your annual flu vaccination is due. Schedule an appointment.',
      type: 'health_alert',
      read: false,
      timestamp: '2024-03-14T14:20:00',
      priority: 'medium'
    },
    {
      id: 6,
      title: 'Lab Results Ready',
      message: 'Your blood test results are now available. Check with your doctor.',
      type: 'general',
      read: true,
      timestamp: '2024-03-14T11:30:00',
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'appointment' | 'health_alert' | 'medication' | 'general'>('all');
  const [showSettings, setShowSettings] = useState(false);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'health_alert': return AlertTriangle;
      case 'medication': return Heart;
      case 'general': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'border-l-red-500 bg-red-50';
    if (type === 'appointment') return 'border-l-blue-500 bg-blue-50';
    if (type === 'health_alert') return 'border-l-orange-500 bg-orange-50';
    if (type === 'medication') return 'border-l-green-500 bg-green-50';
    return 'border-l-gray-500 bg-gray-50';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-xl text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Notification Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Email Notifications</h4>
                <div className="space-y-2">
                  {['Appointment reminders', 'Health alerts', 'Medication reminders', 'General updates'].map((setting) => (
                    <label key={setting} className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2 text-blue-600" />
                      <span className="text-sm text-gray-700">{setting}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">SMS Notifications</h4>
                <div className="space-y-2">
                  {['Urgent health alerts', 'Appointment confirmations', 'Medication reminders', 'Lab results'].map((setting) => (
                    <label key={setting} className="flex items-center">
                      <input type="checkbox" defaultChecked={setting.includes('Urgent') || setting.includes('Appointment')} className="mr-2 text-blue-600" />
                      <span className="text-sm text-gray-700">{setting}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Quiet Hours</h4>
                  <p className="text-sm text-gray-600">Disable non-urgent notifications during these hours</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="time" defaultValue="22:00" className="px-2 py-1 border border-gray-300 rounded text-sm" />
                  <span className="text-gray-500">to</span>
                  <input type="time" defaultValue="07:00" className="px-2 py-1 border border-gray-300 rounded text-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { key: 'all', label: 'All', icon: Bell },
            { key: 'unread', label: 'Unread', icon: Bell },
            { key: 'appointment', label: 'Appointments', icon: Calendar },
            { key: 'health_alert', label: 'Health Alerts', icon: AlertTriangle },
            { key: 'medication', label: 'Medications', icon: Heart },
            { key: 'general', label: 'General', icon: Info }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`py-2 px-4 rounded-md font-medium transition-colors ${
                filter === key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4 inline mr-2" />
              {label}
              {key === 'unread' && unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No notifications found</p>
              <p className="text-gray-400 mt-2">
                {filter === 'unread' ? 'All notifications have been read' : 'Check back later for updates'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getNotificationColor(notification.type, notification.priority)} ${
                    !notification.read ? 'ring-2 ring-blue-100' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                      <div className="mr-4">
                        <Icon className={`h-6 w-6 ${
                          notification.priority === 'high' ? 'text-red-600' :
                          notification.type === 'appointment' ? 'text-blue-600' :
                          notification.type === 'health_alert' ? 'text-orange-600' :
                          notification.type === 'medication' ? 'text-green-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h3 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                          {notification.priority === 'high' && (
                            <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              High Priority
                            </span>
                          )}
                        </div>
                        <p className={`${!notification.read ? 'text-gray-700' : 'text-gray-600'} mb-2`}>
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Mark as read"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete notification"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Actions */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors">
                <Calendar className="h-5 w-5 inline mr-2" />
                Schedule Appointment
              </button>
              <button className="bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 transition-colors">
                <Heart className="h-5 w-5 inline mr-2" />
                Set Medication Reminder
              </button>
              <button className="bg-orange-600 text-white px-4 py-3 rounded-md hover:bg-orange-700 transition-colors">
                <AlertTriangle className="h-5 w-5 inline mr-2" />
                View Health Alerts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;