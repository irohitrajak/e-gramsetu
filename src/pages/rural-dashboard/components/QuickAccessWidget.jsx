import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessWidget = ({ currentLanguage }) => {
  const content = {
    hi: {
      title: 'त्वरित पहुंच',
      subtitle: 'मुख्य सेवाओं तक तुरंत पहुंचें',
      actions: [
        { 
          id: 'jobs', 
          title: 'नौकरी खोजें', 
          description: 'रोजगार के अवसर देखें',
          icon: 'Briefcase',
          color: 'bg-blue-500',
          route: '/job-discovery-engine'
        },
        { 
          id: 'schemes', 
          title: 'योजनाएं', 
          description: 'सरकारी योजनाओं की जानकारी',
          icon: 'FileText',
          color: 'bg-green-500',
          route: '/scheme-navigator'
        },
        { 
          id: 'profile', 
          title: 'प्रोफाइल', 
          description: 'अपनी जानकारी अपडेट करें',
          icon: 'User',
          color: 'bg-purple-500',
          route: '/profile-management'
        },
        { 
          id: 'help', 
          title: 'सहायता', 
          description: 'मदद और सहायता प्राप्त करें',
          icon: 'HelpCircle',
          color: 'bg-orange-500',
          route: '/help-and-support'
        }
      ]
    },
    en: {
      title: 'Quick Access',
      subtitle: 'Access main services instantly',
      actions: [
        { 
          id: 'jobs', 
          title: 'Find Jobs', 
          description: 'Explore employment opportunities',
          icon: 'Briefcase',
          color: 'bg-blue-500',
          route: '/job-discovery-engine'
        },
        { 
          id: 'schemes', 
          title: 'Schemes', 
          description: 'Government scheme information',
          icon: 'FileText',
          color: 'bg-green-500',
          route: '/scheme-navigator'
        },
        { 
          id: 'profile', 
          title: 'Profile', 
          description: 'Update your information',
          icon: 'User',
          color: 'bg-purple-500',
          route: '/profile-management'
        },
        { 
          id: 'help', 
          title: 'Help', 
          description: 'Get help and support',
          icon: 'HelpCircle',
          color: 'bg-orange-500',
          route: '/help-and-support'
        }
      ]
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  const handleNavigation = (route) => {
    window.location.href = route;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            {currentContent?.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {currentContent?.subtitle}
          </p>
        </div>
        <Icon name="Zap" size={24} className="text-accent" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {currentContent?.actions?.map((action) => (
          <Button
            key={action?.id}
            variant="ghost"
            onClick={() => handleNavigation(action?.route)}
            className="h-auto p-4 flex flex-col items-center text-center hover:bg-muted transition-all duration-200 group"
          >
            <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={action?.icon} size={24} className="text-white" />
            </div>
            <h3 className="font-medium text-foreground text-sm mb-1">
              {action?.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-tight">
              {action?.description}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessWidget;