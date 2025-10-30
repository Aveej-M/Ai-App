"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ConversationView from "../compenents/Chat/ConversationView";
import MediaLibrary from "../compenents/Chat/MediaLibrary";
import CannedResponse from "../compenents/Chat/CannedResponse";
import FilterTab from "../compenents/Chat/FilterTab";
import AddContacts from "../compenents/Chat/AddContacts";
import ChatReplyBox from "../compenents/Chat/ChatReplyBox";
import { assignOptions, chatMessages } from "../data/chat";

const LiveChat = () => {
    const [bookMark, setBookMark] = useState(true);
    const [openConversationTab, setOpenConversationTab] = useState(false); 
    const [openSearchTab, setOpenSearchTab] = useState(false);
    const [openFilterTab, setOpenFilterTab] = useState(false);
    const [openAddContacts, setOpenAddContacts] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [conversationMessages, setConversationMessages] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [openAssignUser, setOpenAssignUser] = useState(false);
    const [assignedName, setAssignedName] = useState("Agent Spark");
    const [prevAssignedName, setPrevAssignedName] = useState("");
    // const [openAddFile, setOpenAddFile] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(files.length - 1);
    const selectedFile = files[selectedIndex];
    const searchRef = useRef();
    const assignRef = useRef();
    const cannedRef = useRef();
    const audioRefs = useRef([]);

    const [openMediaLibrary, setOpenMediaLibrary] = useState(false);
    const [openCannedRes, setOpenCannedRes] = useState(false);

    useEffect(() => {
        const bookmarked = chatMessages.find((chat) => chat.bookMark === true);
        if (bookmarked) {
        setSelectedConversation(bookmarked.name);
        }
    }, []);
    
    const handleAudioPlay = (playingRef) => {
        // Play all audio elements when one starts playing
        audioRefs.current.forEach(ref => {
            if (ref && ref !== playingRef) {
                ref.currentTime = playingRef.currentTime;
                ref.playbackRate = playingRef.playbackRate;
                ref.muted = playingRef.muted;
                ref.play();
            }
        });
    };

    const handleAudioPause = (pausingRef) => {
        // Pause all audio elements when one is paused
        audioRefs.current.forEach(ref => {
            if (ref && ref !== pausingRef) {
                ref.pause();
            }
        });
    };

    const handleAudioTimeUpdate = (updatingRef) => {
        // Sync time for all audio elements
        audioRefs.current.forEach(ref => {
            if (ref && ref !== updatingRef && Math.abs(ref.currentTime - updatingRef.currentTime) > 0.1) {
                ref.currentTime = updatingRef.currentTime;
            }
        });
    };

    const handleRateChange = (changingRef) => {
        // Sync playback rate for all audio elements
        audioRefs.current.forEach(ref => {
            if (ref && ref !== changingRef) {
                ref.playbackRate = changingRef.playbackRate;
            }
        });
    };

    const handleMuteChange = (changingRef) => {
        // Sync mute state for all audio elements
        audioRefs.current.forEach(ref => {
            if (ref && ref !== changingRef) {
                ref.muted = changingRef.muted;
            }
        });
    };

    // Handler for selecting a conversation from ConversationView
    const handleSelectConversation = (conversationName) => {
        setSelectedConversation(conversationName);
        setConversationMessages([]);
    };

    const handelSelectCommversationMsg = (conversationId, idx) => {
        setFiles([]);
        const found = chatMessages.find((c) => c.name === selectedConversation);
        const foundChat = found?.chats.find((chat) => chat.conversationId === conversationId);
        console.log(foundChat, "found")
        if (found && found.chats && found.chats.length > 0 && found.chats[idx].conversationId === conversationId) {
            setSelectedChat(foundChat)
            setConversationMessages(found.chats[idx].messages || []);
        } else {
            setConversationMessages([]);
        }

    }
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setOpenSearchTab(false);
            }

            if (assignRef.current && !assignRef.current.contains(event.target)) {
                // Close assign dropdown
                setOpenAssignUser(false);

                // If the user left the input empty, restore the previous assigned name
                // Use trimmed check to handle whitespace-only values
                if ((!assignedName || assignedName.trim() === "") && prevAssignedName) {
                    setAssignedName(prevAssignedName);
                }
            }

            if (cannedRef.current && !cannedRef.current.contains(event.target)) {
                setOpenCannedRes(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    // We include assignedName and prevAssignedName so the handler has up-to-date values
    }, [assignedName, prevAssignedName]);
    useEffect(() => {
        if (files.length > 0) {
        setSelectedIndex(files.length - 1);
        }
    }, [files]);

    const filterAssigndata = assignOptions.filter((opt) => 
        opt.value.toLowerCase().includes(assignedName.toLowerCase())
    );

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const handleRemoveFile = (index) => {
        setFiles((prev) => {
        URL.revokeObjectURL(prev[index].preview);
        return prev.filter((_, i) => i !== index);
        });
    };

    const handleUpdateStatus = () => {
        setSelectedChat((prev) => ({
            ...prev, status: false
        }));
    }

    return (
        <div className='pt-16.5 text-black h-screen w-full flex'>
            {openMediaLibrary && (
                <MediaLibrary 
                    setOpenMediaLibrary={setOpenMediaLibrary}
                />
            )}
            {openCannedRes && (
                <div ref={cannedRef}>
                    <CannedResponse setOpenCannedRes={setOpenCannedRes} />
                </div>
            )}
            {openConversationTab && (
                <div className="">
                    <ConversationView 
                        setOpenConversationTab={setOpenConversationTab}
                        onSelectConversation={handleSelectConversation}
                        selectedConversation={selectedConversation}
                    />
                </div>
            )}

            {openFilterTab && (
                <FilterTab 
                setOpenFilterTab={setOpenFilterTab}
                />
            )}
            {/* Left Area */}
            <div className='w-[30%] h-full bg-gray-50 relative'>
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
                            <h2 className="text-sm">{selectedConversation}</h2>
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

                <div className="flex-1 overflow-y-auto flex-col justify-between">
                    <div>
                        {chatMessages.map((conversationGroup, idx) => {
                        if (conversationGroup.name === selectedConversation) {
                            if (conversationGroup.chats.length > 0) {
                            return (
                                <div key={idx}>
                                {conversationGroup.chats.map((chat, msgIdx) => (
                                    <div
                                    key={chat.conversationId}
                                    className={`border-b border-b-gray-400 hover:bg-gray-100 justify-items py-3 px-6 cursor-pointer`}
                                    onClick={()=> handelSelectCommversationMsg(chat.conversationId, msgIdx)}
                                    >
                                        <div className="flex-items">
                                            <div className="flex-items text-white font-bold h-8 w-8 bg-green-600 rounded-full">
                                                {chat.user[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{chat.user}</h3>
                                                <p className="text-xs text-gray-400">
                                                    {(() => {
                                                    const agentMessages = chat.messages.filter(
                                                        (msg) => msg.role === "agent"
                                                    );
                                                    const lastAgentMessage =
                                                        agentMessages[agentMessages.length - 1]?.message || "No message";
                                                    return truncateText(lastAgentMessage, 25);
                                                    })()}
                                                </p>
                                            </div>
                                        </div>

                                    <div className="flex-items-2 gap-1">
                                        <i className="fa-solid fa-globe text-green-500"></i>
                                        <p className="text-xs text-gray-400">{chat.endDate}</p>
                                    </div>
                                    {/* <p className="text-gray-500 text-sm">{chat.status}</p> */}
                                    </div>
                                ))}
                                </div>
                            );
                            } else {
                            return (
                                <div
                                key={idx}
                                className="h-full flex items-center justify-center mt-8 text-sm text-gray-400"
                                >
                                No Conversations Found
                                </div>
                            );
                            }
                        }
                        return null;
                        })}
                    </div>

                   {(() => {
                        const selectedGroup = chatMessages.find(
                            (g) => g.name === selectedConversation
                        );

                        if (selectedGroup && selectedGroup.chats.length > 0) {
                            return (
                            <div className="absolute bottom-0 w-full flex-items py-2 bg-gray-200">
                                <p className="text-gray-500">Total Count: <span className="text-green-500 font-[600]">{selectedGroup.chats.length}</span></p>
                                <div className="flex items-center gap-2">
                                <i className="fa-solid fa-angles-left cursor-pointer text-xs text-gray-500 hover:text-gray-400 transition-all duration-200"></i>
                                <i className="fa-solid fa-chevron-left cursor-pointer text-gray-600 hover:text-gray-500"></i>
                                <p className="border-2 border-green-500 bg-green-200 px-2 py-0.5 text-green-600 rounded ">1</p>
                                <i className="fa-solid fa-chevron-right cursor-pointer text-gray-600 hover:text-gray-500"></i>
                                <i className="fa-solid fa-angles-right cursor-pointer text-xs text-gray-500 hover:text-gray-400 transition-all duration-200"></i>
                                </div>
                            </div>
                            );
                        }

                        return null;
                    })()}

                </div>

            </div>

            {/* Right Area */}
            <div className='w-[70%] flex h-full bg-gray-100'>
                
                <div className="h-full w-full">

                    {/* RIGHT HEADER */}
                    {conversationMessages.length > 0 && (
                        <div className="justify-items py-3 px-5 border-l border-l-gray-100 bg-white z-10 w-full h-16">
                            {selectedChat && (
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOpenAddContacts(!openAddContacts)}>
                                <Image 
                                src="/Header/Profile.png"
                                alt="profile image"
                                height={50}
                                width={50}
                                className="w-8"
                                />
                                <div>
                                    <h2 className="font-bold text-sm">{selectedChat.user}</h2>
                                    <div className="flex items-center gap-2">
                                        <i className="fa-solid fa-globe text-green-500 text-sm"></i>
                                        <p className="text-xs text-gray-500">Click here for more web chat info</p>
                                    </div>
                                </div>
                            </div>
                            )}

                            <div className="flex gap-3">
                                <div className="flex gap-2 items-center relative">
                                    <input 
                                    type="text" 
                                    value={assignedName}
                                    placeholder={prevAssignedName}
                                    onChange={(e) => {
                                        setAssignedName(e.target.value);
                                        setOpenAssignUser(true);
                                    }}
                                    className={`outline-0 text-sm font-bold placeholder-gray-500 transition-colors duration-200 ${openAddContacts && "max-xl:hidden"} ${openAssignUser ? "text-gray-400" : "text-black"}`}
                                    onClick={() => {
                                        setPrevAssignedName(assignedName)
                                        setAssignedName("");
                                        setOpenAssignUser(true);
                                    }}
                                    style={{ width: `${(assignedName.replaceAll(" ", "") || prevAssignedName.replaceAll(" ", "")).length + 1}ch` }}
                                    />
                                    
                                    <div className="flex flex-col text-xs text-gray-400">
                                        <i className="fa-solid fa-angle-up h-2"></i>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>
                                </div>
                                {openAssignUser && (
                                    <div ref={assignRef} className="absolute right-10 w-60 bg-white top-30 shadow-11 rounded overflow-y-auto pb-3">
                                        {filterAssigndata.length > 0 ? (
                                        filterAssigndata.map((opt, i) => (
                                        <div key={i} className="px-1">
                                            <p className="text-xs text-gray-400 px-5 py-2">{opt.category}</p>
                                            <h2 
                                            className="text-gray-600 h-8 flex items-center px-3 text-sm hover:bg-green-200 rounded cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setAssignedName(opt.value);
                                                setPrevAssignedName(opt.value);
                                                setOpenAssignUser(false);
                                            }}
                                            >{opt.value}</h2>
                                        </div>
                                        ))
                                        ) : (
                                            <div className="text-center text-gray-400 text-sm py-4">
                                            No matches found
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedChat && selectedChat.status ? (
                                    <div className="flex-items-2">
                                        <div className="border border-gray-300 hover:border-green-500 hover:shadow hover:shadow-green-200 hover:text-green-500 rounded-l p-[7px] px-2 text-gray-700 text-sm font-bold transition-all duration-300 cursor-pointer"
                                        onClick={handleUpdateStatus}
                                        >
                                            Make as Resolved
                                        </div>
                                        <div className="relative group border border-l-0 border-gray-300 rounded-r p-[9px] px-3 text-xs text-gray-500 hover:border-green-500 hover:shadow hover:shadow-green-200 hover:text-green-500 hover:border-l transition-all duration-300 cursor-pointer">
                                            <i className="fa-solid fa-ellipsis"></i>

                                            <div className="absolute group-hover:block hidden right-0 top-6 pt-4">
                                                <div className="text-[14px] transition-all duration-300  bg-white w-max px-1 py-2 rounded shadow">
                                                    <p className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Move to Waiting on Us</p>
                                                    <p className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Move to Waiting on Customer</p>
                                                    <p className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Move to On Hold</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button className="border px-3 py-1 border-gray-400 bg-gray-200 rounded-2xl text-gray-500 text-xs">Reopen</button>
                                )}
                                
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between flex-col h-[90%]">
                        <div className="bg-[url(/whats-bg.png)] bg-cover h-full overflow-y-auto pt-3">
                            <div className=" flex flex-col w-full h-full">
                                {selectedConversation && conversationMessages.length > 0 && (
                                <div className="w-full flex-items mb-3">
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
                                )}

                                <div className=" px-3 h-full">
                                    
                                    {(selectedConversation && conversationMessages.length > 0) ? (conversationMessages).map((msg, index) => {
                                        if (msg.sender === "System") {
                                            return (
                                                <div key={index} className="flex justify-center my-3">
                                                    <span className="bg-white text-gray-500 text-xs px-4 py-2 rounded shadow">
                                                        {msg.message}
                                                    </span>
                                                </div>
                                            );
                                        } else if ((msg.sender === "agent") || (msg.role === "agent")) {
                                            return (
                                                <div key={index} className="flex justify-end mb-3 group">
                                                    <div className="relative group/arrow w-fit cursor-pointer h-8">
                                                        {/* Dropdown arrow (visible on hover of message group) */}
                                                        <i className="fa-solid fa-sort-down text-gray-400 opacity-0 group-hover:opacity-100"></i>

                                                        {/* Reply box (visible when hovering the arrow itself) */}
                                                        <div className={`absolute z-20 right-0 mt-1 text-xs p-0.5 bg-white rounded hidden transition-all duration-200  ${replyTo === null ? "group-hover/arrow:block" : ""}`}>
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
                                                        <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time || msg.timestamp}</div>
                                                        <i className="fa-solid fa-check-double text-green-600 text-[10px] mt-auto relative z-10"></i>
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
                                                        <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time || msg.timestamp}</div>
                                                    </div>
                                                    <div className="relative flex group/arrow cursor-pointer h-8">
                                                        <i className="fa-solid fa-sort-down text-gray-400 ml-5 opacity-0 group-hover:opacity-100"></i>

                                                        {/* Reply box (visible when hovering the arrow itself) */}
                                                        <div className={`absolute z-20 top-5 left-5 mt-1 text-xs p-0.5 bg-white rounded transition-all hidden duration-200 ${replyTo === null ? "group-hover/arrow:block" : ""}`}>
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
                                    }) : (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <Image 
                                                src="/messages.svg"
                                                alt="Empty message"
                                                height={500}
                                                width={500}
                                                className="w-50"
                                            />
                                            No Messages found
                                        </div>
                                    )}
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

                        {(selectedConversation && conversationMessages.length > 0 && !selectedChat.status) &&
                        <div className="bg-gray-50 gap-1 w-full text-xs flex-items-2 flex-col p-3 text-center">
                            <p>This chat has been resolved, so you can only send a message if the customer initiates a new chat</p>
                            <button className="border px-3 py-1 border-gray-400 rounded-2xl text-black gap-1 text-sm font-bold">Send Template</button>
                        </div> }

                        <div>
                            {selectedFile && (
                                <div className="absolute top-17 w-[-webkit-fill-available] h-[-webkit-fill-available] mb-35 shadow-sm overflow-hidden bg-white">
                                    <div className="px-2 py-4 bg-gray-300 text-center text-gray-700 text-sm font-medium">
                                        {/* <span className="">X</span> */}
                                        <i onClick={() => setFiles([])}
                                        className="fa-solid fa-xmark text-2xl px-1.5 py-0.5 rounded-2xl absolute left-3 top-3 cursor-pointer hover:bg-red-300 hover:text-red-500 transition-all duration-200"></i>
                                        <span className="font-bold">{selectedFile.file.name}</span>
                                    </div>

                                {/* Image or File preview */}
                                {selectedFile.file.type.startsWith("image/") ? (
                                    <div className="flex flex-col items-center justify-center h-full bg-white text-gray-600 text-sm">
                                    <Image
                                        src={selectedFile.preview}
                                        alt={selectedFile.file.name}
                                        width={600}
                                        height={400}
                                        className="w-fit object-contain h-[80%]"
                                    />
                                    </div>
                                ) : selectedFile.file.type === "application/pdf" ? (
                                // 📘 PDF Preview (show pdf icon or embed)
                                <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-600 text-sm p-4">
                                    <Image
                                    src="/Chat/pdf_file.png"
                                    alt="PDF file"
                                    width={100}
                                    height={100}
                                    className="object-contain mb-2"
                                    />
                                   
                                </div>
                                ) : selectedFile.file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                                selectedFile.file.type === "application/msword" ? (
                                // 📄 Word File
                                <div className="flex flex-col items-center justify-center h-full bg-white text-gray-600 text-sm p-4">
                                    <Image
                                    src="/Chat/file.png"
                                    alt="Word file"
                                    width={100}
                                    height={100}
                                    className="object-contain mb-2"
                                    />
                                  
                                </div>
                                ) : selectedFile.file.type.startsWith("video/") ? (
                                // 🎥 Video Preview
                                <div className="h-full flex items-center">
                                    <video
                                        controls
                                        className="w-full max-h-[400px] bg-black"
                                    >
                                        <source src={selectedFile.preview} type={selectedFile.file.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                ) : selectedFile.file.type.startsWith("audio/") ? (
                                // 🔊 Audio Preview
                                <div className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-md">
                                    <audio
                                        controls
                                        className="w-[300px] max-w-md"
                                        ref={el => {
                                            if (el) audioRefs.current[0] = el;
                                        }}
                                        onPlay={e => handleAudioPlay(e.target)}
                                        onPause={e => handleAudioPause(e.target)}
                                        onTimeUpdate={e => handleAudioTimeUpdate(e.target)}
                                        onRateChange={e => handleRateChange(e.target)}
                                        onVolumeChange={e => handleMuteChange(e.target)}
                                    >
                                        <source src={selectedFile.preview} type={selectedFile.file.type || "audio/mpeg"} />
                                        Your browser does not support the audio element.
                                    </audio>
                                    
                                </div>
                                ) : selectedFile.file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                selectedFile.file.type === "application/vnd.ms-excel" ? (
                                // 📄 Word File
                                <div className="flex flex-col items-center justify-center h-full bg-white text-gray-600 text-sm p-4">
                                    <Image
                                    src="/Chat/excel.svg"
                                    alt="Word file"
                                    width={100}
                                    height={100}
                                    className="object-contain mb-2"
                                    />
                                   
                                </div>
                                ) : selectedFile.file.type === "text/csv" ? (
                                        <div className="flex flex-col items-center justify-center h-full bg-white text-gray-600 text-sm p-4">
                                        <Image
                                        src="/Chat/CSV.png"
                                        alt="Word file"
                                        width={100}
                                        height={100}
                                        className="object-contain mb-2"
                                        />
                                    </div>
                                ) : (<div></div>)}

                                {/* Delete button */}
                                    <button
                                        onClick={() => handleRemoveFile(selectedIndex)}
                                        className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 px-2"
                                    >
                                        <i className="fa-regular fa-trash-can text-red-500 text-lg mt-1"></i>
                                    </button>
                                </div>
                            )}

                            {(selectedChat && selectedChat.status) && (
                                <ChatReplyBox 
                                files={files} 
                                setFiles={setFiles} 
                                setOpenCannedRes={setOpenCannedRes}
                                setOpenMediaLibrary={setOpenMediaLibrary}
                                setConversationMessages={setConversationMessages}
                                />
                            )}

                            {/* Thumbnail list */}
                            {selectedFile && (
                            <div className="flex flex-wrap gap-2 mt-2">
                            {files.map((item, index) => {
                                const type = item.file.type;

                                // Determine preview icon by file type
                                let iconSrc = "/Chat/file.png"; // default generic icon

                                if (type.startsWith("image/")) {
                                iconSrc = null; // we’ll show actual image
                                } else if (type === "application/pdf") {
                                iconSrc = "/Chat/pdf_file.png";
                                } else if (
                                type === "application/msword" || // .doc
                                type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
                                ) {
                                iconSrc = "/Chat/file.png";
                                } else if (
                                type === "text/plain" || // .txt
                                type === "text/rtf" || // .rtf
                                // type === "text/csv" || // .csv
                                type === "application/vnd.ms-excel" || // .xls
                                type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
                                ) {
                                iconSrc = "/Chat/excel.svg";
                                } else if (
                                type.startsWith("video/") || // .mp4, .avi, .mkv (most browsers mark them as video/*)
                                [".mp4", ".avi", ".mkv"].some(ext => item.file.name.endsWith(ext))
                                ) {
                                iconSrc = "VIDEO";
                                } else if (
                                type.startsWith("audio/") ||
                                name.endsWith(".mp3")
                                ) {
                                iconSrc = "AUDIO";
                                } else if (
                                // type.startsWith("audio/") ||
                                type === "text/csv"
                                ) {
                                    iconSrc = "/Chat/CSV.png";
                                }

                                return (
                                <div
                                    key={index}
                                    onClick={() => setSelectedIndex(index)}
                                    className={`relative cursor-pointer border-2 rounded-md overflow-hidden ${
                                    selectedIndex === index ? "border-green-500" : "border-transparent"
                                    }`}
                                >
                                    {type.startsWith("image/") ? (
                                    // 🖼 Image preview
                                    <Image
                                        src={item.preview}
                                        alt={name}
                                        width={70}
                                        height={70}
                                        className="object-cover w-14 h-14"
                                    />
                                    ) : iconSrc === "AUDIO" ? (
                                    // 🔊 Audio preview
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gray-400 overflow-hidden">
                                        <audio
                                            controls
                                            className="opacity-100 rounded-2x4 h-14"
                                            ref={el => {
                                                if (el) audioRefs.current[1] = el;
                                            }}
                                            onPlay={e => handleAudioPlay(e.target)}
                                            onPause={e => handleAudioPause(e.target)}
                                            onTimeUpdate={e => handleAudioTimeUpdate(e.target)}
                                            onRateChange={e => handleRateChange(e.target)}
                                            onVolumeChange={e => handleMuteChange(e.target)}
                                            // style={{
                                            //     filter: "invert(0%) grayscale(100%) brightness(80%)",
                                            // }}
                                        >
                                            <source src={item.preview} type={type || "audio/mpeg"} />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                    ) : iconSrc === "VIDEO" ? (
                                    // 🔊 Audio preview
                                    <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded">
                                        <video
                                        className="w-full h-fit bg-black"
                                    >
                                        <source src={selectedFile.preview} type={selectedFile.file.type} />
                                        Your browser does not support the video tag.
                                    </video>
                                    </div>
                                    ) : (
                                    // 📄 Other file types (PDF, DOCX, etc.)
                                    <div className="flex items-center justify-center w-14 h-14 bg-gray-100 text-gray-500 text-xs p-1 text-center">
                                        <Image
                                        src={iconSrc}
                                        alt="file icon"
                                        height={45}
                                        width={45}
                                        className="object-contain"
                                        />
                                    </div>
                                    )}
                                </div>
                                );
                            })}
                            </div>
                            )}
                        </div>
                    </div> 
                </div>

                {openAddContacts && (
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