"use client"
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import FilterTab from "../compenents/Chat/FilterTab";
import AddContacts from "../compenents/Chat/AddContacts";
import MediaLibrary from "../compenents/Chat/MediaLibrary";
import ChatReplyBox from "../compenents/Chat/ChatReplyBox";
import BulkUpdate from "../compenents/Chat/BulkUpdate";
import LeftArea from "../compenents/Chat/LeftArea";
import { assignOptions, chatMessages as initialChatData  } from "../data/chat";
import SendTemplates from "../compenents/Chat/SendTemplates";
import CannedResponse from "../compenents/Chat/CannedResponse";
import ConversationView from "../compenents/Chat/ConversationView";

const LiveChat = () => {
    const [chatMessages, setChatMessages] = useState(initialChatData);
    const [bookMark, setBookMark] = useState(true);
    const [openConversationTab, setOpenConversationTab] = useState(false); 
    const [openSearchTab, setOpenSearchTab] = useState(false);
    const [openFilterTab, setOpenFilterTab] = useState(false);
    const [openAddContacts, setOpenAddContacts] = useState(false);

    const [selectedConversation, setSelectedConversation] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [currentChatIndex, setCurrentChatIndex] = useState(0);
    const [conversationMessages, setConversationMessages] = useState([]);
    const [selectedChats, setSelectedChats] = useState([]);

    const [isSelectAll, setIsSelectAll] = useState(false);
    const selectedGroup = chatMessages.find(
        (g) => g.name === selectedConversation
    );
    const [openBulkUpdate, setOpenBulkUpdate] = useState(false);
    const [selectedConversations, setSelectedConversations] = useState([]);
    const [forceVisibleChatId, setForceVisibleChatId] = useState(null);

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
    const [openTemplates, setOpenTemplates] = useState(false);
    const [openMerge, setOpenMerge] = useState(false);

    useEffect(() => {
        const bookmarked = chatMessages.find((chat) => chat.bookMark === true);
        if (bookmarked) {
        setSelectedConversation(bookmarked.name);
        }
    }, []);

    useEffect(() => {
        const allChatIds = selectedGroup?.chats.map((chat) => chat.conversationId) || [];
        setIsSelectAll(
            allChatIds.length > 0 && allChatIds.every((id) => selectedChats.includes(id))
        );
    }, [selectedChats, selectedGroup]);

    // Keep selectedChat and conversationMessages in sync when index/group/data change
    useEffect(() => {
        const selectedGroup = chatMessages.find(
            (g) => g.name === selectedConversation
        );
        if (!selectedGroup) return;

        const chat = selectedGroup.chats[currentChatIndex];
        if (chat) {
            setSelectedChat(chat);
            setConversationMessages(chat.messages || []);
        } else {
            setSelectedChat(null);
            setConversationMessages([]);
        }
    }, [currentChatIndex, selectedConversation, chatMessages]);
    
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

    const handleCheckboxToggle = (conversationId) => {
        setSelectedChats((prevSelected) => 
            prevSelected.includes(conversationId)
            ? prevSelected.filter((id) => id !== conversationId)
            : [...prevSelected, conversationId]
        );
    };

    const handleNavigateChat = (direction) => {
        const selectedGroup = chatMessages.find(
            (g) => g.name === selectedConversation
        );

        if (!selectedGroup) return;

        const maxIndex = Math.max(selectedGroup.chats.length - 1, 0);

        // compute new index synchronously so we can update selectedChat immediately
        let newIndex = currentChatIndex || 0;
        if (direction === "first") newIndex = 0;
        else if (direction === "last") newIndex = maxIndex;
        else if (direction === "prev") newIndex = Math.max(newIndex - 1, 0);
        else if (direction === "next") newIndex = Math.min(newIndex + 1, maxIndex);

        setCurrentChatIndex(newIndex);

        const newChat = selectedGroup.chats[newIndex];
        if (newChat) {
            setSelectedChat(newChat);
            setConversationMessages(newChat.messages || []);
        } else {
            setSelectedChat(null);
            setConversationMessages([]);
        }
    };


    const handleSelectAllToggle = () => {
        if (isSelectAll) {
            setSelectedChats([]); // Unselect all
        } else {
            const allChatIds = selectedGroup.chats.map((chat) => chat.conversationId);
            setSelectedChats(allChatIds); // Select all
        }
        setIsSelectAll((prev) => !prev);
    };

    // Handler for selecting a conversation from ConversationView
    const handleSelectConversation = (conversationName) => {
        setSelectedConversation(conversationName);
        setConversationMessages([]);
    };

    const handelSelectConversationMsg = (conversationId, idx) => {
        setFiles([]);
        setForceVisibleChatId(conversationId)
        setChatMessages((readMsg)=> 
            readMsg.map((group) => {
                if (group.name === selectedConversation) {
                    const updateChats = group.chats.map((chat) => 
                        chat.conversationId === conversationId
                        ? { ...chat, isRead: true}
                        : chat
                    );
                    return { ...group, chats: updateChats};
                }
                return group;
            })
        )
        const found = chatMessages.find((c) => c.name === selectedConversation);
        const foundChat = found?.chats.find((chat) => chat.conversationId === conversationId);
        console.log(foundChat, "found")
        if (found && found.chats && found.chats.length > 0 && found.chats[idx].conversationId === conversationId) {
            setSelectedChat(foundChat)
            setConversationMessages(found.chats[idx].messages || []);
            setCurrentChatIndex(idx);
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

    // Return a suitable reply string for a message.
    // If the message has attachments, prefer their filenames (comma separated).
    // Otherwise fall back to the message text (stripped of HTML tags if present).
    const getReplyText = (msg) => {
        if (!msg) return "";

        try {
            if (msg.attachments && Array.isArray(msg.attachments) && msg.attachments.length > 0) {
                const names = msg.attachments.map((f) => {
                    // try multiple common filename properties
                    return (
                        f.name || f.fileName || f.filename || f.originalname ||
                        (f.file && (f.file.name || f.file.fileName)) ||
                        // fallback to url if no name
                        f.url || f.src || 'attachment'
                    );
                });
                return names.join(', ');
            }

            // If msg.message contains HTML, strip simple tags for display
            if (typeof msg.message === 'string') {
                // remove basic HTML tags
                const stripped = msg.message.replace(/<[^>]*>/g, '').trim();
                return stripped || msg.message;
            }

            // final fallback
            return String(msg.message || 'attachment');
        } catch (e) {
            return msg.message || '';
        }
    };

    const handleRemoveFile = (index) => {
        setFiles((prev) => {
        URL.revokeObjectURL(prev[index].preview);
        return prev.filter((_, i) => i !== index);
        });
    };

    // const handleUpdateStatus = () => {
    //     const now = new Date();
    //     const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    //     const date = now.toLocaleDateString('en-GB', { hour: "2-digit", minute: "2-digit", hour12: true })
    //     const resolvedMsg = `Conversation status changed from On hold to Closed by ${assignedName} at ${time}`

    //     if (!resolvedMsg) return;
    //     const newMessage = {
    //         sender : "System",
    //         role: "system",
    //         message: resolvedMsg,
    //         timestamp: new Date().toISOString(),
    //     };

    //     setConversationMessages((prev) => [...prev, newMessage])
    //     setSelectedChat((prev) => ({
    //         ...prev,
    //         endDate: date, 
    //         status: "closed"
    //     }));
    // }

    const handleUpdateStatus = (status) => {
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        const date = now.toLocaleDateString('en-GB', { hour: "2-digit", minute: "2-digit", hour12: true });
        const nowISO = now.toISOString();
        const today = now.toLocaleDateString("en-GB");
        setChatMessages((prev) =>
            prev.map((group) => {
                if (group.name !== selectedConversation) return group;

                // Update chats
                const updatedChats = group.chats.map((chat) => {
                    if (selectedChat && chat.conversationId === selectedChat.conversationId) {
                            const statusLabel = status === "waiting_customer" ? "Waiting on customer" : status === "new" ? "New" : status === "waiting_us" ? "Waiting on us" : "Closed";
                            const prevStatus = chat.status === "waiting_customer" ? "Waiting on customer" : chat.status === "new" ? "New" : chat.status === "waiting_us" ? "Waiting on us" : "Closed";
                            const resolvedMsg = `Conversation status updated from ${prevStatus} to ${statusLabel} by ${assignedName} at ${time}`;

                        // prepare messages: ensure there's a date system message when day changes
                        const lastMsg = chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
                        const lastDate = lastMsg ? new Date(lastMsg.timestamp).toLocaleDateString("en-GB") : null;

                        const newMessages = chat.messages ? [...chat.messages] : [];
                        if (lastDate !== today) {
                            newMessages.push({ sender: "System", role: "date", message: today, timestamp: nowISO });
                        }
                        newMessages.push({ sender: "System", role: "system", message: resolvedMsg, timestamp: nowISO });

                        const updatedEndDate = now.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        });

                        return {
                            ...chat,
                            endDate: updatedEndDate,
                            status: status,
                            messages: newMessages,
                        };
                    }

                    return chat;
                });

                const reordered = [
                    ...updatedChats.filter((c) => selectedChat && c.conversationId === selectedChat.conversationId),
                    ...updatedChats.filter((c) => !(selectedChat && c.conversationId === selectedChat.conversationId)),
                ];

                return { ...group, chats: reordered };
            })
        );

        setSelectedChat((prev) => prev ? { ...prev, endDate: now.toLocaleDateString("en-GB"), status: status } : prev);

        setSelectedChat(null);
        setConversationMessages([]);
        setCurrentChatIndex(0);
    }
    
    const updateSelectedChats = (updateField, newValue) => {
        const now = new Date();
        const today = now.toLocaleDateString("en-GB");
        const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
        const systemMsg = `Conversation updated to ${newValue} by Agent at ${time}`;

        setChatMessages((prev) =>
            prev.map((group) => {
             
            // First update the chats
            let updatedChats = group.chats.map((chat) => {
                if (selectedChats.includes(chat.conversationId)) {
                const d = new Date();
                const updatedEndDate = d.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

                const lastMsg = chat.messages[chat.messages.length - 1];
                const lastDate =  lastMsg ? new Date(lastMsg.timestamp).toLocaleDateString("en-GB") : null;

                const newMessages = [...chat.messages];

                if (lastDate !== today) {
                    newMessages.push({
                        sender : "System",
                        role: "date",
                        message: today,
                        timestamp: new Date().toISOString(),
                    })
                }

                newMessages.push({
                    sender: "System",
                    role: "system",
                    message: systemMsg,
                    timestamp: now.toISOString(),
                });

                const updatedMessages = chat.messages
                    ? [
                        ...chat.messages,
                        {
                        sender: "System",
                        role: "system",
                        message: systemMsg,
                        timestamp: new Date().toISOString(),
                        },
                    ]
                    : chat.messages;

                return {
                    ...chat,
                    [updateField]: newValue,
                    endDate: updatedEndDate,
                    messages: newMessages,
                };
                }
                return chat;
            });

            // Now reorder updated chats to bring updated ones to the front
            const reorderedChats = [
                ...updatedChats.filter((chat) => selectedChats.includes(chat.conversationId)),
                ...updatedChats.filter((chat) => !selectedChats.includes(chat.conversationId)),
            ];

            return { ...group, chats: reorderedChats };
            })
            
        );

        setSelectedChat(null);
        setConversationMessages([]);
        setCurrentChatIndex(0);

        setSelectedChats([]);
        setOpenBulkUpdate(false);
        setOpenMerge(false);
    };
        


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
            {openTemplates && (
                <SendTemplates setOpenTemplates={setOpenTemplates} />
            )}
            {openBulkUpdate && (
                <BulkUpdate 
                    setOpneBulkUpdate={setOpenBulkUpdate}
                    selectedIds={selectedChats}
                    onUpdate={updateSelectedChats}
                />
            )}
            

            {/* Left Area */}
            <LeftArea 
                bookMark={bookMark}
                selectedConversation={selectedConversation}
                searchRef={searchRef}
                openSearchTab={openSearchTab}
                openMerge={openMerge}
                chatMessages={chatMessages}
                selectedChat={selectedChat}
                truncateText={truncateText}
                currentChatIndex={currentChatIndex}
                handelSelectConversationMsg={handelSelectConversationMsg}
                setBookMark={setBookMark}
                setOpenMerge={setOpenMerge}
                selectedChats={selectedChats}
                setOpenSearchTab={setOpenSearchTab}
                handleNavigateChat={handleNavigateChat}
                isSelectAll={isSelectAll}
                handleSelectAllToggle={handleSelectAllToggle}
                handleCheckboxToggle={handleCheckboxToggle}
                setOpenBulkUpdate={setOpenBulkUpdate}
                setOpenConversationTab={setOpenConversationTab}
                setOpenFilterTab={setOpenFilterTab}
                forceVisibleChatId={forceVisibleChatId}
            />

            {/* Right Area */}
            <div className='w-[70%] flex h-full bg-gray-100'>
                
                <div className="h-full w-full">

                    {/* RIGHT HEADER */}
                    {conversationMessages.length > 0 && (
                        <div className="relative justify-items py-3 px-5 border-l border-l-gray-100 bg-white z-10 w-full h-16 shadow-59">
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
                                    <div ref={assignRef} className="absolute z-10 right-20 w-60 bg-white top-15 shadow-5 rounded overflow-y-auto pb-3">
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

                                {selectedChat && selectedChat.status === "new" ? (
                                    <div className="flex-items-2">
                                        <div className="border border-gray-300 hover:border-green-500 hover:shadow hover:shadow-green-200 hover:text-green-500 rounded-l p-[7px] px-2 text-gray-700 text-sm font-bold transition-all duration-300 cursor-pointer"
                                        onClick={()=> handleUpdateStatus('closed')}
                                        >
                                            Make as Resolved
                                        </div>
                                        <div className="relative group border border-l-0 border-gray-300 rounded-r p-[9px] px-3 text-xs text-gray-500 hover:border-green-500 hover:shadow hover:shadow-green-200 hover:text-green-500 hover:border-l transition-all duration-300 cursor-pointer">
                                            <i className="fa-solid fa-ellipsis"></i>

                                            <div className="absolute group-hover:block hidden right-0 top-6 pt-4">
                                                <div className="text-[14px] transition-all duration-300  bg-white w-max px-1 py-2 rounded shadow">
                                                    <p onClick={()=> handleUpdateStatus('waiting_us')} 
                                                    className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Move to Waiting on Us</p>
                                                    <p onClick={()=> handleUpdateStatus('waiting_customer')} 
                                                    className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Move to Waiting on Customer</p>
                                                    <p onClick={()=> handleUpdateStatus('on_hold')} 
                                                    className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Move to On Hold</p>
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
                        <div className={`${selectedConversation && conversationMessages.length > 0 ? "bg-[url(/whats-bg.png)] bg-cover" : "bg-gray-100"} h-full overflow-y-auto pt-3`}>
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
                                        if (msg.sender === "System" && msg.role === "date") {
                                            return (
                                                <div key={index} className="flex justify-center my-3 sticky top-0 z-[1  ]">
                                                    <span className="bg-white text-gray-500 text-xs px-4 py-2 rounded shadow-5">
                                                        {msg.message}
                                                    </span>
                                                </div>
                                            );
                                        } else if ((msg.sender === "System") || (msg.role === "system")) {
                                            return (
                                                <div key={index} className="flex justify-center pb-3">
                                                    <span className="bg-white text-gray-500 text-xs px-4 py-2 rounded shadow">
                                                        {msg.message}
                                                    </span>
                                                </div>
                                            );
                                        } else if ((msg.sender === "agent") || (msg.role === "agent")) {
                                            return (
                                                <div key={index} className="flex justify-end mb-3 group">
                                                    <div className="flex items-center group/arrow w-fit cursor-pointer">
                                                        {/* Dropdown arrow (visible on hover of message group) */}
                                                        <div className="relative mb-1.5">
                                                            <i className="fa-solid fa-sort-down text-gray-400 opacity-0 group-hover:opacity-100"></i>

                                                            {/* Reply box (visible when hovering the arrow itself) */}
                                                            <div className="absolute z-20 right-0 top-3 pt-3">
                                                                <div className={`mt-1 text-xs p-0.5 bg-white rounded hidden transition-all duration-200 shadow ${replyTo === null ? "group-hover/arrow:block" : ""}`}>
                                                                    <div className="flex-items-2 pl-3 hover:bg-gray-100 rounded cursor-pointer">
                                                                        <i className="fa-solid fa-reply"></i>
                                                                        <p 
                                                                            onClick={() => setReplyTo(getReplyText(msg))}
                                                                            className="p-2">Reply</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Message bubble */}
                                                    <div className="max-w-[70%] flex flex-col gap-2 bg-green-200 text-gray-800 px-3 py-1 ml-5 rounded-lg shadow-sm text-xs relative min-h-10">
                                                        <p dangerouslySetInnerHTML={{ __html: msg.message }} className="mr-5"></p>
                                                        <div className="flex justify-end gap-3">
                                                            <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time || msg.timestamp}</div>
                                                            <i className="fa-solid fa-check-double text-green-600 text-[10px] mt-auto relative"></i>
                                                        </div>
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
                                        } else if ((msg.sender === "admin") || (msg.role === "admin")) {
                                            return (
                                                <div key={index} className="flex justify-end pb-6 group">
                                                    <div className="flex items-center group/arrow w-fit cursor-pointer">
                                                        {/* Dropdown arrow (visible on hover of message group) */}
                                                        <div className="relative top-2">
                                                            <i className="fa-solid fa-sort-down text-gray-400 opacity-0 group-hover:opacity-100 mb-1.5"></i>

                                                            {/* Reply box (visible when hovering the arrow itself) */}
                                                            <div className="absolute z-20 right-0 top-3 pt-3">
                                                                <div className={`mt-1 text-xs p-0.5 bg-white rounded hidden transition-all duration-200 shadow ${replyTo === null ? "group-hover/arrow:block" : ""}`}>
                                                                    <div className="flex-items-2 pl-3 hover:bg-gray-100 rounded cursor-pointer">
                                                                        <i className="fa-solid fa-reply"></i>
                                                                        <p 
                                                                            onClick={() => setReplyTo(getReplyText(msg))}
                                                                            className="p-2">Reply</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Message bubble */}
                                                    <div className="flex flex-col max-w-[90%] items-end">
                                                        <div className="font-bold text-[14px] text-gray-700">{msg.sender}</div>
                                                        <div className="max-w-full w-fit flex flex-col gap-2 justify-end bg-green-200 text-gray-800 px-3 py-1 ml-5 rounded-lg shadow-sm text-xs relative  min-h-10">
                                                            <p dangerouslySetInnerHTML={{ __html: msg.message }} className="mr-5"></p>

                                                            
                                                            {/* Attachment rendering */}
                                                            {msg.attachments && msg.attachments.length > 0 && (
                                                                <div className="mt-2 flex flex-col gap-2">
                                                                    {msg.attachments.map((file, i) => {
                                                                    const fileType = file.type || "";

                                                                    // 🖼️ Image preview
                                                                    if (fileType.startsWith("image/")) {
                                                                        return (
                                                                        <div
                                                                            key={i}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            className="bg-gray-300 rounded-lg p-2 shadow-md max-w-[90%]"
                                                                        >
                                                                            <img
                                                                            src={file.preview}
                                                                            alt={file.name}
                                                                            className="rounded-lg w-full max-w-[250px] h-auto object-contain"
                                                                            />
                                                                        </div>
                                                                        );
                                                                    }

                                                                    // 🎥 Video preview
                                                                    if (fileType.startsWith("video/")) {
                                                                        return (
                                                                        <div
                                                                            key={i}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            className="bg-gray-300 rounded-lg p-2 shadow-md max-w-[90%]"
                                                                        >
                                                                            <video
                                                                            controls
                                                                            preload="metadata"
                                                                            src={file.preview}
                                                                            className="rounded-lg w-full max-w-[250px] h-auto pointer-events-auto"
                                                                            />
                                                                        </div>
                                                                        );
                                                                    }

                                                                    // 🎧 Audio preview
                                                                    if (fileType.startsWith("audio/")) {
                                                                        return (
                                                                        <div
                                                                            key={i}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            className="bg-gray-300 rounded-lg p-2 shadow-md max-w-[90%] flex items-center"
                                                                        >
                                                                            <i className="fa-solid fa-headphones text-green-700 mr-2"></i>
                                                                            <audio
                                                                            controls
                                                                            preload="auto"
                                                                            src={file.preview}
                                                                            className="w-[300px] pointer-events-auto"
                                                                            />
                                                                        </div>
                                                                        );
                                                                    }

                                                                    // 📄 Documents (PDF, DOCX, etc.)
                                                                    return (
                                                                        <div
                                                                        key={i}
                                                                        className="bg-gray-300 rounded-lg p-3 shadow-md max-w-[90%] flex items-center gap-3"
                                                                        >
                                                                        {/* <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                                                                            <i className="fa-solid fa-file-pdf text-red-600 text-lg"></i>
                                                                        </div> */}
                                                                        <Image
                                                                            src={
                                                                            file.name.endsWith(".pdf")
                                                                                ? "/Chat/pdf_file.png"
                                                                                : file.name.endsWith(".doc") || file.name.endsWith(".docx")
                                                                                ? "/Chat/file.png"
                                                                                : file.name.endsWith(".xls") || file.name.endsWith(".xlsx")
                                                                                ? "/Chat/CSV.png"
                                                                                : file.name.endsWith(".txt")
                                                                                ? "/Chat/txt.png"
                                                                                : "/Chat/file.png" // default icon
                                                                            }
                                                                            alt={`${file.name} icon`}
                                                                            height={50}
                                                                            width={50}
                                                                            className="rounded-md object-contain"
                                                                        />
                                                                        <div className="flex flex-col">
                                                                            <p className="text-sm font-semibold text-gray-800 truncate max-w-[150px]">
                                                                            {file.name}
                                                                            </p>
                                                                            <p className="text-xs text-gray-500">
                                                                            {(file.size / 1024).toFixed(2)} KB
                                                                            </p>
                                                                        </div>
                                                                        <a
                                                                            href={file.preview}
                                                                            download={file.name}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="ml-auto"
                                                                        >
                                                                            <i className="fa-solid fa-download text-gray-600 hover:text-gray-800"></i>
                                                                        </a>
                                                                        </div>
                                                                    );
                                                                    })}
                                                                </div>
                                                            )}




                                                            <div className="flex justify-end gap-3">
                                                                <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time || msg.timestamp}</div>
                                                                <i className="fa-solid fa-check-double text-green-600 text-[10px] mt-auto relative"></i>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Profile */}
                                                    <div className="relative mt-[21px]">
                                                        <div className="relative right-5 w-0 h-0 border-l-[0px] border-l-transparent border-r-[35px] border-r-transparent border-t-[25px] border-t-green-200"></div>
                                                        <div className="absolute top-2 left-1 flex-items border-1 border-green-600 text-white font-bold h-6 w-6 bg-green-500 rounded-full text-sm">
                                                            {msg.sender[0]}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={index} className="flex justify-start mb-3 group">
                                                    <div className="relative left-3 group w-0 h-0 border-l-[30px] border-l-transparent border-r-[0px] border-r-transparent border-t-[15px] border-t-white"></div>
                                                    <div className="max-w-[70%] min-h-10 flex flex-col gap-2 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-sm text-xs">
                                                        <p dangerouslySetInnerHTML={{ __html: msg.message }}></p>
                                                        <div className="text-[10px] min-w-fit text-gray-500 text-right mt-auto">{msg.time || msg.timestamp}</div>
                                                    </div>
                                                    <div className="flex items-center group/arrow cursor-pointer ">
                                                        <div className="relative mb-1.5">
                                                            <i className="fa-solid fa-sort-down text-gray-400 ml-5 opacity-0 group-hover:opacity-100"></i>

                                                            {/* Reply box (visible when hovering the arrow itself) */}
                                                            <div className="absolute z-20 top-3 left-5 pt-3">
                                                                <div className={`mt-1 text-xs p-0.5 bg-white rounded transition-all hidden duration-200 shadow ${replyTo === null ? "group-hover/arrow:block" : ""}`}>
                                                                    <div 
                                                                            onClick={() => setReplyTo(getReplyText(msg))}
                                                                            className="flex-items-2 hover:bg-gray-100 pl-3">
                                                                            <i className="fa-solid fa-reply"></i>
                                                                            <p className="p-2 rounded cursor-pointer">Reply</p>
                                                                        </div>
                                                                </div>
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


                        {/* ******************************** SEND TEMPLATE ******************************* */}
                        {(selectedConversation && conversationMessages.length > 0 && selectedChat.status !== "new") &&
                        <div className="bg-gray-50 gap-1 w-full text-xs flex-items-2 flex-col p-3 text-center">
                            <p>This chat has been resolved, so you can only send a message if the customer initiates a new chat</p>
                            <button className="border px-3 py-1 border-gray-400 hover:border-green-500 hover:text-green-500 rounded-2xl text-black gap-1 text-sm font-bold transition-all duration-150"
                            onClick={() => setOpenTemplates(true)}
                            >Send Template</button>
                        </div> }

                        <div>
                            {selectedFile && (
                                <div className="absolute z-10 top-17 w-[-webkit-fill-available] h-[-webkit-fill-available] mb-35 shadow-sm overflow-hidden bg-white">
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
                                <div className="flex flex-col h-full items-center justify-center bg-gray-50 p-4 rounded-md">
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

                            {(selectedChat && selectedChat.status === "new") && (
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