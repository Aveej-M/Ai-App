"use client";
import { useState, useEffect, useRef } from "react";
import { conversationData, chatMessages } from "../../data/chat";

const ConversationView = ({ setOpenConversationTab, onSelectConversation, selectedConversation, chatMessages }) => {
  const [conversationList, setConversationList] = useState(chatMessages);
  const [isClosing, setIsClosing] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [openConversations, setOpenConversations] = useState(true);
  const [openBookMarks, setOpenBookmarks] = useState(false);

  const convoRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        convoRef.current && 
        !convoRef.current.contains(event.target) 
      ) {
          setIsClosing(true);
            setTimeout(() => {
              setOpenConversationTab(false);
            }, 400);
        };
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [setOpenConversationTab])
  
  const handleClose = () => {
    // trigger slide-out animation
    setIsClosing(true);
    // wait for animation to finish before unmounting
    setTimeout(() => {
      setOpenConversationTab(false);
    }, 400); // match animation duration
  };

  const handleUpdateBookMark = (name) => {
    const updateList = conversationList.map(item => ({
      ...item,
      bookMark: item.name === name ? true : false,
    }));

    setConversationList(updateList);
    setOpenBookmarks(false);
  }

  // const filterConversationTitle = chatMessages.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <div className="h-full w-full bg-black/30 absolute top-0 left-0 z-50 flex justify-center">
      <div ref={convoRef}
        className={`w-100 h-full absolute left-0 bg-white transition-transform duration-300 ease-in-out transform ${
          isClosing ? "slide-out" : "slide-in"
        }`}
      >
        <div className="p-5 bg-gradient-to-r from-green-500 to-green-200 flex items-center gap-3">
          <div
            onClick={handleClose}
            className="cursor-pointer h-6 w-6 pb-1 flex-items text-white hover:bg-gray-300/50 rounded transition"
          >
            <i className="fa-solid fa-xmark text-2xl pt-1 font-extralight"></i> 
          </div>
          <h1 className="font-semibold text-white">Conversation View</h1>
        </div>

        {/* Content Area */}
        <div className="p-5 relative flex items-center gap-3">
            <i className="fa-solid fa-magnifying-glass absolute top-7 left-7.5 "></i>
          <input type="text" 
          placeholder="Search for a view"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='border border-gray-400 w-[92%] h-8 py-1 px-3 pl-8 rounded 
                focus:outline-none focus:ring-0 
                focus:rounded  text-sm
                focus:border-green-500 hover:border-green-500'
          />
          <div className="group relative hover:bg-gray-100 px-2 py-1 rounded">
            <span className='absolute -top-10 -left-11 w-28 py-1 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Book mark View</span>
            <div className="absolute -top-3 left-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/70 hidden group-hover:block" />
            <i onClick={()=> setOpenBookmarks(!openBookMarks)} className="fa-regular fa-bookmark text-green-500 cursor-pointer"></i>
          </div>
        </div>

        <div className="px-6">
            <div className="justify-items">
                <h2 className="font-bold">Default</h2>
                <i onClick={() => setOpenConversations(!openConversations)} className={`fa-solid fa-angle-down ${openConversations ? "rotate-0" : "rotate-180"} transition duration-300`}></i>
            </div>

            {openConversations && (
                <div>
                    {conversationList
                    .filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase()))
                    .map(({ name, chats, bookMark }, index) => (
                        <div key={index} className="flex items-center gap-5 text-sm">
                            {openBookMarks && (
                              <i
                                className={`fa-${bookMark ? "solid" : "regular"} fa-bookmark text-green-500 cursor-pointer hover:bg-gray-200 p-2 px-2.5 rounded transition duration-200`}
                                onClick={() => handleUpdateBookMark(name)}
                              ></i>
                            )}
                            
                            <div className={`justify-items py-2 px-2 text-gray-500 w-full rounded ${name === selectedConversation && "bg-green-200 border-l-3 border-l-green-500"}`}
                                onClick={() => {
                                    if (!openBookMarks) {
                                        onSelectConversation(name);
                                        handleClose();
                                    }
                                }}>
                                <div className={`${openBookMarks ? "" : "cursor-pointer hover:text-green-500 flex gap-3 items-center"}`}>{name}
                                  {bookMark && !openBookMarks && <i className="fa-solid fa-bookmark text-green-500"></i>}
                                </div>
                                <div>{chats.length}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
      </div>
    </div>
  );
};

export default ConversationView;