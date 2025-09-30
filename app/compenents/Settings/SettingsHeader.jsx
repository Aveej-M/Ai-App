'use client'
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { organizationData, teamData } from "../../data/settings";
import Link from "next/link";

const SettingsHeader = () => {
    const [headerTitle, setHeaderTitle] = useState('');
    const [headerLogo, setheaderLogo] = useState('');
    const pathName = usePathname();

    useEffect(() => {
        if (pathName === '/settings/Home') {
            setHeaderTitle('Home');
            setheaderLogo('fa-regular fa-circle')
        } else if (pathName === '/settings/Company-profile') {
            setHeaderTitle('Company Profile');
            setheaderLogo('fa-regular fa-building')
        } else if (pathName === '/settings/Business-hours') {
            setHeaderTitle('Business Hours')
            setheaderLogo('fa-regular fa-calendar-days')
        } else if (pathName === '/settings/Business-hours/Edit') {
            setHeaderTitle('Edit Business Hours')
            setheaderLogo('fa-solid fa-arrow-left')
        } else if (pathName === '/settings/Team/Users') {
            setHeaderTitle('User')
            setheaderLogo('fa-regular fa-user')
        }
    }, [pathName]);

    return (
        <>
            {/* Header */}
            <div className='w-full relative z-10 shadow text-black'>
                <div className='h-[65px] w-full bg-gray-300 flex items-center'>
                    <div className='w-[100px] h-full flex items-center justify-center bg-gray-200'>
                        <Link href="/">
                            <div className='flex-items-2 h-[35px] w-[35px] bg-white rounded-[50%] p-5 hover:bg-green-500 transition-all duration-500 ease-in-out group'><i className="fa-solid fa-arrow-left group-hover:text-white transition-all duration-500 ease-in-out"></i></div>
                        </Link>
                    </div>

                    <div className='h-full w-[250px] bg-green-500 flex gap-3 items-center p-5'>
                        <i className="fa-solid fa-gear text-2xl text-gray-300" style={{ WebkitTextStroke: "2px black" }}></i>
                        <h1 className='text-[18px]'>Settings</h1>
                    </div>

                    <div className='ml-5 flex-items-2 gap-2'>
                        {pathName === '/settings/Business-hours/Edit'
                            ? <Link href="/settings/Business-hours">
                                <div className="flex-items-2 cursor-pointer h-8 w-8 pt-1 rounded-[20px] hover:bg-gray-200 transition-colors duration-300 ease-in-out">
                                    <i className={`${headerLogo}`}></i>
                                </div>
                            </Link>
                            : <i className={`${headerLogo}`}></i>}
                        <p className='text-[20px]'>{headerTitle}</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SettingsHeader