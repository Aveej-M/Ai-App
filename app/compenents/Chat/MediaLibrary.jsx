'use client'
import { useState } from "react";

const mediaData = [
    { label: "Images", value: "image" },
    { label: "Videos", value: "video" },
    { label: "Audios", value: "audio" },
    { label: "Documents", value: "doc" }
]

const MediaLibrary = ({ setOpenMediaLibrary }) => {
    const [animateOut, setAnimateOut] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [activeMediaLibrary, setActiveMediaLibrary] = useState("images");

    const handleReset = () => {
        setSearchInput('');
    }

  return (
     <div className="h-full w-full bg-black/80 absolute top-0 left-0 z-50 flex justify-center">
        <div className={`bg-white w-[80%] min-w-[500px] h-fit mt-30 rounded p-5 ${animateOut ? "popup-out" : "popup-in"}`}>
            <div className="justify-items mb-2">
                <h2 className="text-[22px]">Media Library</h2>
                <i onClick={()=> setOpenMediaLibrary(false)} className="fa-solid fa-xmark text-[20px] text-gray-500 hover:bg-gray-300 px-1 py-0.5 rounded-full cursor-pointer"></i>
            </div>

            <div className="relative flex items-center max-sm:mr-0 focus:shadow shadow-green-200">
        
                <input type="text" placeholder='Search Settings'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='border border-gray-400 w-[96%] h-8 text-sm py-1 px-3 rounded-l 
                focus:outline-none focus:ring-0 
                focus:rounded-l focus:rounded-r-none
                focus:border-green-500 hover:border-green-500 shadow-11 shadow-green-500'
                />

                <div className="border border-gray-400 h-8 text-sm w-9 flex-items rounded-r hover:border-green-500 shadow-11 shadow-green-500">
                    <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                </div>
                <div
                onClick={()=> handleReset()} 
                className={`flex-items-2 items-center w-6 h-6 absolute right-12 top-1.5 bg-white ${searchInput === '' ? 'hidden!' : ''}`}>
                    <i className="fa-regular fa-circle-xmark text-gray-500"></i>       
                </div>
            </div>

            <div className="flex border-b border-gray-400 font-medium mt-5">
                {mediaData.map((item, index) => (
                    <button key={index}
                        onClick={() => setActiveMediaLibrary(item.value)}
                        className={`px-4 py-2 ${
                        activeMediaLibrary === item.value
                            ? "text-green-600 border-b-2 border-green-600"
                            : "text-gray-500"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="border-b-2 border-b-gray-200">
                <table className="w-full mt-5 rounded-t-md">
                    <thead>
                        <tr className="bg-green-100 shadow-64 rounded-t-md border-b border-b-gray-300 text-sm">
                            <th className="px-5 py-3 text-left min-w-25">
                                <input type="checkbox" />
                            </th>
                            <th className="px-5 py-3 text-left min-w-25">NAME</th>
                            <th className="px-5 py-3 text-left min-w-25">SIZE</th>
                            <th className="px-5 py-3 text-left min-w-25">ADDED BY</th>
                            <th className="px-5 py-3 text-left min-w-25">UPDATED ...</th>
                            <th className="px-5 py-3 text-left min-w-25"></th>
                            <th className="px-5 py-3 text-left min-w-25"></th>
                        </tr>
                    </thead>
                    
                    {/* <tbody className="h-50 border-b">
                        <tr>
                            <td className="w-full text-center">
                                <i className="fa-solid fa-inbox text-5xl text-gray-500"></i>
                            </td>
                        </tr>
                    </tbody> */}
                </table>
                <div className="h-50 w-full flex-col flex-items-2 text-gray-500">
                    <i className="fa-solid fa-inbox text-5xl"></i> 
                    <p className="">No data</p>
                </div>
            </div>
            <div className="w-full flex justify-end gap-3 pt-3">
                <button className="h-8 border hover:bg-gray-200 px-4 text-gray-400 text-sm rounded-3xl"
                    onClick={()=> setOpenMediaLibrary(false)}>
                    Cancel
                </button>

                <button className={`h-8 border bg-green-500 hover:bg-green-600 px-4 text-sm rounded-3xl text-white cursor-pointer`}>
                    Select
                </button>
            </div>
        </div>
        
    </div>
  )
}

export default MediaLibrary