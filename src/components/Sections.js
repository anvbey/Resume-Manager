import React from 'react';

const Section = ({ name, isActive, onToggle, onEdit, onInfo }) => {
  return (
    <div className="section">
      <div className="section-header">
        <h2>{name}</h2>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onInfo}>Info</button>
      </div>
      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={onToggle}
        />
        Show section
      </label>
    </div>
  );
};

export default Section;
