import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SearchFilters = ({ onFiltersChange, isVoiceSearchActive, onVoiceToggle }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    salaryRange: '',
    experience: '',
    skills: ''
  });

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const jobTypeOptions = [
    { value: '', label: 'सभी प्रकार के काम' },
    { value: 'full-time', label: 'पूर्णकालिक नौकरी' },
    { value: 'part-time', label: 'अंशकालिक नौकरी' },
    { value: 'contract', label: 'ठेका आधारित काम' },
    { value: 'daily-wage', label: 'दैनिक मजदूरी' },
    { value: 'seasonal', label: 'मौसमी काम' }
  ];

  const salaryRangeOptions = [
    { value: '', label: 'कोई सीमा नहीं' },
    { value: '0-10000', label: '₹10,000 तक' },
    { value: '10000-20000', label: '₹10,000 - ₹20,000' },
    { value: '20000-30000', label: '₹20,000 - ₹30,000' },
    { value: '30000-50000', label: '₹30,000 - ₹50,000' },
    { value: '50000+', label: '₹50,000 से अधिक' }
  ];

  const experienceOptions = [
    { value: '', label: 'कोई अनुभव आवश्यक नहीं' },
    { value: 'fresher', label: 'नया व्यक्ति (0-1 साल)' },
    { value: '1-3', label: '1-3 साल का अनुभव' },
    { value: '3-5', label: '3-5 साल का अनुभव' },
    { value: '5+', label: '5+ साल का अनुभव' }
  ];

  const locationOptions = [
    { value: '', label: 'सभी स्थान' },
    { value: 'within-5km', label: '5 किमी के भीतर' },
    { value: 'within-10km', label: '10 किमी के भीतर' },
    { value: 'within-25km', label: '25 किमी के भीतर' },
    { value: 'within-50km', label: '50 किमी के भीतर' },
    { value: 'any-distance', label: 'कोई दूरी सीमा नहीं' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      keyword: '',
      location: '',
      jobType: '',
      salaryRange: '',
      experience: '',
      skills: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="काम खोजें (जैसे: खेती, दुकान, ड्राइवर)"
              value={filters?.keyword}
              onChange={(e) => handleFilterChange('keyword', e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={isVoiceSearchActive ? "default" : "outline"}
            onClick={onVoiceToggle}
            iconName="Mic"
            className="px-4"
          >
            {isVoiceSearchActive ? 'सुन रहा है...' : 'आवाज़ से खोजें'}
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            फ़िल्टर
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="स्थान"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
              placeholder="अपने पास का काम चुनें"
            />

            <Select
              label="काम का प्रकार"
              options={jobTypeOptions}
              value={filters?.jobType}
              onChange={(value) => handleFilterChange('jobType', value)}
              placeholder="काम का प्रकार चुनें"
            />

            <Select
              label="वेतन सीमा"
              options={salaryRangeOptions}
              value={filters?.salaryRange}
              onChange={(value) => handleFilterChange('salaryRange', value)}
              placeholder="वेतन सीमा चुनें"
            />

            <Select
              label="अनुभव"
              options={experienceOptions}
              value={filters?.experience}
              onChange={(value) => handleFilterChange('experience', value)}
              placeholder="अनुभव चुनें"
            />

            <Input
              label="कौशल"
              type="text"
              placeholder="जैसे: खेती, सिलाई, कंप्यूटर"
              value={filters?.skills}
              onChange={(e) => handleFilterChange('skills', e?.target?.value)}
            />
          </div>

          {hasActiveFilters && (
            <div className="flex justify-between items-center pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">
                {Object.values(filters)?.filter(v => v !== '')?.length} फ़िल्टर लगाए गए
              </span>
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                iconName="X"
                iconPosition="left"
                className="text-sm"
              >
                सभी फ़िल्टर हटाएं
              </Button>
            </div>
          )}
        </div>
      )}
      {/* Voice Search Indicator */}
      {isVoiceSearchActive && (
        <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="text-sm text-accent font-medium">
              बोलें... "मुझे खेती का काम चाहिए" या "दुकान में काम"
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;