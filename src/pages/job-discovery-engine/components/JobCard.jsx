import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const JobCard = ({ job, onApply, onSave, isSaved = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    await onApply(job?.id);
    setIsApplying(false);
  };

  const getJobTypeColor = (type) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-purple-100 text-purple-800',
      'daily-wage': 'bg-orange-100 text-orange-800',
      'seasonal': 'bg-yellow-100 text-yellow-800'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-800';
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      'high': 'bg-red-100 text-red-800 border-red-200',
      'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'low': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors?.[urgency] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {job?.companyLogo ? (
              <Image 
                src={job?.companyLogo} 
                alt={job?.company}
                className="w-full h-full object-cover"
              />
            ) : (
              <Icon name="Building2" size={20} className="text-muted-foreground" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-1 line-clamp-2">
                  {job?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{job?.company}</p>
              </div>
              
              <Button
                variant="ghost"
                onClick={() => onSave(job?.id)}
                iconName={isSaved ? "Heart" : "Heart"}
                className={`p-2 ${isSaved ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
              />
            </div>

            {/* Job Details */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>{job?.location}</span>
              </div>
              
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>{job?.postedTime}</span>
              </div>
              
              {job?.distance && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Navigation" size={14} />
                  <span>{job?.distance}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job?.type)}`}>
                {job?.typeLabel}
              </span>
              
              {job?.urgency && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(job?.urgency)}`}>
                  {job?.urgencyLabel}
                </span>
              )}
              
              {job?.isVerified && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center space-x-1">
                  <Icon name="CheckCircle" size={12} />
                  <span>सत्यापित</span>
                </span>
              )}
            </div>

            {/* Salary */}
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="IndianRupee" size={16} className="text-green-600" />
              <span className="text-lg font-semibold text-green-600">{job?.salary}</span>
              {job?.salaryPeriod && (
                <span className="text-sm text-muted-foreground">/ {job?.salaryPeriod}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mb-4">
        <p className="text-sm text-foreground line-clamp-2">
          {job?.description}
        </p>
        
        {job?.description?.length > 150 && (
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-primary p-0 h-auto mt-1"
          >
            {isExpanded ? 'कम दिखाएं' : 'और पढ़ें'}
          </Button>
        )}
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="space-y-3">
            {job?.requirements && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">आवश्यकताएं:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {job?.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job?.benefits && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">सुविधाएं:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {job?.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Star" size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job?.contactInfo && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">संपर्क जानकारी:</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  {job?.contactInfo?.phone && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={14} />
                      <span>{job?.contactInfo?.phone}</span>
                    </div>
                  )}
                  {job?.contactInfo?.whatsapp && (
                    <div className="flex items-center space-x-2">
                      <Icon name="MessageCircle" size={14} />
                      <span>WhatsApp: {job?.contactInfo?.whatsapp}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          {job?.applicants && (
            <span className="text-xs text-muted-foreground">
              {job?.applicants} लोगों ने आवेदन किया
            </span>
          )}
          
          {job?.rating && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span className="text-xs text-muted-foreground">{job?.rating}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName="Eye"
            className="text-sm"
          >
            विवरण
          </Button>
          
          <Button
            variant="default"
            onClick={handleApply}
            loading={isApplying}
            iconName="Send"
            iconPosition="right"
            disabled={job?.hasApplied}
          >
            {job?.hasApplied ? 'आवेदन किया गया' : 'आवेदन करें'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;