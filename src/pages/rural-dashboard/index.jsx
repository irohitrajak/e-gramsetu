import React, { useState, useEffect } from 'react';
import WelcomeHeader from './components/WelcomeHeader';
import QuickAccessWidget from './components/QuickAccessWidget';
import StatsOverview from './components/StatsOverview';
import RecentOpportunities from './components/RecentOpportunities';
import EmergencyContacts from './components/EmergencyContacts';
import VoiceAssistant from './components/VoiceAssistant';

const RuralDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('hi');
  const [userName] = useState('रोहित रजक');
  const [userLocation] = useState('जबलपुर , मध्यप्रदेश ');

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6 space-y-10">
          {/* Welcome Header */}
          <WelcomeHeader
            userName={userName}
            location={userLocation}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Primary Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Access Widget */}
              <QuickAccessWidget currentLanguage={currentLanguage} />
              
              {/* Stats Overview */}
              <StatsOverview currentLanguage={currentLanguage} />
              
              {/* Recent Opportunities */}
              <RecentOpportunities currentLanguage={currentLanguage} />
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-8">
              {/* Voice Assistant */}
              <VoiceAssistant currentLanguage={currentLanguage} />
              
              {/* Emergency Contacts */}
              <EmergencyContacts currentLanguage={currentLanguage} />
            </div>
          </div>

          {/* Bottom Section - Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Success Stories Preview */}
            <div className="bg-card rounded-lg p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  {currentLanguage === 'hi' ? 'सफलता की कहानियां' : 'Success Stories'}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {currentLanguage === 'hi' ?'समुदाय के सदस्यों की प्रेरणादायक कहानियां पढ़ें' :'Read inspiring stories from community members'
                }
              </p>
              <div className="text-2xl font-bold text-green-600 mb-1">2,847</div>
              <div className="text-xs text-muted-foreground">
                {currentLanguage === 'hi' ? 'सफल आवेदक' : 'Successful Applicants'}
              </div>
            </div>

            {/* Digital Literacy */}
            <div className="bg-card rounded-lg p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  {currentLanguage === 'hi' ? 'डिजिटल शिक्षा' : 'Digital Learning'}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {currentLanguage === 'hi' ?'मुफ्त डिजिटल कौशल प्रशिक्षण प्राप्त करें' :'Get free digital skills training'
                }
              </p>
              <div className="text-2xl font-bold text-blue-600 mb-1">156</div>
              <div className="text-xs text-muted-foreground">
                {currentLanguage === 'hi' ? 'उपलब्ध कोर्स' : 'Available Courses'}
              </div>
            </div>

            {/* Community Forum */}
            <div className="bg-card rounded-lg p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  {currentLanguage === 'hi' ? 'सामुदायिक मंच' : 'Community Forum'}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {currentLanguage === 'hi' ?'अन्य उपयोगकर्ताओं से जुड़ें और अनुभव साझा करें' :'Connect with other users and share experiences'
                }
              </p>
              <div className="text-2xl font-bold text-purple-600 mb-1">8,432</div>
              <div className="text-xs text-muted-foreground">
                {currentLanguage === 'hi' ? 'सक्रिय सदस्य' : 'Active Members'}
              </div>
            </div>
          </div>
    </div>
  );
};

export default RuralDashboard;