'use client'
import { useEffect, useRef, useState } from "react";

const CannedResponse = ({ setOpenCannedRes }) => {
    const [animateOut, setAnimateOut] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const handleReset = () => {
        setSearchInput('');
    }

  return (
     <div className="h-fit w-[80%] absolute bottom-50 left-50 z-50 flex justify-center">
        <div className={`bg-white w-[80%] min-w-[500px] h-fit rounded shadow-5 p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
            <div className="justify-items mb-2">
                <h2 className="text-sm">Media Library</h2>
            </div>

            <div className="w-full flex">
                <div className="relative w-1/2 flex flex-col items-center max-sm:mr-0 focus:shadow shadow-green-200">
                    <input type="text" placeholder='Search Canned Response'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='border border-gray-400 w-[96%] h-8 text-sm py-1 px-3 rounded
                        focus:outline-none focus:ring-0 
                        
                        focus:border-green-500 hover:border-green-500 shadow-11 shadow-green-500'
                    />

                    <div
                    onClick={()=> handleReset()} 
                    className={`flex-items-2 items-center w-6 h-6 absolute right-6 top-1 bg-white cursor-pointer ${searchInput === '' ? 'hidden!' : ''}`}>
                        <i className="fa-regular fa-circle-xmark text-gray-500"></i>       
                    </div>

                    <div className="h-50 w-full flex-col flex-items-2 text-gray-300">
                        <i className="fa-solid fa-inbox text-5xl"></i> 
                        <p className="">No data</p>
                    </div>
                </div>
                
                <div className="w-1/2">
                    <p className="bg-gray-200 px-3 py-1 rounded">Hover over a response to preview</p>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default CannedResponse