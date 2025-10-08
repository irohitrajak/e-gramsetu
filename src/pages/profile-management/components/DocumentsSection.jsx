import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DocumentsSection = ({ documents, onUpload, onDelete, currentLanguage }) => {
  const [uploadingDoc, setUploadingDoc] = useState(null);

  const content = {
    hi: {
      documents: 'दस्तावेज़',
      uploadDocument: 'दस्तावेज़ अपलोड करें',
      scanWithCamera: 'कैमरे से स्कैन करें',
      chooseFile: 'फ़ाइल चुनें',
      verified: 'सत्यापित',
      pending: 'लंबित',
      rejected: 'अस्वीकृत',
      notUploaded: 'अपलोड नहीं किया गया',
      view: 'देखें',
      delete: 'हटाएं',
      reupload: 'पुनः अपलोड करें',
      uploadedOn: 'अपलोड किया गया',
      fileSize: 'फ़ाइल का आकार',
      maxSize: 'अधिकतम आकार: 5MB',
      supportedFormats: 'समर्थित प्रारूप: JPG, PNG, PDF'
    },
    en: {
      documents: 'Documents',
      uploadDocument: 'Upload Document',
      scanWithCamera: 'Scan with Camera',
      chooseFile: 'Choose File',
      verified: 'Verified',
      pending: 'Pending',
      rejected: 'Rejected',
      notUploaded: 'Not Uploaded',
      view: 'View',
      delete: 'Delete',
      reupload: 'Re-upload',
      uploadedOn: 'Uploaded on',
      fileSize: 'File Size',
      maxSize: 'Max size: 5MB',
      supportedFormats: 'Supported formats: JPG, PNG, PDF'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const requiredDocuments = [
    {
      id: 'aadhar',
      name: currentLanguage === 'hi' ? 'आधार कार्ड' : 'Aadhar Card',
      icon: 'CreditCard',
      required: true
    },
    {
      id: 'pan',
      name: currentLanguage === 'hi' ? 'पैन कार्ड' : 'PAN Card',
      icon: 'CreditCard',
      required: true
    },
    {
      id: 'voter',
      name: currentLanguage === 'hi' ? 'मतदाता पहचान पत्र' : 'Voter ID',
      icon: 'Badge',
      required: false
    },
    {
      id: 'passport',
      name: currentLanguage === 'hi' ? 'पासपोर्ट' : 'Passport',
      icon: 'BookOpen',
      required: false
    },
    {
      id: 'driving',
      name: currentLanguage === 'hi' ? 'ड्राइविंग लाइसेंस' : 'Driving License',
      icon: 'Car',
      required: false
    },
    {
      id: 'bank',
      name: currentLanguage === 'hi' ? 'बैंक पासबुक' : 'Bank Passbook',
      icon: 'Building2',
      required: true
    },
    {
      id: 'income',
      name: currentLanguage === 'hi' ? 'आय प्रमाण पत्र' : 'Income Certificate',
      icon: 'FileText',
      required: false
    },
    {
      id: 'caste',
      name: currentLanguage === 'hi' ? 'जाति प्रमाण पत्र' : 'Caste Certificate',
      icon: 'FileText',
      required: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'rejected': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'verified': return t?.verified;
      case 'pending': return t?.pending;
      case 'rejected': return t?.rejected;
      default: return t?.notUploaded;
    }
  };

  const handleFileUpload = async (docId, file) => {
    setUploadingDoc(docId);
    
    // Simulate upload process
    setTimeout(() => {
      const newDoc = {
        id: docId,
        name: requiredDocuments?.find(d => d?.id === docId)?.name,
        file: file,
        status: 'pending',
        uploadedAt: new Date()?.toLocaleDateString('en-GB'),
        size: `${(file?.size / 1024 / 1024)?.toFixed(2)} MB`,
        url: URL.createObjectURL(file)
      };
      
      onUpload(newDoc);
      setUploadingDoc(null);
    }, 2000);
  };

  const handleCameraCapture = (docId) => {
    // Simulate camera capture
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        handleFileUpload(docId, file);
      }
    };
    input?.click();
  };

  const handleFileSelect = (docId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        handleFileUpload(docId, file);
      }
    };
    input?.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-secondary" />
        </div>
        <h2 className="text-lg font-heading font-semibold text-foreground">
          {t?.documents}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requiredDocuments?.map((docType) => {
          const uploadedDoc = documents?.find(doc => doc?.id === docType?.id);
          const isUploading = uploadingDoc === docType?.id;

          return (
            <div key={docType?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={docType?.icon} size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{docType?.name}</h3>
                    {docType?.required && (
                      <span className="text-xs text-error">Required</span>
                    )}
                  </div>
                </div>

                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getStatusColor(uploadedDoc?.status)
                }`}>
                  {getStatusText(uploadedDoc?.status)}
                </div>
              </div>
              {uploadedDoc ? (
                <div className="space-y-3">
                  {uploadedDoc?.url && (
                    <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={uploadedDoc?.url}
                        alt={uploadedDoc?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{t?.uploadedOn}: {uploadedDoc?.uploadedAt}</p>
                    <p>{t?.fileSize}: {uploadedDoc?.size}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      onClick={() => window.open(uploadedDoc?.url, '_blank')}
                    >
                      {t?.view}
                    </Button>
                    
                    {uploadedDoc?.status === 'rejected' && (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Upload"
                        iconPosition="left"
                        onClick={() => handleFileSelect(docType?.id)}
                      >
                        {t?.reupload}
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Trash2"
                      iconPosition="left"
                      onClick={() => onDelete(docType?.id)}
                      className="text-error hover:text-error"
                    >
                      {t?.delete}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {isUploading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm text-muted-foreground">Uploading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Camera"
                          iconPosition="left"
                          onClick={() => handleCameraCapture(docType?.id)}
                          fullWidth
                        >
                          {t?.scanWithCamera}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Upload"
                          iconPosition="left"
                          onClick={() => handleFileSelect(docType?.id)}
                          fullWidth
                        >
                          {t?.chooseFile}
                        </Button>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>{t?.maxSize}</p>
                        <p>{t?.supportedFormats}</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentsSection;