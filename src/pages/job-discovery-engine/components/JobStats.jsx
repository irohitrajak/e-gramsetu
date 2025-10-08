import React from 'react';
import Icon from '../../../components/AppIcon';

const JobStats = ({ stats }) => {
  const statItems = [
    {
      id: 'total-jobs',
      title: 'कुल काम उपलब्ध',
      value: stats?.totalJobs || 0,
      icon: 'Briefcase',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12 आज',
      changeType: 'positive'
    },
    {
      id: 'new-today',
      title: 'आज के नए काम',
      value: stats?.newToday || 0,
      icon: 'Plus',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: 'पिछले सप्ताह से +8%',
      changeType: 'positive'
    },
    {
      id: 'nearby-jobs',
      title: 'आस-पास के काम',
      value: stats?.nearbyJobs || 0,
      icon: 'MapPin',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '10 किमी के भीतर',
      changeType: 'neutral'
    },
    {
      id: 'urgent-hiring',
      title: 'तुरंत भर्ती',
      value: stats?.urgentHiring || 0,
      icon: 'Clock',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      change: 'जल्दी आवेदन करें',
      changeType: 'urgent'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'urgent':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems?.map((item) => (
        <div
          key={item?.id}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            
            {item?.changeType === 'urgent' && (
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
              {item?.value?.toLocaleString('hi-IN')}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-2">
              {item?.title}
            </p>
            
            <p className={`text-xs font-medium ${getChangeColor(item?.changeType)}`}>
              {item?.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobStats;