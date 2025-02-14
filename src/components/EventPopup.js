import React, { useState } from "react";
import Popup from "react-popup";

const EventPopup = ({ event, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState(event.title || "");
  const [location, setLocation] = useState(event.location || "");

  const handleSave = () => {
    if (title.trim() && location.trim()) {
      onSave({ ...event, title, location });
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <Popup open closeOnDocumentClick onClose={onClose}>
      <div className="popup-content">
        <h3>{event.id ? "Edit Event" : "Create Event"}</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Event Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div>
          <button onClick={handleSave}>Save</button>
          {event.id && <button onClick={onDelete}>Delete</button>}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Popup>
  );
};

export default EventPopup;
