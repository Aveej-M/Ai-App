'use client'
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CountrySelector from "../../compenents/CountryForm";
import PhoneinputSelector from "../../compenents/PhoneinputSelector";
import countries from "../../data/countryCodeData";
import TimeZoneForm from "../../compenents/TimeZoneForm";
import { customStyles } from '../../data/selectStyle';
import timeZones from "@/app/data/timezone";
import { countryOptions } from '../../data/countryData';
import { countryCurrencies } from "../../data/currencyData";
import Select from 'react-select';

const page = () => {
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [uploadLogo, setUploadLogo] = useState('');
  const fileInputRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null); // start with no selection
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const positionTop = '-top-55';

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setUploadLogo(base64);      // store single image only
      // setSelectedAvatar(base64);  // optional: use as preview/avatar
    };
    reader.readAsDataURL(file);
  };


  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 text-[14px]">
      {/* Form Section */}
      <div className="w-full overflow-auto p-6 lg:p-10">
        <form
          action=""
          className="relative flex flex-col w-full max-w-[600px] bg-white shadow-1 rounded-xl p-6 lg:p-8"
        >
          {/* Logo Upload */}
          <div className="relative flex-items flex-col">
            <div className="w-fit flex-items flex-col ">
              <div
                className={`relative w-20 h-20 ${!uploadLogo && "border-2"
                  } border-dotted border-gray-300 hover:border-green-500 rounded-full flex justify-center items-center cursor-pointer transition`}
                onClick={() => fileInputRef.current.click()}
              >
                {uploadLogo ? (
                  <Image
                    src={uploadLogo}
                    alt="Logo"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <i className="fa-solid fa-camera text-3xl text-gray-400"></i>
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleUpload}
                  className="hidden"
                />
              </div>

              {uploadLogo ? (
                <i
                  onClick={() => setUploadLogo("")}
                  className="fa-regular fa-trash-can absolute top-18 right-45 text-red-500 hover:bg-green-100 px-1 py-1 rounded-full cursor-pointer transition"
                ></i>
              ) : (
                <p className="text-gray-500 text-sm">Upload Brand Logo</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2 my-5 p-2 text-sm bg-green-200/80 border border-green-400 rounded-md">
            <i className="fa-solid fa-circle-info text-green-500 mt-1"></i>
            <p className='text-green-500'>Preferred Image Size: 240px x 48px @ 72 DPI. Maximum size of 1MB.</p>
          </div>

          {/* Organisation Name */}
          <div className="w-full mb-5">
            <label htmlFor="">Organisation Name <span className='text-red-500'>*</span></label>
            <input type="text" id='firstname' maxLength={20} className='form-input border-l-2! border-l-green-500!' />
          </div>

          {/* Country */}
          <div className="w-full mb-5">
            <label className="block mb-1 font-medium text-gray-700">
              Country <span className="text-red-500">*</span>
            </label>
            <Select
              instanceId="country"
              options={countryOptions}
              value={countryOptions.find((option) => option.value === country)}
              onChange={(selected) => {
                const countryCode = selected.value;
                setCountry(countryCode);

                const matchedCurrency = countryCurrencies.find(
                  (c) => c.value === countryCode
                );
                if (matchedCurrency) setCurrency(matchedCurrency.value);

                const matchedTimeZone = timeZones.find(
                  (tz) => tz.country === countryCode
                );
                if (matchedTimeZone) setTimeZone(matchedTimeZone.value);

                const phoneInfo = countries.find((c) => c.code === countryCode);
                if (phoneInfo) {
                  setSelectedCountry({
                    name: phoneInfo.label,
                    dialCode: phoneInfo.dialCode,
                    isoCode: phoneInfo.code,
                    flagUrl: phoneInfo.flagUrl,
                  });
                }
              }}
              styles={customStyles}
              placeholder="Select your country"
              isSearchable
              className="w-full"
              components={{ IndicatorSeparator: () => null }}
            />
          </div>

          {/* Currency */}
          <div className="w-full mb-5">
            <label className="block mb-1 font-medium text-gray-700">
              Currency <span className="text-red-500">*</span>
            </label>
            <Select
              instanceId="currency"
              options={countryCurrencies}
              value={countryCurrencies.find((option) => option.value === currency)}
              onChange={(e) => setCurrency(e.value)}
              styles={customStyles}
              placeholder="Select your currency"
              isSearchable
              className="w-full"
              components={{ IndicatorSeparator: () => null }}
            />
          </div>

          {/* Time Zone */}
          <div className="w-full mb-5">
            <label className="block mb-1 font-medium text-gray-700">
              Time Zone <span className="text-red-500">*</span>
            </label>
            <Select
              instanceId="time-zone-select"
              options={timeZones}
              value={timeZones.find((option) => option.value === timeZone)}
              onChange={(e) => setTimeZone(e.value)}
              styles={customStyles}
              placeholder="Select time zone"
              isSearchable
              className="w-full"
              components={{ IndicatorSeparator: () => null }}
            />
          </div>

          {/* Phone Input */}
          <div className="w-full mb-6">
            <PhoneinputSelector
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              dropdownOpen={dropdownOpen}
              setDropdownOpen={setDropdownOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              positionTop={positionTop}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end fixed top-5 right-5 z-20">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Info Section */}
      <div className="w-full lg:w-[30%] min-h-[300px] p-6 text-gray-600 bg-gray-50 rounded-md">
        <h1 className="text-lg font-semibold text-black mb-3">
          Company Profile
        </h1>
        <p className="mb-4">
          Set up your organization's identity and preferences.
        </p>
        <p className="mb-4">
          Customize your brand’s details including logo, name, country, currency,
          time zone, and contact number. This profile powers how your brand appears
          across the platform ensuring consistent, localized communication with
          customers.
        </p>
        <p>Keep it up-to-date to reflect your organization accurately.</p>
      </div>
    </div>

  )
}

export default page