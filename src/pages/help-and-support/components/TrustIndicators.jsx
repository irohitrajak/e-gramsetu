import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = ({ currentLanguage }) => {
  const content = {
    hi: {
      title: "विश्वसनीयता और सुरक्षा",
      indicators: [
        {
          id: 'security',
          title: "डेटा सुरक्षा",
          description: "आपकी व्यक्तिगत जानकारी 256-बिट एन्क्रिप्शन से सुरक्षित है",
          icon: "Shield",
          color: "text-green-600"
        },
        {
          id: 'privacy',
          title: "गोपनीयता नीति",
          description: "हम आपकी निजता का सम्मान करते हैं और डेटा साझा नहीं करते",
          icon: "Lock",
          color: "text-blue-600"
        },
        {
          id: 'government',
          title: "सरकारी प्रमाणित",
          description: "भारत सरकार द्वारा अधिकृत और प्रमाणित प्लेटफॉर्म",
          icon: "Award",
          color: "text-orange-600"
        },
        {
          id: 'support',
          title: "24/7 सहायता",
          description: "आपातकालीन स्थितियों में तत्काल सहायता उपलब्ध",
          icon: "Headphones",
          color: "text-purple-600"
        }
      ],
      certifications: [
        {
          name: "ISO 27001",
          description: "सूचना सुरक्षा प्रबंधन",
          badge: "🏆"
        },
        {
          name: "डिजिटल इंडिया",
          description: "सरकारी पहल का हिस्सा",
          badge: "🇮🇳"
        },
        {
          name: "WCAG 2.1",
          description: "पहुंच मानक अनुपालन",
          badge: "♿"
        }
      ],
      grievanceTitle: "शिकायत निवारण",
      grievanceDesc: "पारदर्शी और तेज़ शिकायत निवारण प्रक्रिया",
      grievanceSteps: [
        "शिकायत दर्ज करें",
        "24 घंटे में पावती",
        "7 दिन में समाधान",
        "फीडबैक और फॉलो-अप"
      ]
    },
    en: {
      title: "Trust & Security",
      indicators: [
        {
          id: 'security',
          title: "Data Security",
          description: "Your personal information is protected with 256-bit encryption",
          icon: "Shield",
          color: "text-green-600"
        },
        {
          id: 'privacy',
          title: "Privacy Policy",
          description: "We respect your privacy and do not share your data",
          icon: "Lock",
          color: "text-blue-600"
        },
        {
          id: 'government',
          title: "Government Certified",
          description: "Authorized and certified platform by Government of India",
          icon: "Award",
          color: "text-orange-600"
        },
        {
          id: 'support',
          title: "24/7 Support",
          description: "Immediate assistance available in emergency situations",
          icon: "Headphones",
          color: "text-purple-600"
        }
      ],
      certifications: [
        {
          name: "ISO 27001",
          description: "Information Security Management",
          badge: "🏆"
        },
        {
          name: "Digital India",
          description: "Part of Government Initiative",
          badge: "🇮🇳"
        },
        {
          name: "WCAG 2.1",
          description: "Accessibility Standards Compliance",
          badge: "♿"
        }
      ],
      grievanceTitle: "Grievance Redressal",
      grievanceDesc: "Transparent and fast grievance resolution process",
      grievanceSteps: [
        "Submit Complaint",
        "Acknowledgment in 24 hours",
        "Resolution in 7 days",
        "Feedback and Follow-up"
      ]
    }
  };

  const currentContent = content?.[currentLanguage] || content?.hi;

  return (
    <div className="bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
          {currentContent?.title}
        </h2>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {currentContent?.indicators?.map((indicator) => (
            <div key={indicator?.id} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 ${indicator?.color}`}>
                <Icon name={indicator?.icon} size={32} />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {indicator?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {indicator?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-muted rounded-lg p-8 mb-12">
          <h3 className="text-xl font-heading font-bold text-foreground mb-6 text-center">
            {currentLanguage === 'hi' ? 'प्रमाणन और मान्यताएं' : 'Certifications & Recognitions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentContent?.certifications?.map((cert, index) => (
              <div key={index} className="bg-card rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">{cert?.badge}</div>
                <h4 className="font-heading font-semibold text-foreground mb-2">
                  {cert?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Grievance Process */}
        <div className="bg-card rounded-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Icon name="Scale" size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              {currentContent?.grievanceTitle}
            </h3>
            <p className="text-muted-foreground">
              {currentContent?.grievanceDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {currentContent?.grievanceSteps?.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full mx-auto mb-3 font-bold">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-foreground">
                  {step}
                </p>
                {index < currentContent?.grievanceSteps?.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-border transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>
                {currentLanguage === 'hi' ?'औसत समाधान समय: 3-5 कार्य दिवस' :'Average resolution time: 3-5 working days'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;