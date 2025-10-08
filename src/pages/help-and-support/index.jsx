import React, { useState, useEffect } from 'react';
import SupportHeader from './components/SupportHeader';
import QuickActions from './components/QuickActions';
import FAQSection from './components/FAQSection';
import ContactOptions from './components/ContactOptions';
import ResourceLibrary from './components/ResourceLibrary';
import TicketSystem from './components/TicketSystem';
import TrustIndicators from './components/TrustIndicators';

const HelpAndSupport = () => {
  const [currentLanguage, setCurrentLanguage] = useState('hi');
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Save language preference and propagate changes
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'faq': setActiveSection('faq');
        document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'chat':
        // Mock chat functionality
        alert(currentLanguage === 'hi' ? 'चैट सेवा जल्द ही उपलब्ध होगी' : 'Chat service coming soon');
        break;
      case 'video':
        // Mock video call functionality
        alert(currentLanguage === 'hi' ? 'वीडियो कॉल सेवा जल्द ही उपलब्ध होगी' : 'Video call service coming soon');
        break;
      case 'ticket':
        setShowTicketModal(true);
        break;
      case 'whatsapp':
        window.open('https://wa.me/919999999999', '_blank');
        break;
      case 'voice':
        // Mock voice support
        alert(currentLanguage === 'hi' ? 'आवाज़ सहायता जल्द ही उपलब्ध होगी' : 'Voice support coming soon');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
        {/* Support Header */}
        <SupportHeader 
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        {/* Quick Actions */}
        <QuickActions 
          currentLanguage={currentLanguage}
          onActionClick={handleQuickAction}
        />

        {/* FAQ Section */}
        <div id="faq-section">
          <FAQSection currentLanguage={currentLanguage} />
        </div>

        {/* Contact Options */}
        <ContactOptions currentLanguage={currentLanguage} />

        {/* Resource Library */}
        <ResourceLibrary currentLanguage={currentLanguage} />

        {/* Trust Indicators */}
        <TrustIndicators currentLanguage={currentLanguage} />

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-heading font-bold text-lg mb-4">
                  {currentLanguage === 'hi' ? 'e-GramSetu' : 'e-GramSetu'}
                </h3>
                <p className="text-primary-foreground/80 text-sm">
                  {currentLanguage === 'hi' ?'ग्रामीण सशक्तिकरण के लिए डिजिटल सेतु' :'Digital Bridge for Rural Empowerment'
                  }
                </p>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold mb-4">
                  {currentLanguage === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/rural-dashboard" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                      {currentLanguage === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
                    </a>
                  </li>
                  <li>
                    <a href="/job-discovery-engine" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                      {currentLanguage === 'hi' ? 'नौकरी खोज' : 'Job Search'}
                    </a>
                  </li>
                  <li>
                    <a href="/scheme-navigator" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                      {currentLanguage === 'hi' ? 'योजना नेवीगेटर' : 'Scheme Navigator'}
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold mb-4">
                  {currentLanguage === 'hi' ? 'संपर्क करें' : 'Contact Us'}
                </h4>
                <div className="space-y-2 text-sm text-primary-foreground/80">
                  <p>📞 1800-XXX-XXXX</p>
                  <p>✉️ support@egramsetu.gov.in</p>
                  <p>📱 WhatsApp: +91-XXXXX-XXXXX</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
              <p>
                © {new Date()?.getFullYear()} e-GramSetu. {currentLanguage === 'hi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
              </p>
              <p className="mt-2">
                {currentLanguage === 'hi' ?'भारत सरकार की एक पहल' :'An initiative of Government of India'
                }
              </p>
            </div>
          </div>
        </footer>
      {/* Ticket Modal */}
      {showTicketModal && (
        <TicketSystem
          currentLanguage={currentLanguage}
          onClose={() => setShowTicketModal(false)}
        />
      )}
    </div>
  );
};

export default HelpAndSupport;