import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddressSection = ({ address, onUpdate, currentLanguage, isEditing, onToggleEdit }) => {
  const [formData, setFormData] = useState({
    currentAddress: {
      houseNo: address?.currentAddress?.houseNo || '',
      street: address?.currentAddress?.street || '',
      village: address?.currentAddress?.village || '',
      tehsil: address?.currentAddress?.tehsil || '',
      district: address?.currentAddress?.district || '',
      state: address?.currentAddress?.state || '',
      pincode: address?.currentAddress?.pincode || ''
    },
    permanentAddress: {
      houseNo: address?.permanentAddress?.houseNo || '',
      street: address?.permanentAddress?.street || '',
      village: address?.permanentAddress?.village || '',
      tehsil: address?.permanentAddress?.tehsil || '',
      district: address?.permanentAddress?.district || '',
      state: address?.permanentAddress?.state || '',
      pincode: address?.permanentAddress?.pincode || ''
    },
    sameAsCurrent: address?.sameAsCurrent || false
  });

  const content = {
    hi: {
      addressInfo: 'पता जानकारी',
      edit: 'संपादित करें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      currentAddress: 'वर्तमान पता',
      permanentAddress: 'स्थायी पता',
      sameAsCurrent: 'वर्तमान पते के समान',
      houseNo: 'मकान नंबर',
      street: 'गली/सड़क',
      village: 'गांव/शहर',
      tehsil: 'तहसील',
      district: 'जिला',
      state: 'राज्य',
      pincode: 'पिन कोड',
      selectState: 'राज्य चुनें'
    },
    en: {
      addressInfo: 'Address Information',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      currentAddress: 'Current Address',
      permanentAddress: 'Permanent Address',
      sameAsCurrent: 'Same as Current Address',
      houseNo: 'House No.',
      street: 'Street/Road',
      village: 'Village/City',
      tehsil: 'Tehsil',
      district: 'District',
      state: 'State',
      pincode: 'PIN Code',
      selectState: 'Select State'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const indianStates = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' }
  ];

  const handleInputChange = (addressType, field, value) => {
    setFormData(prev => ({
      ...prev,
      [addressType]: {
        ...prev?.[addressType],
        [field]: value
      }
    }));
  };

  const handleSameAsCurrentChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      sameAsCurrent: checked,
      permanentAddress: checked ? { ...prev?.currentAddress } : prev?.permanentAddress
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    onToggleEdit();
  };

  const handleCancel = () => {
    setFormData({
      currentAddress: {
        houseNo: address?.currentAddress?.houseNo || '',
        street: address?.currentAddress?.street || '',
        village: address?.currentAddress?.village || '',
        tehsil: address?.currentAddress?.tehsil || '',
        district: address?.currentAddress?.district || '',
        state: address?.currentAddress?.state || '',
        pincode: address?.currentAddress?.pincode || ''
      },
      permanentAddress: {
        houseNo: address?.permanentAddress?.houseNo || '',
        street: address?.permanentAddress?.street || '',
        village: address?.permanentAddress?.village || '',
        tehsil: address?.permanentAddress?.tehsil || '',
        district: address?.permanentAddress?.district || '',
        state: address?.permanentAddress?.state || '',
        pincode: address?.permanentAddress?.pincode || ''
      },
      sameAsCurrent: address?.sameAsCurrent || false
    });
    onToggleEdit();
  };

  const renderAddressForm = (addressType, title) => (
    <div className="space-y-4">
      <h3 className="text-md font-heading font-medium text-foreground mb-4">
        {title}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t?.houseNo}
          type="text"
          value={formData?.[addressType]?.houseNo}
          onChange={(e) => handleInputChange(addressType, 'houseNo', e?.target?.value)}
          disabled={!isEditing}
        />

        <Input
          label={t?.street}
          type="text"
          value={formData?.[addressType]?.street}
          onChange={(e) => handleInputChange(addressType, 'street', e?.target?.value)}
          disabled={!isEditing}
        />

        <Input
          label={t?.village}
          type="text"
          value={formData?.[addressType]?.village}
          onChange={(e) => handleInputChange(addressType, 'village', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Input
          label={t?.tehsil}
          type="text"
          value={formData?.[addressType]?.tehsil}
          onChange={(e) => handleInputChange(addressType, 'tehsil', e?.target?.value)}
          disabled={!isEditing}
        />

        <Input
          label={t?.district}
          type="text"
          value={formData?.[addressType]?.district}
          onChange={(e) => handleInputChange(addressType, 'district', e?.target?.value)}
          disabled={!isEditing}
          required
        />

        <Select
          label={t?.state}
          options={indianStates}
          value={formData?.[addressType]?.state}
          onChange={(value) => handleInputChange(addressType, 'state', value)}
          disabled={!isEditing}
          placeholder={t?.selectState}
          required
        />

        <Input
          label={t?.pincode}
          type="text"
          value={formData?.[addressType]?.pincode}
          onChange={(e) => handleInputChange(addressType, 'pincode', e?.target?.value)}
          disabled={!isEditing}
          pattern="[0-9]{6}"
          maxLength="6"
          required
          className="md:col-span-2"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="MapPin" size={20} className="text-accent" />
          </div>
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {t?.addressInfo}
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
      <div className="space-y-8">
        {/* Current Address */}
        {renderAddressForm('currentAddress', t?.currentAddress)}

        {/* Same as Current Checkbox */}
        {isEditing && (
          <div className="flex items-center space-x-2 py-4 border-t border-border">
            <input
              type="checkbox"
              id="sameAsCurrent"
              checked={formData?.sameAsCurrent}
              onChange={(e) => handleSameAsCurrentChange(e?.target?.checked)}
              className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
            />
            <label htmlFor="sameAsCurrent" className="text-sm font-medium text-foreground">
              {t?.sameAsCurrent}
            </label>
          </div>
        )}

        {/* Permanent Address */}
        {!formData?.sameAsCurrent && (
          <div className="pt-4 border-t border-border">
            {renderAddressForm('permanentAddress', t?.permanentAddress)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSection;