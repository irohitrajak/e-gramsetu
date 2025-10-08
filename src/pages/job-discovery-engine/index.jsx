import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchFilters from './components/SearchFilters';
import JobCard from './components/JobCard';
import QuickActions from './components/QuickActions';
import JobStats from './components/JobStats';
import ApplicationTracker from './components/ApplicationTracker';

const JobDiscoveryEngine = () => {
  const [currentLanguage, setCurrentLanguage] = useState('hi');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoiceSearchActive, setIsVoiceSearchActive] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [currentView, setCurrentView] = useState('jobs'); // 'jobs', 'saved', 'applied', 'tracker'
  const [sortBy, setSortBy] = useState('relevance');

  // Mock job data
  const mockJobs = [
    {
      id: 1,
      title: "खेत में काम करने वाले मजदूर की आवश्यकता",
      company: "राम किसान फार्म",
      location: "गाजीपुर, उत्तर प्रदेश",
      salary: "₹300-400",
      salaryPeriod: "दिन",
      type: "daily-wage",
      typeLabel: "दैनिक मजदूरी",
      urgency: "high",
      urgencyLabel: "तुरंत चाहिए",
      postedTime: "2 घंटे पहले",
      distance: "3 किमी",
      isVerified: true,
      description: "गेहूं की कटाई और अन्य खेती के काम के लिए मेहनती मजदूरों की जरूरत है। काम का समय सुबह 6 बजे से शाम 6 बजे तक। खाना और चाय मुफ्त मिलेगी।",
      requirements: [
        "खेती के काम का अनुभव हो",
        "मेहनती और ईमानदार हो",
        "समय पर काम पर आना"
      ],
      benefits: [
        "दैनिक भुगतान",
        "मुफ्त खाना और चाय",
        "ओवरटाइम का अतिरिक्त पैसा"
      ],
      contactInfo: {
        phone: "9876543210",
        whatsapp: "9876543210"
      },
      applicants: 12,
      rating: 4.5,
      hasApplied: false,
      companyLogo: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "दुकान में सेल्समैन चाहिए",
      company: "गुप्ता जनरल स्टोर",
      location: "वाराणसी, उत्तर प्रदेश",
      salary: "₹12,000-15,000",
      salaryPeriod: "महीना",
      type: "full-time",
      typeLabel: "पूर्णकालिक नौकरी",
      urgency: "medium",
      urgencyLabel: "जल्दी भर्ती",
      postedTime: "5 घंटे पहले",
      distance: "8 किमी",
      isVerified: true,
      description: "अनुभवी सेल्समैन की जरूरत है जो ग्राहकों से अच्छी तरह बात कर सके। हिंदी और अंग्रेजी दोनों भाषा आनी चाहिए।",
      requirements: [
        "कम से कम 2 साल का अनुभव",
        "हिंदी और अंग्रेजी बोलना आना चाहिए",
        "ग्राहकों से अच्छा व्यवहार"
      ],
      benefits: [
        "महीने में दो बार छुट्टी",
        "बोनस और कमीशन",
        "मेडिकल सुविधा"
      ],
      contactInfo: {
        phone: "9123456789",
        whatsapp: "9123456789"
      },
      applicants: 8,
      rating: 4.2,
      hasApplied: false,
      companyLogo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "निर्माण कार्य में मिस्त्री की आवश्यकता",
      company: "शर्मा कंस्ट्रक्शन",
      location: "इलाहाबाद, उत्तर प्रदेश",
      salary: "₹500-700",
      salaryPeriod: "दिन",
      type: "contract",
      typeLabel: "ठेका आधारित काम",
      urgency: "high",
      urgencyLabel: "तुरंत चाहिए",
      postedTime: "1 दिन पहले",
      distance: "12 किमी",
      isVerified: true,
      description: "मकान बनाने के काम में अनुभवी मिस्त्री चाहिए। ईंट, सीमेंट और प्लास्टर का काम आना चाहिए।",
      requirements: [
        "5 साल का निर्माण अनुभव",
        "ईंट-सीमेंट का काम आना चाहिए",
        "अपने औजार हों"
      ],
      benefits: [
        "साप्ताहिक भुगतान",
        "काम पूरा होने पर बोनस",
        "दुर्घटना बीमा"
      ],
      contactInfo: {
        phone: "9988776655",
        whatsapp: "9988776655"
      },
      applicants: 15,
      rating: 4.7,
      hasApplied: false,
      companyLogo: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "ऑटो रिक्शा ड्राइवर चाहिए",
      company: "सिंह ट्रांसपोर्ट",
      location: "कानपुर, उत्तर प्रदेश",
      salary: "₹8,000-12,000",
      salaryPeriod: "महीना",
      type: "full-time",
      typeLabel: "पूर्णकालिक नौकरी",
      urgency: "low",
      urgencyLabel: "सामान्य भर्ती",
      postedTime: "3 दिन पहले",
      distance: "15 किमी",
      isVerified: false,
      description: "अनुभवी ऑटो रिक्शा ड्राइवर की जरूरत है। वैध लाइसेंस होना जरूरी है।",
      requirements: [
        "वैध ड्राइविंग लाइसेंस",
        "3 साल का ड्राइविंग अनुभव",
        "शहर की सड़कों की जानकारी"
      ],
      benefits: [
        "पेट्रोल की सुविधा",
        "मासिक बोनस",
        "वाहन की मरम्मत मुफ्त"
      ],
      contactInfo: {
        phone: "9876512345"
      },
      applicants: 6,
      rating: 3.8,
      hasApplied: true,
      companyLogo: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "घरेलू काम करने वाली की जरूरत",
      company: "प्राइवेट फैमिली",
      location: "लखनऊ, उत्तर प्रदेश",
      salary: "₹6,000-8,000",
      salaryPeriod: "महीना",
      type: "part-time",
      typeLabel: "अंशकालिक नौकरी",
      urgency: "medium",
      urgencyLabel: "जल्दी भर्ती",
      postedTime: "1 सप्ताह पहले",
      distance: "5 किमी",
      isVerified: true,
      description: "घर की सफाई, खाना बनाने और बर्तन धोने के लिए अनुभवी महिला की जरूरत है।",
      requirements: [
        "घरेलू काम का अनुभव",
        "खाना बनाना आना चाहिए",
        "ईमानदार और भरोसेमंद"
      ],
      benefits: [
        "त्योहारों में बोनस",
        "छुट्टी की सुविधा",
        "खाना मुफ्त"
      ],
      contactInfo: {
        phone: "9654321098",
        whatsapp: "9654321098"
      },
      applicants: 4,
      rating: 4.3,
      hasApplied: false,
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "इलेक्ट्रिशियन की आवश्यकता",
      company: "पटेल इलेक्ट्रिकल वर्क्स",
      location: "आगरा, उत्तर प्रदेश",
      salary: "₹15,000-20,000",
      salaryPeriod: "महीना",
      type: "full-time",
      typeLabel: "पूर्णकालिक नौकरी",
      urgency: "high",
      urgencyLabel: "तुरंत चाहिए",
      postedTime: "4 घंटे पहले",
      distance: "20 किमी",
      isVerified: true,
      description: "घरेलू और व्यावसायिक इलेक्ट्रिकल काम के लिए अनुभवी इलेक्ट्रिशियन चाहिए।",
      requirements: [
        "ITI इलेक्ट्रिकल या समकक्ष",
        "5 साल का काम का अनुभव",
        "वायरिंग और रिपेयर का ज्ञान"
      ],
      benefits: [
        "PF और ESI की सुविधा",
        "ओवरटाइम का पैसा",
        "स्किल डेवलपमेंट ट्रेनिंग"
      ],
      contactInfo: {
        phone: "9321654987",
        whatsapp: "9321654987"
      },
      applicants: 18,
      rating: 4.6,
      hasApplied: false,
      companyLogo: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&h=100&fit=crop&crop=center"
    }
  ];

  // Mock application data
  const mockApplications = [
    {
      id: 1,
      jobTitle: "ऑटो रिक्शा ड्राइवर चाहिए",
      company: "सिंह ट्रांसपोर्ट",
      status: "reviewed",
      appliedDate: "15 दिसंबर 2024",
      lastUpdate: "17 दिसंबर 2024",
      applicationId: "APP001",
      nextAction: "इंटरव्यू के लिए कॉल का इंतजार करें",
      timeline: [
        { label: "आवेदन", completed: true },
        { label: "समीक्षा", completed: true, current: true },
        { label: "इंटरव्यू", completed: false },
        { label: "परिणाम", completed: false }
      ],
      canWithdraw: true
    },
    {
      id: 2,
      jobTitle: "दुकान में सेल्समैन चाहिए",
      company: "गुप्ता जनरल स्टोर",
      status: "pending",
      appliedDate: "18 दिसंबर 2024",
      lastUpdate: "18 दिसंबर 2024",
      applicationId: "APP002",
      nextAction: "आवेदन की समीक्षा हो रही है",
      timeline: [
        { label: "आवेदन", completed: true, current: true },
        { label: "समीक्षा", completed: false },
        { label: "इंटरव्यू", completed: false },
        { label: "परिणाम", completed: false }
      ],
      canWithdraw: true
    }
  ];

  // Mock stats
  const jobStats = {
    totalJobs: 163,
    newToday: 12,
    nearbyJobs: 45,
    urgentHiring: 8
  };

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'hi';
    setCurrentLanguage(savedLanguage);

    // Simulate loading jobs
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);

    // Load saved jobs from localStorage
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(new Set(savedJobIds));

    const appliedJobIds = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setAppliedJobs(new Set(appliedJobIds));
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...mockJobs];

    if (filters?.keyword) {
      filtered = filtered?.filter(job => 
        job?.title?.toLowerCase()?.includes(filters?.keyword?.toLowerCase()) ||
        job?.company?.toLowerCase()?.includes(filters?.keyword?.toLowerCase()) ||
        job?.description?.toLowerCase()?.includes(filters?.keyword?.toLowerCase())
      );
    }

    if (filters?.location) {
      // Filter by distance/location
      filtered = filtered?.filter(job => {
        if (filters?.location === 'within-5km') return parseInt(job?.distance) <= 5;
        if (filters?.location === 'within-10km') return parseInt(job?.distance) <= 10;
        if (filters?.location === 'within-25km') return parseInt(job?.distance) <= 25;
        if (filters?.location === 'within-50km') return parseInt(job?.distance) <= 50;
        return true;
      });
    }

    if (filters?.jobType) {
      filtered = filtered?.filter(job => job?.type === filters?.jobType);
    }

    if (filters?.salaryRange) {
      // Filter by salary range
      filtered = filtered?.filter(job => {
        const salary = parseInt(job?.salary?.replace(/[₹,]/g, '')?.split('-')?.[0]);
        if (filters?.salaryRange === '0-10000') return salary <= 10000;
        if (filters?.salaryRange === '10000-20000') return salary >= 10000 && salary <= 20000;
        if (filters?.salaryRange === '20000-30000') return salary >= 20000 && salary <= 30000;
        if (filters?.salaryRange === '30000-50000') return salary >= 30000 && salary <= 50000;
        if (filters?.salaryRange === '50000+') return salary >= 50000;
        return true;
      });
    }

    if (filters?.skills) {
      filtered = filtered?.filter(job => 
        job?.description?.toLowerCase()?.includes(filters?.skills?.toLowerCase()) ||
        job?.requirements?.some(req => req?.toLowerCase()?.includes(filters?.skills?.toLowerCase()))
      );
    }

    setFilteredJobs(filtered);
  };

  const handleVoiceToggle = () => {
    setIsVoiceSearchActive(!isVoiceSearchActive);
    
    if (!isVoiceSearchActive) {
      // Simulate voice search
      setTimeout(() => {
        setIsVoiceSearchActive(false);
        // You could trigger a search here based on voice input
      }, 3000);
    }
  };

  const handleJobApply = async (jobId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAppliedJobs = new Set([...appliedJobs, jobId]);
    setAppliedJobs(newAppliedJobs);
    localStorage.setItem('appliedJobs', JSON.stringify([...newAppliedJobs]));
    
    // Update job status
    setJobs(prevJobs => 
      prevJobs?.map(job => 
        job?.id === jobId ? { ...job, hasApplied: true } : job
      )
    );
    setFilteredJobs(prevJobs => 
      prevJobs?.map(job => 
        job?.id === jobId ? { ...job, hasApplied: true } : job
      )
    );
  };

  const handleJobSave = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    
    if (savedJobs?.has(jobId)) {
      newSavedJobs?.delete(jobId);
    } else {
      newSavedJobs?.add(jobId);
    }
    
    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify([...newSavedJobs]));
  };

  const handleQuickAction = (action, data) => {
    switch (action) {
      case 'saved-jobs': setCurrentView('saved');
        break;
      case 'applied-jobs': setCurrentView('applied');
        break;
      case 'job-alerts':
        window.location.href = '/profile-management?tab=alerts';
        break;
      case 'profile-complete':
        window.location.href = '/profile-management';
        break;
      case 'category':
        // Filter by category
        handleFiltersChange({ keyword: data });
        break;
      case 'all-categories':
        // Show all categories
        break;
      case 'job-tips':
        window.location.href = '/help-and-support?section=job-tips';
        break;
      default:
        break;
    }
  };

  const handleApplicationTrackerAction = (action, data) => {
    switch (action) {
      case 'all-applications': setCurrentView('tracker');
        break;
      case 'details':
        // Show application details
        break;
      case 'withdraw':
        // Withdraw application
        break;
      default:
        break;
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    
    let sorted = [...filteredJobs];
    
    switch (newSortBy) {
      case 'date':
        sorted?.sort((a, b) => new Date(b.postedTime) - new Date(a.postedTime));
        break;
      case 'salary':
        sorted?.sort((a, b) => {
          const salaryA = parseInt(a?.salary?.replace(/[₹,]/g, '')?.split('-')?.[0]);
          const salaryB = parseInt(b?.salary?.replace(/[₹,]/g, '')?.split('-')?.[0]);
          return salaryB - salaryA;
        });
        break;
      case 'distance':
        sorted?.sort((a, b) => parseInt(a?.distance) - parseInt(b?.distance));
        break;
      case 'relevance':
      default:
        // Keep original order for relevance
        break;
    }
    
    setFilteredJobs(sorted);
  };

  const getSavedJobs = () => {
    return mockJobs?.filter(job => savedJobs?.has(job?.id));
  };

  const getAppliedJobs = () => {
    return mockJobs?.filter(job => appliedJobs?.has(job?.id));
  };

  const renderJobsList = () => {
    let jobsToShow = filteredJobs;
    
    if (currentView === 'saved') {
      jobsToShow = getSavedJobs();
    } else if (currentView === 'applied') {
      jobsToShow = getAppliedJobs();
    }

    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (jobsToShow?.length === 0) {
      return (
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            कोई काम नहीं मिला
          </h3>
          <p className="text-muted-foreground mb-4">
            {currentView === 'saved' ? 'आपने अभी तक कोई काम सहेजा नहीं है' :
             currentView === 'applied'? 'आपने अभी तक कोई आवेदन नहीं भेजा है' : 'अपने फ़िल्टर बदलकर दोबारा कोशिश करें'}
          </p>
          <Button
            variant="default"
            onClick={() => setCurrentView('jobs')}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            वापस जाएं
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {jobsToShow?.map((job) => (
          <JobCard
            key={job?.id}
            job={job}
            onApply={handleJobApply}
            onSave={handleJobSave}
            isSaved={savedJobs?.has(job?.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                काम खोजें
              </h1>
              <p className="text-muted-foreground">
                अपने आस-पास के बेहतरीन काम के अवसर खोजें
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={currentView === 'jobs' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('jobs')}
                  iconName="Search"
                  className="text-sm"
                >
                  सभी काम
                </Button>
                
                <Button
                  variant={currentView === 'saved' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('saved')}
                  iconName="Heart"
                  className="text-sm"
                >
                  सहेजे गए ({savedJobs?.size})
                </Button>
                
                <Button
                  variant={currentView === 'applied' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('applied')}
                  iconName="Send"
                  className="text-sm"
                >
                  आवेदन किए गए ({appliedJobs?.size})
                </Button>
              </div>
            </div>
          </div>

          {/* Job Stats */}
          <JobStats stats={jobStats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Filters */}
            {currentView === 'jobs' && (
              <SearchFilters
                onFiltersChange={handleFiltersChange}
                isVoiceSearchActive={isVoiceSearchActive}
                onVoiceToggle={handleVoiceToggle}
              />
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  {currentView === 'jobs' && `${filteredJobs?.length} काम मिले`}
                  {currentView === 'saved' && `सहेजे गए काम (${getSavedJobs()?.length})`}
                  {currentView === 'applied' && `आवेदन किए गए काम (${getAppliedJobs()?.length})`}
                  {currentView === 'tracker' && 'आवेदन ट्रैकर'}
                </h2>
                
                {currentView === 'jobs' && (
                  <p className="text-sm text-muted-foreground">
                    आपके लिए सबसे अच्छे काम के अवसर
                  </p>
                )}
              </div>

              {currentView === 'jobs' && (
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground"
                  >
                    <option value="relevance">प्रासंगिकता के अनुसार</option>
                    <option value="date">नवीनतम पहले</option>
                    <option value="salary">वेतन के अनुसार</option>
                    <option value="distance">दूरी के अनुसार</option>
                  </select>
                  
                  <Button
                    variant="outline"
                    iconName="Filter"
                    className="text-sm"
                  >
                    फ़िल्टर
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            {currentView === 'tracker' ? (
              <ApplicationTracker
                applications={mockApplications}
                onViewDetails={handleApplicationTrackerAction}
              />
            ) : (
              renderJobsList()
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <QuickActions
                onActionClick={handleQuickAction}
                savedJobsCount={savedJobs?.size}
                appliedJobsCount={appliedJobs?.size}
              />
              
              {mockApplications?.length > 0 && currentView !== 'tracker' && (
                <ApplicationTracker
                  applications={mockApplications?.slice(0, 3)}
                  onViewDetails={handleApplicationTrackerAction}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDiscoveryEngine;