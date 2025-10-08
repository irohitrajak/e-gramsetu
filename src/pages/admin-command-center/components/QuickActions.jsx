import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "नई नौकरी पोस्ट करें",
      description: "रोजगार अवसर जोड़ें",
      icon: "Plus",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      action: () => console.log("Add job")
    },
    {
      id: 2,
      title: "योजना अपडेट करें",
      description: "सरकारी योजना संपादित करें",
      icon: "Edit",
      color: "bg-green-50 text-green-600 border-green-200",
      action: () => console.log("Update scheme")
    },
    {
      id: 3,
      title: "बल्क SMS भेजें",
      description: "समुदाय को अलर्ट भेजें",
      icon: "MessageSquare",
      color: "bg-orange-50 text-orange-600 border-orange-200",
      action: () => console.log("Send SMS")
    },
    {
      id: 4,
      title: "रिपोर्ट जेनरेट करें",
      description: "प्रभाव रिपोर्ट तैयार करें",
      icon: "FileBarChart",
      color: "bg-purple-50 text-purple-600 border-purple-200",
      action: () => console.log("Generate report")
    },
    {
      id: 5,
      title: "उपयोगकर्ता प्रबंधन",
      description: "खाते और अनुमतियां",
      icon: "Users",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      action: () => console.log("Manage users")
    },
    {
      id: 6,
      title: "डेटा एक्सपोर्ट",
      description: "CSV/Excel में डाउनलोड",
      icon: "Download",
      color: "bg-gray-50 text-gray-600 border-gray-200",
      action: () => console.log("Export data")
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          त्वरित कार्य
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          सामान्य प्रशासनिक कार्यों के लिए शॉर्टकट
        </p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions?.map((action) => (
            <Button
              key={action?.id}
              variant="ghost"
              onClick={action?.action}
              className="h-auto p-4 flex flex-col items-start space-y-3 hover:bg-muted/50 border border-border hover:border-primary/20 transition-all"
            >
              <div className={`p-3 rounded-lg ${action?.color}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              
              <div className="text-left">
                <h4 className="text-sm font-medium text-foreground mb-1">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;