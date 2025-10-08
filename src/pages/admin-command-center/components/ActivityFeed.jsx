import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "job_posted",
      title: "नई नौकरी पोस्ट की गई",
      description: "कृषि सहायक - राजस्थान सरकार",
      user: "राज कुमार (जिला अधिकारी)",
      timestamp: "2 मिनट पहले",
      icon: "Briefcase",
      color: "text-blue-600"
    },
    {
      id: 2,
      type: "scheme_updated",
      title: "योजना अपडेट",
      description: "प्रधानमंत्री रोजगार योजना - नई पात्रता शर्तें",
      user: "सुनीता शर्मा (योजना अधिकारी)",
      timestamp: "15 मिनट पहले",
      icon: "FileText",
      color: "text-green-600"
    },
    {
      id: 3,
      type: "application_approved",
      title: "आवेदन स्वीकृत",
      description: "25 आवेदन स्वीकृत - कौशल विकास योजना",
      user: "अमित पटेल (एनजीओ समन्वयक)",
      timestamp: "1 घंटा पहले",
      icon: "CheckCircle",
      color: "text-green-600"
    },
    {
      id: 4,
      type: "alert_sent",
      title: "अलर्ट भेजा गया",
      description: "नई भर्ती अधिसूचना - 500 उम्मीदवारों को SMS",
      user: "सिस्टम अपडेट",
      timestamp: "2 घंटे पहले",
      icon: "Bell",
      color: "text-orange-600"
    },
    {
      id: 5,
      type: "document_verified",
      title: "दस्तावेज सत्यापित",
      description: "150 प्रोफाइल सत्यापित - आधार लिंकिंग",
      user: "वेरिफिकेशन टीम",
      timestamp: "3 घंटे पहले",
      icon: "Shield",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            हाल की गतिविधियां
          </h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            सभी देखें
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
              <div className={`p-2 rounded-full bg-gray-100 ${activity?.color}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {activity?.timestamp}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">
                  {activity?.description}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  द्वारा: {activity?.user}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;