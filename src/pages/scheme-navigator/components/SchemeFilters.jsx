import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const SchemeFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const categoryOptions = [
    { value: '', label: 'सभी श्रेणियां' },
    { value: 'employment', label: 'रोजगार योजनाएं' },
    { value: 'agriculture', label: 'कृषि योजनाएं' },
    { value: 'education', label: 'शिक्षा योजनाएं' },
    { value: 'health', label: 'स्वास्थ्य योजनाएं' },
    { value: 'housing', label: 'आवास योजनाएं' },
    { value: 'financial', label: 'वित्तीय योजनाएं' }
  ];

  const statusOptions = [
    { value: '', label: 'सभी स्थितियां' },
    { value: 'active', label: 'सक्रिय' },
    { value: 'closing-soon', label: 'जल्दी बंद होने वाली' },
    { value: 'closed', label: 'बंद' }
  ];

  const benefitRangeOptions = [
    { value: '', label: 'सभी राशि' },
    { value: '0-10000', label: '₹10,000 तक' },
    { value: '10000-50000', label: '₹10,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000 - ₹1,00,000' },
    { value: '100000+', label: '₹1,00,000 से अधिक' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          योजना फिल्टर
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            फिल्टर साफ़ करें
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="योजना खोजें"
          type="search"
          placeholder="योजना का नाम..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
        />

        <Select
          label="श्रेणी"
          options={categoryOptions}
          value={filters?.category || ''}
          onChange={(value) => handleFilterChange('category', value)}
          placeholder="श्रेणी चुनें"
        />

        <Select
          label="स्थिति"
          options={statusOptions}
          value={filters?.status || ''}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="स्थिति चुनें"
        />

        <Select
          label="लाभ राशि"
          options={benefitRangeOptions}
          value={filters?.benefitRange || ''}
          onChange={(value) => handleFilterChange('benefitRange', value)}
          placeholder="राशि चुनें"
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>सक्रिय</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span>जल्दी बंद</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>बंद</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>नई योजनाओं की जानकारी के लिए नियमित रूप से जांचें</span>
        </div>
      </div>
    </div>
  );
};

export default SchemeFilters;