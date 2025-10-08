import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick, savedJobsCount = 0, appliedJobsCount = 0 }) => {
  const quickActions = [
    {
      id: 'saved-jobs',
      title: 'सहेजे गए काम',
      description: `${savedJobsCount} काम सहेजे गए`,
      icon: 'Heart',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      action: () => onActionClick('saved-jobs')
    },
    {
      id: 'applied-jobs',
      title: 'आवेदन किए गए',
      description: `${appliedJobsCount} आवेदन भेजे गए`,
      icon: 'Send',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      action: () => onActionClick('applied-jobs')
    },
    {
      id: 'job-alerts',
      title: 'जॉब अलर्ट',
      description: 'नए काम की सूचना पाएं',
      icon: 'Bell',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      action: () => onActionClick('job-alerts')
    },
    {
      id: 'profile-complete',
      title: 'प्रोफाइल पूरी करें',
      description: 'बेहतर काम पाने के लिए',
      icon: 'User',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      action: () => onActionClick('profile-complete')
    }
  ];

  const featuredCategories = [
    {
      id: 'agriculture',
      title: 'खेती-बाड़ी',
      icon: 'Wheat',
      jobCount: 45,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'construction',
      title: 'निर्माण कार्य',
      icon: 'HardHat',
      jobCount: 32,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 'retail',
      title: 'दुकान-व्यापार',
      icon: 'Store',
      jobCount: 28,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'transport',
      title: 'परिवहन',
      icon: 'Truck',
      jobCount: 19,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'domestic',
      title: 'घरेलू काम',
      icon: 'Home',
      jobCount: 24,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      id: 'skilled',
      title: 'कुशल कारीगर',
      icon: 'Wrench',
      jobCount: 15,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          त्वरित कार्य
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="p-4 rounded-lg border border-border hover:shadow-soft transition-all duration-200 text-left group"
            >
              <div className={`w-10 h-10 ${action?.bgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {action?.title}
              </h3>
              
              <p className="text-xs text-muted-foreground">
                {action?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Job Categories */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            काम के प्रकार
          </h2>
          
          <Button
            variant="ghost"
            onClick={() => onActionClick('all-categories')}
            iconName="ArrowRight"
            iconPosition="right"
            className="text-sm"
          >
            सभी देखें
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onActionClick('category', category?.id)}
              className="p-4 rounded-lg border border-border hover:shadow-soft transition-all duration-200 text-center group"
            >
              <div className={`w-12 h-12 ${category?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <Icon name={category?.icon} size={24} className={category?.color} />
              </div>
              
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {category?.title}
              </h3>
              
              <p className="text-xs text-muted-foreground">
                {category?.jobCount} काम उपलब्ध
              </p>
            </button>
          ))}
        </div>
      </div>
      {/* Tips & Guidance */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={20} className="text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
              काम पाने के लिए सुझाव
            </h3>
            
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>अपनी प्रोफाइल में सभी जानकारी भरें</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>अपने कौशल और अनुभव को स्पष्ट रूप से लिखें</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>नियमित रूप से नए काम की जांच करें</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span>जॉब अलर्ट सेट करें ताकि आपको तुरंत पता चल जाए</span>
              </li>
            </ul>
            
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => onActionClick('job-tips')}
                iconName="ExternalLink"
                iconPosition="right"
                className="text-sm"
              >
                और सुझाव देखें
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;