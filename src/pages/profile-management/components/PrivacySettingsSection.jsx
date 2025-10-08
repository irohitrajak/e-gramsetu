import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySettingsSection = ({ settings, onUpdate, currentLanguage }) => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: settings?.profileVisibility || 'public',
    contactInfoSharing: settings?.contactInfoSharing || false,
    jobAlerts: settings?.jobAlerts || true,
    schemeNotifications: settings?.schemeNotifications || true,
    smsNotifications: settings?.smsNotifications || true,
    emailNotifications: settings?.emailNotifications || false,
    dataSharing: settings?.dataSharing || false,
    locationTracking: settings?.locationTracking || true,
    offlineSync: settings?.offlineSync || true
  });

  const content = {
    hi: {
      privacySettings: 'गोपनीयता सेटिंग्स',
      profileVisibility: 'प्रोफाइल दृश्यता',
      public: 'सार्वजनिक',
      private: 'निजी',
      contactInfoSharing: 'संपर्क जानकारी साझाकरण',
      jobAlerts: 'नौकरी अलर्ट',
      schemeNotifications: 'योजना सूचनाएं',
      smsNotifications: 'SMS सूचनाएं',
      emailNotifications: 'ईमेल सूचनाएं',
      dataSharing: 'डेटा साझाकरण',
      locationTracking: 'स्थान ट्रैकिंग',
      offlineSync: 'ऑफलाइन सिंक',
      saveSettings: 'सेटिंग्स सहेजें',
      profileVisibilityDesc: 'नियंत्रित करें कि आपकी प्रोफाइल कौन देख सकता है',
      contactSharingDesc: 'नियोक्ताओं के साथ संपर्क जानकारी साझा करें',
      jobAlertsDesc: 'नई नौकरी के अवसरों की सूचना प्राप्त करें',
      schemeNotificationsDesc: 'सरकारी योजनाओं की अपडेट प्राप्त करें',
      smsNotificationsDesc: 'SMS के माध्यम से सूचनाएं प्राप्त करें',
      emailNotificationsDesc: 'ईमेल के माध्यम से सूचनाएं प्राप्त करें',
      dataSharingDesc: 'बेहतर सेवाओं के लिए डेटा साझा करें',
      locationTrackingDesc: 'स्थानीय अवसरों के लिए स्थान का उपयोग करें',
      offlineSyncDesc: 'ऑफलाइन उपयोग के लिए डेटा सिंक करें'
    },
    en: {
      privacySettings: 'Privacy Settings',
      profileVisibility: 'Profile Visibility',
      public: 'Public',
      private: 'Private',
      contactInfoSharing: 'Contact Info Sharing',
      jobAlerts: 'Job Alerts',
      schemeNotifications: 'Scheme Notifications',
      smsNotifications: 'SMS Notifications',
      emailNotifications: 'Email Notifications',
      dataSharing: 'Data Sharing',
      locationTracking: 'Location Tracking',
      offlineSync: 'Offline Sync',
      saveSettings: 'Save Settings',
      profileVisibilityDesc: 'Control who can view your profile',
      contactSharingDesc: 'Share contact information with employers',
      jobAlertsDesc: 'Receive notifications about new job opportunities',
      schemeNotificationsDesc: 'Get updates about government schemes',
      smsNotificationsDesc: 'Receive notifications via SMS',
      emailNotificationsDesc: 'Receive notifications via email',
      dataSharingDesc: 'Share data for better services',
      locationTrackingDesc: 'Use location for local opportunities',
      offlineSyncDesc: 'Sync data for offline usage'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const handleToggle = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev?.[setting]
    }));
  };

  const handleVisibilityChange = (visibility) => {
    setPrivacySettings(prev => ({
      ...prev,
      profileVisibility: visibility
    }));
  };

  const handleSave = () => {
    onUpdate(privacySettings);
  };

  const privacyOptions = [
    {
      key: 'contactInfoSharing',
      title: t?.contactInfoSharing,
      description: t?.contactSharingDesc,
      icon: 'Share2',
      color: 'text-primary'
    },
    {
      key: 'jobAlerts',
      title: t?.jobAlerts,
      description: t?.jobAlertsDesc,
      icon: 'Briefcase',
      color: 'text-accent'
    },
    {
      key: 'schemeNotifications',
      title: t?.schemeNotifications,
      description: t?.schemeNotificationsDesc,
      icon: 'Bell',
      color: 'text-secondary'
    },
    {
      key: 'smsNotifications',
      title: t?.smsNotifications,
      description: t?.smsNotificationsDesc,
      icon: 'MessageSquare',
      color: 'text-success'
    },
    {
      key: 'emailNotifications',
      title: t?.emailNotifications,
      description: t?.emailNotificationsDesc,
      icon: 'Mail',
      color: 'text-warning'
    },
    {
      key: 'dataSharing',
      title: t?.dataSharing,
      description: t?.dataSharingDesc,
      icon: 'Database',
      color: 'text-error'
    },
    {
      key: 'locationTracking',
      title: t?.locationTracking,
      description: t?.locationTrackingDesc,
      icon: 'MapPin',
      color: 'text-primary'
    },
    {
      key: 'offlineSync',
      title: t?.offlineSync,
      description: t?.offlineSyncDesc,
      icon: 'Download',
      color: 'text-accent'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Shield" size={20} className="text-success" />
        </div>
        <h2 className="text-lg font-heading font-semibold text-foreground">
          {t?.privacySettings}
        </h2>
      </div>
      <div className="space-y-6">
        {/* Profile Visibility */}
        <div className="pb-6 border-b border-border">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
              <Icon name="Eye" size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">{t?.profileVisibility}</h3>
              <p className="text-sm text-muted-foreground mb-3">{t?.profileVisibilityDesc}</p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => handleVisibilityChange('public')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    privacySettings?.profileVisibility === 'public' ?'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Icon name="Globe" size={16} />
                  <span>{t?.public}</span>
                </button>
                
                <button
                  onClick={() => handleVisibilityChange('private')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    privacySettings?.profileVisibility === 'private' ?'border-primary bg-primary/10 text-primary' :'border-border bg-background text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  <Icon name="Lock" size={16} />
                  <span>{t?.private}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Options */}
        <div className="space-y-4">
          {privacyOptions?.map((option) => (
            <div key={option?.key} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`w-8 h-8 bg-muted rounded-lg flex items-center justify-center mt-1`}>
                <Icon name={option?.icon} size={16} className={option?.color} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{option?.title}</h3>
                    <p className="text-sm text-muted-foreground">{option?.description}</p>
                  </div>
                  
                  <button
                    onClick={() => handleToggle(option?.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      privacySettings?.[option?.key] ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacySettings?.[option?.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            {t?.saveSettings}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsSection;