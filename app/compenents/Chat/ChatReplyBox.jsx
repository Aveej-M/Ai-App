'use client';
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import ChatFileUpload from "./FileUploader";

export default function ChatReplyBox({ files, setFiles, setOpenCannedRes, setOpenMediaLibrary, setConversationMessages }) {
  const textareaRef = useRef(null);
  const addFileRef = useRef(null);
  const [message, setMessage] = useState("");
  const [openAddFile, setOpenAddFile] = useState(false);
  const [activeTab, setActiveTab] = useState("reply");

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (addFileRef.current && !addFileRef.current.contains(event.target)) {
            setOpenAddFile(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  })

  const formatText = (command) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Wrap selected text in markdown-like tags (simple simulation)
    let before = message.substring(0, start);
    let selected = message.substring(start, end);
    let after = message.substring(end);

    if (command === "bold") selected = `**${selected}**`;
    else if (command === "italic") selected = `*${selected}*`;
    else if (command === "strikeThrough") selected = `~~${selected}~~`;

    const newText = before + selected + after;
    setMessage(newText);

    // Keep cursor position at end of inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = end + 4;
    }, 0);
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;
    const newMessage = {
      sender : "Agent Spark",
      role: "agent",
      message: trimmedMessage,
      timestamp: new Date().toISOString(),
    };

    setConversationMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className="relative x-10 w-full flex items-center justify-between gap-5 bg-white shadow-sm p-3 px-5">

      <div className="flex flex-col w-full gap-3">
        {/* Tabs */}
        {files.length === 0 && (
        <div className="flex border-b border-gray-400 text-sm font-medium">
          <button
            onClick={() => setActiveTab("reply")}
            className={`px-4 py-2 ${
              activeTab === "reply"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            }`}
          >
            Reply
          </button>
          <button
            onClick={() => setActiveTab("note")}
            className={`px-4 py-2 ${
              activeTab === "note"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500"
            }`}
          >
            Private Note
          </button>
        </div>
        )}
        
      
        <div className="flex-items">
            <div className="">
            <i onClick={()=> setOpenAddFile(!openAddFile)} className="fa-solid fa-plus cursor-pointer hover:bg-gray-400 p-1 rounded-2xl transition-all"></i>

            {openAddFile && (
            <div ref={addFileRef} className="w-56 h-fit absolute z-10 bottom-18 bg-gray-50 shadow-11 rounded p-1">
                <div className="flex items-center py-1.5 px-3 gap-3 hover:bg-gray-200 cursor-pointer">
                    
                    <ChatFileUpload 
                    files={files} 
                    setFiles={setFiles} 
                    setOpenAddFile={setOpenAddFile}
                    />
                </div>
                {files.length == 0 && (
                  <>
                  <div 
                  onClick={()=> {setOpenMediaLibrary(true); setOpenAddFile(false)}}
                  className="flex items-center py-1.5 px-3 gap-3 hover:bg-gray-200 cursor-pointer">
                      <i className="fa-solid fa-swatchbook text-gray-700"></i>
                      <span className="text-sm text-gray-700">Media Library</span>
                  </div>
                  <div onClick={()=> {setOpenCannedRes(true); setOpenAddFile(false)}}
                  className="flex items-center py-1.5 px-3 gap-3 hover:bg-gray-200 cursor-pointer">
                      <i className="fa-solid fa-message text-gray-700"></i>
                      <span className="text-sm text-gray-700">Canned Response</span>
                  </div>
                    </>
                )}
                <div className="flex items-center py-1.5 px-3 gap-3 cursor-not-allowed">
                    <i className="fa-solid fa-brain text-gray-400"></i>
                    <span className="text-sm text-gray-400">Ai Co-pilot (Coming soon)</span>
                </div>              
            </div>
            )}
        </div>

          <div className="relative flex-1">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-200 rounded px-4 pr-40 py-3 text-sm outline-none focus:ring-1 focus:ring-green-400 resize-none text-gray-700 placeholder-gray-400"
              rows={2}
            ></textarea>

            {/* Floating Toolbar (inside textarea on right side) */}
            <div className="absolute top-1/2 right-5 -translate-y-1/2 flex items-center gap-3 text-gray-500">
              <button
                onClick={() => formatText("bold")}
                className="hover:text-green-500 transition-all font-bold"
                title="Bold"
              >
                <i className="fa-solid fa-b"></i>
              </button>
              <button
                onClick={() => formatText("italic")}
                className="italic hover:text-green-500 transition-all"
                title="Italic"
              >
                <i className="fa-solid fa-italic"></i>
              </button>
              <button
                onClick={() => formatText("strikeThrough")}
                className="hover:text-green-500 transition-all"
                title="Strikethrough"
              >
                <i className="fa-solid fa-strikethrough"></i>
              </button>
              <button className="hover:text-green-500 transition-all" title="Emoji">
                <i className="fa-regular fa-face-smile"></i>
              </button>
              <button
                className="text-green-500 hover:text-green-700"
                title="AI Suggest"
              >
                <Image
                  src="/ai-icon.png"
                  alt="AI Icon"
                  height={20}
                  width={20}
                  className="w-5"
                />
              </button>
            </div>
          </div>
          <button
          onClick={handleSend}
          className="transition-all cursor-none"
          >
            <i
              className={`fa-solid fa-paper-plane text-[18px] rotate-45 bg-clip-text hover:from-green-400 hover:to-green-600 ${message === "" ? "cursor-not-allowed text-gray-300" : "cursor-pointer hover:scale-125 transition-all duration-150 text-transparent bg-gradient-to-r from-green-500 to-green-900"}`}
            ></i>
          </button>
        </div>
      </div>

      

    </div>
  );
}
