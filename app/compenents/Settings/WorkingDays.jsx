"use client";
import { useState } from "react";
import TimeRangeInput from "../../compenents/Settings/TimePicker.jsx";

export default function WorkingDaysSelector({ selectedDays, setSelectedDays }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [workingHours, setWorkingHours] = useState({ Mon: { from: "09:00", to: "18:00" } });

  const handleToggle = (day) => {
    setSelectedDays((prev) => {
      if (prev.includes(day)) {
        if (prev.length === 1) return prev; // always keep at least one day
        return prev.filter((d) => d !== day);
      }
      return [...prev, day];
    });
  };

  const handleTimeChange = (day, newTime) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: newTime,
    }));
  };

  const handleCopy = () => {
    if (selectedDays.length === 0) return;

    const firstDay = selectedDays[0];
    const firstValue = workingHours[firstDay];
    console.log(firstDay, 'firstday')
    console.log(workingHours, 'Workinghours')
    console.log(firstValue, 'Firstvalue')
    if (!firstValue) return;

    const updated = {};
    selectedDays.forEach((day) => {
      updated[day] = { ...firstValue }; // copy both from and to
    });

    setWorkingHours((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div>
      <h1 className="mb-3 font-medium">Select the working days</h1>

      <div className="flex items-center flex-wrap gap-4">
        {days.map((day) => (
          <label key={day} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={selectedDays.includes(day)}
              onChange={() => handleToggle(day)}
              className="w-4 h-4 accent-green-500 rounded"
            />
            <span>{day}</span>
          </label>
        ))}
      </div>

      <div className="mt-6">
        {selectedDays.map((day, idx) => (
          <div key={day} className="mb-4">
            <div className="">
              <h2 className="font-medium mb-2">{day}</h2>
              <div className="flex items-center gap-4">
                <TimeRangeInput
                  value={workingHours[day] || { from: "", to: "" }}
                  onChange={(val) => handleTimeChange(day, val)}
                />

                {/* Copy button for first selected day */}
                {idx === 0 && selectedDays.length > 1 && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1 text-sm text-green-500 flex items-center hover:text-green-600 gap-2 transition"
                  >
                    <i className="fa-regular fa-copy"></i>
                    Copy to all
                  </button>
                )}
              </div>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}
