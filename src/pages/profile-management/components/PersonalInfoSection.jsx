import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoSection = ({ profile, onUpdate, currentLanguage, isEditing, onToggleEdit }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    fatherName: profile?.fatherName || '',
    dateOfBirth: profile?.dateOfBirth || '',
    gender: profile?.gender || '',
    maritalStatus: profile?.maritalStatus || '',
    category: profile?.category || '',
    religion: profile?.religion || '',
    nationality: profile?.nationality || 'Indian',
    email: profile?.email || '',
    phone: profile?.phone || '',
    alternatePhone: profile?.alternatePhone || ''
  });

  const content = {
    hi: {
      personalInfo: 'व्यक्तिगत जानकारी',
      edit: 'संपादित करें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      fullName: 'पूरा नाम',
      fatherName: 'पिता का नाम',
      dateOfBirth: 'जन्म तिथि',
      gender: 'लिंग',
      male: 'पुरुष',
      female: 'महिला',
      other: 'अन्य',
      maritalStatus: 'वैवाहिक स्थिति',
      single: 'अविवाहित',
      married: 'विवाहित',
      divorced: 'तलाकशुदा',
      widowed: 'विधवा/विधुर',
      category: 'श्रेणी',
      general: 'सामान्य',
      obc: 'अन्य पिछड़ा वर्ग',
      sc: 'अनुसूचित जाति',
      st: 'अनुसूचित जनजाति',
      religion: 'धर्म',
      hindu: 'हिंदू',
      muslim: 'मुस्लिम',
      christian: 'ईसाई',
      sikh: 'सिख',
      buddhist: 'बौद्ध',
      jain: 'जैन',
      nationality: 'राष्ट्रीयता',
      email: 'ईमेल पता',
      phone: 'फोन नंबर',
      alternatePhone: 'वैकल्पिक फोन नंबर'
    },
    en: {
      personalInfo: 'Personal Information',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      fullName: 'Full Name',
      fatherName: "Father\'s Name",
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      maritalStatus: 'Marital Status',
      single: 'Single',
      married: 'Married',
      divorced: 'Divorced',
      widowed: 'Widowed',
      category: 'Category',
      general: 'General',
      obc: 'OBC',
      sc: 'SC',
      st: 'ST',
      religion: 'Religion',
      hindu: 'Hindu',
      muslim: 'Muslim',
      christian: 'Christian',
      sikh: 'Sikh',
      buddhist: 'Buddhist',
      jain: 'Jain',
      nationality: 'Nationality',
      email: 'Email Address',
      phone: 'Phone Number',
      alternatePhone: 'Alternate Phone Number'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const genderOptions = [
    { value: 'male', label: t?.male },
    { value: 'female', label: t?.female },
    { value: 'other', label: t?.other }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: t?.single },
    { value: 'married', label: t?.married },
    { value: 'divorced', label: t?.divorced },
    { value: 'widowed', label: t?.widowed }
  ];

  const categoryOptions = [
    { value: 'general', label: t?.general },
    { value: 'obc', label: t?.obc },
    { value: 'sc', label: t?.sc },
    { value: 'st', label: t?.st }
  ];

  const religionOptions = [
    { value: 'hindu', label: t?.hindu },
    { value: 'muslim', label: t?.muslim },
    { value: 'christian', label: t?.christian },
    { value: 'sikh', label: t?.sikh },
    { value: 'buddhist', label: t?.buddhist },
    { value: 'jain', label: t?.jain }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    onToggleEdit();
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      fatherName: profile?.fatherName || '',
      dateOfBirth: profile?.dateOfBirth || '',
      gender: profile?.gender || '',
      maritalStatus: profile?.maritalStatus || '',
      category: profile?.category || '',
      religion: profile?.religion || '',
      nationality: profile?.nationality || 'Indian',
      email: profile?.email || '',
      phone: profile?.phone || '',
      alternatePhone: profile?.alternatePhone || ''
    });
    onToggleEdit();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {t?.personalInfo}
          </h2>
        </div>

        {!isEditing ? (
          <Button
            variant="outline"
            onClick={onToggleEdit}
            iconName="Edit"
            iconPosition="left"
          >
            {t?.edit}
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              {t?.cancel}
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
            >
              {t?.save}
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label={t?.fullName}
          type="text"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label={t?.fatherName}
          type="text"
          value={formData?.fatherName}
          onChange={(e) => handleInputChange('fatherName', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label={t?.dateOfBirth}
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Select
          label={t?.gender}
          options={genderOptions}
          value={formData?.gender}
          onChange={(value) => handleInputChange('gender', value)}
          disabled={!isEditing}
          required
        />

        <Select
          label={t?.maritalStatus}
          options={maritalStatusOptions}
          value={formData?.maritalStatus}
          onChange={(value) => handleInputChange('maritalStatus', value)}
          disabled={!isEditing}
        />

        <Select
          label={t?.category}
          options={categoryOptions}
          value={formData?.category}
          onChange={(value) => handleInputChange('category', value)}
          disabled={!isEditing}
          required
        />

        <Select
          label={t?.religion}
          options={religionOptions}
          value={formData?.religion}
          onChange={(value) => handleInputChange('religion', value)}
          disabled={!isEditing}
        />

        <Input
          label={t?.nationality}
          type="text"
          value={formData?.nationality}
          onChange={(e) => handleInputChange('nationality', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label={t?.email}
          type="email"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
        />

        <Input
          label={t?.phone}
          type="tel"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label={t?.alternatePhone}
          type="tel"
          value={formData?.alternatePhone}
          onChange={(e) => handleInputChange('alternatePhone', e?.target?.value)}
          disabled={!isEditing}
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;