'use client'
import { useState } from 'react';
import Image from 'next/image';
import CountrySelector from '../compenents/CountryForm'; // Adjust path as needed
import PhoneinputSelector from '../compenents/PhoneinputSelector';
import timeZoneForm from "../compenents/TimeZoneForm";
import { customStyles } from '../data/selectStyle';
import timeZones from "@/app/data/timezone";
import Select from 'react-select';
import TimeZoneForm from '../compenents/TimeZoneForm';

const color = [
    { color: 'bg-purple-400', hover: 'bg-purple-300' },
    { color: 'bg-red-400', hover: 'bg-red-300' },
    { color: 'bg-green-400', hover: 'bg-green-300' },
    { color: 'bg-yellow-400', hover: 'bg-yellow-300' },
    { color: 'bg-orange-400', hover: 'bg-orange-300' },
]

const Profile = () => {
    const [selectedCountry, setSelectedCountry] = useState(null); // start with no selection
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // const containerRef = useRef();

    const [country, setCountry] = useState('');
    const [timeZone, setTimeZone] = useState('');
    const [themeColor, setThemeColor] = useState(0);
    const positionTop = 'top-full';
    const width= "w-90"
    console.log(themeColor, 'themecolor')

    const getThemeIndex = (index) => {
        setThemeColor(index);
        console.log(themeColor, 'Themecolor');
    }


    return (
        <div className='w-full text-black h-screen'>
            <div className='h-[60px] fixed top-16 w-full bg-gray-100 pl-[30px] text-black flex items-center ai-head md:gap-2 md:0'>
                <div>
                    <p className={`flex items-center text-1xl lg:mx-3 mx-1 h-full lg:px-2 px:2 transition-all font-bold border-b-2 border-green-500 text-green-500 font-semibold"
                `}>Profile</p>
                </div>
            </div>

            <div className='p-5 h-full overflow-y-auto pt-35 scrollbar-hide'>
                {/* Profile */}
                <div className='h-35 w-full shadow-12 rounded-[10] flex items-center gap-10 px-7'>
                    <Image
                        className='w-20'
                        src="/Header/Profile.png"
                        alt='Profile Img'
                        width={50}
                        height={50}
                    />

                    <div className='flex flex-col'>
                        <h1 className='text-2xl'>Jeeva M</h1>
                        <p className='text-[14px] text-gray-500'>jeevamj123@gmail.com | <span className='h-5 text-green-500 bg-green-100 py-1 px-2  border border-green-500 rounded'>Admin</span></p>
                    </div>
                </div>

                {/* EDIT PROFILE */}
                <div className='shadow-12 w-full p-10 mt-5 rounded-[10]'>
                    <form action="" className='grid grid-cols-2 gap-5 max-w-180 max-md:grid-cols-1'>
                        <div className='flex flex-col'>
                            <label htmlFor="firstname" className='text-gray-500'>First Name</label>
                            <input type="text" id='firstname' maxLength={20} className='form-input border-l-2! border-l-green-500!' />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="lastname" className='text-gray-500'>Last Name</label>
                            <input type="text" id='lastname' maxLength={20} className='form-input border-l-2! border-l-green-500!' />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="email" className='text-gray-500'>Email</label>
                            <input type="email" id='email' maxLength={50} className='form-input border-l-2! border-l-green-500!' />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="phone-input" className="block text-sm font-medium text-slate-700 mb-1">
                                Phone Number
                            </label>

                            <PhoneinputSelector selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
                                dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} width={width}
                                searchQuery={searchQuery} setSearchQuery={setSearchQuery} positionTop={positionTop}
                            // containerRef={containerRef}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <CountrySelector country={country} setCountry={setCountry} />
                        </div>

                        <div className='flex flex-col'>
                            {/* <label htmlFor="time-zone-select" className='text-gray-500'>Time Zone</label>
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
                        /> */}
                            <TimeZoneForm timeZone={timeZone} setTimeZone={setTimeZone} />
                        </div>

                        <div className='flex flex-col'>
                            <h1>Theme</h1>
                            <div className='flex gap-3 pt-1'>
                                {color.map(({ color, hover }, index) => (
                                    <div key={index} onClick={() => getThemeIndex(index)} className={`flex-items-2 h-7.5 w-7.5 rounded ${index === themeColor ? hover : color} hover:${hover}`}>{index === themeColor && (<i className="fa-solid fa-check text-white"></i>)}</div>
                                ))}
                            </div>
                        </div>
                        <div></div>
                        <div></div>

                        <div className='flex justify-end gap-5'>
                            <button className="w-[fit] px-4 py-2 text-black border border-gray-400 rounded-[25px] hover:bg-gray-100 hover:text-green-500 transition">Change Password</button>
                            <button className="w-[100px] px-4 py-2 bg-green-500 text-white rounded-[25px] hover:bg-green-600 transition">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile