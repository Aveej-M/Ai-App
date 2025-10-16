import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const TopicsHead = ({label,href}) => {
  return (
    <>
    <div className='fixed top-[66px] w-full h-fit z-1'>
        <div className='h-[60px] bg-gray-100 pl-[30px] text-black flex items-center ai-head'>
        <p className='flex items-center text-1xl font-bold'>
            <Link href={href}>
            <Image
                src='/left-arrow.png'
                alt=''
                width={20}
                height={20}
                className='mr-5'
            />
            </Link>
            {label}
            <Image src='/right-arrow.svg' alt='' width={30} height={20} />
        </p>
        </div>
    </div>
    </>
  )
}

export default TopicsHead