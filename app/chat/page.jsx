"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import ConversationView from "../compenents/Chat/ConversationView";

const messages = [
    { type: "date", date: "17/06/2025" },
    { sender: "user", message: "Good question 👍 — the reason your chat UI height is overflowing or not fitting properly is because you’re mixing h-full with nested containers that don’t have a defined parent height.", time: "12:29 pm" },
    { sender: "agent", message: "Good question 👍 — the reason your chat UI height is overflowing or not fitting properly is because you’re mixing h-full with nested containers that don’t have a defined parent height.?", time: "12:29 pm" },
    { sender: "user", message: "Hi", time: "12:29 pm" },
    { sender: "agent", message: "Hi, how can I help you today?", time: "12:29 pm" },
    { type: "date", date: "22/07/2025" },
    { type: "system", message: "Conversation status changed from New to Closed by the System at 03:01 pm" }
  ];

const LiveChat = () => {
    const [bookMark, setBookMark] = useState(true);
    const [openConversationTab, setOpenConversationView] = useState(false);  

    
    return (
        <div className='pt-16.5 text-black h-screen w-full flex'>
            {openConversationTab && (
                <div className="">
                    <ConversationView 
                    setOpenConversationView={setOpenConversationView}
                    />
                </div>
            )}
            {/* Left Area */}
            <div className='w-[30%] h-full bg-gray-50'>
                <div>
                    <div className='p-5 flex items-center gap-3 shadow-11'>
                        <div className="relative group hover:bg-green-200 px-1 rounded-2xl">
                            {bookMark ? (
                                <>
                                    <i onClick={() => setBookMark(false)} className="fa-solid fa-star text-green-500 cursor-pointer"></i>
                                    <span className='absolute z-20 -top-10 -left-10 w-30 py-1 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Add to bookMarks</span>
                                </>
                            ) : (
                                <>
                                    <i onClick={() => setBookMark(true)} className="fa-regular fa-star text-green-500 cursor-pointer"></i>
                                    <span className='absolute z-20 -top-10 -left-18 w-44
                                     py-1 px-2 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Remove from bookMarks</span>
                                </>
                            )}

                            <div className="absolute -top-3 left-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/70 hidden group-hover:block" />
                        </div>
                        <h2 className='font-bold'>Live Chat</h2>
                    </div>
                    <div className='justify-items px-4 pt-2 pb-3'>
                        <div 
                        onClick={() => setOpenConversationView(true)}
                        className='flex-items text-green-500 hover:bg-green-200 px-3 py-1 rounded-2xl transition-all duration-300 cursor-pointer'>
                            <i className="fa-solid fa-bars"></i>
                            <h2>My Open Chats</h2>
                        </div>
                        <div className='flex-items-2 gap-2'>
                            <i className="fa-solid fa-magnifying-glass text-sm hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                            <div className='relative group rounded-2xl'>
                                <i className="fa-solid fa-shuffle hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                                <span className='absolute -top-10 -left-8 w-25 py-1 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Bulk Update</span>
                                <div className="absolute -top-3 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/70 hidden group-hover:block" />
                            </div>
                            <div className='relative group rounded-2xl'>
                                <i className="fa-solid fa-sliders hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                                <span className='absolute -top-10 -left-1.5 w-fit px-2 py-1 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Filter</span>
                                <div className="absolute -top-3 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/70 hidden group-hover:block" />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 px-5 text-xs text-gray-500'>
                        <div className='px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-2xl cursor-pointer'>All</div>
                        <div className='px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-2xl cursor-pointer'>Unread</div>
                    </div>
                </div>

                <div className='flex-1 overflow-y-auto '>
                    <div className='h-full flex-items mt-8 text-sm text-gray-400'>
                        No Conversations Found
                    </div>
                </div>
            </div>

            {/* Right Area */}
            <div className='w-[70%] h-full bg-gray-100'>
                {/* <div className="flex-items-2 gap-1 flex-col h-full">
                    <Image 
                        src="/messages.svg"
                        alt="Message image"
                        height={50}
                        width={50}
                        className="w-50 h-50"
                    />
                    <p className="font-bold text-xs">No Conversation Selected</p>
                    <p className="text-xs text-gray-500">Select a conversation to read</p>
                </div> */}

                <div className="h-full w-full pt-15">
                    <div className="justify-items py-3 px-5 shadow  absolute top-15 bg-white z-10 w-full">
                        <div className="flex items-center gap-3">
                            <Image 
                             src="/Header/Profile.png"
                             alt="profile image"
                             height={50}
                             width={50}
                            className="w-8"
                            />
                            <div>
                                <h2 className="font-bold">Guest User</h2>
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-globe text-green-500"></i>
                                    <p className="text-sm text-gray-500">Click here for more web chat info</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex gap-2 items-center relative">
                                <h2 className="text-sm font-bold">Agent Spark</h2>
                                <div className="flex flex-col text-xs text-gray-400">
                                    <i className="fa-solid fa-angle-up h-2"></i>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </div>

                            <button className="border px-3 py-1 border-gray-400 bg-gray-200 rounded-2xl text-gray-500 text-sm">Reopen</button>
                        </div>
                    </div>

                    <div className="bg-[url(/whats-bg.png)] bg-cover h-full relative">

                        <div className="flex-1 flex flex-col w-full px-10 h-full pt-8 overflow-y-auto">
                            <div className="w-full flex-items">
                                <div className="bg-white px-5 py-8 rounded-[10px] shadow-11 flex-items flex-col w-fit">
                                    <Image 
                                        src="/Header/profile.png"
                                        alt="profile image"
                                        width={100}
                                        height={100}
                                        className="w-15"
                                    />
                                    <span>~</span>
                                    <p className="text-sm text-gray-500">Not a contact- No groups in common</p>
                                </div>
                            </div>

                            <div>
                                {messages.map((msg, index) => {
                                    if (msg.type === "date") {
                                        return (
                                        <div key={index} className="flex justify-center my-4">
                                            <span className="bg-white text-gray-600 text-xs px-3 py-1 rounded shadow">
                                            {msg.date}
                                            </span>
                                        </div>
                                        );
                                    } else if (msg.type === "system") {
                                        return (
                                        <div key={index} className="flex justify-center my-3">
                                            <span className="bg-white text-gray-500 text-xs px-4 py-2 rounded shadow">
                                            {msg.message}
                                            </span>
                                        </div>
                                        );
                                    } else if (msg.sender === "agent") {
                                        return (
                                        <div key={index} className="flex gap-2 justify-end mb-3">
                                            <div className="max-w-[70%] flex gap-2 bg-green-200 text-gray-800 px-3 py-1 rounded-lg shadow-sm text-sm relative">
                                                <p>{msg.message}</p>
                                                <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time}</div>
                                                <i className="fa-solid fa-check-double text-green-600 text-[10px] mt-auto"></i>
                                            </div>
                                        </div>
                                        );
                                    } else {
                                        return (
                                        <div key={index} className="flex justify-start mb-3">
                                            <div className="max-w-[70%] flex gap-2 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-sm text-sm">
                                            <p>{msg.message}</p>
                                            <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time}</div>
                                            </div>
                                        </div>
                                        );
                                    }
                                    })}
                            </div>
                        </div>

                        
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default LiveChat