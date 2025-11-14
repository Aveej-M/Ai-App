"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { isToday, isYesterday, parse } from "date-fns";

const LeftArea = ({ bookMark, selectedConversation, searchRef, openSearchTab, openMerge, chatMessages,selectedChat,truncateText, currentChatIndex, handelSelectConversationMsg, setBookMark, setOpenMerge, selectedChats, setOpenSearchTab, handleNavigateChat, isSelectAll, handleSelectAllToggle, handleCheckboxToggle, setOpenBulkUpdate, setOpenConversationTab,setOpenFilterTab, sourceChat, manageChat, statusConversation, filterCount }) => {

    const [filterType, setFilterType] = useState('all');
    const [searchInput, setSearchInput] = useState("");
    // derive the currently selected group and visible (filtered + searched) chats
    const selectedGroup = chatMessages.find((g) => g.name === selectedConversation);

    const visibleChats = selectedGroup
        ? selectedGroup.chats
              .filter((chat) => (filterType === "unread" ? !chat.isRead : true))
              .filter((item) =>
                  item.user.toLowerCase().includes(searchInput.toLowerCase()) &&
                  (statusConversation === "" || item.status === statusConversation) &&
                  (sourceChat === "all" || item.source === sourceChat) &&
                  (manageChat === "all" || item.managed_by === manageChat)
              )
        : [];

    const currentVisiblePos = selectedChat ? visibleChats.findIndex((c) => c.conversationId === selectedChat.conversationId) : -1;

    // navigate within the filtered/visible chats and call parent handler with original index
    const navigateFiltered = (direction) => {
        if (!selectedGroup || visibleChats.length === 0) return;

        const currentConvId = selectedChat?.conversationId;
        let visIdx = visibleChats.findIndex((c) => c.conversationId === currentConvId);
        if (visIdx === -1) visIdx = 0; // if current isn't visible, default to first

        let targetVisIdx = visIdx;
        if (direction === "first") targetVisIdx = 0;
        else if (direction === "last") targetVisIdx = visibleChats.length - 1;
        else if (direction === "next") targetVisIdx = Math.min(visIdx + 1, visibleChats.length - 1);
        else if (direction === "prev") targetVisIdx = Math.max(visIdx - 1, 0);

        const targetConv = visibleChats[targetVisIdx];
        if (!targetConv) return;

        const originalIdx = selectedGroup.chats.findIndex((c) => c.conversationId === targetConv.conversationId);
        if (originalIdx !== -1) {
            handelSelectConversationMsg(targetConv.conversationId, originalIdx);
        }
    };
    
  return (
    <div className='w-[30%] h-screen -top-15 pt-15 pb-12 bg-gray-50 relative flex flex-col'>
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
                                    value={searchInput}
                                    onChange={(e)=> setSearchInput(e.target.value)}
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
                        <i onClick={()=> setOpenMerge(!openMerge)} className="fa-solid fa-shuffle hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                        <span className='absolute -top-10 -left-8 z-30 w-25 py-1 hidden group-hover:block bg-black/80 text-white rounded text-sm text-center'>Bulk Update</span>
                        <div className="absolute -top-3 left-3 z-30 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/80 hidden group-hover:block" />
                    </div>
                    <div 
                    onClick={() => setOpenFilterTab(true)}
                    className='relative group rounded-2xl'>
                        <i className="fa-solid fa-sliders hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                        {filterCount > 0 && (
                        <span className="absolute flex-items -top-1 left-0 text-xs bg-green-500 h-4 w-4 text-white rounded-full">{filterCount}</span>)}
                        <span className='absolute -top-10 -left-1.5 z-30 w-fit px-2 py-1 hidden group-hover:block bg-black/80 text-white rounded text-sm text-center'>Filter</span>
                        <div className="absolute -top-3 left-3 z-30 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/80 hidden group-hover:block" />
                    </div>
                </div>
            </div>
            <div className='flex gap-2 px-5 pb-3 text-xs text-gray-500'>
                <div onClick={()=> setFilterType("all")}
                className={`${filterType === "all" ? "bg-green-400 hover:bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"} px-4 py-1 rounded-2xl cursor-pointer transition-all duration-150`}>All</div>
                <div onClick={()=> setFilterType("unread")}
                className={`${filterType === "unread" ? "bg-green-400 hover:bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"} px-4 py-1   rounded-2xl cursor-pointer transition-all duration-150`}>Unread</div>
            </div>
        </div>

        <div className="flex flex-1 h-full overflow-y-auto flex-col">
            {openMerge && (
                <div className="justify-items px-5 mb-2">
                    <div className="flex-items-2 gap-2 text-sm"> 
                        <div className="checkbox-wrapper-46 relative inline-block">
                            <input
                                id="cbx-46"
                                type="checkbox"
                                checked={isSelectAll}
                                onChange={handleSelectAllToggle}
                                className="inp-cbx absolute opacity-0"
                            />
                            <label htmlFor="cbx-46" className="cbx flex items-center cursor-pointer select-none">
                                <span className="relative w-[16px] h-[16px] border border-[#9098A9] hover:border-green-500 rounded-[3px] transition-all duration-200 ease-in-out flex items-center justify-center">
                                <svg
                                    width="10"
                                    height="8"
                                    viewBox="0 0 12 10"
                                    className="absolute top-[3px] left-[2px] stroke-gray-50 stroke-[2px] fill-none transition-all duration-300 delay-[100ms]"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="1.5 6 4.5 9 10.5 1" />
                                </svg>
                                </span>
                            </label>
                        </div>
                        <p>Select All</p>
                        <span className="bg-green-500 h-5 min-w-5 rounded-full flex-items-2 text-white">{selectedChats.length}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold">
                        <div onClick={()=> setOpenMerge(false)} className="text-red-500 w-20 bg-red-200 hover:bg-red-300 px-2 py-0.5 rounded-2xl min-w-fit cursor-pointer">
                            <span ><i className="fa-solid fa-xmark mr-2"></i></span>
                            Cancel
                        </div>
                        <div className={`px-2 py-0.5 w-22 rounded-2xl flex-items-2 gap-1 ${selectedChats.length > 0 ? "text-green-500 bg-green-200 cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                            onClick={()=> (selectedChats.length > 0 && (setOpenBulkUpdate(true)))}
                            >
                            <Image 
                            src={`${ selectedChats.length > 0 ? "/Chat/merge-green.png" : "/Chat/merge-gray.png" }`}
                            alt="Merge icon"
                            width={50}
                            height={50}
                            className="w-4"
                            />
                            Update
                        </div>
                    </div>
                </div>
            )}

            {/* <div> */}
                {chatMessages.map((conversationGroup, idx) => {
                if (conversationGroup.name === selectedConversation) {
                    const filteredChats = conversationGroup.chats.filter(chat => {
                        if (filterType === "unread") return !chat.isRead;
                        return true;
                    });
                    return (
                        <div key={idx}>
                        {visibleChats.length > 0 ? (
                        //     filteredChats.filter(item => item.user.toLowerCase().includes(searchInput.toLowerCase())
                        // && ( statusConversation === "" || item.status === statusConversation)
                        // && (sourceChat === "all" || item.source === sourceChat))
                            visibleChats.map((chat, msgIdx) => {
                                // console.log(chat.endDate, "Date");
                                const [datePart, timePart] = chat.endDate.split(", ");
                                
                                const endDate = parse(datePart, "dd/MM/yyyy", new Date());

                                return(
                            <div
                            key={chat.conversationId}
                            className={`border-b border-b-gray-400 hover:bg-gray-100 justify-items py-3 px-6 cursor-pointer ${selectedChat && selectedChat.conversationId === chat.conversationId ? 'bg-gray-200 hover:bg-gray-200' : ''}`}
                            onClick={() => {
                                if (openMerge) {
                                handleCheckboxToggle(chat.conversationId);
                                } else {
                                const originalIdx = conversationGroup.chats.findIndex(
                                    (c) => c.conversationId === chat.conversationId
                                );
                                handelSelectConversationMsg(
                                    chat.conversationId,
                                    originalIdx !== -1 ? originalIdx : msgIdx
                                );
                                }
                            }}
                            >
                                <div className="flex-items">
                                    {openMerge && (
                                        <div className="checkbox-wrapper-46 relative inline-block">
                                            <input
                                                id={chat.conversationId}
                                                type="checkbox"
                                                checked={selectedChats.includes(chat.conversationId)}
                                                onChange={() => handleCheckboxToggle(chat.conversationId)}
                                                className="inp-cbx absolute opacity-0"
                                            />
                                            <label htmlFor={chat.conversationId} className="cbx flex items-center cursor-pointer select-none">
                                                <span className="relative w-[16px] h-[16px] border border-[#9098A9] rounded-[3px] transition-all duration-200 ease-in-out flex items-center justify-center">
                                                <svg
                                                    width="10"
                                                    height="8"
                                                    viewBox="0 0 12 10"
                                                    className="absolute top-[3px] left-[2px] stroke-gray-50 stroke-[2px] fill-none transition-all duration-300 delay-[100ms]"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polyline points="1.5 6 4.5 9 10.5 1" />
                                                </svg>
                                                </span>
                                            </label>
                                        </div>
                                    )}

                                    <div className="flex-items text-white font-bold h-8 min-w-8 bg-gradient-to-tr bg-orange-700 rounded-full">
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
                                <i className="fa-solid fa-globe text-[#0082d1]"></i>
                                <p className="text-xs text-gray-400">{isToday(endDate) ? timePart : isYesterday(endDate) ? "Yesterday" : chat.endDate}</p>
                            </div>
                            {/* <p className="text-gray-500 text-sm">{chat.status}</p> */}
                            </div>
                            )}))
                            : (
                                <p className="h-full flex items-center justify-center mt-8 text-sm text-gray-400">
                                    No {filterType === "unread" ? "Unread" : "Conversations"} Found
                                </p>
                            )}
                        </div>
                    );
                    // } 
                }
                return null;
                })}
            {/* </div> */}


            {/* ********************** NAVIGATION DIV ************************/}
            {(() => {
                const selectedGroup = chatMessages.find(
                    (g) => g.name === selectedConversation
                );

                if (selectedGroup && selectedGroup.chats.length > 0) {
                    return (
                    <div className="absolute bottom-0 w-full flex-items py-2 bg-gray-200">
                        <p className="text-gray-500">Total Count: <span className="text-green-500 font-[600]">{visibleChats.length}</span></p>
                        <div className="flex items-center gap-2">
                            <i
                            className="fa-solid fa-angles-left cursor-pointer text-xs text-gray-500 hover:text-gray-400 transition-all duration-200"
                            onClick={() => navigateFiltered("first")}
                            ></i>
                            <i
                            className="fa-solid fa-chevron-left cursor-pointer text-gray-600 hover:text-gray-500"
                            onClick={() => navigateFiltered("prev")}
                            ></i>
                                <p className="border-2 border-green-500 bg-green-200 px-2 py-0.5 text-green-600 rounded ">
                                {visibleChats.length > 0 ? (currentVisiblePos !== -1 ? currentVisiblePos + 1 : 0) : currentChatIndex + 1}
                                </p>
                            <i
                            className="fa-solid fa-chevron-right cursor-pointer text-gray-600 hover:text-gray-500"
                            onClick={() => navigateFiltered("next")}
                            ></i>
                            <i
                            className="fa-solid fa-angles-right cursor-pointer text-xs text-gray-500 hover:text-gray-400 transition-all duration-200"
                            onClick={() => navigateFiltered("last")}
                            ></i>
                        </div>
                    </div>
                    );
                }

                return null;
            })()}

        </div>

    </div>
  )
}

export default LeftArea