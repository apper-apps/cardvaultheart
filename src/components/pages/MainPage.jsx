import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import ImageUploadZone from "@/components/molecules/ImageUploadZone";
import ImagePreview from "@/components/organisms/ImagePreview";
import ContactForm from "@/components/organisms/ContactForm";
import ContactGrid from "@/components/organisms/ContactGrid";
import ContactList from "@/components/organisms/ContactList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { contactService } from "@/services/api/contactService";
import { ocrService } from "@/services/api/ocrService";

const MainPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI State
  const [view, setView] = useState("cards");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Upload/Extract State
  const [currentImage, setCurrentImage] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  // Load contacts on mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Filter contacts based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        Object.values(contact).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredContacts(filtered);
    }
  }, [contacts, searchTerm]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError("Failed to load contacts");
      console.error("Load contacts error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (imageData) => {
    setCurrentImage(imageData);
    setExtractedData(null);
    setShowForm(false);
  };

  const handleExtractData = async () => {
    if (!currentImage) return;

    try {
      setIsExtracting(true);
      const data = await ocrService.extractContactInfo(currentImage);
      setExtractedData(data);
      setShowForm(true);
      toast.success("Contact information extracted successfully!");
    } catch (err) {
      toast.error("Failed to extract contact information");
      console.error("OCR extraction error:", err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSaveContact = async (contactData) => {
    try {
      const contactToSave = {
        ...contactData,
        imageUrl: currentImage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      let savedContact;
      if (editingContact) {
        savedContact = await contactService.update(editingContact.Id, contactToSave);
        setContacts(prev => prev.map(c => c.Id === editingContact.Id ? savedContact : c));
        toast.success("Contact updated successfully!");
      } else {
        savedContact = await contactService.create(contactToSave);
        setContacts(prev => [...prev, savedContact]);
        toast.success("Contact saved successfully!");
      }

      // Reset form state
      setCurrentImage(null);
      setExtractedData(null);
      setShowForm(false);
      setEditingContact(null);
    } catch (err) {
      toast.error("Failed to save contact");
      console.error("Save contact error:", err);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setCurrentImage(contact.imageUrl);
    setExtractedData({
      name: contact.name,
      title: contact.title,
      company: contact.company,
      email: contact.email,
      phone: contact.phone,
      website: contact.website
    });
    setShowForm(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      await contactService.delete(contactId);
      setContacts(prev => prev.filter(c => c.Id !== contactId));
      toast.success("Contact deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete contact");
      console.error("Delete contact error:", err);
    }
  };

  const handleViewContact = (contact) => {
    // For now, just edit the contact
    handleEditContact(contact);
  };

  const handleClearImage = () => {
    setCurrentImage(null);
    setExtractedData(null);
    setShowForm(false);
    setEditingContact(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
    if (!editingContact) {
      setCurrentImage(null);
      setExtractedData(null);
    }
  };

  const handleUploadClick = () => {
    if (currentImage) {
      setCurrentImage(null);
      setExtractedData(null);
      setShowForm(false);
      setEditingContact(null);
    }
    // Focus on upload area
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onSearch={setSearchTerm}
          view={view}
          onViewChange={setView}
          contactCount={0}
          onUploadClick={handleUploadClick}
        />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Loading type="cards" message="Loading your contacts..." />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onSearch={setSearchTerm}
          view={view}
          onViewChange={setView}
          contactCount={0}
          onUploadClick={handleUploadClick}
        />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Error 
            title="Failed to Load Contacts"
            message={error}
            onRetry={loadContacts}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearch={setSearchTerm}
        view={view}
        onViewChange={setView}
        contactCount={contacts.length}
        onUploadClick={handleUploadClick}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Upload/Extract Section */}
        {!currentImage ? (
          <ImageUploadZone onImageUpload={handleImageUpload} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImagePreview
              imageUrl={currentImage}
              extractedData={extractedData}
              onExtract={handleExtractData}
              onClear={handleClearImage}
              isExtracting={isExtracting}
            />
            
            {showForm && (
              <ContactForm
                extractedData={extractedData}
                onSave={handleSaveContact}
                onCancel={handleCancelForm}
              />
            )}
          </div>
        )}

        {/* Contacts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Contacts
              <span className="text-lg font-normal text-gray-500 ml-2">
                ({filteredContacts.length} {filteredContacts.length === 1 ? "contact" : "contacts"})
              </span>
            </h2>
          </div>

          {filteredContacts.length === 0 ? (
            contacts.length === 0 ? (
              <Empty 
                type="contacts"
                onAction={handleUploadClick}
              />
            ) : (
              <Empty 
                type="search"
                onAction={() => setSearchTerm("")}
              />
            )
          ) : (
            view === "cards" ? (
              <ContactGrid
                contacts={filteredContacts}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
                onView={handleViewContact}
              />
            ) : (
              <ContactList
                contacts={filteredContacts}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
                onView={handleViewContact}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default MainPage;