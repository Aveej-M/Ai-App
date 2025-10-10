'use client'
import { useState } from "react";
import timeZones from "@/app/data/timezone";
import { customStyles } from "../../../data/selectStyle";
import WorkingDaysSelector from "../../../compenents/Settings/WorkingDays";
import Select from "react-select"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const page = () => {
    const [name, setName] = useState('General Working Hours');
    const [defaultDescription, setDefaultDescription] = useState('Default Business Calendar');
    const [showDescription, setShowDescription] = useState(false);
    const [timeZone, setTimeZone] = useState('');
    const [businessHolidays, setBusinessHolidays] = useState(0);
    const [selectedBusiness, setSelectedBusiness] = useState(1);
    // Default: at least one selected (e.g., Monday)
    const [selectedDays, setSelectedDays] = useState(["Mon"]);

    // const tableHead = ['Name', 'Date', 'More'];
    const [showAddHolidays, setShowAddHolidays] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [holidayName, setHolidayName] = useState('');
    const [addAnotherChecked, setAddAnotherChecked] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [holidayTable, setHolidayTable] = useState([
        { name: "Ayyudha Poojai", date: '01 Oct 2025', more: <i className="fa-regular fa-trash-can"></i> },
    ]);

    // console.log(addAnotherChecked, 'Addanother')

    const handleUpdateHoliday = (e) => {
        e.preventDefault();
        console.log(selectedDate, 'Selected date', holidayName, 'Holiday name')
        if (!selectedDate || !holidayName) return;

        const formattedDate = selectedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        const updatedTable = {
            name: holidayName,
            date: formattedDate,
            more: <i className="fa-regular fa-trash-can"></i>,
        };

        setHolidayTable((prev) => [...prev, updatedTable]);
        setHolidayName('');
        setSelectedDate(null);
        {
            addAnotherChecked && (
                setShowAddHolidays(false)

            )
        };

    }

    const handleDelete = (index) => {
        setHolidayTable((prev) => prev.filter((_, i) => i != index))
        setDeleteIndex(null)
        setShowDelete(false);
    }

    // const openModal = () => {
    //     setShowDelete(true);
    //     setAnimateOut(false);
    // };

    const closeModal = () => {
        setAnimateOut(true);
        setTimeout(() => {
            setShowDelete(false);
            setAnimateOut(false);
        }, 400); // match duration of popupOut
    };

    return (
        <>
            <div className='p-5 w-full overflow-y-auto'>
                <form action="" className="flex flex-col">
                    <label htmlFor="name">Name(For Own Reference) <span className='text-red-500'>*</span></label>
                    <input type="text"
                        id="name"
                        className='form-input w-1/2! border-l-2! border-l-green-500!'
                        placeholder='e.g.India Business Hours'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {!showDescription && (
                        <div onClick={() => setShowDescription(true)} className="flex items-center gap-3 mt-5">
                            <h1>{defaultDescription}</h1>
                            <i className="fa-regular fa-pen-to-square cursor-pointer"></i>
                        </div>
                    )}
                    {showDescription && (
                        <div className="mt-5 flex flex-col">
                            <label htmlFor="description">Description</label>
                            <textarea name=""
                                id="description"
                                rows={4}
                                value={defaultDescription}
                                onChange={(e) => setDefaultDescription(e.target.value)}
                                className='topic-formInput w-1/2! py-3'></textarea>

                            <button
                                className=" px-4 h-8 mt-2 w-fit text-green-400 border border-gray-400 rounded-[20px] hover:bg-gray-100 hover:text-green-500 transition"
                                onClick={() => setShowDescription(false)}>Close</button>
                        </div>
                    )}

                    <div className="w-full mt-5">
                        <label htmlFor="time-zone-select" className='text-black'>Time Zone <span className='text-red-500'>*</span></label>
                        <Select
                            instanceId="time-zone-select"
                            options={timeZones}
                            value={timeZones.find(option => option.value === timeZone)}
                            onChange={(e) => setTimeZone(e.value)}
                            styles={customStyles}
                            placeholder="Enter Time Zone"
                            isSearchable
                            className='w-1/2!'
                            components={{
                                IndicatorSeparator: () => null
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-5 mt-7 shadow-64">

                        <p onClick={() => setBusinessHolidays(0)} className={`${businessHolidays === 0 && 'text-green-500 border-b-green-500 border-b-2'} ${businessHolidays === 1 && 'hover:text-green-300 transition-all duration-300 ease-in-out'} cursor-pointer pb-3`}>Bussiness Hours</p>


                        <p onClick={() => setBusinessHolidays(1)} className={`${businessHolidays === 1 && 'text-green-500 border-b-green-500 border-b-2 cursor-pointer'} ${businessHolidays === 0 && 'hover:text-green-300  transition-all duration-300 ease-in-out'} cursor-pointer pb-3`}>Holidays</p>

                    </div>

                    {businessHolidays === 0 ? (
                        <div className="mt-5">
                            <h1 className="mb-3 font-semibold">Set business hours</h1>

                            <label className="flex items-center gap-3 cursor-pointer w-fit">
                                <input
                                    type="radio"
                                    name="roundedSelect"
                                    checked={selectedBusiness === 0}
                                    onChange={() => setSelectedBusiness(0)}
                                    className="hidden"
                                />
                                <span
                                    className={`w-4 h-4 flex items-center justify-center rounded-full border-2 transition 
                                    ${selectedBusiness === 0 ? "bg-green-500 border-green-500" : "border-gray-400"}`}
                                >
                                    {selectedBusiness === 0 && (
                                        <span className="w-2 h-2 bg-white rounded-full"></span>
                                    )}
                                </span>
                                <span>24 hrs x 7 days</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer mt-2 w-fit">
                                <input
                                    type="radio"
                                    name="roundedSelect"
                                    checked={selectedBusiness === 1}
                                    onChange={() => setSelectedBusiness(1)}
                                    className="hidden"
                                />
                                <span
                                    className={`w-4 h-4 flex items-center justify-center rounded-full border-2 transition 
                                ${selectedBusiness === 1 ? "bg-green-500 border-green-500" : "border-gray-400"}`}
                                >
                                    {selectedBusiness === 1 && (
                                        <span className="w-2 h-2 bg-white rounded-full"></span>
                                    )}
                                </span>
                                <span>Custom business hours</span>
                            </label>
                            {selectedBusiness === 1 && (
                                <div className="mt-4">
                                    <WorkingDaysSelector selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center gap-15 mt-5">
                                <p className="text-gray-400">Holidays will be ignored when calculating SLA for a ticket.</p>
                                <button
                                    type="button"
                                    className="px-3 border h-8 min-w-[160px] border-gray-400 rounded-3xl hover:text-green-500 hover:border-green-500 transition duration-200 ease-in-out shadow"
                                    onClick={() => setShowAddHolidays(!showAddHolidays)}
                                >+ Add Holidays
                                </button>
                            </div>

                            {/* ADD HOLIDAYS */}
                            {showAddHolidays && (
                                <div className="h-screen w-full bg-black/80 absolute top-0 left-0 z-10 flex-items">
                                    <div className="w-[500px] h-[80%] bg-white flex flex-col items-start justify-center py-8 px-5  rounded">
                                        <div className="h-full w-full flex flex-col justify-between">
                                            <div className="flex flex-col">
                                                <div className="flex items-center justify-between w-full h-fit">
                                                    <h1>Add Holidays</h1>
                                                    <div onClick={() => setShowAddHolidays(!showAddHolidays)}
                                                        className="cursor-pointer h-6 w-6 hover:bg-gray-200 flex-items rounded transition duration-200 ease-in-out"
                                                    >
                                                        <i className="fa-solid fa-x"></i>
                                                    </div>
                                                </div>

                                                <div>
                                                    <div className="border-b border-gray-400 mt-5">
                                                        <p className="h-[40px] w-fit border-b-2 text-green-500">Exclusive Holidays</p>
                                                    </div>

                                                    <div>
                                                        <DatePicker
                                                            selected={selectedDate}
                                                            placeholderText="Select Date"
                                                            onChange={(date) => setSelectedDate(date)}
                                                            className="form-input  placeholder:font-medium"
                                                            dateFormat="dd/MM/yyyy"
                                                            wrapperClassName="custom-datepicker-wrapper" // Custom class name
                                                            calendarClassName="holiday-calendar" // Custom class name
                                                            required
                                                        />
                                                    </div>

                                                    <div className="mt-5 h-full flex flex-col">
                                                        <label htmlFor="" className="text-gray-400">Name (For Own Reference) <span className="text-red-500">*</span></label>
                                                        <input type="text"
                                                            className="form-input border-l-2! border-l-green-500! border-green-500 placeholder:font-medium"
                                                            placeholder="e.g. New Year's Day"
                                                            value={holidayName}
                                                            onChange={(name) => setHolidayName(name.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="justify-items">
                                                <div className="flex-items">
                                                    <input onChange={() => setAddAnotherChecked(!addAnotherChecked)} type="checkbox" />
                                                    <p className="text-gray-400">Add Another</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        className="w-[100px] px-4 py-2 text-green-400 border border-gray-400 rounded-3xl hover:bg-gray-100 hover:text-green-500 transition"
                                                        onClick={() => setShowAddHolidays(!showAddHolidays)}
                                                    >Cancel</button>
                                                    <button
                                                        type="button"
                                                        onClick={handleUpdateHoliday}
                                                        className={`w-[100px] px-4 py-2 ${holidayName && selectedDate && ('bg-green-500 text-white hover:bg-green-600 ')} bg-gray-100 border border-gray-300 text-gray-300 rounded-3xl transition`}
                                                    >Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Holiday Table */}
                            <table className="w-[55%] shadow mt-5 rounded-t-md">
                                <thead>
                                    <tr className="bg-green-100 shadow-64 rounded-t-md border-b border-b-gray-300">
                                        <th className="px-5 py-3 rounded-tl-md">Name</th>
                                        <th className="px-5 py-3">Date</th>
                                        <th className="px-5 py-3 rounded-tr-md">More</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-100">
                                    {holidayTable.map(({ name, date, more }, index) => (
                                        <tr key={index}>
                                            <td className="td text-center">{name}</td>
                                            <td className="td text-center">{date}</td>
                                            <td
                                                className="td text-center cursor-pointer relative group"
                                                onClick={() => { setDeleteIndex(index); setShowDelete(!showDelete); }}
                                            >{more}
                                                <div className="absolute bg-black/90 text-white text-[13px] font-[100] rounded -top-8 right-5 px-3 py-1 hidden group-hover:block transition-all duration-300 ease-in-out">Delete</div>
                                                <div className="w-0 h-0 
                                                    border-l-[8px] border-l-transparent 
                                                    border-r-[8px] border-r-transparent 
                                                    border-t-[8px] border-t-black/90 absolute -top-[5px] right-11 hidden group-hover:block">
                                                </div>

                                            </td>
                                            {/* <td className="absolute bg-black text-white font-[100] rounded top-0">Delete</td> */}
                                        </tr>
                                    ))}
                                    {holidayTable.length === 0 && (
                                        <tr className="h-50 w-full">
                                            <td className="td border-b-0!"></td>
                                            <td className="td text-center text-gray-400 border-b-0!">
                                                <i className="fa-regular fa-folder-open text-5xl"></i>
                                                <p>No data</p>
                                            </td>
                                            <td className="td border-b-0!"></td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>

                            {/* DELETE TAB */}
                            {showDelete && (
                                <div className="bg-black/80 h-screen w-screen absolute top-0 left-0 z-10">
                                    <div className={`bg-white w-[28rem] mt-20 mx-auto p-5 rounded shadow-lg ${animateOut ? "popup-out" : "popup-in"}`}>
                                        <div className="flex gap-3 items-start text-left">
                                            <i className="fa-solid fa-circle-exclamation text-yellow-500 text-[20px] mt-1"></i>
                                            <div>
                                                <h1 className="mb-2">Are you sure you want to delete this holiday?</h1>
                                                <p>Once deleted, this holiday will be removed from the calender.</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3">
                                            <button
                                                className="text-[14px] w-[75px] h-8 text-green-400 border border-gray-400 rounded-3xl hover:bg-gray-100 hover:text-green-500 transition"
                                                onClick={closeModal}
                                            >Cancel</button>
                                            <button
                                                onClick={() => { handleDelete(deleteIndex); closeModal(); }}
                                                className={`text-[14px] w-[75px] h-8 text-white hover:bg-green-600 bg-green-500 border border-gray-300 rounded-3xl transition`}
                                            >Delete</button>
                                        </div>
                                    </div>


                                </div>
                            )}
                        </div>
                    )}

                </form >
            </div >
        </>
    )
}

export default page