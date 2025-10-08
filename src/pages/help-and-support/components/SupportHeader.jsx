import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportHeader = ({ currentLanguage, onLanguageChange }) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages = [
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' }
  ];

  const content = {
    hi: {
      title: "सहायता और समर्थन",
      subtitle: "हम आपकी सहायता के लिए यहाँ हैं",
      description: "आपके सवालों का जवाब पाएं और तकनीकी सहायता प्राप्त करें",
      emergencyHelp: "आपातकालीन सहायता",
      emergencyNumber: "1800-XXX-XXXX"
    },
    en: {
      title: "Help & Support",
      subtitle: "We\'re here to help you",
      description: "Get answers to your questions and technical assistance",
      emergencyHelp: "Emergency Help",
      emergencyNumber: "1800-XXX-XXXX"
    },
    mr: {
      title: "मदत आणि समर्थन",
      subtitle: "आम्ही तुमच्या मदतीसाठी येथे आहोत",
      description: "तुमच्या प्रश्नांची उत्तरे मिळवा आणि तांत्रिक सहाय्य घ्या",
      emergencyHelp: "आपत्कालीन मदत",
      emergencyNumber: "1800-XXX-XXXX"
    },
    ta: {
      title: "உதவி மற்றும் ஆதரவு",
      subtitle: "நாங்கள் உங்களுக்கு உதவ இங்கே இருக்கிறோம்",
      description: "உங்கள் கேள்விகளுக்கான பதில்களைப் பெறுங்கள் மற்றும் தொழில்நுட்ப உதவி பெறுங்கள்",
      emergencyHelp: "அவசர உதவி",
      emergencyNumber: "1800-XXX-XXXX"
    },
    te: {
      title: "సహాయం మరియు మద్దతు",
      subtitle: "మేము మీకు సహాయం చేయడానికి ఇక్కడ ఉన్నాము",
      description: "మీ ప్రశ్నలకు సమాధానాలు పొందండి మరియు సాంకేతిక సహాయం పొందండి",
      emergencyHelp: "అత్యవసర సహాయం",
      emergencyNumber: "1800-XXX-XXXX"
    },
    bn: {
      title: "সাহায্য এবং সহায়তা",
      subtitle: "আমরা আপনাকে সাহায্য করার জন্য এখানে আছি",
      description: "আপনার প্রশ্নের উত্তর পান এবং প্রযুক্তিগত সহায়তা নিন",
      emergencyHelp: "জরুরি সাহায্য",
      emergencyNumber: "1800-XXX-XXXX"
    }
  };

  const currentContent = content?.[currentLanguage] || content?.hi;

  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-lg">
                <Icon name="HelpCircle" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold">
                  {currentContent?.title}
                </h1>
                <p className="text-primary-foreground/80 text-sm">
                  {currentContent?.subtitle}
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/90 text-lg max-w-2xl">
              {currentContent?.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6 lg:mt-0">
            {/* Emergency Help */}
            <div className="bg-primary-foreground/10 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-full mx-auto mb-2">
                <Icon name="Phone" size={16} className="text-accent-foreground" />
              </div>
              <p className="text-xs font-medium text-primary-foreground/80 mb-1">
                {currentContent?.emergencyHelp}
              </p>
              <p className="text-sm font-bold text-primary-foreground">
                {currentContent?.emergencyNumber}
              </p>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Icon name="Globe" size={16} className="mr-2" />
                {languages?.find(lang => lang?.code === currentLanguage)?.name || 'हिंदी'}
                <Icon name="ChevronDown" size={16} className="ml-2" />
              </Button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-soft py-2 z-50">
                  {languages?.map((language) => (
                    <button
                      key={language?.code}
                      onClick={() => {
                        onLanguageChange(language?.code);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-muted transition-colors ${
                        currentLanguage === language?.code ? 'bg-muted text-primary' : 'text-foreground'
                      }`}
                    >
                      <span className="text-lg">{language?.flag}</span>
                      <span>{language?.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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

export default SupportHeader;