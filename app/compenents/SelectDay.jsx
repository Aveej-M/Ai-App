import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import Image from 'next/image';

const people = ['Past 7 Days', 'Past 30 Days', 'This Week', 'This Month'];
const datevalue = ['last7', 'last30', 'thisWeek', 'thisMonth',]

export default function CustomSelect() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <div className="w-40 relative">
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button className="w-full h-[30] px-4 border border-gray-300 outline-green-400 rounded text-[14px] text-black text-left">
          {selected}
        </Listbox.Button>
        <Listbox.Options className="mt-1 border border-gray-300 rounded shadow bg-white">
          {people.map((person, idx) => (
            <Listbox.Option
              key={idx}
              value={person}
              className={({ active }) =>
                `cursor-pointer p-2 ${
                  active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                }`
              }
            >
              {person}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>

          <Image 
            className='absolute top-2.5 right-2.5 pointer-events-none'
            src="/Header/drop.png"
            alt='Drop icon'
            height={15}
            width={15}
          />

    </div>
  );
}
