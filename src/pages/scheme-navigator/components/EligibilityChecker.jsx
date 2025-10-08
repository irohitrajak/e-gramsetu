import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EligibilityChecker = ({ scheme, onClose, onProceedToApplication }) => {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    category: '',
    location: '',
    occupation: '',
    landOwnership: ''
  });
  
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const categoryOptions = [
    { value: 'general', label: 'सामान्य' },
    { value: 'obc', label: 'अन्य पिछड़ा वर्ग (OBC)' },
    { value: 'sc', label: 'अनुसूचित जाति (SC)' },
    { value: 'st', label: 'अनुसूचित जनजाति (ST)' }
  ];

  const occupationOptions = [
    { value: 'farmer', label: 'किसान' },
    { value: 'laborer', label: 'मजदूर' },
    { value: 'self-employed', label: 'स्वरोजगार' },
    { value: 'unemployed', label: 'बेरोजगार' },
    { value: 'student', label: 'छात्र' }
  ];

  const landOptions = [
    { value: 'landless', label: 'भूमिहीन' },
    { value: 'marginal', label: 'सीमांत किसान (2.5 एकड़ तक)' },
    { value: 'small', label: 'छोटे किसान (2.5-5 एकड़)' },
    { value: 'large', label: 'बड़े किसान (5+ एकड़)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const checkEligibility = () => {
    setIsChecking(true);
    
    // Simulate eligibility check
    setTimeout(() => {
      const isEligible = Math.random() > 0.3; // 70% chance of eligibility
      const score = Math.floor(Math.random() * 40) + 60; // Score between 60-100
      
      setEligibilityResult({
        eligible: isEligible,
        score: score,
        reasons: isEligible 
          ? ['आयु सीमा में हैं', 'आय की शर्त पूरी करते हैं', 'श्रेणी मानदंड मिलते हैं']
          : ['आय सीमा से अधिक', 'आयु मानदंड नहीं मिलते'],
        nextSteps: isEligible 
          ? ['आवश्यक दस्तावेज तैयार करें', 'ऑनलाइन आवेदन भरें', 'आवेदन जमा करें']
          : ['अन्य योजनाओं की जांच करें', 'स्थानीय अधिकारी से संपर्क करें']
      });
      setIsChecking(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-soft max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              पात्रता जांच - {scheme?.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              अपनी जानकारी भरें और पात्रता की जांच करें
            </p>
          </div>
          <Button variant="ghost" onClick={onClose} iconName="X" />
        </div>

        <div className="p-6">
          {!eligibilityResult ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="आयु (वर्षों में)"
                  type="number"
                  placeholder="25"
                  value={formData?.age}
                  onChange={(e) => handleInputChange('age', e?.target?.value)}
                  required
                />
                <Input
                  label="वार्षिक आय (₹)"
                  type="number"
                  placeholder="200000"
                  value={formData?.income}
                  onChange={(e) => handleInputChange('income', e?.target?.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="श्रेणी"
                  options={categoryOptions}
                  value={formData?.category}
                  onChange={(value) => handleInputChange('category', value)}
                  placeholder="श्रेणी चुनें"
                  required
                />
                <Select
                  label="व्यवसाय"
                  options={occupationOptions}
                  value={formData?.occupation}
                  onChange={(value) => handleInputChange('occupation', value)}
                  placeholder="व्यवसाय चुनें"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="स्थान (जिला)"
                  type="text"
                  placeholder="आपका जिला"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  required
                />
                <Select
                  label="भूमि स्वामित्व"
                  options={landOptions}
                  value={formData?.landOwnership}
                  onChange={(value) => handleInputChange('landOwnership', value)}
                  placeholder="भूमि स्थिति चुनें"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={onClose}>
                  रद्द करें
                </Button>
                <Button
                  variant="default"
                  onClick={checkEligibility}
                  loading={isChecking}
                  iconName="CheckCircle"
                  iconPosition="left"
                  disabled={!formData?.age || !formData?.income || !formData?.category}
                >
                  {isChecking ? 'जांच रहे हैं...' : 'पात्रता जांचें'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`text-center p-6 rounded-lg ${
                eligibilityResult?.eligible 
                  ? 'bg-green-50 border border-green-200' :'bg-red-50 border border-red-200'
              }`}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  eligibilityResult?.eligible ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon 
                    name={eligibilityResult?.eligible ? "CheckCircle" : "XCircle"} 
                    size={32} 
                    className={eligibilityResult?.eligible ? 'text-green-600' : 'text-red-600'} 
                  />
                </div>
                <h3 className={`text-xl font-heading font-semibold mb-2 ${
                  eligibilityResult?.eligible ? 'text-green-800' : 'text-red-800'
                }`}>
                  {eligibilityResult?.eligible ? 'आप पात्र हैं!' : 'आप पात्र नहीं हैं'}
                </h3>
                <p className={`text-sm ${
                  eligibilityResult?.eligible ? 'text-green-700' : 'text-red-700'
                }`}>
                  पात्रता स्कोर: {eligibilityResult?.score}/100
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="Info" size={18} className="mr-2" />
                    कारण
                  </h4>
                  <ul className="space-y-2">
                    {eligibilityResult?.reasons?.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <Icon 
                          name={eligibilityResult?.eligible ? "Check" : "X"} 
                          size={16} 
                          className={`mt-0.5 ${
                            eligibilityResult?.eligible ? 'text-green-600' : 'text-red-600'
                          }`} 
                        />
                        <span className="text-muted-foreground">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="ArrowRight" size={18} className="mr-2" />
                    अगले कदम
                  </h4>
                  <ul className="space-y-2">
                    {eligibilityResult?.nextSteps?.map((step, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <span className="flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground rounded-full text-xs font-medium mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={onClose}>
                  बंद करें
                </Button>
                {eligibilityResult?.eligible && (
                  <Button
                    variant="default"
                    onClick={() => onProceedToApplication(scheme)}
                    iconName="FileText"
                    iconPosition="left"
                  >
                    आवेदन करें
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EligibilityChecker;