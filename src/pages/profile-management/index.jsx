import React, { useState, useEffect } from 'react';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoSection from './components/PersonalInfoSection';
import AddressSection from './components/AddressSection';
import DocumentsSection from './components/DocumentsSection';
import PrivacySettingsSection from './components/PrivacySettingsSection';
import ApplicationStatusSection from './components/ApplicationStatusSection';

const ProfileManagement = () => {
  const [currentLanguage, setCurrentLanguage] = useState('hi');
  const [editingSections, setEditingSections] = useState({
    personal: false,
    address: false
  });

  // Mock user profile data
  const [profile, setProfile] = useState({
    name: "रोहित रजक ",
    fatherName: "श्री रामेश रजक ",
    occupation: "कृषि मजदूर",
    location: ", कटनी , मध्यप्रदेश ",
    phone: "+91 98765 43210",
    email: "rohitpictures2005@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    completionPercentage: 75,
    verificationStatus: 'verified',
    lastUpdated: '05/10/2025',
    documentsCount: 6,
    dateOfBirth: '1985-03-15',
    gender: 'male',
    maritalStatus: 'married',
    category: 'obc',
    religion: 'hindu',
    nationality: 'Indian',
    alternatePhone: '+91 87654 32109'
  });

  // Mock address data
  const [address, setAddress] = useState({
    currentAddress: {
      houseNo: '123',
      street: 'मुख्य सड़क',
      village: 'सिरसा',
      tehsil: 'सिरसा',
      district: 'सिरसा',
      state: 'MADHYA PRADESH ',
      pincode: '125055'
    },
    permanentAddress: {
      houseNo: '123',
      street: 'मुख्य सड़क',
      village: 'सिरसा',
      tehsil: 'सिरसा',
      district: 'सिरसा',
      state: 'MADHYA PRADESH ',
      pincode: '125055'
    },
    sameAsCurrent: true
  });

  // Mock documents data
  const [documents, setDocuments] = useState([
    {
      id: 'aadhar',
      name: 'आधार कार्ड',
      status: 'verified',
      uploadedAt: '02/10/2025',
      size: '2.1 MB',
      url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
    },
    {
      id: 'pan',
      name: 'पैन कार्ड',
      status: 'verified',
      uploadedAt: '02/10/2025',
      size: '1.8 MB',
      url: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=300&fit=crop'
    },
    {
      id: 'bank',
      name: 'बैंक पासबुक',
      status: 'pending',
      uploadedAt: '03/10/2025',
      size: '2.5 MB',
      url: 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=300&fit=crop'
    },
    {
      id: 'voter',
      name: 'मतदाता पहचान पत्र',
      status: 'rejected',
      uploadedAt: '01/10/2025',
      size: '1.9 MB',
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop'
    }
  ]);

  // Mock privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    contactInfoSharing: true,
    jobAlerts: true,
    schemeNotifications: true,
    smsNotifications: true,
    emailNotifications: false,
    dataSharing: false,
    locationTracking: true,
    offlineSync: true
  });

  // Mock applications data
  const applications = [
    {
      id: 'APP001',
      title: 'कृषि सहायक',
      organization: 'हरियाणा कृषि विभाग',
      type: 'job',
      status: 'In Review',
      appliedDate: '28/09/2025',
      progress: 65
    },
    {
      id: 'APP002',
      title: 'प्रधानमंत्री किसान सम्मान निधि',
      organization: 'कृषि मंत्रालय, भारत सरकार',
      type: 'scheme',
      status: 'Approved',
      appliedDate: '15/09/2025'
    },
    {
      id: 'APP003',
      title: 'ग्राम पंचायत सचिव',
      organization: 'सिरसा ग्राम पंचायत',
      type: 'job',
      status: 'Documents Required',
      appliedDate: '20/09/2025'
    },
    {
      id: 'APP004',
      title: 'मुख्यमंत्री परिवार समृद्धि योजना',
      organization: 'हरियाणा सरकार',
      type: 'scheme',
      status: 'Pending',
      appliedDate: '25/09/2025'
    },
    {
      id: 'APP005',
      title: 'डेटा एंट्री ऑपरेटर',
      organization: 'जिला कलेक्टर कार्यालय',
      type: 'job',
      status: 'Interview Scheduled',
      appliedDate: '30/09/2025'
    }
  ];

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  // Sidebar state now handled globally in Layout

  const handleProfileEdit = () => {
    setEditingSections(prev => ({ ...prev, personal: true }));
  };

  const handlePersonalInfoUpdate = (updatedInfo) => {
    setProfile(prev => ({ ...prev, ...updatedInfo }));
  };

  const handleAddressUpdate = (updatedAddress) => {
    setAddress(updatedAddress);
  };

  const handleDocumentUpload = (document) => {
    setDocuments(prev => {
      const existingIndex = prev?.findIndex(doc => doc?.id === document?.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = document;
        return updated;
      }
      return [...prev, document];
    });
  };

  const handleDocumentDelete = (documentId) => {
    setDocuments(prev => prev?.filter(doc => doc?.id !== documentId));
  };

  const handlePrivacyUpdate = (settings) => {
    setPrivacySettings(settings);
  };

  const toggleSectionEdit = (section) => {
    setEditingSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  return (
    <div className="space-y-8 p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Profile Header */}
          <ProfileHeader
            profile={profile}
            onEdit={handleProfileEdit}
            onLanguageChange={handleLanguageChange}
            currentLanguage={currentLanguage}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Main Profile Sections */}
            <div className="xl:col-span-2 space-y-6">
              {/* Personal Information */}
              <PersonalInfoSection
                profile={profile}
                onUpdate={handlePersonalInfoUpdate}
                currentLanguage={currentLanguage}
                isEditing={editingSections?.personal}
                onToggleEdit={() => toggleSectionEdit('personal')}
              />

              {/* Address Information */}
              <AddressSection
                address={address}
                onUpdate={handleAddressUpdate}
                currentLanguage={currentLanguage}
                isEditing={editingSections?.address}
                onToggleEdit={() => toggleSectionEdit('address')}
              />

              {/* Documents Section */}
              <DocumentsSection
                documents={documents}
                onUpload={handleDocumentUpload}
                onDelete={handleDocumentDelete}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Right Column - Status & Settings */}
            <div className="space-y-6">
              {/* Application Status */}
              <ApplicationStatusSection
                applications={applications}
                currentLanguage={currentLanguage}
              />

              {/* Privacy Settings */}
              <PrivacySettingsSection
                settings={privacySettings}
                onUpdate={handlePrivacyUpdate}
                currentLanguage={currentLanguage}
              />
            </div>
          </div>
    </div>
  );
};

export default ProfileManagement;