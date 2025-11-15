import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SchemeCard from './components/SchemeCard';
import EligibilityChecker from './components/EligibilityChecker';
import SchemeFilters from './components/SchemeFilters';
import ApplicationTracker from './components/ApplicationTracker';
import QuickActions from './components/QuickActions';
import SchemeStats from './components/SchemeStats';

const SchemeNavigator = () => {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    benefitRange: ''
  });
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);
  const [showApplicationTracker, setShowApplicationTracker] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('hi');

  // Mock schemes data
  const mockSchemes = [
    {
      id: 1,
      name: 'प्रधानमंत्री आवास योजना',
      description: `ग्रामीण क्षेत्रों में पक्के मकान बनाने के लिए वित्तीय सहायता प्रदान करने वाली योजना।\nइस योजना के तहत लाभार्थियों को ₹1.20 लाख तक की सहायता मिलती है।`,
      category: 'housing',
      status: 'active',
      deadline: '31 दिसंबर 2024',
      benefitAmount: '₹1,20,000',
      eligibility: 'BPL परिवार',
      applicants: '2.3M',
      documents: ['आधार कार्ड', 'आय प्रमाण पत्र', 'जाति प्रमाण पत्र', 'बैंक पासबुक']
    },
    {
      id: 2,
      name: 'मनरेगा रोजगार गारंटी',
      description: `ग्रामीण परिवारों को साल में 100 दिन का गारंटीशुदा रोजगार प्रदान करने वाली योजना।\nमजदूरी दर ₹220 प्रति दिन है और काम घर के 5 किमी के दायरे में मिलता है।`,
      category: 'employment',
      status: 'active',
      deadline: 'वर्षभर खुला',
      benefitAmount: '₹220/दिन',
      eligibility: 'ग्रामीण परिवार',
      applicants: '12.5M',
      documents: ['जॉब कार्ड', 'आधार कार्ड', 'बैंक खाता']
    },
    {
      id: 3,
      name: 'किसान सम्मान निधि',
      description: `छोटे और सीमांत किसानों को आर्थिक सहायता प्रदान करने वाली योजना।\nसाल में तीन किस्तों में ₹6000 की राशि सीधे बैंक खाते में जमा की जाती है।`,
      category: 'agriculture',
      status: 'active',
      deadline: 'निरंतर',
      benefitAmount: '₹6,000/वर्ष',
      eligibility: '2 हेक्टेयर तक भूमि',
      applicants: '11.8M',
      documents: ['भूमि रिकॉर्ड', 'आधार कार्ड', 'बैंक पासबुक']
    },
    {
      id: 4,
      name: 'बेटी बचाओ बेटी पढ़ाओ',
      description: `बालिकाओं की शिक्षा और सुरक्षा के लिए चलाई जा रही योजना।\nइसमें छात्रवृत्ति और शैक्षणिक सहायता प्रदान की जाती है।`,
      category: 'education',
      status: 'closing-soon',
      deadline: '15 नवंबर 2024',
      benefitAmount: '₹25,000',
      eligibility: 'बालिका छात्राएं',
      applicants: '890K',
      documents: ['जन्म प्रमाण पत्र', 'स्कूल प्रमाण पत्र', 'आधार कार्ड']
    },
    {
      id: 5,
      name: 'आयुष्मान भारत योजना',
      description: `गरीब परिवारों को मुफ्त इलाज की सुविधा प्रदान करने वाली स्वास्थ्य बीमा योजना।\nसाल में ₹5 लाख तक का मुफ्त इलाज कराया जा सकता है।`,
      category: 'health',
      status: 'active',
      deadline: 'निरंतर',
      benefitAmount: '₹5,00,000/वर्ष',
      eligibility: 'SECC सूची में नाम',
      applicants: '50M',
      documents: ['राशन कार्ड', 'आधार कार्ड', 'आय प्रमाण पत्र']
    },
    {
      id: 6,
      name: 'स्वच्छ भारत मिशन',
      description: `ग्रामीण क्षेत्रों में शौचालय निर्माण के लिए वित्तीय सहायता प्रदान करने वाली योजना।\nशौचालय बनाने के लिए ₹12,000 की राशि दी जाती है।`,
      category: 'housing',
      status: 'closed',
      deadline: '30 सितंबर 2024',
      benefitAmount: '₹12,000',
      eligibility: 'शौचालयविहीन परिवार',
      applicants: '1.1M',
      documents: ['आधार कार्ड', 'निवास प्रमाण पत्र', 'फोटो']
    }
  ];

  useEffect(() => {
    // Load language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'hi';
    setCurrentLanguage(savedLanguage);
    
    // Initialize schemes
    setSchemes(mockSchemes);
    setFilteredSchemes(mockSchemes);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = schemes;

    if (filters?.search) {
      filtered = filtered?.filter(scheme =>
        scheme?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        scheme?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.category) {
      filtered = filtered?.filter(scheme => scheme?.category === filters?.category);
    }

    if (filters?.status) {
      filtered = filtered?.filter(scheme => scheme?.status === filters?.status);
    }

    if (filters?.benefitRange) {
      // Implement benefit range filtering logic
      filtered = filtered?.filter(scheme => {
        const amount = parseInt(scheme?.benefitAmount?.replace(/[^\d]/g, ''));
        switch (filters?.benefitRange) {
          case '0-10000':
            return amount <= 10000;
          case '10000-50000':
            return amount > 10000 && amount <= 50000;
          case '50000-100000':
            return amount > 50000 && amount <= 100000;
          case '100000+':
            return amount > 100000;
          default:
            return true;
        }
      });
    }

    setFilteredSchemes(filtered);
  }, [filters, schemes]);

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    // Navigate to scheme details page
    console.log('Viewing details for:', scheme?.name);
  };

  const handleCheckEligibility = (scheme) => {
    setSelectedScheme(scheme);
    setShowEligibilityChecker(true);
  };

  const handleProceedToApplication = (scheme) => {
    setShowEligibilityChecker(false);
    // Navigate to application form
    console.log('Proceeding to application for:', scheme?.name);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      benefitRange: ''
    });
  };

  const handleTrackApplication = () => {
    window.open('https://www.india.gov.in/', '_blank');
  };

  const handleViewFavorites = () => {
    window.open('https://www.digitalindia.gov.in/', '_blank');
  };

  const handleGetHelp = () => {
    window.open('https://www.mygov.in/', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  योजना नेवीगेटर
                </h1>
                <p className="text-lg text-muted-foreground">
                  सरकारी योजनाओं की जानकारी और आवेदन की सुविधा
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleTrackApplication}
                  iconName="Search"
                  iconPosition="left"
                >
                  आवेदन ट्रैक करें
                </Button>
                <Button
                  variant="default"
                  onClick={() => window.location.href = '/help-and-support'}
                  iconName="HelpCircle"
                  iconPosition="left"
                >
                  सहायता
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <SchemeStats />

          {/* Quick Actions */}
          <QuickActions
            onTrackApplication={handleTrackApplication}
            onViewFavorites={handleViewFavorites}
            onGetHelp={handleGetHelp}
          />

          {/* Filters */}
          <SchemeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Schemes Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-semibold text-foreground">
                उपलब्ध योजनाएं ({filteredSchemes?.length})
              </h2>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>अंतिम अपडेट: 07 अक्टूबर 2024</span>
              </div>
            </div>

            {filteredSchemes?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes?.map((scheme) => (
                  <SchemeCard
                    key={scheme?.id}
                    scheme={scheme}
                    onViewDetails={handleViewDetails}
                    onCheckEligibility={handleCheckEligibility}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  कोई योजना नहीं मिली
                </h3>
                <p className="text-muted-foreground mb-4">
                  अपने फिल्टर बदलें या खोज शब्द को संशोधित करें
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  फिल्टर साफ़ करें
                </Button>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
            <Icon name="Lightbulb" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              योजना चुनने में मदद चाहिए?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              हमारे विशेषज्ञ आपको सही योजना चुनने और आवेदन प्रक्रिया में मदद करने के लिए तैयार हैं।
              निःशुल्क परामर्श के लिए संपर्क करें।
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="default"
                onClick={() => window.open('https://nrega.nic.in/', '_blank')}
                iconName="Phone"
                iconPosition="left"
              >
                हेल्पलाइन: 1800-XXX-XXXX
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://janaushadhi.gov.in/', '_blank')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                चैट सपोर्ट
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      {showEligibilityChecker && selectedScheme && (
        <EligibilityChecker
          scheme={selectedScheme}
          onClose={() => setShowEligibilityChecker(false)}
          onProceedToApplication={handleProceedToApplication}
        />
      )}
      {showApplicationTracker && (
        <ApplicationTracker
          isOpen={showApplicationTracker}
          onClose={() => setShowApplicationTracker(false)}
        />
      )}
    </div>
  );
};

export default SchemeNavigator;