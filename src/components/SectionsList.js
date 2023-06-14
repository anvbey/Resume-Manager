import React, { useState } from 'react';
import Section from './Section';

const SectionList = ({ sections, onChange }) => {
  const [modified, setModified] = useState(false);

  const handleToggle = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].isActive = !updatedSections[index].isActive;
    onChange(updatedSections);
    setModified(true);
  };

  const handleEdit = (index) => {
    const updatedSections = [...sections];
    const newName = prompt('Enter a new name:');
    if (newName) {
      updatedSections[index].name = newName;
      onChange(updatedSections);
      setModified(true);
    }
  };

  const handleInfo = (index) => {
    alert(sections[index].description);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData('text/plain');
    if (draggedIndex !== index.toString()) {
      const updatedSections = [...sections];
      const [draggedSection] = updatedSections.splice(draggedIndex, 1);
      updatedSections.splice(index, 0, draggedSection);
      onChange(updatedSections);
      setModified(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="section-list">
      {sections.map((section, index) => (
        <div
          key={index}
          onDragStart={(e) => handleDragStart(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={handleDragOver}
          draggable
        >
          <Section
            name={section.name}
            isActive={section.isActive}
            onToggle={() => handleToggle(index)}
            onEdit={() => handleEdit(index)}
            onInfo={() => handleInfo(index)}
          />
        </div>
