import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
const sectionList = [
  {
    id: "Profile Summary",
    name: "Profile Summary",
    description: "A summary of your professional profile.",
  },
  {
    id: "Experience",
    name: "Work Experience",
    description: "Details of your past work experience.",
  },
  {
    id: "projects",
    name: "Projects",
    description: "Projects you have worked on.",
  },
  {
    id: "Academics and Cocurricular Achievements",
    name: "Academics",
    description: "A summary of your Academics and Cocurricular Achievements.",
  },
  {
    id: "Internship",
    name: "Internship",
    description: "Details of your past Summer Internship Experience.",
  },
  {
    id: "Certifications",
    name: "Certifications",
    description: "Certifications you have got.",
  },
  {
    id: "Leadership Positions",
    name: "Leadership Positions",
    description: "A summary of your Leadership Positions.",
  },
  {
    id: "Extra Curricular Activities",
    name: "Extras",
    description: "Details of your Extra Curricular Activities.",
  },
  {
    id: "Education",
    name: "Education",
    description: "Tell us about your Education.",
  },
];

const App = () => {
  const [sections, setSections] = useState(sectionList);
  const [modified, setModified] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedName, setEditedName] = useState("");

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedSections = Array.from(sections);
    const [reorderedSection] = updatedSections.splice(result.source.index, 1);
    updatedSections.splice(result.destination.index, 0, reorderedSection);
    setSections(updatedSections);
    setModified(true);
  };

  const handleToggle = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].isActive = !updatedSections[index].isActive;
    setSections(updatedSections);
    setModified(true);
  };

  const handleEdit = (index, newName) => {
    setEditIndex(index);
    setEditedName(newName);
  };

  const handleSave = () => {
    const updatedSections = [...sections];
    updatedSections[editIndex].name = editedName;
    setSections(updatedSections);
    setModified(false);
    setEditIndex(-1);
    setEditedName("");
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setEditedName("");
  };

  const handleInfo = (index) => {
    const section = sections[index];
    alert(section.description);
  };

  const handleInputChange = (event) => {
    const newName = event.target.value;
    setEditedName(newName);
    if (newName !== sections[editIndex].name) {
      setModified(true);
    } else {
      setModified(false);
    }
  };

  const handleMainSave = () => {
    if (modified && editIndex === -1) {
      handleSave();
    }
  };

  return (
    <div className="App">
      <h1>Select your Sections</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="section">
                        <div className="section-header">
                          <button
                            className="infoButton"
                            onClick={() => handleInfo(index)}
                          >
                            Info
                          </button>
                          {editIndex === index ? (
                            <div className="edit1">
                              <input style={{textAlign:"center"}}
                                type="text"
                                value={editedName}
                                onChange={handleInputChange}
                              />
                              <button onClick={handleSave} disabled={!modified}>
                                Save
                              </button>
                              <button onClick={handleCancelEdit}>Cancel</button>
                              <label>
                            <input
                              type="checkbox"
                              checked={section.isActive}
                              onChange={() => handleToggle(index)}
                            />
                            Display Section
                          </label>
                            </div>
                          ) : (
                            <div className="edit2">
                              <h3>{section.name}</h3>
                              <button
                                className="editBtn"
                                onClick={() => handleEdit(index, section.name)}
                              >
                                Edit
                              </button>
                              <label>
                            <input
                              type="checkbox"
                              checked={section.isActive}
                              onChange={() => handleToggle(index)}
                            />
                            Display Section
                          </label>
                            </div>
                            
                          )}
                          
                        </div>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {modified && editIndex === -1 && (
        <button onClick={handleMainSave} disabled={!modified}>
          Save Changes
        </button>
      )}
    </div>
  );
};

export default App;
