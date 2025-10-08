import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: "bg-primary/10 text-primary border-primary/20",
      success: "bg-green-50 text-green-600 border-green-200",
      warning: "bg-amber-50 text-amber-600 border-amber-200",
      accent: "bg-orange-50 text-orange-600 border-orange-200"
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getChangeColor = (type) => {
    return type === 'increase' ? 'text-green-600' : type === 'decrease' ? 'text-red-600' : 'text-gray-500';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor(changeType)}`}>
            <Icon 
              name={changeType === 'increase' ? 'TrendingUp' : changeType === 'decrease' ? 'TrendingDown' : 'Minus'} 
              size={16} 
            />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default MetricsCard;