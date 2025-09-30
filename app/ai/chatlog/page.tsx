'use client'
import Image from "next/image";
import Link from "next/link";
import { chatData } from "@/app/data/chat-data";
import { useState } from "react";

const page = () => {

  let [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <div className='w-auto h-10 flex justify-end gap-2 m-4'>
        <button className="h-[35px] w-[100px] border-1 border-gray-300 rounded flex items-center gap-2 px-2 cursor-pointer shadow-6">
          <Image
            src="/reboot.png"
            alt=""
            width={20}
            height={20}
          />

          <p className="text-[16px] text-black">Refresh</p>
        </button>

        <button className="h-[35px] w-[100px] border-1 border-gray-300 rounded flex items-center gap-2 px-2 cursor-pointer shadow-6">
          <Image
            src="/filter.png"
            alt=""
            width={20}
            height={20}
          />

          <p className="text-[16px] text-black">Filter</p>
        </button>
      </div>

      <div className="w-full h-full flex text-black gap-2 p-4 fixed top-0 left-0 pl-20 pt-[200px] overflow-y-auto pb-[200]">
        <div className="flex-items-col h-fit w-[40%] border-r-gray-200 border-r gap-2 pb-[40px]">
          {chatData.map(({ message, time }, index) => (
            <div key={index} onClick={() => setSelectedIndex(index)}
              className={`${index === selectedIndex ? 'bg-gray-200 justify-items w-[90%] h-[60px] b px-3 rounded-[2px] shadow-19' : 'justify-items w-[90%] h-[60px] bg-gray-50 hover:bg-gray-100 px-3 rounded-[2px] shadow-19'}`}
            >
              <p className="font-semibold">{message}</p>
              <p>{time}</p>
            </div>
          ))}
        </div>

        <div className="w-[60%]">
          {/* {chatData.map(({message, type}, index) => (
              <div key={index} 
                className={`${type === 'inbound'
                  ? 'flex justify-end w-[60%] ml-[40%] mr-2 h-[50px] mb-5' : 'flex justify-self-start w-[60%] h-[50px] gap-3 ml-2 mb-4'
                }`}
              >
                <div key={index}
                className={`${type === 'inbound' ? 'bg-blue-100 self-end text-right flex justify-end items-center p-4 h-full w-fit rounded-t-lg rounded-bl-lg'
                  : 'bg-gray-200 self-start text-left h-full w-fit flex justify-start items-center p-4 rounded-t-lg rounded-br-lg'}`}
                >
                  <p>{message}</p>
                </div> 
              </div>
              
             ))} */}

          <div className="flex justify-self-start w-[60%] h-[50px] gap-3 ml-2 mb-4">
            <div className="bg-gray-100 self-end text-right flex justify-end items-center p-4 h-full w-fit rounded-t-lg rounded-br-lg shadow">
              <p>{chatData[selectedIndex].message}</p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default page