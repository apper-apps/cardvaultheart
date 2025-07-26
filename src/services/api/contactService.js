import contactsData from "@/services/mockData/contacts.json";

class ContactService {
  constructor() {
    this.storageKey = "cardvault_contacts";
    this.initializeStorage();
  }

  initializeStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      localStorage.setItem(this.storageKey, JSON.stringify(contactsData));
    }
  }

  getStoredContacts() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  saveContacts(contacts) {
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
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
  }

  async update(id, contactData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    
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
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const contacts = this.getStoredContacts();
    const filteredContacts = contacts.filter(c => c.Id !== parseInt(id));
    
    if (filteredContacts.length === contacts.length) {
      throw new Error("Contact not found");
    }
    
    this.saveContacts(filteredContacts);
    return true;
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