import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const TicketSystem = ({ currentLanguage, onClose }) => {
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    subject: '',
    description: '',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    hi: {
      title: "शिकायत दर्ज करें",
      subtitle: "अपनी समस्या का विवरण दें और हम जल्दी समाधान करेंगे",
      categoryLabel: "समस्या की श्रेणी",
      categoryPlaceholder: "श्रेणी चुनें",
      categories: [
        { value: 'technical', label: 'तकनीकी समस्या' },
        { value: 'job', label: 'नौकरी संबंधी' },
        { value: 'scheme', label: 'योजना संबंधी' },
        { value: 'account', label: 'खाता संबंधी' },
        { value: 'other', label: 'अन्य' }
      ],
      priorityLabel: "प्राथमिकता",
      priorityPlaceholder: "प्राथमिकता चुनें",
      priorities: [
        { value: 'low', label: 'कम' },
        { value: 'medium', label: 'मध्यम' },
        { value: 'high', label: 'उच्च' },
        { value: 'urgent', label: 'तत्काल' }
      ],
      subjectLabel: "विषय",
      subjectPlaceholder: "समस्या का संक्षिप्त विवरण",
      descriptionLabel: "विस्तृत विवरण",
      descriptionPlaceholder: "अपनी समस्या का विस्तार से वर्णन करें...",
      attachmentLabel: "फाइल संलग्न करें (वैकल्पिक)",
      submitButton: "शिकायत दर्ज करें",
      cancelButton: "रद्द करें",
      successMessage: "आपकी शिकायत सफलतापूर्वक दर्ज हो गई है। टिकट नंबर: #TKT-2025-001",
      ticketNumber: "टिकट नंबर",
      expectedResponse: "अपेक्षित प्रतिक्रिया समय: 24-48 घंटे"
    },
    en: {
      title: "Submit Ticket",
      subtitle: "Describe your issue and we\'ll resolve it quickly",
      categoryLabel: "Issue Category",
      categoryPlaceholder: "Select category",
      categories: [
        { value: 'technical', label: 'Technical Issue' },
        { value: 'job', label: 'Job Related' },
        { value: 'scheme', label: 'Scheme Related' },
        { value: 'account', label: 'Account Related' },
        { value: 'other', label: 'Other' }
      ],
      priorityLabel: "Priority",
      priorityPlaceholder: "Select priority",
      priorities: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'urgent', label: 'Urgent' }
      ],
      subjectLabel: "Subject",
      subjectPlaceholder: "Brief description of the issue",
      descriptionLabel: "Detailed Description",
      descriptionPlaceholder: "Describe your issue in detail...",
      attachmentLabel: "Attach Files (Optional)",
      submitButton: "Submit Ticket",
      cancelButton: "Cancel",
      successMessage: "Your ticket has been submitted successfully. Ticket Number: #TKT-2025-001",
      ticketNumber: "Ticket Number",
      expectedResponse: "Expected response time: 24-48 hours"
    }
  };

  const currentContent = content?.[currentLanguage] || content?.hi;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev?.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev?.attachments?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(currentContent?.successMessage);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-soft max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              {currentContent?.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {currentContent?.subtitle}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label={currentContent?.categoryLabel}
              placeholder={currentContent?.categoryPlaceholder}
              options={currentContent?.categories}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              required
            />
            <Select
              label={currentContent?.priorityLabel}
              placeholder={currentContent?.priorityPlaceholder}
              options={currentContent?.priorities}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)}
              required
            />
          </div>

          {/* Subject */}
          <Input
            label={currentContent?.subjectLabel}
            type="text"
            placeholder={currentContent?.subjectPlaceholder}
            value={formData?.subject}
            onChange={(e) => handleInputChange('subject', e?.target?.value)}
            required
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {currentContent?.descriptionLabel}
            </label>
            <textarea
              className="w-full min-h-[120px] p-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder={currentContent?.descriptionPlaceholder}
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              required
            />
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {currentContent?.attachmentLabel}
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Icon name="Upload" size={32} className="text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  {currentLanguage === 'hi' ? 'फाइल चुनने के लिए क्लिक करें' : 'Click to select files'}
                </span>
              </label>
            </div>

            {/* Attached Files */}
            {formData?.attachments?.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData?.attachments?.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{file?.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Response Time Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800">
                  {currentContent?.expectedResponse}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              loading={isSubmitting}
              className="flex-1"
            >
              <Icon name="Send" size={16} className="mr-2" />
              {currentContent?.submitButton}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {currentContent?.cancelButton}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketSystem;