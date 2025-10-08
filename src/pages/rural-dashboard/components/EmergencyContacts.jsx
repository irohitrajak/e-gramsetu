import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContacts = ({ currentLanguage }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const content = {
    hi: {
      title: 'आपातकालीन संपर्क',
      subtitle: 'तत्काल सहायता के लिए',
      viewAll: 'सभी देखें',
      call: 'कॉल करें',
      message: 'संदेश भेजें',
      contacts: [
        {
          id: 1,
          name: 'हेल्पलाइन - रोजगार',
          number: '1800-123-4567',
          type: 'employment',
          description: 'नौकरी संबंधी सहायता',
          available: '24/7',
          icon: 'Phone'
        },
        {
          id: 2,
          name: 'योजना सहायता केंद्र',
          number: '1800-765-4321',
          type: 'schemes',
          description: 'सरकारी योजनाओं की जानकारी',
          available: '9 AM - 6 PM',
          icon: 'HelpCircle'
        },
        {
          id: 3,
          name: 'तकनीकी सहायता',
          number: '1800-999-8888',
          type: 'technical',
          description: 'ऐप और वेबसाइट की समस्या',
          available: '24/7',
          icon: 'Settings'
        },
        {
          id: 4,
          name: 'जिला कलेक्टर कार्यालय',
          number: '0771-234-5678',
          type: 'administrative',
          description: 'प्रशासनिक सहायता',
          available: '10 AM - 5 PM',
          icon: 'Building'
        }
      ]
    },
    en: {
      title: 'Emergency Contacts',
      subtitle: 'For immediate assistance',
      viewAll: 'View All',
      call: 'Call',
      message: 'Message',
      contacts: [
        {
          id: 1,
          name: 'Employment Helpline',
          number: '1800-123-4567',
          type: 'employment',
          description: 'Job-related assistance',
          available: '24/7',
          icon: 'Phone'
        },
        {
          id: 2,
          name: 'Scheme Support Center',
          number: '1800-765-4321',
          type: 'schemes',
          description: 'Government scheme information',
          available: '9 AM - 6 PM',
          icon: 'HelpCircle'
        },
        {
          id: 3,
          name: 'Technical Support',
          number: '1800-999-8888',
          type: 'technical',
          description: 'App and website issues',
          available: '24/7',
          icon: 'Settings'
        },
        {
          id: 4,
          name: 'District Collector Office',
          number: '0771-234-5678',
          type: 'administrative',
          description: 'Administrative assistance',
          available: '10 AM - 5 PM',
          icon: 'Building'
        }
      ]
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleMessage = (number) => {
    window.open(`sms:${number}`, '_self');
  };

  const displayedContacts = isExpanded ? currentContent?.contacts : currentContent?.contacts?.slice(0, 2);

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
        <Icon name="Phone" size={24} className="text-accent" />
      </div>
      <div className="space-y-4">
        {displayedContacts?.map((contact) => (
          <div key={contact?.id} className="bg-background border border-border rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={contact?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground mb-1">
                    {contact?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {contact?.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-foreground font-medium">
                      <Icon name="Phone" size={14} />
                      <span>{contact?.number}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{contact?.available}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCall(contact?.number)}
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <Icon name="Phone" size={16} className="mr-1" />
                  {currentContent?.call}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMessage(contact?.number)}
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Icon name="MessageSquare" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentContent?.contacts?.length > 2 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:bg-primary/10"
          >
            {isExpanded ? (
              <>
                <Icon name="ChevronUp" size={16} className="mr-2" />
                {currentLanguage === 'hi' ? 'कम दिखाएं' : 'Show Less'}
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} className="mr-2" />
                {currentContent?.viewAll}
              </>
            )}
          </Button>
        </div>
      )}
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={20} className="text-red-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800 mb-1">
              {currentLanguage === 'hi' ? 'आपातकाल में' : 'In Emergency'}
            </p>
            <p className="text-xs text-red-700">
              {currentLanguage === 'hi' ?'तत्काल सहायता के लिए 112 डायल करें या स्थानीय पुलिस स्टेशन से संपर्क करें।' :'Dial 112 for immediate help or contact your local police station.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;