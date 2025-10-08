import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, onEdit, onLanguageChange, currentLanguage }) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const content = {
    hi: {
      greeting: 'नमस्ते',
      profileCompletion: 'प्रोफाइल पूर्णता',
      editProfile: 'प्रोफाइल संपादित करें',
      language: 'भाषा',
      lastUpdated: 'अंतिम अपडेट',
      verificationStatus: 'सत्यापन स्थिति',
      verified: 'सत्यापित',
      pending: 'लंबित',
      notVerified: 'असत्यापित'
    },
    en: {
      greeting: 'Hello',
      profileCompletion: 'Profile Completion',
      editProfile: 'Edit Profile',
      language: 'Language',
      lastUpdated: 'Last Updated',
      verificationStatus: 'Verification Status',
      verified: 'Verified',
      pending: 'Pending',
      notVerified: 'Not Verified'
    },
    mr: {
      greeting: 'नमस्कार',
      profileCompletion: 'प्रोफाइल पूर्णता',
      editProfile: 'प्रोफाइल संपादित करा',
      language: 'भाषा',
      lastUpdated: 'शेवटचे अपडेट',
      verificationStatus: 'सत्यापन स्थिती',
      verified: 'सत्यापित',
      pending: 'प्रलंबित',
      notVerified: 'असत्यापित'
    },
    ta: {
      greeting: 'வணக்கம்',
      profileCompletion: 'சுயவிவர நிறைவு',
      editProfile: 'சுயவிவரத்தைத் திருத்து',
      language: 'மொழி',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
      verificationStatus: 'சரிபார்ப்பு நிலை',
      verified: 'சரிபார்க்கப்பட்டது',
      pending: 'நிலுவையில்',
      notVerified: 'சரிபார்க்கப்படவில்லை'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-error bg-error/10';
    }
  };

  const getVerificationText = (status) => {
    switch (status) {
      case 'verified': return t?.verified;
      case 'pending': return t?.pending;
      default: return t?.notVerified;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Profile Info */}
        <div className="flex items-start space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
              <Image
                src={profile?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                alt={profile?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {profile?.verificationStatus === 'verified' && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-xl font-heading font-semibold text-foreground">
                {t?.greeting}, {profile?.name}
              </h1>
            </div>
            
            <p className="text-muted-foreground mb-2">{profile?.occupation}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">{profile?.location}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-muted-foreground">{profile?.phone}</span>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{t?.profileCompletion}</span>
                <span className="text-sm font-semibold text-primary">{profile?.completionPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${profile?.completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center space-x-2"
            >
              <Icon name="Globe" size={16} />
              <span>{languages?.find(lang => lang?.code === currentLanguage)?.name}</span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {isLanguageMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-soft py-1 z-50">
                {languages?.map((lang) => (
                  <button
                    key={lang?.code}
                    onClick={() => {
                      onLanguageChange(lang?.code);
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      currentLanguage === lang?.code ? 'bg-muted text-primary' : 'text-foreground'
                    }`}
                  >
                    <span>{lang?.flag}</span>
                    <span>{lang?.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="default"
            onClick={onEdit}
            iconName="Edit"
            iconPosition="left"
          >
            {t?.editProfile}
          </Button>
        </div>
      </div>
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t?.verificationStatus}</p>
            <p className={`text-sm font-medium px-2 py-1 rounded-full ${getVerificationColor(profile?.verificationStatus)}`}>
              {getVerificationText(profile?.verificationStatus)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={18} className="text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{t?.lastUpdated}</p>
            <p className="text-sm font-medium text-foreground">{profile?.lastUpdated}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={18} className="text-secondary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Documents</p>
            <p className="text-sm font-medium text-foreground">{profile?.documentsCount}/8 Uploaded</p>
          </div>
        </div>
      </div>
      {/* Overlay for language menu */}
      {isLanguageMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileHeader;   