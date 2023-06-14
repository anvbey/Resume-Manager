import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
const sectionList = [
  {
    id: "profile",
    name: "Profile Summary",
    description: "A summary of your professional profile.",
  },
  {
    id: "experience",
    name: "Work Experience",
    description: "Details of your past work experience.",
  },
  {
    id: "projects",
    name: "Projects",
    description: "Projects you have worked on.",
  },
  {
    id: "profile",
    name: "Profile Summary",
    description: "A summary of your professional profile.",
  },
  {
    id: "experience",
    name: "Work Experience",
    description: "Details of your past work experience.",
  },
  {
    id: "projects",
    name: "Projects",
    description: "Projects you have worked on.",
  },{
    id: "profile",
    name: "Profile Summary",
    description: "A summary of your professional profile.",
  },
  {
    id: "experience",
    name: "Work Experience",
    description: "Details of your past work experience.",
  },
  {
    id: "projects",
    name: "Projects",
    description: "Projects you have worked on.",
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
      <h1>Resume Manager</h1>
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
                          {editIndex === index ? (
                            <>
                              <input
                                type="text"
                                value={editedName}
                                onChange={handleInputChange}
                              />
                              <button onClick={handleSave} disabled={!modified}>
                                Save
                              </button>
                              <button onClick={handleCancelEdit}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <h3>{section.name}</h3>
                              <button
                                onClick={() => handleEdit(index, section.name)}
                              >
                                Edit
                              </button>
                              <button onClick={() => handleInfo(index)}>
                                Info
                              </button>
                            </>
                          )}
                        </div>
                        <label>
                          <input
                            type="checkbox"
                            checked={section.isActive}
                            onChange={() => handleToggle(index)}
                          />
                          Display Section
                        </label>
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
