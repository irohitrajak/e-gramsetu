import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import RegionalOverview from './components/RegionalOverview';
import SystemAlerts from './components/SystemAlerts';
import PerformanceChart from './components/PerformanceChart';

const AdminCommandCenter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adminRole, setAdminRole] = useState('district_officer');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date?.toLocaleString('hi-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const rolePermissions = {
    district_officer: {
      name: 'जिला अधिकारी',
      canManageJobs: true,
      canManageSchemes: true,
      canViewReports: true,
      canManageUsers: false
    },
    ngo_coordinator: {
      name: 'एनजीओ समन्वयक',
      canManageJobs: false,
      canManageSchemes: true,
      canViewReports: true,
      canManageUsers: false
    },
    system_admin: {
      name: 'सिस्टम प्रशासक',
      canManageJobs: true,
      canManageSchemes: true,
      canViewReports: true,
      canManageUsers: true
    }
  };

  const currentRole = rolePermissions?.[adminRole];

  const metricsData = [
    {
      title: "कुल पंजीकृत उपयोगकर्ता",
      value: "2,45,678",
      change: "+12.5%",
      changeType: "increase",
      icon: "Users",
      color: "primary"
    },
    {
      title: "सक्रिय नौकरी पोस्टिंग",
      value: "1,234",
      change: "+8.2%",
      changeType: "increase",
      icon: "Briefcase",
      color: "success"
    },
    {
      title: "योजना आवेदन (इस महीने)",
      value: "15,678",
      change: "+15.3%",
      changeType: "increase",
      icon: "FileText",
      color: "accent"
    },
    {
      title: "सफल नियुक्तियां",
      value: "8,945",
      change: "+22.1%",
      changeType: "increase",
      icon: "CheckCircle",
      color: "success"
    },
    {
      title: "लंबित सत्यापन",
      value: "567",
      change: "-5.4%",
      changeType: "decrease",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "सिस्टम अपटाइम",
      value: "99.8%",
      change: "स्थिर",
      changeType: "stable",
      icon: "Activity",
      color: "success"
    }
  ];

  return (
    <div className="space-y-10 p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  प्रशासनिक नियंत्रण केंद्र
                </h1>
                <p className="text-muted-foreground">
                  e-GramSetu प्लेटफॉर्म का व्यापक प्रबंधन और निगरानी
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">
                  {formatDateTime(currentTime)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    {currentRole?.name}
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Role Selector */}
            <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
              <Icon name="Shield" size={20} className="text-primary" />
              <div className="flex-1">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  भूमिका चुनें:
                </label>
                <select
                  value={adminRole}
                  onChange={(e) => setAdminRole(e?.target?.value)}
                  className="border border-border rounded-md px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="district_officer">जिला अधिकारी</option>
                  <option value="ngo_coordinator">एनजीओ समन्वयक</option>
                  <option value="system_admin">सिस्टम प्रशासक</option>
                </select>
              </div>
              <div className="text-sm text-muted-foreground">
                अनुमतियां: {Object.values(currentRole)?.filter(v => v === true)?.length - 1}/4
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <PerformanceChart />
              <QuickActions />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <SystemAlerts />
              <ActivityFeed />
            </div>
          </div>

          {/* Regional Overview */}
          <div className="mb-8">
            <RegionalOverview />
          </div>

          {/* Emergency Actions */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-red-600" />
              <h3 className="text-lg font-heading font-semibold text-red-800">
                आपातकालीन कार्य
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="destructive" className="flex items-center justify-center space-x-2">
                <Icon name="AlertCircle" size={16} />
                <span>सिस्टम बंद करें</span>
              </Button>
              
              <Button variant="outline" className="flex items-center justify-center space-x-2 border-red-300 text-red-600 hover:bg-red-50">
                <Icon name="Database" size={16} />
                <span>आपातकालीन बैकअप</span>
              </Button>
              
              <Button variant="outline" className="flex items-center justify-center space-x-2 border-red-300 text-red-600 hover:bg-red-50">
                <Icon name="MessageSquare" size={16} />
                <span>आपातकालीन अलर्ट</span>
              </Button>
            </div>
          </div>
    </div>
  );
};

export default AdminCommandCenter;