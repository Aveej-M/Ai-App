'use client'
import { useState, useRef, useEffect } from "react";
import countries from "../data/countryCodeData";
import Image from "next/image";

export default function PhoneinputSelector({selectedCountry, setSelectedCountry,dropdownOpen, width, setDropdownOpen, searchQuery, setSearchQuery, positionTop}) {
  // const [selectedCountry, setSelectedCountry] = useState(null); // start with no selection
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setSearchQuery(""); // reset search if clicked outside
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(country =>
    country.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
  console.log("Dropdown state changed:", dropdownOpen);
}, [dropdownOpen]);


  return (
      <div className="flex gap-2 relative rounded w-full text-black" ref={containerRef}>
        {/* Country Selector / Searchable Button */}
        <div
          className={`form-input max-w-25 flex items-center !px-2 bg-white cursor-pointer relative border border-gray-300 rounded focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 ${!dropdownOpen && 'gap-4'}  border-l-2! border-l-green-500!`}
          onClick={() => {
            setDropdownOpen(true);
            setSearchQuery(""); // show input field when opened
          }}
        >
          {dropdownOpen ? (
            <input
              autoFocus
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow h-full w-14 text-[14px] group border-none focus:ring-0 focus:outline-none placeholder:font-medium"
            />
          ) : selectedCountry ? (
            <div className="flex items-center gap-2 w-max">
              <img
                src={selectedCountry.flagUrl}
                alt={`${selectedCountry.label} flag`}
                className="h-5 w-6"
              />
              <span className="text-sm">{selectedCountry.dialCode}</span>
            </div>
          ) : (
            <span className="text-gray-400 text-16px font-medium">Search</span>
          )}

          {/* <svg
            className={`ml-auto transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            width="20" height="12" viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" fill="currentColor" />
          </svg> */}

          <i className={`fa-solid fa-chevron-down text-gray-300 pl-1 transform transition-transform ${dropdownOpen ? "rotate-180 pt-1" : ""}`}></i>

          {/* Dropdown Panel */}
          {dropdownOpen && (
            <ul className={`max-h-52 overflow-y-auto absolute ${positionTop} left-0 ${width} mt-1 bg-white border border-gray-300 rounded-md shadow-md z-10`}>
              {filteredCountries.map((country) => (
                <li
                  key={country.code}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCountry(country);
                    console.log('Drop Down', dropdownOpen)

                    setDropdownOpen(false);
                    console.log('Drop Down', dropdownOpen)

                  }}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer text-sm ${
                    country.code === selectedCountry?.code
                      ? "bg-green-400 text-white hover:bg-green-500"
                      : "text-slate-700 hover:bg-gray-200"
                  }`}
                >
                  <img src={country.flagUrl} alt={`${country.label} flag`} className="h-5 w-6" />
                  <span className="text-sm">{country.dialCode}</span>
                  <span className="ml-auto font-normal">{country.label}</span>
                </li>
              ))}
              {filteredCountries.length === 0 && (
                <li className="px-3 py-2 text-gray-500 text-sm">No results</li>
              )}
            </ul>
          )}
        </div>

        {/* Phone Input */}
        <input
          id="phone-input"
          type="tel"
          maxLength={10}
          placeholder="Enter phone number"
          description="Please fill this field"
          className="form-input flex-grow px-3 bg-white text-gray-900 placeholder-gray-400 placeholder:font-medium"
        />
      </div>
  );
}
