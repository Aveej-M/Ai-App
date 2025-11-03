'use client'
import { useState } from "react";

const SendTemplates = ({ setOpenTemplates }) => {
    const [animateOut, setAnimateOut] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const handleReset = () => {
        setSearchInput('');
    }

  return (
    <div className="h-screen w-full bg-black/80 absolute top-0 left-0 z-50 flex justify-center p-10">
        <div className={`bg-white w-[80%] h-full rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
            <div className="justify-items mb-2">
                <h2 className="text-[16px] font-bold">Select Template</h2>
                <i onClick={()=> setOpenTemplates(false)} className="fa-solid fa-xmark text-[20px] text-gray-500 hover:bg-gray-300 px-1 py-0.5 rounded-full cursor-pointer"></i>
            </div>

            <div className="relative w-[50%] flex items-center max-sm:mr-0 focus:shadow shadow-green-200">
        
                <input type="text" placeholder='Search Settings'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='border border-gray-400 w-[96%] h-8 text-sm py-1 px-3 rounded-l 
                focus:outline-none focus:ring-0 
                focus:rounded-l focus:rounded-r-none
                focus:border-green-500 hover:border-green-500 shadow-11 shadow-green-500'
                />

                <div className="border group border-gray-400 h-8 text-sm w-9 flex-items rounded-r hover:border-green-500 shadow-11 shadow-green-500">
                    <i className="fa-solid fa-magnifying-glass text-gray-500 group-hover:text-green-500"></i>
                </div>
                <div
                onClick={()=> handleReset()} 
                className={`flex-items-2 items-center w-6 h-6 absolute right-10 top-1 bg-white ${searchInput === '' ? 'hidden!' : ''}`}>
                    <i className="fa-regular fa-circle-xmark text-gray-500 hover:text-red-500"></i>       
                </div>
            </div>

            <div className="w-full h-[65dvh] mt-5 flex-items-2 flex-col text-gray-500">
                <i className="fa-solid fa-inbox text-5xl"></i> 
                <p className="">No templates found</p>
            </div>

            <div className="flex items-end cursor-not-allowed">
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-angles-left cursor-pointer text-xs text-gray-500 hover:text-gray-400 transition-all duration-200"></i>
                    <i className="fa-solid fa-chevron-left cursor-pointer text-gray-600 hover:text-gray-500"></i>
                    {/* <p className="border-2 border-green-500 bg-green-200 px-2 py-0.5 text-green-600 rounded ">1</p> */}
                    <i className="fa-solid fa-chevron-right cursor-pointer text-gray-600 hover:text-gray-500"></i>
                    <i className="fa-solid fa-angles-right cursor-pointer text-xs text-gray-500 hover:text-gray-400 transition-all duration-200"></i>
                </div>

                <div className="w-full flex justify-end gap-3 pt-3">
                    <button className="h-8 border px-4 text-gray-400 text-sm rounded-3xl cursor-not-allowed!">
                        Reset
                    </button>

                    <button className={`h-8 border px-4 text-gray-400 text-sm rounded-3xl cursor-not-allowed!`}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SendTemplates