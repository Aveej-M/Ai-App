'use client'
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { organizationData, teamData } from "../../data/settings";

const Settingsleftbar = () => {
    const [showOrganisation, setShowOrganisation] = useState(true);
    const [showTeam, setShowTeam] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const pathName = usePathname();

    const filterOrg = organizationData.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
    )
    const filterTeam = teamData.filter(item =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
    )


    const handleReset = () => {
        setSearchInput('');
    }

    const currentPath = pathName.startsWith("/settings/general");

    return (
        <>

            <div className='h-full w-fit bg-gray-200 '>
                <div className='flex flex-col items-center justify-center w-[100px] h-[80px]'>
                    <div className=' w-12 h-8 flex items-center justify-center hover:bg-gray-300 rounded-2xl'>
                        <i className="fa-solid fa-shapes text-black text-center"></i>
                    </div>
                    <p className='font-[600]'>General</p>
                </div>

                <div className='flex flex-col items-center justify-center w-[100px] h-[80px]'>
                    <div className=' w-12 h-8 flex items-center justify-center hover:bg-gray-300 rounded-2xl'>
                        <i className="fa-solid fa-shapes text-black text-center"></i>
                    </div>
                    <p className='font-[600]'>General</p>
                </div>
            </div>
            <div className='min-w-[250px] w-[250px] h-full bg-gray-300 p-3'>
                <div className="relative flex gap-2 my-4 max-sm:mr-0">
                    <i className="fa-solid fa-magnifying-glass text-gray-500 absolute top-4.5 left-2"></i>
                    <input type="text" placeholder='Search settings'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='border border-gray-400 w-full mt-2 py-1 px-3 pl-8 rounded-2xl focus:outline-green-500 focus:border-green-500 hover:border-green-500 shadow-9'
                    />
                    <div onClick={() => handleReset()} className={`flex-items-2 items-center w-6 h-6 absolute right-3 top-3.5 bg-gray-300 ${searchInput.length == '' && 'hidden!'}`}>
                        <i className="fa-regular fa-circle-xmark text-gray-500"></i>
                    </div>
                </div>

                <div className={`justify-items mt-5 px-3 ${filterOrg.length === 0 ? 'hidden!' : 'block'}`}>
                    <h1 className={`${currentPath ? 'text-gray-400' : 'text-black'}`}>ORGANISATION</h1>
                    <i onClick={() => setShowOrganisation(!showOrganisation)} className={`${showOrganisation ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'} pt-1 cursor-pointer`}></i>
                </div>

                <div className={`py-3 transition-all duration-300 ease-in-out ${filterOrg.length === 0 && 'hidden!'} ${showOrganisation ? ' opacity-100' : 'max-h-0 opacity-0 absolute -z-10'}`}>
                    {filterOrg.map(({ title, icon, path }, index) => {
                        const isActive = pathName === path;
                        return (
                            <Link key={index} href={path}>
                                <div className={`flex gap-3 items-center px-4 py-1 mt-1 rounded-2xl ${isActive ? 'bg-gray-100' : 'hover:bg-gray-200/70'}`}>
                                    <i className={`${icon} pt-0.5`}></i>
                                    <p className="text-[14px] pt-0.5">{title}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className={`justify-items mt-5 px-3 ${filterTeam.length === 0 ? 'hidden!' : 'block'}`}>
                    <h1>TEAM</h1>
                    <i onClick={() => setShowTeam(!showTeam)} className={`${showTeam ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'} pt-1 cursor-pointer`}></i>
                </div>

                <div className={`py-3  transition-all duration-300 ease-in-out ${filterTeam.length === 0 ? 'hidden!' : 'block'} ${showTeam ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 absolute -z-10'}`}>
                    {filterTeam.map(({ title, icon, path }, index) => {
                        const isActive = pathName === path;
                        return (
                            <Link key={index} href={path}>
                                <div className={`flex gap-3 items-center px-4 py-1 mt-1 hover:bg-gray-200 rounded-2xl ${isActive ? 'bg-gray-100' : ''}`}>
                                    <i className={`${icon} pt-0.5`}></i>
                                    <p className="text-[14px] pt-0.5">{title}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Settingsleftbar