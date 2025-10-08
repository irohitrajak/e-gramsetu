import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const FAQSection = ({ currentLanguage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const content = {
    hi: {
      title: "अक्सर पूछे जाने वाले प्रश्न",
      searchPlaceholder: "प्रश्न खोजें...",
      categories: [
        {
          id: 'jobs',
          name: "नौकरी खोज",
          icon: "Briefcase",
          faqs: [
            {
              id: 1,
              question: "मैं नौकरी के लिए कैसे आवेदन करूं?",
              answer: `नौकरी के लिए आवेदन करने के लिए:\n1. Job Discovery Engine पर जाएं\n2. अपनी पसंद की नौकरी खोजें\n3. 'आवेदन करें' बटन पर क्लिक करें\n4. आवश्यक जानकारी भरें\n5. दस्तावेज अपलोड करें\n6. आवेदन जमा करें`
            },
            {
              id: 2,
              question: "मेरे आवेदन की स्थिति कैसे जांचूं?",
              answer: `आवेदन की स्थिति जांचने के लिए:\n1. Profile Management में जाएं\n2. 'My Applications' सेक्शन देखें\n3. आवेदन की वर्तमान स्थिति देखें\n4. अपडेट के लिए नोटिफिकेशन चेक करें`
            }
          ]
        },
        {
          id: 'schemes',
          name: "सरकारी योजनाएं",
          icon: "MapPin",
          faqs: [
            {
              id: 3,
              question: "मैं किन योजनाओं के लिए पात्र हूं?",
              answer: `पात्रता जांचने के लिए:\n1. Scheme Navigator पर जाएं\n2. अपनी व्यक्तिगत जानकारी दर्ज करें\n3. Eligibility Checker का उपयोग करें\n4. उपलब्ध योजनाओं की सूची देखें`
            },
            {
              id: 4,
              question: "योजना के लिए आवेदन कैसे करें?",
              answer: `योजना आवेदन प्रक्रिया:\n1. योजना का चयन करें\n2. आवश्यक दस्तावेज तैयार करें\n3. ऑनलाइन फॉर्म भरें\n4. दस्तावेज अपलोड करें\n5. आवेदन ट्रैक करें`
            }
          ]
        },
        {
          id: 'technical',
          name: "तकनीकी सहायता",
          icon: "Settings",
          faqs: [
            {
              id: 5,
              question: "मैं अपना पासवर्ड कैसे रीसेट करूं?",
              answer: `पासवर्ड रीसेट करने के लिए:\n1. लॉगिन पेज पर 'पासवर्ड भूल गए?' पर क्लिक करें\n2. अपना रजिस्टर्ड मोबाइल नंबर दर्ज करें\n3. OTP प्राप्त करें और वेरिफाई करें\n4. नया पासवर्ड सेट करें`
            },
            {
              id: 6,
              question: "मोबाइल ऐप कैसे डाउनलोड करूं?",
              answer: `मोबाइल ऐप डाउनलोड करने के लिए:\n1. Google Play Store खोलें\n2. 'e-GramSetu' खोजें\n3. ऐप इंस्टॉल करें\n4. अपने खाते से लॉगिन करें`
            }
          ]
        }
      ]
    },
    en: {
      title: "Frequently Asked Questions",
      searchPlaceholder: "Search questions...",
      categories: [
        {
          id: 'jobs',
          name: "Job Search",
          icon: "Briefcase",
          faqs: [
            {
              id: 1,
              question: "How do I apply for a job?",
              answer: `To apply for a job:\n1. Go to Job Discovery Engine\n2. Find your preferred job\n3. Click 'Apply Now' button\n4. Fill required information\n5. Upload documents\n6. Submit application`
            },
            {
              id: 2,
              question: "How do I check my application status?",
              answer: `To check application status:\n1. Go to Profile Management\n2. Check 'My Applications' section\n3. View current status\n4. Check notifications for updates`
            }
          ]
        },
        {
          id: 'schemes',
          name: "Government Schemes",
          icon: "MapPin",
          faqs: [
            {
              id: 3,
              question: "Which schemes am I eligible for?",
              answer: `To check eligibility:\n1. Go to Scheme Navigator\n2. Enter your personal information\n3. Use Eligibility Checker\n4. View available schemes list`
            },
            {
              id: 4,
              question: "How to apply for a scheme?",
              answer: `Scheme application process:\n1. Select the scheme\n2. Prepare required documents\n3. Fill online form\n4. Upload documents\n5. Track application`
            }
          ]
        },
        {
          id: 'technical',
          name: "Technical Support",
          icon: "Settings",
          faqs: [
            {
              id: 5,
              question: "How do I reset my password?",
              answer: `To reset password:\n1. Click 'Forgot Password?' on login page\n2. Enter your registered mobile number\n3. Receive and verify OTP\n4. Set new password`
            },
            {
              id: 6,
              question: "How to download mobile app?",
              answer: `To download mobile app:\n1. Open Google Play Store\n2. Search for 'e-GramSetu'\n3. Install the app\n4. Login with your account`
            }
          ]
        }
      ]
    }
  };

  const currentContent = content?.[currentLanguage] || content?.hi;

  const filteredFAQs = currentContent?.categories?.map(category => ({
    ...category,
    faqs: category?.faqs?.filter(faq =>
      faq?.question?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      faq?.answer?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  }))?.filter(category => category?.faqs?.length > 0);

  return (
    <div className="bg-muted py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
          {currentContent?.title}
        </h2>

        {/* Search */}
        <div className="mb-8">
          <Input
            type="search"
            placeholder={currentContent?.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="max-w-md mx-auto"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFAQs?.map((category) => (
            <div key={category?.id} className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Icon name={category?.icon} size={20} className="text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {category?.name}
                </h3>
              </div>

              <div className="space-y-4">
                {category?.faqs?.map((faq) => (
                  <div key={faq?.id} className="border border-border rounded-lg">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq?.id ? null : faq?.id)}
                      className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground pr-4">
                        {faq?.question}
                      </span>
                      <Icon
                        name={expandedFAQ === faq?.id ? "ChevronUp" : "ChevronDown"}
                        size={20}
                        className="text-muted-foreground flex-shrink-0"
                      />
                    </button>
                    
                    {expandedFAQ === faq?.id && (
                      <div className="px-4 pb-4">
                        <div className="text-muted-foreground whitespace-pre-line">
                          {faq?.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs?.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No results found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQSection;