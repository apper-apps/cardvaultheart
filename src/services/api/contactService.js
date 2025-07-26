import contactsData from "@/services/mockData/contacts.json";

class ContactService {
  constructor() {
    this.storageKey = "cardvault_contacts";
    this.initializeStorage();
  }

initializeStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) {
        // Check if we have enough space for initial data
        this.validateStorageSpace(JSON.stringify(contactsData));
        localStorage.setItem(this.storageKey, JSON.stringify(contactsData));
      }
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded during initialization');
        // Initialize with empty array if quota exceeded
        localStorage.setItem(this.storageKey, JSON.stringify([]));
      } else {
        throw error;
      }
    }
  }

  validateStorageSpace(dataString) {
    const estimatedSize = new Blob([dataString]).size;
    const currentUsage = this.getStorageUsage();
    const availableSpace = this.getAvailableStorageSpace();
    
    if (estimatedSize > availableSpace) {
      throw new Error(`STORAGE_FULL:${Math.round(currentUsage / 1024)}KB used, need ${Math.round(estimatedSize / 1024)}KB more`);
    }
  }

  getStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total * 2; // Unicode characters are 2 bytes
  }

  getAvailableStorageSpace() {
    // Typical localStorage limit is 5-10MB, we'll be conservative with 4MB
    const maxStorage = 4 * 1024 * 1024; // 4MB
    return maxStorage - this.getStorageUsage();
  }

  compressContactData(contacts) {
    // Remove unnecessary whitespace and optimize data structure
    return contacts.map(contact => {
      const compressed = {};
      for (const [key, value] of Object.entries(contact)) {
        if (value !== null && value !== undefined && value !== '') {
          compressed[key] = typeof value === 'string' ? value.trim() : value;
        }
      }
      return compressed;
    });
  }

  cleanupOldContacts(contacts, maxContacts = 1000) {
    if (contacts.length <= maxContacts) return contacts;
    
    // Sort by updatedAt and keep the most recent contacts
    return contacts
      .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
      .slice(0, maxContacts);
  }

  getStoredContacts() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

saveContacts(contacts) {
    try {
      // Compress and clean data before saving
      let processedContacts = this.compressContactData(contacts);
      let dataString = JSON.stringify(processedContacts);
      
      // Check storage space before saving
      this.validateStorageSpace(dataString);
      localStorage.setItem(this.storageKey, dataString);
      
    } catch (error) {
      if (error.name === 'QuotaExceededError' || error.message.startsWith('STORAGE_FULL:')) {
        // Try to free up space by cleaning old contacts
        let cleanedContacts = this.cleanupOldContacts(contacts, 500);
        let compressedCleanedContacts = this.compressContactData(cleanedContacts);
        let cleanedDataString = JSON.stringify(compressedCleanedContacts);
        
        try {
          this.validateStorageSpace(cleanedDataString);
          localStorage.setItem(this.storageKey, cleanedDataString);
          
          // Throw a warning that some old contacts were removed
          const removedCount = contacts.length - cleanedContacts.length;
          if (removedCount > 0) {
            throw new Error(`STORAGE_CLEANED:Removed ${removedCount} old contacts to free up space`);
          }
        } catch (secondError) {
          if (secondError.name === 'QuotaExceededError' || secondError.message.startsWith('STORAGE_FULL:')) {
            // Last resort: try with even fewer contacts
            cleanedContacts = this.cleanupOldContacts(contacts, 100);
            compressedCleanedContacts = this.compressContactData(cleanedContacts);
            cleanedDataString = JSON.stringify(compressedCleanedContacts);
            
            try {
              localStorage.setItem(this.storageKey, cleanedDataString);
              const removedCount = contacts.length - cleanedContacts.length;
              throw new Error(`STORAGE_SEVERELY_CLEANED:Removed ${removedCount} old contacts. Consider exporting your data.`);
            } catch (finalError) {
              throw new Error('STORAGE_FULL:Unable to save contact. Storage quota exceeded. Please clear browser data or export existing contacts.');
            }
          } else {
            throw secondError;
          }
        }
      } else {
        throw error;
      }
    }
  }

  async getAll() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const contacts = this.getStoredContacts();
    return contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const contacts = this.getStoredContacts();
    const contact = contacts.find(c => c.Id === parseInt(id));
    
    if (!contact) {
      throw new Error("Contact not found");
    }
    
    return contact;
  }

async create(contactData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    try {
      const contacts = this.getStoredContacts();
      const maxId = contacts.length > 0 ? Math.max(...contacts.map(c => c.Id)) : 0;
      
      const newContact = {
        ...contactData,
        Id: maxId + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      const updatedContacts = [...contacts, newContact];
      this.saveContacts(updatedContacts);
      
      return { ...newContact };
    } catch (error) {
      if (error.message.startsWith('STORAGE_')) {
        throw new Error(error.message);
      }
      throw new Error('Failed to create contact: ' + error.message);
    }
  }

async update(id, contactData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    try {
      const contacts = this.getStoredContacts();
      const index = contacts.findIndex(c => c.Id === parseInt(id));
      
      if (index === -1) {
        throw new Error("Contact not found");
      }
      
      const updatedContact = {
        ...contacts[index],
        ...contactData,
        Id: parseInt(id),
        updatedAt: new Date().toISOString()
      };
      
      contacts[index] = updatedContact;
      this.saveContacts(contacts);
      
      return { ...updatedContact };
    } catch (error) {
      if (error.message.startsWith('STORAGE_')) {
        throw new Error(error.message);
      }
      throw new Error('Failed to update contact: ' + error.message);
    }
  }

async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    try {
      const contacts = this.getStoredContacts();
      const filteredContacts = contacts.filter(c => c.Id !== parseInt(id));
      
      if (filteredContacts.length === contacts.length) {
        throw new Error("Contact not found");
      }
      
      this.saveContacts(filteredContacts);
      return true;
    } catch (error) {
      if (error.message.startsWith('STORAGE_')) {
        throw new Error(error.message);
      }
      throw new Error('Failed to delete contact: ' + error.message);
    }
  }

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const contacts = this.getStoredContacts();
    const lowercaseQuery = query.toLowerCase();
    
    return contacts.filter(contact =>
      Object.values(contact).some(value =>
        value && value.toString().toLowerCase().includes(lowercaseQuery)
      )
    );
  }
}

export const contactService = new ContactService();