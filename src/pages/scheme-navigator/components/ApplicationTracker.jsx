import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApplicationTracker = ({ isOpen, onClose }) => {
  const [trackingId, setTrackingId] = useState('');
  const [applicationData, setApplicationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockApplications = [
    {
      id: 'PMAY2024001234',
      schemeName: 'प्रधानमंत्री आवास योजना',
      status: 'document-verification',
      submittedDate: '15 सितंबर 2024',
      lastUpdate: '02 अक्टूबर 2024',
      steps: [
        { name: 'आवेदन जमा', status: 'completed', date: '15 सितंबर 2024' },
        { name: 'प्रारंभिक जांच', status: 'completed', date: '18 सितंबर 2024' },
        { name: 'दस्तावेज सत्यापन', status: 'in-progress', date: '25 सितंबर 2024' },
        { name: 'फील्ड सत्यापन', status: 'pending', date: '' },
        { name: 'अनुमोदन', status: 'pending', date: '' },
        { name: 'लाभ वितरण', status: 'pending', date: '' }
      ],
      nextAction: 'आधार कार्ड की प्रति जमा करें',
      estimatedCompletion: '15 नवंबर 2024'
    }
  ];

  const handleTrack = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const found = mockApplications?.find(app => app?.id === trackingId);
      setApplicationData(found || null);
      setIsLoading(false);
    }, 1500);
  };

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in-progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-soft max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              आवेदन ट्रैकिंग
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              अपने आवेदन की स्थिति जांचें
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} iconName="X" />
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex space-x-3">
              <Input
                label="ट्रैकिंग आईडी"
                type="text"
                placeholder="PMAY2024001234"
                value={trackingId}
                onChange={(e) => setTrackingId(e?.target?.value)}
                className="flex-1"
              />
              <div className="pt-6">
                <Button
                  variant="default"
                  onClick={handleTrack}
                  loading={isLoading}
                  iconName="Search"
                  iconPosition="left"
                  disabled={!trackingId}
                >
                  ट्रैक करें
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              आवेदन जमा करने के बाद मिली ट्रैकिंग आईडी दर्ज करें
            </p>
          </div>

          {applicationData && (
            <div className="space-y-6">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {applicationData?.schemeName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      आवेदन आईडी: {applicationData?.id}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">जमा की तारीख</div>
                    <div className="text-sm font-medium text-foreground">
                      {applicationData?.submittedDate}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">वर्तमान स्थिति</div>
                    <div className="text-sm font-medium text-foreground">दस्तावेज सत्यापन</div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">अंतिम अपडेट</div>
                    <div className="text-sm font-medium text-foreground">
                      {applicationData?.lastUpdate}
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">अनुमानित पूर्णता</div>
                    <div className="text-sm font-medium text-foreground">
                      {applicationData?.estimatedCompletion}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-heading font-semibold text-foreground mb-4">
                  आवेदन प्रगति
                </h4>
                <div className="space-y-4">
                  {applicationData?.steps?.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step?.status === 'completed' ? 'bg-green-100' :
                        step?.status === 'in-progress' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Icon 
                          name={getStepIcon(step?.status)} 
                          size={16} 
                          className={getStepColor(step?.status)}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${
                            step?.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                          }`}>
                            {step?.name}
                          </span>
                          {step?.date && (
                            <span className="text-xs text-muted-foreground">{step?.date}</span>
                          )}
                        </div>
                        {step?.status === 'in-progress' && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                            <div className="bg-blue-600 h-1.5 rounded-full w-3/4"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-amber-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-amber-800 mb-1">आवश्यक कार्रवाई</h5>
                    <p className="text-sm text-amber-700">{applicationData?.nextAction}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={onClose}>
                  बंद करें
                </Button>
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                >
                  स्थिति रिपोर्ट डाउनलोड करें
                </Button>
              </div>
            </div>
          )}

          {trackingId && !applicationData && !isLoading && (
            <div className="text-center py-8">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                कोई आवेदन नहीं मिला
              </h3>
              <p className="text-sm text-muted-foreground">
                कृपया सही ट्रैकिंग आईडी दर्ज करें या बाद में पुनः प्रयास करें
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;