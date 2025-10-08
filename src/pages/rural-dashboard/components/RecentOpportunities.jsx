import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentOpportunities = ({ currentLanguage }) => {
  const content = {
    hi: {
      title: 'नवीनतम अवसर',
      subtitle: 'आपके लिए उपलब्ध नई नौकरियां और योजनाएं',
      viewAll: 'सभी देखें',
      apply: 'आवेदन करें',
      deadline: 'अंतिम तिथि',
      location: 'स्थान',
      salary: 'वेतन',
      opportunities: [
        {
          id: 1,
          type: 'job',
          title: 'कृषि सहायक',
          organization: 'जिला कृषि विभाग',
          location: 'रायपुर, छत्तीसगढ़',
          salary: '₹15,000 - ₹20,000',
          deadline: '15 अक्टूबर 2025',
          isNew: true,
          description: 'कृषि क्षेत्र में तकनीकी सहायता प्रदान करने के लिए'
        },
        {
          id: 2,
          type: 'scheme',
          title: 'प्रधानमंत्री कौशल विकास योजना',
          organization: 'कौशल विकास मंत्रालय',
          location: 'सभी जिले',
          salary: 'निःशुल्क प्रशिक्षण',
          deadline: '30 अक्टूबर 2025',
          isNew: false,
          description: 'मुफ्त कौशल प्रशिक्षण और प्रमाणन कार्यक्रम'
        },
        {
          id: 3,
          type: 'job',
          title: 'आंगनवाड़ी कार्यकर्ता',
          organization: 'महिला एवं बाल विकास विभाग',
          location: 'बिलासपुर, छत्तीसगढ़',
          salary: '₹12,000 - ₹18,000',
          deadline: '20 अक्टूबर 2025',
          isNew: true,
          description: 'बच्चों और महिलाओं की देखभाल के लिए'
        }
      ]
    },
    en: {
      title: 'Latest Opportunities',
      subtitle: 'New jobs and schemes available for you',
      viewAll: 'View All',
      apply: 'Apply',
      deadline: 'Deadline',
      location: 'Location',
      salary: 'Salary',
      opportunities: [
        {
          id: 1,
          type: 'job',
          title: 'Agriculture Assistant',
          organization: 'District Agriculture Department',
          location: 'Raipur, Chhattisgarh',
          salary: '₹15,000 - ₹20,000',
          deadline: 'October 15, 2025',
          isNew: true,
          description: 'Provide technical assistance in agriculture sector'
        },
        {
          id: 2,
          type: 'scheme',
          title: 'Pradhan Mantri Kaushal Vikas Yojana',
          organization: 'Ministry of Skill Development',
          location: 'All Districts',
          salary: 'Free Training',
          deadline: 'October 30, 2025',
          isNew: false,
          description: 'Free skill training and certification program'
        },
        {
          id: 3,
          type: 'job',
          title: 'Anganwadi Worker',
          organization: 'Women & Child Development Department',
          location: 'Bilaspur, Chhattisgarh',
          salary: '₹12,000 - ₹18,000',
          deadline: 'October 20, 2025',
          isNew: true,
          description: 'Care for children and women welfare'
        }
      ]
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

  const handleApply = (opportunity) => {
    if (opportunity?.type === 'job') {
      window.location.href = '/job-discovery-engine';
    } else {
      window.location.href = '/scheme-navigator';
    }
  };

  const handleViewAll = () => {
    window.location.href = '/job-discovery-engine';
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
        <Button
          variant="outline"
          onClick={handleViewAll}
          className="text-sm"
        >
          {currentContent?.viewAll}
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
      <div className="space-y-4">
        {currentContent?.opportunities?.map((opportunity) => (
          <div key={opportunity?.id} className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    opportunity?.type === 'job' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                  }`}>
                    <Icon name={opportunity?.type === 'job' ? 'Briefcase' : 'Award'} size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">
                        {opportunity?.title}
                      </h3>
                      {opportunity?.isNew && (
                        <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                          {currentLanguage === 'hi' ? 'नया' : 'New'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {opportunity?.organization}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {opportunity?.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={14} />
                    <span>{opportunity?.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="DollarSign" size={14} />
                    <span>{opportunity?.salary}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>{currentContent?.deadline}: {opportunity?.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleApply(opportunity)}
                >
                  <Icon name="ExternalLink" size={16} className="mr-2" />
                  {currentContent?.apply}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              {currentLanguage === 'hi' ? 'सुझाव' : 'Tip'}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'hi' ?'नियमित रूप से अपनी प्रोफाइल अपडेट करें ताकि आपको बेहतर अवसर मिल सकें।' :'Update your profile regularly to get better opportunities matched to your skills.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOpportunities;