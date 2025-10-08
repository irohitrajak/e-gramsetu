import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'सर्वर लोड चेतावनी',
      message: 'डेटाबेस सर्वर पर उच्च लोड - तत्काल ध्यान दें',
      timestamp: '2025-10-07T09:30:00',
      isRead: false,
      action: 'check_server'
    },
    {
      id: 2,
      type: 'warning',
      title: 'SMS गेटवे सीमा',
      message: 'दैनिक SMS सीमा 80% पहुंच गई - 2000/2500',
      timestamp: '2025-10-07T09:15:00',
      isRead: false,
      action: 'increase_limit'
    },
    {
      id: 3,
      type: 'info',
      title: 'नई योजना अपडेट',
      message: 'प्रधानमंत्री कौशल विकास योजना 4.0 लॉन्च',
      timestamp: '2025-10-07T08:45:00',
      isRead: true,
      action: 'view_scheme'
    },
    {
      id: 4,
      type: 'success',
      title: 'बैकअप पूर्ण',
      message: 'दैनिक डेटा बैकअप सफलतापूर्वक पूर्ण',
      timestamp: '2025-10-07T06:00:00',
      isRead: true,
      action: 'view_backup'
    },
    {
      id: 5,
      type: 'warning',
      title: 'API दर सीमा',
      message: 'WhatsApp API दर सीमा 90% - कुछ संदेश विलंबित',
      timestamp: '2025-10-07T07:30:00',
      isRead: false,
      action: 'check_api'
    }
  ]);

  const getAlertIcon = (type) => {
    const icons = {
      critical: 'AlertTriangle',
      warning: 'AlertCircle',
      info: 'Info',
      success: 'CheckCircle'
    };
    return icons?.[type] || 'Bell';
  };

  const getAlertColor = (type) => {
    const colors = {
      critical: 'text-red-600 bg-red-50 border-red-200',
      warning: 'text-amber-600 bg-amber-50 border-amber-200',
      info: 'text-blue-600 bg-blue-50 border-blue-200',
      success: 'text-green-600 bg-green-50 border-green-200'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleTimeString('hi-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const markAsRead = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const unreadCount = alerts?.filter(alert => !alert?.isRead)?.length;

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              सिस्टम अलर्ट
            </h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                {unreadCount} नए
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="Settings" size={16} className="mr-2" />
            सेटिंग्स
          </Button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {alerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="mx-auto text-green-500 mb-3" />
            <h4 className="text-sm font-medium text-foreground mb-1">
              कोई अलर्ट नहीं
            </h4>
            <p className="text-xs text-muted-foreground">
              सभी सिस्टम सामान्य रूप से काम कर रहे हैं
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {alerts?.map((alert) => (
              <div 
                key={alert?.id} 
                className={`p-4 hover:bg-muted/30 transition-colors ${
                  !alert?.isRead ? 'bg-muted/20' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getAlertColor(alert?.type)}`}>
                    <Icon name={getAlertIcon(alert?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${
                        !alert?.isRead ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {alert?.title}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatTime(alert?.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {alert?.message}
                    </p>
                    
                    <div className="flex items-center space-x-2">
                      {!alert?.isRead && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(alert?.id)}
                          className="text-xs"
                        >
                          पढ़ा गया चिह्नित करें
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => dismissAlert(alert?.id)}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        खारिज करें
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {alerts?.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-xs">
              सभी को पढ़ा गया चिह्नित करें
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              सभी अलर्ट देखें
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemAlerts;