import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onTrackApplication, onViewFavorites, onGetHelp }) => {
  const quickActions = [
    {
      id: 'track',
      title: 'आवेदन ट्रैक करें',
      description: 'अपने आवेदन की स्थिति जांचें',
      icon: 'Search',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      action: onTrackApplication
    },
    {
      id: 'favorites',
      title: 'पसंदीदा योजनाएं',
      description: 'सेव की गई योजनाएं देखें',
      icon: 'Heart',
      color: 'bg-red-50 text-red-600 border-red-200',
      action: onViewFavorites
    },
    {
      id: 'help',
      title: 'सहायता केंद्र',
      description: 'मदद और मार्गदर्शन पाएं',
      icon: 'HelpCircle',
      color: 'bg-green-50 text-green-600 border-green-200',
      action: onGetHelp
    },
    {
      id: 'documents',
      title: 'दस्तावेज गाइड',
      description: 'आवश्यक कागजात की जानकारी',
      icon: 'FileText',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      action: () => {}
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Zap" size={20} className="mr-2" />
        त्वरित कार्य
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.action}
            className="text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-soft hover:scale-105 bg-background"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 border ${action?.color}`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <h4 className="font-heading font-semibold text-foreground mb-1">
              {action?.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {action?.description}
            </p>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>नई योजनाएं: साप्ताहिक अपडेट</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={16} />
              <span>अलर्ट: समय सीमा की सूचना</span>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            iconPosition="left"
          >
            सेटिंग्स
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;