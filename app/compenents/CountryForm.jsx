'use client'
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { countryOptions } from '../data/countryData';
import { customStyles } from '../data/selectStyle';

// const customStyles = {
//   control: (base, state) => ({
//     ...base,
//     height: '45px',
//     padding: '0 4px',
//     borderRadius: '5px',
//     marginTop: '0',
//     borderColor: '',
//     borderColor: state.isFocused ? '#22c55e' : 'oklch(70.7% 0.022 261.325)',
//     boxShadow: 'none',
//     '&:hover': {
//       borderColor: '#22c55e',
//     },
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isSelected
//       ? '#22c55e'
//       : state.isFocused
//       ? '#bbf7d0'
//       : 'white',
//     color: 'black',
//     padding: '10px 12px',
//     cursor: 'pointer',
//   }),
// };

const CountrySelector = ({ country, setCountry }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Runs only on client
  }, []);

  return (
    <div>
      <label htmlFor="country" className="text-gray-500 block mb-2">Country</label>
      {isClient ? ( 
        <Select
          id="country"
          options={countryOptions}
          value={countryOptions.find(option => option.value === country)}
          onChange={(selected) => setCountry(selected?.value)}
          styles={customStyles}
          placeholder="Select a country"
          isSearchable
          className='h-[40px] font-semibold !text-black'
          components={{
            IndicatorSeparator: () => null
          }}
        />
      ) : (
        <div className="border px-4 py-2 text-gray-400 bg-gray-100 rounded">Loading...</div>
      )}
    </div>
  );
};

export default CountrySelector;
