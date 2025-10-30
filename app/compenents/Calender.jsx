'use client'

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays, startOfMonth, endOfMonth, startOfISOWeek, endOfISOWeek, startOfYear, endOfYear, subWeeks, subMonths } from 'date-fns';
import Image from 'next/image';
import { Listbox } from '@headlessui/react';

const options = [
  { label: 'Past 7 Days', value: 'last7' },
  { label: 'Past 30 Days', value: 'last30' },
  { label: 'Pase 90 Days', value: 'last90' },
  { label: 'This Week', value: 'thisWeek' },
  { label: 'Previous Week', value: 'previousWeek' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Previous Month', value: 'previousMonth' },
  { label: 'This Year', value: 'thisYear' },
  { label: 'Custom Range', value: 'custom' },
];



const DateRangeInput = ({ onRangeChange }) => {
  const today = new Date();
  const lastWeek = subWeeks(today, 1);
  const lastMonth = subMonths(today, 1);
  const defaultStart = subDays(today, 6);
  const defaultEnd = today;

  const [dateRange, setDateRange] = useState([defaultStart, defaultEnd]);
  const [startDate, endDate] = dateRange;
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    handlePresetChange(options[0]);
  }, []);

  const handlePresetChange = (selected) => {
    const value = selected.value;
    setSelectedOption(selected);

    if (value === 'custom') return;

    let from, to;

    switch (value) {
      case 'last7':
        from = subDays(today, 6);
        to = today;
        break;
      case 'last30':
        from = subDays(today, 29);
        to = today;
        break;
      case 'last90':
        from = subDays(today, 89);
        to = today;
        break;
      case 'thisWeek':
        from = startOfISOWeek(today);
        to = endOfISOWeek(today);
        break;
      case 'previousWeek':
        from = startOfISOWeek(lastWeek);
        to = endOfISOWeek(lastWeek);
        break;
      case 'thisMonth':
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case 'previousMonth':
        from = startOfMonth(lastMonth);
        to = endOfMonth(lastMonth);
        break;
      case 'thisYear':
        from = startOfYear(today);
        to = endOfYear(today);
        break;
      default:
        return;
    }

    setDateRange([from, to]);
    onRangeChange([from, to]);
  };

  return (
    <div className="p-4 flex gap-3 max-md:flex-col">
      {/* Date Picker */}
      <div className='relative flex'>
        <DatePicker
          selected={startDate}
          onChange={(update) => {
            if (Array.isArray(update) && update[0] && update[1]) {
              setDateRange(update);
              onRangeChange(update);
              setSelectedOption(options.find(o => o.value === 'custom')); // ⬅ switch to Custom
            } else {
              setDateRange(update);
            }
          }}

          startDate={startDate}
          endDate={endDate}
          selectsRange
          placeholderText="Select date range"
          dateFormat="dd MMM, yyyy"
          popperPlacement='bottom-end'
          className="w-full h-[30px] p-2 border border-gray-400 outline-green-400 rounded text-black"
        />
        <Image
          src="/Analytics/calender.png"
          alt='Calendar icon'
          height={15}
          width={15}
          className='absolute right-[15px] top-[7px] z-[-1]'
        />
      </div>

      {/* Custom Select */}
      <Listbox value={selectedOption} onChange={handlePresetChange}>
        {({ open }) => (
          <div className="relative min-w-[160px]">
            <Listbox.Button className={`w-full h-[30px] px-4 border ${open ? 'border-2 border-green-400' : 'border-gray-400'} rounded text-[14px] text-black text-left relative`}>
              {selectedOption.label}

              {/* Rotating dropdown arrow */}
              <Image
                className={`absolute top-2.5 right-2.5 pointer-events-none transition-transform duration-300 ${open ? 'rotate-180' : ''
                  }`}
                src="/Header/drop.png"
                alt="Drop icon"
                height={15}
                width={15}
              />
            </Listbox.Button>

            <Listbox.Options className="mt-1 border border-gray-300 rounded shadow bg-white absolute w-full z-10">
              {options.map((option, idx) => (
                <Listbox.Option
                  key={idx}
                  value={option}
                  className={({ active }) =>
                    `text-[14px] cursor-pointer p-2 selectDay ${active ? 'bg-green-100 text-green-700' : 'text-gray-700'
                    }`
                  }
                >
                  {option.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>

    </div>
  );
};

export default DateRangeInput;
