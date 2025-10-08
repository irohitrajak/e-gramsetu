import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationTracker = ({ applications, onViewDetails }) => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'सभी आवेदन', count: applications?.length },
    { value: 'pending', label: 'प्रतीक्षारत', count: applications?.filter(app => app?.status === 'pending')?.length },
    { value: 'reviewed', label: 'समीक्षाधीन', count: applications?.filter(app => app?.status === 'reviewed')?.length },
    { value: 'shortlisted', label: 'चयनित', count: applications?.filter(app => app?.status === 'shortlisted')?.length },
    { value: 'rejected', label: 'अस्वीकृत', count: applications?.filter(app => app?.status === 'rejected')?.length }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'reviewed': 'bg-blue-100 text-blue-800 border-blue-200',
      'shortlisted': 'bg-green-100 text-green-800 border-green-200',
      'rejected': 'bg-red-100 text-red-800 border-red-200',
      'interview': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': 'Clock',
      'reviewed': 'Eye',
      'shortlisted': 'CheckCircle',
      'rejected': 'XCircle',
      'interview': 'Users'
    };
    return icons?.[status] || 'Clock';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pending': 'प्रतीक्षारत',
      'reviewed': 'समीक्षाधीन',
      'shortlisted': 'चयनित',
      'rejected': 'अस्वीकृत',
      'interview': 'इंटरव्यू'
    };
    return labels?.[status] || status;
  };

  const filteredApplications = selectedStatus === 'all' 
    ? applications 
    : applications?.filter(app => app?.status === selectedStatus);

  if (applications?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Send" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          कोई आवेदन नहीं भेजा गया
        </h3>
        <p className="text-muted-foreground mb-4">
          अभी तक आपने कोई काम के लिए आवेदन नहीं किया है
        </p>
        <Button
          variant="default"
          onClick={() => window.location.href = '/job-discovery-engine'}
          iconName="Search"
          iconPosition="left"
        >
          काम खोजें
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          आवेदन ट्रैकर
        </h2>
        
        <Button
          variant="outline"
          onClick={() => onViewDetails('all-applications')}
          iconName="ExternalLink"
          iconPosition="right"
          className="text-sm"
        >
          सभी देखें
        </Button>
      </div>
      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setSelectedStatus(option?.value)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedStatus === option?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {option?.label} ({option?.count})
          </button>
        ))}
      </div>
      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications?.slice(0, 5)?.map((application) => (
          <div
            key={application?.id}
            className="border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  {application?.jobTitle}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {application?.company}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>आवेदन: {application?.appliedDate}</span>
                  </div>
                  
                  {application?.lastUpdate && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>अपडेट: {application?.lastUpdate}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application?.status)}`}>
                  <Icon name={getStatusIcon(application?.status)} size={12} className="inline mr-1" />
                  {getStatusLabel(application?.status)}
                </span>
                
                {application?.priority && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {application?.priority}
                  </span>
                )}
              </div>
            </div>

            {/* Progress Timeline */}
            {application?.timeline && (
              <div className="mb-3">
                <div className="flex items-center space-x-2">
                  {application?.timeline?.map((step, index) => (
                    <React.Fragment key={index}>
                      <div className={`w-3 h-3 rounded-full ${
                        step?.completed ? 'bg-green-500' : step?.current ?'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      {index < application?.timeline?.length - 1 && (
                        <div className={`flex-1 h-0.5 ${
                          step?.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="flex justify-between mt-2">
                  {application?.timeline?.map((step, index) => (
                    <span key={index} className="text-xs text-muted-foreground">
                      {step?.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Next Action */}
            {application?.nextAction && (
              <div className="bg-muted rounded-lg p-3 mb-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      अगला कदम:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {application?.nextAction}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {application?.applicationId && (
                  <span>ID: {application?.applicationId}</span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {application?.canWithdraw && (
                  <Button
                    variant="ghost"
                    onClick={() => onViewDetails('withdraw', application?.id)}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    वापस लें
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={() => onViewDetails('details', application?.id)}
                  iconName="Eye"
                  className="text-xs"
                >
                  विवरण
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredApplications?.length > 5 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            onClick={() => onViewDetails('all-applications')}
            iconName="ArrowDown"
            iconPosition="right"
          >
            और {filteredApplications?.length - 5} आवेदन देखें
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;