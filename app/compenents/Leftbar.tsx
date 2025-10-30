'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props{
    label: string,
    icon: string,
    greenIcon: string,
    href: string,
}

const Leftbar: React.FC<Props> = ({label, icon, greenIcon, href}) => {

    const pathname = usePathname();
    const isActive = pathname === href;

  return (
    <> 
        {/* {items.map(({label, icon, greenIcon, href}, index) => { */}
           
        <Link
            href={href}
        >
            <li className={`${isActive ? "bg-green-100 text-green-600 font-semibold flex justify-start items-center hover:bg-green-100 gap-2 p-2 mb-2 w-[95%] rounded" : "flex justify-start items-center hover:bg-green-100 gap-2 p-2 mb-2 w-[95%] rounded"}`}>
                <Image 
                    src={isActive ? greenIcon : icon}
                    alt="files icon"
                    width={20}
                    height={20}
                />
                <p>{label}</p>
            </li>
        </Link>
    
{/* })} */}
            

        </>

        
  )
}

export default Leftbar