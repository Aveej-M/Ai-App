"use client"
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { customStyles } from "../../data/selectStyle";
import Image from "next/image";
import { chatManage, chatSource, converstaionStatus } from "../../data/chat";

const FilterTab = ({ setOpenFilterTab}) => {
    const [isClosing, setIsClosing] = useState(false);
    const [manageChat, setManageChat] = useState("all");
    const [sourceChat, setSourceChat] = useState("all");
    const [statusConverstion, setStatusConversation] = useState("")
    const [openAiChatbot, setOpenAiChatbot] = useState(false);
    const [openTeam, setOpenTeam] = useState(false);
    const [openWeb, setOpenWeb] = useState(false);
    const [openWhatsapp, setOpenWhatsapp] = useState(false);

    const filterRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsClosing(true);

                setTimeout(() => {
                    setOpenFilterTab(false);
                }, 400);
            };
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpenFilterTab]);

    const handleClose = () => {
    // trigger slide-out animation
    setIsClosing(true);
    // wait for animation to finish before unmounting
    setTimeout(() => {
      setOpenFilterTab(false);
    }, 400); // match animation duration
    };

    const handleResetFilter = () => {
      setManageChat('all');
      setSourceChat('all');
      setStatusConversation("");
    }

  return (
    <div className="h-full w-full bg-black/30 absolute top-0 left-0 z-50 flex justify-center">
      <div
        ref={filterRef}
        className={`flex flex-col justify-between w-100 h-full absolute right-0 bg-white transition-transform duration-300 ease-in-out transform ${
          isClosing ? "slide-out-X" : "slide-in-X"
        }`}
      >
        <div>
          <div className="p-5 bg-gradient-to-r from-green-500 to-green-200 flex items-center gap-3">
            <div
              onClick={handleClose}
              className="cursor-pointer h-6 w-6 pb-1 flex-items text-white hover:bg-gray-300/50 rounded transition"
            >
              <i className="fa-solid fa-xmark text-2xl pt-1 font-extralight"></i> 
            </div>
            <h1 className="font-semibold text-white">Filter</h1>
          </div>

          {/* Content Area */}
          <div className="p-5 relative flex flex-col items-center gap-3 transform-3d">
            <div className="flex flex-col w-full items-start gap-3">
              <div htmlFor="chat-manager" className="flex-items">
                  <i className="fa-regular fa-paper-plane rotate-50 text-green-500"></i>
                  <h2 className="font-bold text-gray-700">Chat Managed By</h2>
              </div>
              <Select 
                  instanceId="chat-manager"
                  options={chatManage}
                  value={chatManage.find(option => option.value === manageChat)}
                  onChange={(e)=> setManageChat(e.value)}
                  style={customStyles}
                  className="w-full text-sm"
                  components={{
                  IndicatorSeparator: () => null
                  }}
              />
            </div>

            {manageChat === "ai-chat" ? (
              <div className="flex flex-col w-full items-start gap-3 mt-2">
                <div className="flex-items">
                    <Image 
                    src="/ai-icon.png"
                    alt="Ai icon"
                    height={50}
                    width={50}
                    className="w-4"
                    />
                    <h2 className="font-bold text-gray-700">Ai Chatbot</h2>
                </div>
                <div className="w-full flex flex-col gap-3">
                  <div className="topic-formInput">
                    <div className="flex items-center gap-2 bg-gray-300 w-fit rounded-2xl px-2 py-0.5">
                      <p>Agent Spark</p>
                      <i className="fa-solid fa-xmark text-xs text-red-500 hover:bg-white rounded-2xl px-0.5"></i>
                    </div>
                  <input type="text" 
                  className="min-h-10 font-light flex-1 outline-none border-none text-sm py-1 px-1 min-w-[100px]" 
                  placeholder="Select Ai Chatbot"
                  onClick={()=> setOpenAiChatbot(!openAiChatbot)}
                  // onFocus={() => setOpenAiChatbot(true)}
                  // onBlur={() => setOpenAiChatbot(false)}
                  />
                  </div>
                  {openAiChatbot && (
                    <div className="flex p-2 items-center text-gray-400 w-full min-h-15 border border-gray-400 rounded shadow">
                        {/* <p>No Data Found</p> */}
                        <p className="px-5 py-2 hover:bg-gray-200 w-full rounded cursor-pointer">Agent Spark</p>
                    </div>
                  )}
                </div>
            </div>
            ) : (manageChat === "bot") ? (
              <div className="flex flex-col w-full items-start gap-3 mt-2">
                <div className="flex-items">
                    <i className="fa-solid fa-robot text-green-500"></i>
                    <h2 className="font-bold text-gray-700">Chatbot</h2>
                </div>
                <div className="relative w-full flex flex-col gap-3">
                  <div className="topic-formInput">
                    {/* <div className="flex items-center gap-1 bg-gray-300 w-fit rounded-2xl px-2 py-0.5 mt-1">
                      <p>Agent Spark</p>
                      <i className="fa-solid fa-xmark text-xs text-red-500 hover:bg-white rounded-2xl p-0.5"></i>
                    </div> */}
                  <input type="text" 
                  className="min-h-10 font-light flex-1 outline-none border-none text-sm py-1 px-1 min-w-[100px]" 
                  placeholder="Select Ai Chatbot"
                  onClick={()=> setOpenAiChatbot(!openAiChatbot)}
                  // onFocus={() => setOpenAiChatbot(true)}
                  // onBlur={() => setOpenAiChatbot(false)}
                  />
                  </div>
                  {openAiChatbot && (
                    <div className="absolute -bottom-17 bg-white flex p-2 items-center text-gray-400 w-full min-h-15 border border-gray-400 rounded shadow">
                        <p className="w-full text-center">No Data Found</p>
                        {/* <p className="px-5 py-2 hover:bg-gray-200 w-full rounded cursor-pointer">Agent Spark</p> */}
                    </div>
                  )}
                </div>
            </div>
            ) : (manageChat === "team") && (
              <div className="flex flex-col w-full items-start gap-3 mt-2">
                <div className="flex-items">
                    <i className="fa-solid fa-user-group text-green-500"></i>
                    <h2 className="font-bold text-gray-700">Team</h2>
                </div>
                <div className="relative w-full flex flex-col gap-3">
                  <div className="topic-formInput">
                    {/* <div className="flex items-center gap-1 bg-gray-300 w-fit rounded-2xl px-2 py-0.5 mt-1">
                      <p>Agent Spark</p>
                      <i className="fa-solid fa-xmark text-xs text-red-500 hover:bg-white rounded-2xl p-0.5"></i>
                    </div> */}
                  <input type="text" 
                  className="min-h-10 font-light flex-1 outline-none border-none text-sm py-1 px-1 min-w-[100px]" 
                  placeholder="Please Add/Search here..."
                  onClick={()=> setOpenTeam(!openTeam)}
                  // onFocus={() => setOpenAiChatbot(true)}
                  // onBlur={() => setOpenAiChatbot(false)}
                  />
                  </div>
                  {openTeam && (
                    <div className="absolute -bottom-17 bg-white flex p-2 items-center text-gray-400 w-full min-h-15 border border-gray-400 rounded shadow">
                        <p className="w-full text-center">No Data Found</p>
                        {/* <p className="px-5 py-2 hover:bg-gray-200 w-full rounded cursor-pointer">Agent Spark</p> */}
                    </div>
                  )}
                </div>
            </div>
            )}

            <hr className="w-full border-t text-gray-300 my-2"/>

            <div className="flex flex-col w-full items-start gap-3">
              <div htmlFor="chat-manager" className="flex-items">
                  <i className="fa-regular fa-message text-green-500"></i>
                  <h2 className="font-bold text-gray-700">Chat Source</h2>
              </div>
              <Select 
                  instanceId="chat-manager"
                  options={chatSource}
                  value={chatSource.find(option => option.value === sourceChat)}
                  onChange={(e)=> setSourceChat(e.value)}
                  style={customStyles}
                  className="w-full text-sm"
                  components={{
                  IndicatorSeparator: () => null
                  }}
              />
            </div>

            {sourceChat === "web" ? (
              <div className="flex flex-col w-full items-start gap-3 mt-2">
                <div className="flex-items">
                    <i className="fa-solid fa-tower-cell text-green-500"></i>
                    <h2 className="font-bold text-gray-700">Connected Web Chatbots</h2>
                </div>
                <div className="relative w-full flex flex-col gap-3">
                  <div className="topic-formInput mt-0!">
                    {/* <div className="flex items-center gap-1 bg-gray-300 w-fit rounded-2xl px-2 py-0.5 mt-1">
                      <p>Agent Spark</p>
                      <i className="fa-solid fa-xmark text-xs text-red-500 hover:bg-white rounded-2xl p-0.5"></i>
                    </div> */}
                  <input type="text" 
                  className="min-h-10 font-light flex-1 outline-none border-none text-sm py-1 px-1 min-w-[100px]" 
                  placeholder="Choose Channels"
                  onClick={()=> setOpenWeb(!openWeb)}
                  // onFocus={() => setOpenAiChatbot(true)}
                  // onBlur={() => setOpenAiChatbot(false)}
                  />
                  </div>
                  {openWeb && (
                    <div className="absolute -bottom-17 bg-white flex p-2 items-center text-gray-400 w-full min-h-15 border border-gray-400 rounded shadow">
                        <p className="w-full text-center">No Data Found</p>
                        {/* <p className="px-5 py-2 hover:bg-gray-200 w-full rounded cursor-pointer">Agent Spark</p> */}
                    </div>
                  )}
                </div>
            </div>
            ) : (sourceChat === "whatsapp") && (
              <div className="flex flex-col w-full items-start gap-3 mt-2">
                <div className="flex-items">
                    <i className="fa-solid fa-tower-cell text-green-500"></i>
                    <h2 className="font-bold text-gray-700">Connected Channels</h2>
                </div>
                <div className="relative w-full flex flex-col gap-3">
                  <div className="topic-formInput mt-0!">
                    {/* <div className="flex items-center gap-1 bg-gray-300 w-fit rounded-2xl px-2 py-0.5 mt-1">
                      <p>Agent Spark</p>
                      <i className="fa-solid fa-xmark text-xs text-red-500 hover:bg-white rounded-2xl p-0.5"></i>
                    </div> */}
                  <input type="text" 
                  className="min-h-10 font-light flex-1 outline-none border-none text-sm py-1 px-1 min-w-[100px]" 
                  placeholder="Choose Channels"
                  onClick={()=> setOpenWhatsapp(!openWhatsapp)}
                  // onFocus={() => setOpenAiChatbot(true)}
                  // onBlur={() => setOpenAiChatbot(false)}
                  />
                  </div>
                  {openWhatsapp && (
                    <div className="absolute -bottom-17 bg-white flex p-2 items-center text-gray-400 w-full min-h-15 border border-gray-400 rounded shadow">
                        <p className="w-full text-center">No Data Found</p>
                        {/* <p className="px-5 py-2 hover:bg-gray-200 w-full rounded cursor-pointer">Agent Spark</p> */}
                    </div>
                  )}
                </div>
            </div>
            )}

            <hr className="w-full border-t text-gray-300 my-2"/>

            <div className="flex flex-col w-full items-start gap-3">
              <div htmlFor="chat-manager" className="flex-items">
                  <i className="fa-regular fa-comments text-green-500"></i>
                  <h2 className="font-bold text-gray-700">Conversation Status</h2>
              </div>
              <Select 
                  instanceId="chat-manager"
                  options={converstaionStatus}
                  value={converstaionStatus.find(option => option.value === statusConverstion)}
                  onChange={(e)=> setStatusConversation(e.value)}
                  placeholder="Select Bot"
                  style={customStyles}
                  className="w-full text-sm"
                  components={{
                  IndicatorSeparator: () => null
                  }}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end border-t p-5 border-gray-300">
          <button 
          onClick={handleClose}
          className="border border-gray-400 px-5 py-2 text-sm text-gray-700 hover:border-green-400 hover:text-green-500 hover:bg-green-100 rounded-[20px] transition-all duration-300">Cancel</button>
          <button 
          onClick={handleResetFilter}
          className="border border-gray-400 px-5 py-2 text-sm text-gray-700 hover:border-green-400 hover:text-green-500 hover:bg-green-100 rounded-[20px] transition-all duration-300">Reset</button>
          <button className="border border-green-400 px-5 py-2 text-sm text-white bg-green-500 hover:border-green-400 hover:bg-green-600 rounded-[20px] transition-all duration-300">Apply</button>
        </div>
      </div>
    </div>
  )
}

export default FilterTab