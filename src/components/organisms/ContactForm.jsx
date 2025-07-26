import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ContactFormField from "@/components/molecules/ContactFormField";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ContactForm = ({ 
  extractedData, 
  onSave, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: ""
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (extractedData) {
      setFormData({
        name: extractedData.name || "",
        title: extractedData.title || "",
        company: extractedData.company || "",
        email: extractedData.email || "",
        phone: extractedData.phone || "",
        website: extractedData.website || ""
      });
    }
  }, [extractedData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      if (formData.website.trim() && !formData.website.startsWith("http")) {
        setFormData(prev => ({
          ...prev,
          website: `https://${formData.website}`
        }));
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      toast.success("Contact saved successfully!", {
        icon: <ApperIcon name="CheckCircle" size={20} />
      });
    } else {
      toast.error("Please fix the errors before saving", {
        icon: <ApperIcon name="AlertCircle" size={20} />
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
          <p className="text-gray-600 mt-1">Review and edit the extracted information</p>
        </div>
        {extractedData && (
          <div className="flex items-center gap-2 text-success">
            <ApperIcon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Extracted</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactFormField
            label="Full Name"
            value={formData.name}
            onChange={(value) => handleInputChange("name", value)}
            icon="User"
            placeholder="John Doe"
            error={errors.name}
            required
          />
          
          <ContactFormField
            label="Job Title"
            value={formData.title}
            onChange={(value) => handleInputChange("title", value)}
            icon="Briefcase"
            placeholder="Software Engineer"
            error={errors.title}
          />
          
          <ContactFormField
            label="Company"
            value={formData.company}
            onChange={(value) => handleInputChange("company", value)}
            icon="Building"
            placeholder="TechCorp Inc."
            error={errors.company}
          />
          
          <ContactFormField
            label="Email Address"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            type="email"
            icon="Mail"
            placeholder="john.doe@techcorp.com"
            error={errors.email}
          />
          
          <ContactFormField
            label="Phone Number"
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            type="tel"
            icon="Phone"
            placeholder="+1 (555) 123-4567"
            error={errors.phone}
          />
          
          <ContactFormField
            label="Website"
            value={formData.website}
            onChange={(value) => handleInputChange("website", value)}
            type="url"
            icon="Globe"
            placeholder="https://techcorp.com"
            error={errors.website}
          />
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            icon="Save"
            className="flex-1 sm:flex-none"
          >
            Save Contact
          </Button>
          
          <Button
            type="button"
            onClick={onCancel}
            variant="secondary"
            size="lg"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;