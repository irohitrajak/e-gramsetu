import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ currentLanguage, onActionClick }) => {
  const content = {
    hi: {
      title: "त्वरित सहायता",
      actions: [
        {
          id: 'faq',
          title: "सामान्य प्रश्न",
          description: "अक्सर पूछे जाने वाले प्रश्न",
          icon: "MessageCircle",
          color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
          id: 'chat',
          title: "लाइव चैट",
          description: "तुरंत सहायता प्राप्त करें",
          icon: "MessageSquare",
          color: "bg-green-50 text-green-600 border-green-200"
        },
        {
          id: 'video',
          title: "वीडियो कॉल",
          description: "व्यक्तिगत सहायता",
          icon: "Video",
          color: "bg-purple-50 text-purple-600 border-purple-200"
        },
        {
          id: 'ticket',
          title: "शिकायत दर्ज करें",
          description: "समस्या की रिपोर्ट करें",
          icon: "FileText",
          color: "bg-orange-50 text-orange-600 border-orange-200"
        },
        {
          id: 'whatsapp',
          title: "WhatsApp सहायता",
          description: "मैसेज के द्वारा मदद",
          icon: "MessageCircle",
          color: "bg-green-50 text-green-600 border-green-200"
        },
        {
          id: 'voice',
          title: "आवाज़ सहायता",
          description: "बोलकर मदद लें",
          icon: "Mic",
          color: "bg-red-50 text-red-600 border-red-200"
        }
      ]
    },
    en: {
      title: "Quick Actions",
      actions: [
        {
          id: 'faq',
          title: "FAQ",
          description: "Frequently asked questions",
          icon: "MessageCircle",
          color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
          id: 'chat',
          title: "Live Chat",
          description: "Get instant help",
          icon: "MessageSquare",
          color: "bg-green-50 text-green-600 border-green-200"
        },
        {
          id: 'video',
          title: "Video Call",
          description: "Personal assistance",
          icon: "Video",
          color: "bg-purple-50 text-purple-600 border-purple-200"
        },
        {
          id: 'ticket',
          title: "Submit Ticket",
          description: "Report an issue",
          icon: "FileText",
          color: "bg-orange-50 text-orange-600 border-orange-200"
        },
        {
          id: 'whatsapp',
          title: "WhatsApp Support",
          description: "Help via messaging",
          icon: "MessageCircle",
          color: "bg-green-50 text-green-600 border-green-200"
        },
        {
          id: 'voice',
          title: "Voice Support",
          description: "Get help by speaking",
          icon: "Mic",
          color: "bg-red-50 text-red-600 border-red-200"
        }
      ]
    }
  };

  const currentContent = content?.[currentLanguage] || content?.hi;

  return (
    <div className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
          {currentContent?.title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentContent?.actions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => onActionClick(action?.id)}
              className={`p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-soft hover:scale-105 text-left ${action?.color}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Icon name={action?.icon} size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-lg mb-1">
                    {action?.title}
                  </h3>
                  <p className="text-sm opacity-80">
                    {action?.description}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="opacity-60" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;