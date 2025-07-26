import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ContactCard = ({ contact, onEdit, onDelete, onView }) => {
  const handleEmailClick = () => {
    if (contact.email) {
      window.open(`mailto:${contact.email}`, "_blank");
    }
  };

  const handlePhoneClick = () => {
    if (contact.phone) {
      window.open(`tel:${contact.phone}`, "_blank");
    }
  };

  const handleWebsiteClick = () => {
    if (contact.website) {
      window.open(contact.website, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card hover className="relative overflow-hidden group">
        {/* Business Card Style Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-6">
          {/* Header with Image Preview */}
          {contact.imageUrl && (
            <div className="mb-4">
              <div 
                className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden cursor-pointer group/image relative"
                onClick={onView}
              >
                <img 
                  src={contact.imageUrl} 
                  alt="Business card" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <ApperIcon 
                    name="Eye" 
                    className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" 
                    size={24} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {contact.name}
              </h3>
              {contact.title && (
                <p className="text-primary font-medium">{contact.title}</p>
              )}
              {contact.company && (
                <p className="text-gray-600 text-sm">{contact.company}</p>
              )}
            </div>

            {/* Contact Actions */}
            <div className="flex flex-wrap gap-2">
              {contact.email && (
                <button
                  onClick={handleEmailClick}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-primary hover:text-white rounded-lg text-sm transition-all duration-200 group/btn"
                >
                  <ApperIcon name="Mail" size={14} />
                  <span className="hidden sm:inline">Email</span>
                </button>
              )}
              
              {contact.phone && (
                <button
                  onClick={handlePhoneClick}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-primary hover:text-white rounded-lg text-sm transition-all duration-200 group/btn"
                >
                  <ApperIcon name="Phone" size={14} />
                  <span className="hidden sm:inline">Call</span>
                </button>
              )}
              
              {contact.website && (
                <button
                  onClick={handleWebsiteClick}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-primary hover:text-white rounded-lg text-sm transition-all duration-200 group/btn"
                >
                  <ApperIcon name="Globe" size={14} />
                  <span className="hidden sm:inline">Website</span>
                </button>
              )}
            </div>

            {/* Management Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Badge variant="default" size="sm">
                Added {new Date(contact.createdAt).toLocaleDateString()}
              </Badge>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onEdit(contact)}
                  variant="ghost"
                  size="sm"
                  icon="Edit"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <span className="sr-only">Edit</span>
                </Button>
                
                <Button
                  onClick={() => onDelete(contact.Id)}
                  variant="ghost"
                  size="sm"
                  icon="Trash2"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-error hover:text-error hover:bg-error/10"
                >
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContactCard;