import React from 'react';
import Icon from '../../../components/AppIcon';

const SchemeStats = () => {
  const stats = [
    {
      title: 'कुल योजनाएं',
      value: '247',
      change: '+12',
      changeType: 'increase',
      icon: 'FileText',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'सक्रिय योजनाएं',
      value: '189',
      change: '+8',
      changeType: 'increase',
      icon: 'CheckCircle',
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'कुल आवेदन',
      value: '1.2M',
      change: '+15%',
      changeType: 'increase',
      icon: 'Users',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'स्वीकृत आवेदन',
      value: '89%',
      change: '+2%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat?.color}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat?.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              <Icon 
                name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
              {stat?.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {stat?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchemeStats;