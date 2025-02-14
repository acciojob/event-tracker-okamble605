import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventPopup from "./EventPopup";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelect = ({ start }) => {
    setSelectedEvent({ start, title: "", location: "" });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent.id) {
      setEvents(events.map((e) => (e.id === selectedEvent.id ? eventData : e)));
    } else {
      setEvents([...events, { ...eventData, id: Date.now() }]);
    }
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    setSelectedEvent(null);
  };

  const filterEvents = () => {
    const now = moment();
    return events.filter((event) => {
      const eventDate = moment(event.start);
      if (filter === "Past") return eventDate.isBefore(now, "day");
      if (filter === "Upcoming") return eventDate.isSameOrAfter(now, "day");
      return true;
    });
  };

  return (
    <div>
      <h2>Event Tracker Calendar</h2>
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Past")}>Past</button>
        <button onClick={() => setFilter("Upcoming")}>Upcoming</button>
      </div>
      <Calendar
        localizer={localizer}
        events={filterEvents()}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "20px" }}
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventClick}
      />
      {selectedEvent && (
        <EventPopup
          event={selectedEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
