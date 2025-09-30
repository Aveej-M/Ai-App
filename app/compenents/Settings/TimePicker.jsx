"use client";
import { useState, useRef, useEffect } from "react";

// Custom single time picker
function CustomTimePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hour, minute] = value ? value.split(":") : ["", ""];

  const pickerRef = useRef(null);
  const hoursRef = useRef(null);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = ["00", "30"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHourSelect = (h, idx) => {
    onChange(`${h}:${minute || "00"}`);

    // scroll the selected hour to top
    if (hoursRef.current) {
      const hourElements = hoursRef.current.children;
      if (hourElements[idx]) {
        hourElements[idx].scrollIntoView({
          block: "start", // align to the top
          behavior: "smooth",
        });
      }
    }


  };

  const handleMinuteSelect = (m) => {
    onChange(`${hour || "00"}:${m}`);
  };

  return (
    <div className="relative w-32" ref={pickerRef}>
      <div
        onClick={() => setOpen(!open)}
        className="border border-gray-400 text-gray-500 px-2 py-1 rounded cursor-pointer bg-white"
      >
        {value || "Select time"}
      </div>

      {open && (
        <div className="absolute -top-50 z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg flex">
          {/* Hours */}
          <div ref={hoursRef} className="max-h-48 overflow-y-auto w-1/2 border-r border-gray-300 scrollbar-hide scrollbar-hover">
            {hours.map((h, idx) => (
              <div
                key={h}
                onClick={() => handleHourSelect(h, idx)}
                className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${h === hour ? "bg-green-100 font-semibold" : ""}`}
              >
                {h}
              </div>
            ))}
          </div>

          {/* Minutes */}
          <div className="w-1/2">
            {minutes.map((m) => (
              <div
                key={m}
                onClick={() => handleMinuteSelect(m)}
                className={`px-2 py-1 cursor-pointer hover:bg-gray-100 ${m === minute ? "bg-green-100 font-semibold" : ""}`}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Time range input using two CustomTimePicker
export default function TimeRangeInput({ value = { from: "09:00", to: "18:00" }, onChange }) {
  const from = value.from || "09:00";
  const to = value.to || "18:00";

  const handleFromChange = (val) => {
    onChange({ from: val, to });
  };

  const handleToChange = (val) => {
    onChange({ from, to: val });
  };

  return (
    <div className="flex gap-2 items-center">
      <CustomTimePicker value={from} onChange={handleFromChange} />
      <span className="text-gray-500">to</span>
      <CustomTimePicker value={to} onChange={handleToChange} />
    </div>
  );
}
