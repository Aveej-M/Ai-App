'use client'
// import { useState } from 'react';
import { customStyles } from '../data/selectStyle';
import Select from 'react-select';
import timeZones from "@/app/data/timezone";


const TimeZoneForm = ({timeZone, setTimeZone}) => {
    // const [timeZone, setTimeZone] = useState('');
  return (
    <div>
        <label htmlFor="time-zone-select" className='text-gray-500'>Time Zone</label>
        <Select 
            instanceId="time-zone-select"   
            options={timeZones}
            value={timeZones.find(option => option.value === timeZone)}
            onChange={(e)=> setTimeZone(e.value)}
            styles={customStyles}
            placeholder="Enter Time Zone"
            isSearchable
            className='w-full'
            components={{
            IndicatorSeparator: () => null
            }}
        />
    </div>
  )
}

export default TimeZoneForm