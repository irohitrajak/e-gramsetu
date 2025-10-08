import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = ({ userName, location, onLanguageChange, currentLanguage }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return currentLanguage === 'hi' ? 'सुप्रभात' : 'Good Morning';
    if (hour < 17) return currentLanguage === 'hi' ? 'नमस्कार' : 'Good Afternoon';
    return currentLanguage === 'hi' ? 'शुभ संध्या' : 'Good Evening';
  };

  const languages = [
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' }];


  const content = {
    hi: {
      welcome: 'स्वागत है',
      tagline: 'आपके अवसरों का डिजिटल सेतु',
      location: 'स्थान',
      lastUpdate: 'अंतिम अपडेट'
    },
    en: {
      welcome: 'Welcome',
      tagline: 'Your Digital Bridge to Opportunities',
      location: 'Location',
      lastUpdate: 'Last Updated'
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold">
                {getGreeting()}, {userName}!
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                {currentContent?.tagline}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} />
              <span>{currentContent?.location}: {location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>{currentTime?.toLocaleTimeString('hi-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              <span>{currentTime?.toLocaleDateString('hi-IN')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={currentLanguage}
              onChange={(e) => onLanguageChange(e?.target?.value)}
              className="text-primary-foreground border border-primary-foreground/30 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 bg-[rgba(72,167,57,1)]">

              {languages?.map((lang) =>
              <option key={lang?.code} value={lang?.code} className="bg-primary text-primary-foreground">
                  {lang?.flag} {lang?.name}
                </option>
              )}
            </select>
          </div>
          
          <Button
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/20 p-2">

            <Icon name="Bell" size={20} />
          </Button>
        </div>
      </div>
    </div>);

};

export default WelcomeHeader;