import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactOptions = ({ currentLanguage }) => {
  const content = {
    hi: {
      title: "संपर्क विकल्प",
      subtitle: "हमसे जुड़ने के विभिन्न तरीके",
      options: [
        {
          id: 'phone',
          title: "फोन सहायता",
          description: "सोमवार से शुक्रवार, सुबह 9 बजे से शाम 6 बजे तक",
          contact: "1800-XXX-XXXX",
          icon: "Phone",
          color: "bg-blue-50 border-blue-200",
          iconColor: "text-blue-600"
        },
        {
          id: 'email',
          title: "ईमेल सहायता",
          description: "24 घंटे के अंदर जवाब की गारंटी",
          contact: "support@egramsetu.gov.in",
          icon: "Mail",
          color: "bg-green-50 border-green-200",
          iconColor: "text-green-600"
        },
        {
          id: 'whatsapp',
          title: "WhatsApp सहायता",
          description: "त्वरित संदेश और मीडिया साझाकरण",
          contact: "+91-XXXXX-XXXXX",
          icon: "MessageCircle",
          color: "bg-green-50 border-green-200",
          iconColor: "text-green-600"
        },
        {
          id: 'office',
          title: "स्थानीय कार्यालय",
          description: "व्यक्तिगत सहायता के लिए",
          contact: "निकटतम CSC केंद्र खोजें",
          icon: "MapPin",
          color: "bg-orange-50 border-orange-200",
          iconColor: "text-orange-600"
        }
      ],
      emergencyTitle: "आपातकालीन सहायता",
      emergencyDesc: "तत्काल सहायता के लिए",
      emergencyNumber: "112"
    },
    en: {
      title: "Contact Options",
      subtitle: "Different ways to connect with us",
      options: [
        {
          id: 'phone',
          title: "Phone Support",
          description: "Monday to Friday, 9 AM to 6 PM",
          contact: "1800-XXX-XXXX",
          icon: "Phone",
          color: "bg-blue-50 border-blue-200",
          iconColor: "text-blue-600"
        },
        {
          id: 'email',
          title: "Email Support",
          description: "Response guaranteed within 24 hours",
          contact: "support@egramsetu.gov.in",
          icon: "Mail",
          color: "bg-green-50 border-green-200",
          iconColor: "text-green-600"
        },
        {
          id: 'whatsapp',
          title: "WhatsApp Support",
          description: "Quick messaging and media sharing",
          contact: "+91-XXXXX-XXXXX",
          icon: "MessageCircle",
          color: "bg-green-50 border-green-200",
          iconColor: "text-green-600"
        },
        {
          id: 'office',
          title: "Local Office",
          description: "For in-person assistance",
          contact: "Find nearest CSC center",
          icon: "MapPin",
          color: "bg-orange-50 border-orange-200",
          iconColor: "text-orange-600"
        }
      ],
      emergencyTitle: "Emergency Help",
      emergencyDesc: "For immediate assistance",
      emergencyNumber: "112"
    }
  };

  const currentContent = content?.[currentLanguage] || content?.hi;

  const handleContactClick = (type, contact) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${contact?.replace(/[^0-9+]/g, '')}`);
        break;
      case 'email':
        window.open(`mailto:${contact}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/${contact?.replace(/[^0-9]/g, '')}`);
        break;
      case 'office':
        // Navigate to office locator
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            {currentContent?.title}
          </h2>
          <p className="text-muted-foreground">
            {currentContent?.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentContent?.options?.map((option) => (
            <div
              key={option?.id}
              className={`p-6 rounded-lg border-2 ${option?.color} hover:shadow-soft transition-all duration-200`}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${option?.iconColor} bg-white/50 mb-4`}>
                  <Icon name={option?.icon} size={24} />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {option?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {option?.description}
                </p>
                <Button
                  variant="outline"
                  onClick={() => handleContactClick(option?.id, option?.contact)}
                  className="w-full text-sm"
                >
                  {option?.contact}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Section */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Icon name="AlertTriangle" size={32} className="text-red-600" />
          </div>
          <h3 className="text-xl font-heading font-bold text-red-800 mb-2">
            {currentContent?.emergencyTitle}
          </h3>
          <p className="text-red-700 mb-4">
            {currentContent?.emergencyDesc}
          </p>
          <Button
            variant="destructive"
            onClick={() => window.open(`tel:${currentContent?.emergencyNumber}`)}
            className="text-lg px-8 py-3"
          >
            <Icon name="Phone" size={20} className="mr-2" />
            {currentContent?.emergencyNumber}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactOptions;