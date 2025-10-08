import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ currentLanguage }) => {
  const content = {
    hi: {
      title: 'सामुदायिक प्रभाव',
      subtitle: 'हमारी सफलता की कहानी',
      stats: [
        {
          id: 'jobs',
          label: 'नौकरियां मिलीं',
          value: '12,847',
          change: '+23%',
          icon: 'Briefcase',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          id: 'schemes',
          label: 'योजनाओं का लाभ',
          value: '8,432',
          change: '+18%',
          icon: 'Award',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        },
        {
          id: 'users',
          label: 'पंजीकृत उपयोगकर्ता',
          value: '45,291',
          change: '+31%',
          icon: 'Users',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50'
        },
        {
          id: 'applications',
          label: 'आवेदन जमा',
          value: '67,834',
          change: '+15%',
          icon: 'FileText',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        }
      ]
    },
    en: {
      title: 'Community Impact',
      subtitle: 'Our success story',
      stats: [
        {
          id: 'jobs',
          label: 'Jobs Secured',
          value: '12,847',
          change: '+23%',
          icon: 'Briefcase',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          id: 'schemes',
          label: 'Schemes Accessed',
          value: '8,432',
          change: '+18%',
          icon: 'Award',
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        },
        {
          id: 'users',
          label: 'Registered Users',
          value: '45,291',
          change: '+31%',
          icon: 'Users',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50'
        },
        {
          id: 'applications',
          label: 'Applications Submitted',
          value: '67,834',
          change: '+15%',
          icon: 'FileText',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        }
      ]
    }
  };

  const currentContent = content?.[currentLanguage] || content?.en;

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
        <Icon name="TrendingUp" size={24} className="text-accent" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {currentContent?.stats?.map((stat) => (
          <div key={stat?.id} className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                {stat?.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {stat?.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat?.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-3">
          <Icon name="Info" size={20} className="text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {currentLanguage === 'hi' ? 'लाइव अपडेट' : 'Live Updates'}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'hi' ?'आंकड़े वास्तविक समय में अपडेट होते रहते हैं' :'Statistics are updated in real-time'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;