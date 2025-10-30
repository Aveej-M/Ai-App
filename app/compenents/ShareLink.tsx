'use client'
import Image from "next/image";
import React, { useState } from "react";

interface Props{
    link : string,
    button: React.ReactNode
    heading: string,
    label: React.ReactNode,
    botId: React.ReactNode,
    helpText: React.ReactNode,
    lead: React.ReactNode,
}

const ShareLink: React.FC<Props> = ({link, button, heading, label, botId, helpText, lead}) => {
  
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
    <div className='text-black flex flex-col w-[-webkit-fill-available] h-[-webkit-fill-available] p-3'> 
        <h1 className="text-2xl font-serif">{heading}</h1>
        <p className="text-gray-500">{label}</p>

        <div className="bg-gray-900 text-white rounded-md p-4 font-mono text-sm whitespace-pre overflow-x-auto max-w-[90%] mt-5 relative scrollbar-hide flex justify-between items-center">
          <code>
            {link}
          </code>

        <div className="flex h-full">
            <button className="min-w-[30]">
                {button}
            </button>

            <button className="h-fit min-w-[30] m-2 bg-gray-400 hover:bg-gray-500 p-2 rounded-[10]"
                onClick={handleCopy}
            >
                <Image 
                src="/Share/Copy 1.png"
                alt="copy icon"
                width={15}
                height={25}
                />
            
            </button>
            
          <span className="absolute top-14 right-4">{copied ? 'Copied' : ''}</span>
        </div>
          
        </div>
        <p className="py-1 pt-4">{botId}</p>
        <p className="py-1">{helpText}</p>
        <p className="py-1">{lead}</p>


    </div>
    </>
  )
}

export default ShareLink