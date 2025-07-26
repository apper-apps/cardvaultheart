import { motion } from "framer-motion";
import ContactCard from "@/components/organisms/ContactCard";

const ContactGrid = ({ contacts, onEdit, onDelete, onView }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {contacts.map((contact, index) => (
        <motion.div
          key={contact.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.1 }}
        >
          <ContactCard
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContactGrid;