"use client"
import { useState } from "react";
import Image from "next/image";
import Select from "react-select";
import { formStatus, lifeCycleData } from "../../data/chat";
import { customStyles } from "../../data/selectStyle";
import PhoneinputSelector from "../PhoneinputSelector";

const AddContacts = ({openAddContacts, setOpenAddContacts}) => {
    const [openContactForm, setOpenContactForm] = useState(false);
    const [formState, setFormState] = useState("new");
    const [formLifeCycleState, setFormLifeCycleState] = useState("lead");
    const [openOwner, setOpenOwner] = useState(false);

    const [selectedMobileCountry, setSelectedMobileCountry] = useState(null); // start with no selection
    const [selectedPhoneCountry, setSelectedPhoneCountry] = useState(null);
    const [dropdownOpenMobile, setDropdownOpenMobile] = useState(false);
    const [dropdownOpenPhone, setDropdownOpenPhone] = useState(false);
    const [searchQueryMobile, setSearchQueryMobile] = useState("");
    const [searchQueryPhone, setSearchQueryPhone] = useState("");
    const positionTop = 'bottom-12';
    const width = "min-w-70"

  return (
    <div className={`min-w-[40%] bg-white h-full transform transition-transform duration-300 pb-10 ${openAddContacts ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center gap-3 h-15 px-3">
            {/* <div className="p-3"> */}
                <i 
                onClick={()=> setOpenAddContacts(false)}
                className="fa-solid fa-arrow-left p-1 m-1 hover:p-2 hover:m-0 bg-gray-200 rounded-2xl transition-all duration-300 cursor-pointer"></i>
            {/* </div> */}
            Add Contact
            {openContactForm && (
            <div className="absolute right-5">
                <button className="border border-green-400 px-4 py-1 text-sm text-white bg-green-500 hover:border-green-400 hover:bg-green-600 rounded-[20px] transition-all duration-300">Create</button>
            </div>
            )}
        </div>
        {!openContactForm && (
        <div className={`flex-items flex-col mt-5 transform transition-transform duration-300 ${openAddContacts ? "popup-in translate-x-0 opacity-100 delay-200" : "-translate-x-full opacity-0"}`}>
            <Image 
                src="/Header/Profile.png"
                alt="Profile iamge"
                height={100}
                width={100}
                className="w-20"
            />
            <div className="w-[70%] flex-items flex-col text-center">
                <p className="text-xs">This is a new contact and not part of your current contact. Would you like to add?</p>
                <button 
                onClick={()=> setOpenContactForm(true)}
                className="px-3 py-1 text-white font-bold border-gray-400 bg-green-500 hover:bg-green-600 rounded-2xl gap-1 text-xs">Add to Contacts</button>
            </div>
        </div>
        )}

        {openContactForm && (
            <div className="overflow-y-auto h-full pb-10">
            <div className={`flex-items flex-col mt-1 transform transition-transform duration-300 h-fit ${openAddContacts ? "popup-in translate-x-0 opacity-100 delay-200 px-3" : "-translate-x-full opacity-0"}`}>
                
                <div className="flex flex-col w-full items-start gap-2">
                    <label htmlFor="status" className="text-gray-600">Status</label>
                    <Select 
                        instanceId="status"
                        options={formStatus}
                        value={formStatus.find(option => option.value === formState)}
                        onChange={(e)=> setFormState(e.value)}
                        styles={customStyles}
                        className="w-full text-sm"
                        components={{
                        IndicatorSeparator: () => null
                        }}
                    />
                </div>

                <div className="flex flex-col w-full items-start gap-2">
                    <label htmlFor="lifecycle-status" className="text-gray-600">Lifecycle Status</label>
                    <Select 
                        instanceId="lifecycle-status"
                        options={lifeCycleData}
                        value={lifeCycleData.find(option => option.value === formLifeCycleState)}
                        onChange={(e)=> setFormLifeCycleState(e.value)}
                        styles={customStyles}
                        className="w-full text-sm"
                        components={{
                        IndicatorSeparator: () => null
                        }}
                    />
                </div>

                <div className="flex flex-col w-full items-start gap-2 relative">
                    <label htmlFor="" className="text-gray-600">Contact Owner <span className="text-red-500">*</span></label>
                    <input type="text" 
                    className="topic-formInput h-10 mt-0! border-l-3! border-l-green-500!"
                    placeholder="Select Contact Owner"
                    onClick={()=> setOpenOwner(!openOwner)}
                    required
                    />
                    {openOwner && (
                    <div className="absolute -bottom-17 bg-white flex p-2 items-center text-gray-400 w-full min-h-15 border border-gray-400 rounded shadow">
                        <p className="w-full text-center">No Data Found</p>
                        {/* <p className="px-5 py-2 hover:bg-gray-200 w-full rounded cursor-pointer">Agent Spark</p> */}
                    </div>
                  )}
                </div>

                <div className="flex flex-col w-full items-start gap-2">
                    <label htmlFor="" className="text-gray-600">Email</label>
                    <input type="text" 
                    className="topic-formInput h-10 mt-0!"
                    placeholder="Enter Email"
                    description="Please fill this field"
                    />
                </div>

                <div className="flex flex-col w-full items-start gap-2">
                    <label htmlFor="" className="text-gray-600">First Name</label>
                    <input type="text" 
                    className="topic-formInput h-10 mt-0!"
                    placeholder="Enter First Name"
                    description="Please fill this field"
                    />
                </div>

                <div className="flex flex-col w-full items-start gap-2">
                    <label htmlFor="" className="text-gray-600">Last Name <span className="text-red-500">*</span></label>
                    <input type="text" 
                    className="topic-formInput h-10 mt-0! border-l-3! border-l-green-500!"
                    placeholder="Enter Last Name"
                    description="Please fill this field"
                    required
                    />
                </div>

                <div className="flex flex-col w-full items-start gap-2">
                    <label htmlFor="" className="text-gray-600">Job Title</label>
                    <input type="text" 
                    className="topic-formInput h-10 mt-0!"
                    placeholder="Enter Job title"
                    description="Please fill this field"
                    required
                    />
                </div>

                <div className="flex flex-col w-full items-start gap-2 relative">
                    <label htmlFor="" className="text-gray-600">Mobile Number</label>
                    <PhoneinputSelector selectedCountry={selectedMobileCountry} setSelectedCountry={setSelectedMobileCountry}
                        dropdownOpen={dropdownOpenMobile} setDropdownOpen={setDropdownOpenMobile} width={width}
                        searchQuery={searchQueryMobile} setSearchQuery={setSearchQueryMobile} positionTop={positionTop}
                    />
                </div>

                <div className="flex flex-col w-full items-start gap-2 relative">
                    <label htmlFor="" className="text-gray-600">Phone Number</label>
                    <PhoneinputSelector selectedCountry={selectedPhoneCountry} setSelectedCountry={setSelectedPhoneCountry}
                        dropdownOpen={dropdownOpenPhone} setDropdownOpen={setDropdownOpenPhone} width={width}
                        searchQuery={searchQueryPhone} setSearchQuery={setSearchQueryPhone} positionTop={positionTop}
                    />
                </div>

                <div className="flex flex-col w-full items-start gap-2">
                    <label htmlFor="" className="text-gray-600">Message</label>
                    <textarea name="" 
                    id="" 
                    rows={3} 
                    placeholder="Enter Message"
                    description="Please fill this field"
                    className="topic-formInput mt-0! py-3">
                    </textarea>
                </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default AddContacts