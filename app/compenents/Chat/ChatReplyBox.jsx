'use client';
import EmojiPicker from "emoji-picker-react";
import Image from "next/image";
import ChatFileUpload from "./FileUploader";
import { useRef, useEffect, useState } from "react";

export default function ChatReplyBox({ files, setFiles, setOpenCannedRes, setOpenMediaLibrary, setConversationMessages }) {
  const textareaRef = useRef(null);
  const addFileRef = useRef(null);
  // const emojiPickerRef = useRef(null); 
  const [message, setMessage] = useState("");
  const [openAddFile, setOpenAddFile] = useState(false);
  const [activeTab, setActiveTab] = useState("reply");
  const [openEmoji, setOpenEmoji] = useState(false);

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

  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setOpenEmoji(false);  
  };

  const formatText = (command) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const markers = {
      bold: ["**", "**"],
      italic: ["*", "*"],
      strikeThrough: ["~~", "~~"],
    };

    const [leftMark, rightMark] = markers[command] || ["", ""];
    const before = message.substring(0, start);
    const selected = message.substring(start, end);
    const after = message.substring(end);

    let newText, newSelStart, newSelEnd;

    if (start === end) {
      // No selection: insert markers and place caret between them
      newText = before + leftMark + rightMark + after;
      newSelStart = newSelEnd = start + leftMark.length; // caret between markers
    } else {
      // Has selection: wrap the selected text
      newText = before + leftMark + selected + rightMark + after;
      newSelStart = start; // keep selection start at original start
      newSelEnd = end + leftMark.length + rightMark.length; // selection extends by marker lengths
    }

    setMessage(newText);

    // Wait for the DOM to update and then set focus + selection
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = newSelStart;
      textarea.selectionEnd = newSelEnd;
    }, 0);
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const now = new Date();
    const today = now.toISOString().split("T")[0]; // e.g., "2025-10-30"

    // Convert simple markdown markers to HTML so the message renders with formatting
    const convertMarkdownToHtml = (text) => {
      if (!text) return text;
      // Escape HTML special chars first to avoid accidental HTML injection
      const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      let safe = escapeHtml(text);

      // Bold: **text** -> <strong>text</strong>
      safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Italic: *text* -> <em>text</em>
      safe = safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Strike: ~~text~~ -> <s>text</s>
      safe = safe.replace(/~~(.+?)~~/g, '<s>$1</s>');

      return safe;
    };

    const newMessage = {
      sender: "Agent Spark",
      role: "admin",
      // store HTML-converted message so the chat view can render formatting
      message: convertMarkdownToHtml(trimmedMessage),
      timestamp: now.toISOString(),
    };

    setConversationMessages((prev) => {
      const updatedMessages = [...prev];

      // Check if previous message exists and is from today
      const lastMsg = prev.length > 0 ? prev[prev.length - 1] : null;
      let lastDate = null;

      if (lastMsg) {
        lastDate = new Date(lastMsg.timestamp).toISOString().split("T")[0];
      }

      // If no last message or date changed, add a date separator
      if (!lastMsg || lastDate !== today) {
        const dateMessage = {
          sender: "System",
          role: "date",
          message: now.toLocaleDateString("en-GB"), // e.g., "30/10/2025"
          timestamp: now.toISOString(),
        };
        updatedMessages.push(dateMessage);
      }

      // Add the new agent message
      updatedMessages.push(newMessage);

      return updatedMessages;
    });

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
                <i onClick={()=> setOpenEmoji(!openEmoji)} className="fa-regular fa-face-smile"></i>
                {openEmoji && (
                  <div className='absolute right-0 bottom-10'>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
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
