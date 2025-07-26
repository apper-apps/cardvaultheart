import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import ViewToggle from "@/components/molecules/ViewToggle";
import Button from "@/components/atoms/Button";

const Header = ({ 
  onSearch, 
  view, 
  onViewChange, 
  contactCount = 0,
  onUploadClick 
}) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="CreditCard" className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                CardVault
              </h1>
              <p className="text-sm text-gray-600">
                {contactCount} {contactCount === 1 ? "contact" : "contacts"} saved
              </p>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex items-center gap-4">
            <SearchBar 
              onSearch={onSearch}
              placeholder="Search contacts..."
              className="hidden md:block w-80"
            />
            
            <ViewToggle 
              view={view}
              onViewChange={onViewChange}
              className="hidden sm:flex"
            />
            
            <Button
              onClick={onUploadClick}
              variant="primary"
              icon="Plus"
              size="md"
            >
              <span className="hidden sm:inline">Upload Card</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchBar 
            onSearch={onSearch}
            placeholder="Search contacts..."
          />
        </div>

        {/* Mobile View Toggle */}
        <div className="sm:hidden mt-4 flex justify-center">
          <ViewToggle 
            view={view}
            onViewChange={onViewChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;