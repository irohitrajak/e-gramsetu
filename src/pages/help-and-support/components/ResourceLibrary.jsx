import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceLibrary = ({ currentLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const content = {
    hi: {
      title: "संसाधन पुस्तकालय",
      subtitle: "उपयोगी गाइड, फॉर्म और डाउनलोड",
      categories: [
        { id: 'all', name: 'सभी', icon: 'Grid3X3' },
        { id: 'forms', name: 'फॉर्म', icon: 'FileText' },
        { id: 'guides', name: 'गाइड', icon: 'BookOpen' },
        { id: 'videos', name: 'वीडियो', icon: 'Play' },
        { id: 'contacts', name: 'संपर्क', icon: 'Phone' }
      ],
      resources: [
        {
          id: 1,
          title: "नौकरी आवेदन फॉर्म",
          description: "सभी प्रकार की नौकरियों के लिए सामान्य आवेदन फॉर्म",
          type: "PDF",
          size: "2.5 MB",
          category: "forms",
          icon: "FileText",
          downloadUrl: "#"
        },
        {
          id: 2,
          title: "योजना पात्रता गाइड",
          description: "सरकारी योजनाओं की पात्रता जांचने के लिए विस्तृत गाइड",
          type: "PDF",
          size: "1.8 MB",
          category: "guides",
          icon: "BookOpen",
          downloadUrl: "#"
        },
        {
          id: 3,
          title: "प्लेटफॉर्म उपयोग वीडियो",
          description: "e-GramSetu का उपयोग करने के लिए चरणबद्ध वीडियो ट्यूटोरियल",
          type: "MP4",
          size: "45 MB",
          category: "videos",
          icon: "Play",
          downloadUrl: "#"
        },
        {
          id: 4,
          title: "आपातकालीन संपर्क सूची",
          description: "सभी जिलों के आपातकालीन हेल्पलाइन नंबर",
          type: "PDF",
          size: "500 KB",
          category: "contacts",
          icon: "Phone",
          downloadUrl: "#"
        },
        {
          id: 5,
          title: "डिजिटल साक्षरता गाइड",
          description: "बुनियादी कंप्यूटर और इंटरनेट उपयोग सीखने के लिए",
          type: "PDF",
          size: "3.2 MB",
          category: "guides",
          icon: "Monitor",
          downloadUrl: "#"
        },
        {
          id: 6,
          title: "दस्तावेज़ अपलोड फॉर्म",
          description: "आवश्यक दस्तावेजों को अपलोड करने के लिए फॉर्म",
          type: "PDF",
          size: "1.1 MB",
          category: "forms",
          icon: "Upload",
          downloadUrl: "#"
        }
      ]
    },
    en: {
      title: "Resource Library",
      subtitle: "Useful guides, forms and downloads",
      categories: [
        { id: 'all', name: 'All', icon: 'Grid3X3' },
        { id: 'forms', name: 'Forms', icon: 'FileText' },
        { id: 'guides', name: 'Guides', icon: 'BookOpen' },
        { id: 'videos', name: 'Videos', icon: 'Play' },
        { id: 'contacts', name: 'Contacts', icon: 'Phone' }
      ],
      resources: [
        {
          id: 1,
          title: "Job Application Form",
          description: "General application form for all types of jobs",
          type: "PDF",
          size: "2.5 MB",
          category: "forms",
          icon: "FileText",
          downloadUrl: "#"
        },
        {
          id: 2,
          title: "Scheme Eligibility Guide",
          description: "Detailed guide to check eligibility for government schemes",
          type: "PDF",
          size: "1.8 MB",
          category: "guides",
          icon: "BookOpen",
          downloadUrl: "#"
        },
        {
          id: 3,
          title: "Platform Usage Video",
          description: "Step-by-step video tutorial for using e-GramSetu",
          type: "MP4",
          size: "45 MB",
          category: "videos",
          icon: "Play",
          downloadUrl: "#"
        },
        {
          id: 4,
          title: "Emergency Contact List",
          description: "Emergency helpline numbers for all districts",
          type: "PDF",
          size: "500 KB",
          category: "contacts",
          icon: "Phone",
          downloadUrl: "#"
        },
        {
          id: 5,
          title: "Digital Literacy Guide",
          description: "Learn basic computer and internet usage",
          type: "PDF",
          size: "3.2 MB",
          category: "guides",
          icon: "Monitor",
          downloadUrl: "#"
        },
        {
          id: 6,
          title: "Document Upload Form",
          description: "Form for uploading required documents",
          type: "PDF",
          size: "1.1 MB",
          category: "forms",
          icon: "Upload",
          downloadUrl: "#"
        }
      ]
    }
  };

  const currentContent = content?.[currentLanguage] || content?.hi;

  const filteredResources = selectedCategory === 'all' 
    ? currentContent?.resources 
    : currentContent?.resources?.filter(resource => resource?.category === selectedCategory);

  const handleDownload = (resource) => {
    // Mock download functionality
    console.log(`Downloading: ${resource?.title}`);
    // In real implementation, this would trigger actual download
  };

  return (
    <div className="bg-muted py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
            {currentContent?.title}
          </h2>
          <p className="text-muted-foreground">
            {currentContent?.subtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {currentContent?.categories?.map((category) => (
            <Button
              key={category?.id}
              variant={selectedCategory === category?.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category?.id)}
              className="flex items-center space-x-2"
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </Button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources?.map((resource) => (
            <div key={resource?.id} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-soft transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <Icon name={resource?.icon} size={24} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {resource?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded">
                        {resource?.type}
                      </span>
                      <span>{resource?.size}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(resource)}
                      className="flex items-center space-x-1"
                    >
                      <Icon name="Download" size={14} />
                      <span>{currentLanguage === 'hi' ? 'डाउनलोड' : 'Download'}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'इस श्रेणी में कोई संसाधन नहीं मिला' : 'No resources found in this category'}
            </p>
          </div>
        )}

        {/* Offline Access Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Wifi" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-heading font-semibold text-blue-800 mb-1">
                {currentLanguage === 'hi' ? 'ऑफलाइन पहुंच' : 'Offline Access'}
              </h4>
              <p className="text-sm text-blue-700">
                {currentLanguage === 'hi' ?'डाउनलोड किए गए संसाधन बिना इंटरनेट के भी उपलब्ध रहेंगे।' :'Downloaded resources will be available even without internet connection.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;