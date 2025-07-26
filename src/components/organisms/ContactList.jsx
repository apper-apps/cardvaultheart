import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ContactList = ({ contacts, onEdit, onDelete, onView }) => {
  const handleEmailClick = (email, e) => {
    e.stopPropagation();
    if (email) {
      window.open(`mailto:${email}`, "_blank");
    }
  };

  const handlePhoneClick = (phone, e) => {
    e.stopPropagation();
    if (phone) {
      window.open(`tel:${phone}`, "_blank");
    }
  };

  const handleWebsiteClick = (website, e) => {
    e.stopPropagation();
    if (website) {
      window.open(website, "_blank");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-lg font-semibold text-gray-900">Contact Directory</h3>
        <p className="text-sm text-gray-600">
          {contacts.length} {contacts.length === 1 ? "contact" : "contacts"} in your database
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50/50 transition-colors duration-200 group cursor-pointer"
            onClick={() => onView(contact)}
          >
            <div className="flex items-center gap-6">
              {/* Avatar or Image Preview */}
              <div className="flex-shrink-0">
                {contact.imageUrl ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={contact.imageUrl} 
                      alt="Business card preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-lg flex items-center justify-center">
                    <ApperIcon name="User" className="text-primary" size={24} />
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 truncate">
                      {contact.name}
                    </h4>
                    {contact.title && (
                      <p className="text-primary font-medium text-sm mt-1">
                        {contact.title}
                      </p>
                    )}
                    {contact.company && (
                      <p className="text-gray-600 text-sm mt-1">
                        {contact.company}
                      </p>
                    )}
                  </div>

                  {/* Contact Details */}
                  <div className="text-right space-y-2">
                    <div className="flex items-center justify-end gap-4">
                      {contact.email && (
                        <button
                          onClick={(e) => handleEmailClick(contact.email, e)}
                          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm"
                          title={contact.email}
                        >
                          <ApperIcon name="Mail" size={16} />
                          <span className="hidden lg:inline max-w-[150px] truncate">
                            {contact.email}
                          </span>
                        </button>
                      )}
                      
                      {contact.phone && (
                        <button
                          onClick={(e) => handlePhoneClick(contact.phone, e)}
                          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm"
                          title={contact.phone}
                        >
                          <ApperIcon name="Phone" size={16} />
                          <span className="hidden lg:inline">
                            {contact.phone}
                          </span>
                        </button>
                      )}
                      
                      {contact.website && (
                        <button
                          onClick={(e) => handleWebsiteClick(contact.website, e)}
                          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm"
                          title={contact.website}
                        >
                          <ApperIcon name="Globe" size={16} />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-3">
                      <Badge variant="default" size="sm">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </Badge>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(contact);
                          }}
                          variant="ghost"
                          size="sm"
                          icon="Edit"
                        >
                          <span className="sr-only">Edit</span>
                        </Button>
                        
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(contact.Id);
                          }}
                          variant="ghost"
                          size="sm"
                          icon="Trash2"
                          className="text-error hover:text-error hover:bg-error/10"
                        >
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;