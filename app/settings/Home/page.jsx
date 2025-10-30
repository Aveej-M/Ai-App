'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import { generalData } from "../../data/settings";
import Link from "next/link";

const Settings = () => {
    const [searchInput, setSearchInput] = useState('');
    // const pathName = usePathname();

    function HighlightedText({ text, highlight }) {
        if (!highlight) return text;

        const regex = new RegExp(`(${highlight})`, "gi"); // match search text (case insensitive)
        const parts = text.split(regex);

        return parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 font-bold">{part}</span>
            ) : (
            part
            )
        );          
    }


    const filterOrg = generalData.filter(item => 
        item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.info.toLowerCase().includes(searchInput.toLowerCase())
    )
    // const filterTeam = teamData.filter(item => 
    //     item.title.toLowerCase().includes(searchInput.toLowerCase())
    // )

    const handleReset = () => {
        setSearchInput('');
    }

    // const currentPath = pathName.startsWith("/settings/general");


  return (
    <>
        <div className="w-full h-full p-5">
            <div className="relative flex items-center max-sm:mr-0 focus:shadow shadow-green-200">
                
                <input type="text" placeholder='Search Settings'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className='border border-gray-400 w-[96%] h-9 py-1 px-3 rounded-l 
                focus:outline-none focus:ring-0 
                focus:rounded-l focus:rounded-r-none
                focus:border-green-500 hover:border-green-500'
                />

                <div className="border border-gray-400 h-9 w-10 flex-items rounded-r hover:border-green-500">
                 <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                </div>
                <div
                onClick={()=> handleReset()} 
                className={`flex-items-2 items-center w-6 h-6 absolute right-15 top-1.5 bg-white ${searchInput === '' ? 'hidden!' : ''}`}>
                    <i className="fa-regular fa-circle-xmark text-gray-500"></i>       
                </div>
            </div>

            <div>
                {filterOrg.length === 0 ? 
                <div className="flex-items h-screen pb-50">
                    <p>No settings found matching your search</p>
                </div> :
                <div  className="w-full h-full mt-5 shadow-6 rounded-[5px]">
                 <div className="p-5 border-b border-gray-400">
                    <h1>General</h1>
                </div> 

                <div className="p-5 grid grid-cols-3 max-2xl:grid-cols-2 max-lg:grid-cols-1">
                    {filterOrg.map(({title, icon, link, info}, index) => (
                        <Link  key={index} 
                        href={link}
                        className="h-full"
                        >
                            <div className="flex items-center gap-3 p-5 hover:bg-gray-100  rounded-[5px]">
                                <i className={`${icon} text-green-500 text-[20px]`}></i>
                                <div className="text-[16px] max-w-[31.25rem] min-w-[12.5rem]">
                                    <h1>
                                        <HighlightedText text={title} highlight={searchInput} />
                                    </h1>
                                    <p className="text-gray-400 flex-wrap">
                                        <HighlightedText text={info} highlight={searchInput} />
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))} 
                </div>
                </div>
                }
                

                
            </div>
        </div>
    </>
  )
}

export default Settings