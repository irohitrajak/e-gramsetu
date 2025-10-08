import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SchemeCard = ({ scheme, onViewDetails, onCheckEligibility }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closing-soon':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'employment':
        return 'Briefcase';
      case 'agriculture':
        return 'Wheat';
      case 'education':
        return 'GraduationCap';
      case 'health':
        return 'Heart';
      case 'housing':
        return 'Home';
      case 'financial':
        return 'CreditCard';
      default:
        return 'FileText';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            <Icon name={getCategoryIcon(scheme?.category)} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              {scheme?.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(scheme?.status)}`}>
              {scheme?.status === 'active' && 'सक्रिय'}
              {scheme?.status === 'closing-soon' && 'जल्दी बंद'}
              {scheme?.status === 'closed' && 'बंद'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">अंतिम तिथि</div>
          <div className="text-sm font-medium text-foreground">{scheme?.deadline}</div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {scheme?.description}
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-muted-foreground mb-1">लाभ राशि</div>
          <div className="text-sm font-medium text-foreground">{scheme?.benefitAmount}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">पात्रता</div>
          <div className="text-sm font-medium text-foreground">{scheme?.eligibility}</div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Users" size={14} />
          <span>{scheme?.applicants} आवेदक</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCheckEligibility(scheme)}
            iconName="CheckCircle"
            iconPosition="left"
          >
            पात्रता जांचें
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onViewDetails(scheme)}
            iconName="ArrowRight"
            iconPosition="right"
          >
            विवरण देखें
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;