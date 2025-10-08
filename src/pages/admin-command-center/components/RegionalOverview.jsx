import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegionalOverview = () => {
  const [selectedRegion, setSelectedRegion] = useState('rajasthan');

  const regions = [
    {
      id: 'rajasthan',
      name: 'राजस्थान',
      districts: 33,
      activeJobs: 245,
      pendingApplications: 1250,
      completedSchemes: 89,
      population: '6.8 करोड़',
      digitalLiteracy: '65%'
    },
    {
      id: 'maharashtra',
      name: 'महाराष्ट्र',
      districts: 36,
      activeJobs: 312,
      pendingApplications: 1890,
      completedSchemes: 156,
      population: '11.2 करोड़',
      digitalLiteracy: '78%'
    },
    {
      id: 'uttar_pradesh',
      name: 'उत्तर प्रदेश',
      districts: 75,
      activeJobs: 567,
      pendingApplications: 3240,
      completedSchemes: 234,
      population: '19.9 करोड़',
      digitalLiteracy: '58%'
    },
    {
      id: 'bihar',
      name: 'बिहार',
      districts: 38,
      activeJobs: 189,
      pendingApplications: 2100,
      completedSchemes: 145,
      population: '10.4 करोड़',
      digitalLiteracy: '52%'
    }
  ];

  const currentRegion = regions?.find(r => r?.id === selectedRegion);

  const districtData = [
    { name: 'जयपुर', jobs: 45, applications: 230, schemes: 12 },
    { name: 'जोधपुर', jobs: 32, applications: 180, schemes: 8 },
    { name: 'उदयपुर', jobs: 28, applications: 150, schemes: 10 },
    { name: 'कोटा', jobs: 35, applications: 200, schemes: 9 },
    { name: 'अजमेर', jobs: 25, applications: 140, schemes: 7 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            क्षेत्रीय अवलोकन
          </h3>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e?.target?.value)}
              className="text-sm border border-border rounded-md px-3 py-1 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {regions?.map((region) => (
                <option key={region?.id} value={region?.id}>
                  {region?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Region Summary */}
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{currentRegion?.districts}</div>
              <div className="text-xs text-muted-foreground">जिले</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{currentRegion?.activeJobs}</div>
              <div className="text-xs text-muted-foreground">सक्रिय नौकरियां</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{currentRegion?.pendingApplications}</div>
              <div className="text-xs text-muted-foreground">लंबित आवेदन</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{currentRegion?.completedSchemes}</div>
              <div className="text-xs text-muted-foreground">पूर्ण योजनाएं</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>जनसंख्या: {currentRegion?.population}</span>
            <span>डिजिटल साक्षरता: {currentRegion?.digitalLiteracy}</span>
          </div>
        </div>

        {/* District Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">जिलेवार विवरण</h4>
          <div className="space-y-2">
            {districtData?.map((district, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="font-medium text-foreground">{district?.name}</div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-blue-600">{district?.jobs} नौकरियां</span>
                  <span className="text-orange-600">{district?.applications} आवेदन</span>
                  <span className="text-green-600">{district?.schemes} योजनाएं</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-border">
          <Button variant="outline" size="sm">
            <Icon name="FileText" size={16} className="mr-2" />
            विस्तृत रिपोर्ट
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            डेटा एक्सपोर्ट
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegionalOverview;