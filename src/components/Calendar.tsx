import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/dist/cjs/shared/types";

function MyCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const onChange = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (Array.isArray(value)) {
      // In case multiple dates are selected
      setSelectedDates(value as Date[]);
    } else {
      setDate(value as Date);
    }
  };

  const handleAddTick = () => {
    if (selectedDates.some((d) => d.toDateString() === date.toDateString())) {
      setSelectedDates(
        selectedDates.filter((d) => d.toDateString() !== date.toDateString())
      );
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const renderTileContent = ({ date, view }: any) => {
    if (view === "month") {
      const dateString = date.toDateString();
      if (selectedDates.some((d) => d.toDateString() === dateString)) {
        return (
          <div className="tick" onClick={handleAddTick}>
            ✔️
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <button onClick={handleAddTick}>Toggle Tick</button>
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={renderTileContent}
        selectRange={false}
      />
    </div>
  );
}

export default MyCalendar;
