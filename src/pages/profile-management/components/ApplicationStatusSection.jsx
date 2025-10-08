import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApplicationStatusSection = ({ applications, currentLanguage }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const content = {
    hi: {
      applicationStatus: 'आवेदन स्थिति',
      viewAll: 'सभी देखें',
      filterAll: 'सभी',
      filterPending: 'लंबित',
      filterApproved: 'स्वीकृत',
      filterRejected: 'अस्वीकृत',
      filterInReview: 'समीक्षाधीन',
      applicationFor: 'के लिए आवेदन',
      appliedOn: 'आवेदन दिनांक',
      status: 'स्थिति',
      trackApplication: 'आवेदन ट्रैक करें',
      viewDetails: 'विवरण देखें',
      noApplications: 'कोई आवेदन नहीं मिला',
      noApplicationsDesc: 'आपने अभी तक कोई आवेदन नहीं किया है।',
      pending: 'लंबित',
      approved: 'स्वीकृत',
      rejected: 'अस्वीकृत',
      inReview: 'समीक्षाधीन',
      submitted: 'प्रस्तुत',
      documentsRequired: 'दस्तावेज़ आवश्यक',
      interviewScheduled: 'साक्षात्कार निर्धारित'
    },
    en: {
      applicationStatus: 'Application Status',
      viewAll: 'View All',
      filterAll: 'All',
      filterPending: 'Pending',
      filterApproved: 'Approved',
      filterRejected: 'Rejected',
      filterInReview: 'In Review',
      applicationFor: 'Application for',
      appliedOn: 'Applied on',
      status: 'Status',
      trackApplication: 'Track Application',
      viewDetails: 'View Details',
      noApplications: 'No Applications Found',
      noApplicationsDesc: 'You have not submitted any applications yet.',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      inReview: 'In Review',
      submitted: 'Submitted',
      documentsRequired: 'Documents Required',
      interviewScheduled: 'Interview Scheduled'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'text-success bg-success/10';
      case 'rejected': return 'text-error bg-error/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'in review': case'inreview': return 'text-primary bg-primary/10';
      case 'submitted': return 'text-accent bg-accent/10';
      case 'documents required': return 'text-secondary bg-secondary/10';
      case 'interview scheduled': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return t?.approved;
      case 'rejected': return t?.rejected;
      case 'pending': return t?.pending;
      case 'in review': case'inreview': return t?.inReview;
      case 'submitted': return t?.submitted;
      case 'documents required': return t?.documentsRequired;
      case 'interview scheduled': return t?.interviewScheduled;
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'CheckCircle';
      case 'rejected': return 'XCircle';
      case 'pending': return 'Clock';
      case 'in review': case'inreview': return 'Eye';
      case 'submitted': return 'Send';
      case 'documents required': return 'FileText';
      case 'interview scheduled': return 'Calendar';
      default: return 'Circle';
    }
  };

  const filters = [
    { key: 'all', label: t?.filterAll },
    { key: 'pending', label: t?.filterPending },
    { key: 'approved', label: t?.filterApproved },
    { key: 'rejected', label: t?.filterRejected },
    { key: 'inreview', label: t?.filterInReview }
  ];

  const filteredApplications = applications?.filter(app => {
    if (selectedFilter === 'all') return true;
    return app?.status?.toLowerCase()?.replace(' ', '') === selectedFilter;
  });

  const handleTrackApplication = (applicationId) => {
    // Navigate to application tracking page
    console.log('Tracking application:', applicationId);
  };

  const handleViewDetails = (applicationId) => {
    // Navigate to application details page
    console.log('Viewing details for application:', applicationId);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-warning" />
          </div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {t?.applicationStatus}
          </h2>
        </div>

        <Button
          variant="outline"
          iconName="ExternalLink"
          iconPosition="right"
        >
          {t?.viewAll}
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-muted rounded-lg">
        {filters?.map((filter) => (
          <button
            key={filter?.key}
            onClick={() => setSelectedFilter(filter?.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedFilter === filter?.key
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filter?.label}
          </button>
        ))}
      </div>
      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="FileX" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-heading font-medium text-foreground mb-2">
              {t?.noApplications}
            </h3>
            <p className="text-muted-foreground">
              {t?.noApplicationsDesc}
            </p>
          </div>
        ) : (
          filteredApplications?.map((application) => (
            <div key={application?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon 
                      name={application?.type === 'job' ? 'Briefcase' : 'Award'} 
                      size={20} 
                      className="text-muted-foreground" 
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground mb-1">
                      {t?.applicationFor} {application?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {application?.organization}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{t?.appliedOn}: {application?.appliedDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Hash" size={14} />
                        <span>ID: {application?.id}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                    getStatusColor(application?.status)
                  }`}>
                    <Icon name={getStatusIcon(application?.status)} size={14} />
                    <span>{getStatusText(application?.status)}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Search"
                      iconPosition="left"
                      onClick={() => handleTrackApplication(application?.id)}
                    >
                      {t?.trackApplication}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      onClick={() => handleViewDetails(application?.id)}
                    >
                      {t?.viewDetails}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Progress Bar for In Review Applications */}
              {application?.status?.toLowerCase() === 'in review' && application?.progress && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Review Progress</span>
                    <span className="text-sm text-muted-foreground">{application?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${application?.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationStatusSection;