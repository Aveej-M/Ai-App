"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ConversationView from "../compenents/Chat/ConversationView";
import FilterTab from "../compenents/Chat/FilterTab";
import AddContacts from "../compenents/Chat/AddContacts";

const messages = [
    { type: "date", date: "17/06/2025" },
    { sender: "user", message: "Good question 👍 — the reason your chat UI height is overflowing or not fitting properly is because you’re mixing h-full with nested containers that don’t have a defined parent height.", time: "12:29 pm" },
    { sender: "agent", message: "Good question 👍 — the reason your chat UI height is overflowing or not fitting properly is because you’re mixing h-full with nested containers that don’t have a defined parent height.?", time: "12:29 pm" },
    { sender: "agent", message: "Good question 👍 — the reason your chat UI height is overflowing or not fitting properly is because you’re mixing h-full with nested containers that don’t have a defined parent height.?", time: "12:29 pm" },
    { sender: "agent", message: "Good question 👍 — the reason your chat UI height is overflowing or not fitting properly is because you’re mixing h-full with nested containers that don’t have a defined parent height.?", time: "12:29 pm" },
    { sender: "user", message: "Hi", time: "12:29 pm" },
    { sender: "agent", message: "Hi, how can I help you today?", time: "12:29 pm" },
    { type: "date", date: "22/07/2025" },
    { type: "system", message: "Conversation status changed from New to Closed by the System at 03:01 pm" }
  ];

const LiveChat = () => {
    const [bookMark, setBookMark] = useState(true);
    const [openConversationTab, setOpenConversationTab] = useState(false); 
    const [openSearchTab, setOpenSearchTab] = useState(false);
    const [openFilterTab, setOpenFilterTab] = useState(false);
    const [openAddContacts, setOpenAddContacts] = useState(false); 
    const [replyTo, setReplyTo] = useState(null);
    const [openAssignUser, setOpenAssignUser] = useState(false);
    const [assignedName, setAssignedName] = useState("Agent Spark");

    const searchRef = useRef();

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearchTab(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);


    return (
        <div className='pt-16.5 text-black h-screen w-full flex'>
            {openConversationTab && (
                <div className="">
                    <ConversationView 
                    setOpenConversationTab={setOpenConversationTab}
                    />
                </div>
            )}

            {openFilterTab && (
                <FilterTab 
                setOpenFilterTab={setOpenFilterTab}
                />
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
                        onClick={() => setOpenConversationTab(true)}
                        className='flex-items text-green-500 hover:bg-green-200 px-3 py-1 rounded-2xl transition-all duration-300 cursor-pointer'>
                            <i className="fa-solid fa-bars"></i>
                            <h2>My Open Chats</h2>
                        </div>
                        <div className='flex-items-2 gap-2'>
                            {}
                            <div className="relative" ref={searchRef}>
                                {openSearchTab && (
                                    <>
                                        <div className="absolute bottom-10 -left-20 z-20 w-50 p-2 bg-white rounded shadow-5">
                                            <label className="text-sm font-bold">Search User</label>
                                            <input type="text" 
                                            placeholder="Search User"
                                            className="topic-formInput mt-0! h-8 text-sm"
                                            />
                                        </div>

                                        <div className="absolute bottom-8 left-1 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white z-20"></div>
                                    </>
                                )}
                                <i 
                                onClick={()=> setOpenSearchTab(!openSearchTab)}
                                className="fa-solid fa-magnifying-glass text-sm hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                            </div>
                            <div className='relative group rounded-2xl'>
                                <i className="fa-solid fa-shuffle hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                                <span className='absolute -top-10 -left-8 z-30 w-25 py-1 hidden group-hover:block bg-black/80 text-white rounded text-sm text-center'>Bulk Update</span>
                                <div className="absolute -top-3 left-3 z-30 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/80 hidden group-hover:block" />
                            </div>
                            <div 
                                onClick={() => setOpenFilterTab(true)}
                            className='relative group rounded-2xl'>
                                <i className="fa-solid fa-sliders hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                                <span className='absolute -top-10 -left-1.5 z-30 w-fit px-2 py-1 hidden group-hover:block bg-black/80 text-white rounded text-sm text-center'>Filter</span>
                                <div className="absolute -top-3 left-3 z-30 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/80 hidden group-hover:block" />
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
            <div className='w-[70%] flex h-full bg-gray-100'>
                
                <div className="h-full w-full">
                    <div className="justify-items py-3 px-5 border-l border-l-gray-100 bg-white z-10 w-full h-16">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOpenAddContacts(!openAddContacts)}>
                            <Image 
                             src="/Header/Profile.png"
                             alt="profile image"
                             height={50}
                             width={50}
                            className="w-8"
                            />
                            <div>
                                <h2 className="font-bold text-sm">Guest User</h2>
                                <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-globe text-green-500 text-sm"></i>
                                    <p className="text-xs text-gray-500">Click here for more web chat info</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <div className="flex gap-2 items-center relative">
                                <input 
                                type="text" 
                                value={assignedName}
                                onChange={(e) => setAssignedName(e.target.value)}
                                className={`outline-0 text-sm font-bold ${openAddContacts && "max-xl:hidden"}`}
                                onClick={() => setOpenAssignUser(!openAssignUser)}
                                style={{ width: `${assignedName.length + 1}ch` }}
                                />
                                
                                <div className="flex flex-col text-xs text-gray-400">
                                    <i className="fa-solid fa-angle-up h-2"></i>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </div>
                            {openAssignUser && (
                                <div className="absolute w-60 bg-white top-30 shadow-11 rounded h-50 overflow-y-auto pb-3">
                                    <div className="px-1">
                                        <p className="text-xs text-gray-400 px-5 py-2">Assign to Team - This will move a conversation to unassigned status</p>
                                        <h2 className="text-gray-600 h-8 flex items-center px-3 text-sm hover:bg-green-200 rounded cursor-pointer">Team</h2>
                                    </div>
                                    <div className="px-1">
                                        <p className="text-xs text-gray-400 px-5 py-2">Assign to User</p>
                                        <h2 className="text-gray-600 h-8 flex items-center px-3 text-sm hover:bg-green-200 rounded cursor-pointer">Pradeep Chandran</h2>
                                    </div>
                                    <div className="px-1">
                                        <p className="text-xs text-gray-400 px-5 py-2">Assign to AI Agent</p>
                                        <h2 className="text-gray-600 h-8 flex items-center px-3 text-sm hover:bg-green-200 rounded cursor-pointer">Agent Spark</h2>
                                    </div>
                                    <div className="px-1">
                                        <p className="text-xs text-gray-400 px-5 py-2">Assign to Web Bot</p>
                                        <h2 className="text-gray-600 h-8 flex items-center px-3 text-sm hover:bg-green-200 rounded cursor-pointer">Default Live Chat</h2>
                                    </div>
                                </div>
                                )}

                            <button className="border px-3 py-1 border-gray-400 bg-gray-200 rounded-2xl text-gray-500 text-xs">Reopen</button>
                        </div>
                    </div>

                    <div className="flex justify-between flex-col h-[90%]">
                        <div className="bg-[url(/whats-bg.png)] bg-cover h-full overflow-y-auto">
                            <div className=" flex flex-col w-full pt-8">
                                <div className="w-full flex-items">
                                    <div className="bg-white px-5 py-8 rounded-[10px] shadow-11 flex-items flex-col w-fit">
                                        <Image 
                                            src="/Header/Profile.png"
                                            alt="profile image"
                                            width={100}
                                            height={100}
                                            className="w-15"
                                        />
                                        <span>~</span>
                                        <p className="text-sm text-gray-500">Not a contact- No groups in common</p>
                                    </div>
                                </div>

                                <div className=" px-3">
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
                                            <div key={index} className="flex justify-end mb-3 group">
                                                <div className="relative group/arrow w-fit cursor-pointer h-8">
                                                    {/* Dropdown arrow (visible on hover of message group) */}
                                                    <i className="fa-solid fa-sort-down text-gray-400 opacity-0 group-hover:opacity-100"></i>

                                                    {/* Reply box (visible when hovering the arrow itself) */}
                                                    <div className={`absolute right-0 mt-1 text-xs p-0.5 bg-white rounded hidden transition-all duration-200  ${replyTo === null ? "group-hover/arrow:block" : ""}`}>
                                                        <div className="flex-items-2 pl-3 hover:bg-gray-100 rounded cursor-pointer">
                                                            <i className="fa-solid fa-reply"></i>
                                                            <p 
                                                            onClick={() => setReplyTo(msg.message)}
                                                            className="p-2">Reply</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Message bubble */}
                                                <div className="max-w-[70%] flex gap-2 bg-green-200 text-gray-800 px-3 py-1 ml-5 rounded-lg shadow-sm text-xs relative">
                                                    <p>{msg.message}</p>
                                                    <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time}</div>
                                                    <i className="fa-solid fa-check-double text-green-600 text-[10px] mt-auto"></i>
                                                </div>

                                                {/* Profile */}
                                                <div className="relative">
                                                    <div className="relative right-5 w-0 h-0 border-l-[0px] border-l-transparent border-r-[35px] border-r-transparent border-t-[25px] border-t-green-200"></div>
                                                    <Image 
                                                    src="/Header/Profile.png"
                                                    alt="Profile image"
                                                    width={100}
                                                    height={100}
                                                    className="w-6 absolute top-2 left-1 border-1 border-green-600 rounded-2xl"
                                                    />
                                                </div>
                                            </div>
                                            );
                                        } else {
                                            return (
                                            <div key={index} className="flex justify-start mb-3 group">
                                                <div className="relative left-3 group w-0 h-0 border-l-[30px] border-l-transparent border-r-[0px] border-r-transparent border-t-[15px] border-t-white"></div>
                                                <div className="max-w-[70%] flex gap-2 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-sm text-xs">
                                                    <p>{msg.message}</p>
                                                    <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time}</div>
                                                </div>
                                                <div className="relative flex group/arrow cursor-pointer h-8">
                                                    <i className="fa-solid fa-sort-down text-gray-400 ml-5 opacity-0 group-hover:opacity-100"></i>

                                                    {/* Reply box (visible when hovering the arrow itself) */}
                                                    <div className={`absolute top-5 left-5 mt-1 text-xs p-0.5 bg-white rounded transition-all hidden duration-200 ${replyTo === null ? "group-hover/arrow:block" : ""}`}>
                                                        <div 
                                                        onClick={() => setReplyTo(msg.message)}
                                                        className="flex-items-2 hover:bg-gray-100 pl-3">
                                                            <i className="fa-solid fa-reply"></i>
                                                            <p className="p-2 rounded cursor-pointer">Reply</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            );
                                        }
                                        })}
                                </div>
                            </div>  
                                                
                        </div>

                        {replyTo && (
                        <div className="w-full bg-white px-5 py-3 border-b border-gray-200">
                            <div className="flex items-center justify-between gap-5 w-full border-l-2 border-green-500 rounded-[6px]">
                                <div className="flex items-center gap-3 p-3 bg-green-100 w-full rounded border-l-2 border-green-500">
                                    <i className="fa-solid fa-file-lines ml-10 text-xs text-gray-500"></i>
                                    <p className="text-xs text-gray-500">{replyTo}</p>
                                </div>
                                <i onClick={() => setReplyTo(null)} className="fa-solid fa-xmark cursor-pointer text-gray-500 hover:text-gray-700"></i>
                            </div>
                        </div>
                        )}

                        <div className="bg-gray-50 gap-1 w-full text-xs flex-items-2 flex-col p-3 text-center">
                            <p>This chat has been resolved, so you can only send a message if the customer initiates a new chat</p>
                            <button className="border px-3 py-1 border-gray-400 rounded-2xl text-black gap-1 text-sx">Reopen</button>
                        </div> 
                    </div>

                    
                </div>

                {openAddContacts && (
                // <div className={`min-w-[40%] bg-white h-full overflow-y-auto transform transition-transform duration-300 ${openAddContacts ? "translate-x-0" : "translate-x-full"}`}>
                //     <div className="flex items-center gap-3 h-15 px-3">
                //         {/* <div className="p-3"> */}
                //             <i 
                //             onClick={()=> setOpenAddContacts(false)}
                //             className="fa-solid fa-arrow-left p-1 m-1 hover:p-2 hover:m-0 bg-gray-200 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                //         {/* </div> */}
                //         Add Contact
                //     </div>

                //     <div className={`flex-items flex-col mt-5 transform transition-transform duration-300 ${openAddContacts ? "popup-in translate-x-0 opacity-100 delay-200" : "-translate-x-full opacity-0"}`}>
                //         <Image 
                //             src="/Header/Profile.png"
                //             alt="Profile iamge"
                //             height={100}
                //             width={100}
                //             className="w-20"
                //         />
                //         <div className="w-[70%] flex-items flex-col text-center">
                //             <p className="text-xs">This is a new contact and not part of your current contact. Would you like to add?</p>
                //             <button className="px-3 py-1 text-white font-bold border-gray-400 bg-green-500 hover:bg-green-600 rounded-2xl gap-1 text-xs">Add to Contacts</button>
                //         </div>
                //     </div>
                // </div>
                <AddContacts 
                openAddContacts={openAddContacts}
                setOpenAddContacts={setOpenAddContacts}
                />
                )}
            </div>
        </div>
    )
}

export default LiveChat