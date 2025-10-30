'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const ShareLeft = () => {

    const pathname = usePathname();

    const items = [
        { label: 'Embed', icon: '/Share/Develop.png', greenIcon:'/Share/Develop.png', href: '/ai/share' },
        { label: 'URL', icon: '/Share/Link.png', greenIcon:'/Share/Link1.png', href: '/ai/share/url' },
        { label: 'Website', icon: '/Share/Website.png', greenIcon:'/Share/Website 1.png', href: '/ai/share/website' },
        { label: 'Wordpress', icon: '/Share/wordpress.png', greenIcon:'/Share/Wordpress.png', href: '/ai/share/wordpress' },
    ]
  return (
    <>
    <div className='flex flex-col text-black border-r border-r-gray-200 shadow w-[20%] min-w-[170px] max-sm:w-full'>
        <ul className='pt-5 pl-4 w-full'>
            {items.map(({label, icon, greenIcon, href}, index) => {
                const isActive = pathname === href;
                return(
                <li 
                    key={index}
                >
                    <Link 
                    href={href}
                    className={`${isActive ? "bg-green-100 text-green-600 font-semibold flex justify-start items-center hover:bg-green-100 gap-2 p-2 mb-2 w-[95%] rounded" : "flex justify-start items-center hover:bg-green-100 gap-2 p-2 mb-2 w-[95%] rounded"}`}>
                        <Image 
                            src={isActive ? greenIcon : icon}
                            alt='Share icon'
                            height={20}
                            width={20}
                        />
                        <p>{label}</p>
                    </Link>
                </li>
            )})}
        </ul>
    </div>
    </>
  )
}

export default ShareLeft