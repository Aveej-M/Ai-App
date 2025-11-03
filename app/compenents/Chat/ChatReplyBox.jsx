'use client';
import Image from "next/image";
import ChatFileUpload from "./FileUploader";
import EmojiPicker from "emoji-picker-react";
import { aiChatData } from "../../data/chat";
import { useRef, useEffect, useState } from "react";

export default function ChatReplyBox({ files, setFiles, setOpenCannedRes, setOpenMediaLibrary, setConversationMessages }) {
  const textareaRef = useRef(null);
  const addFileRef = useRef(null);
  const timeoutRef = useRef(null);
  const [open, setOpen] = useState(false);
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
    // allow sending when there is text OR there are files attached
    if (!trimmedMessage && files.length === 0) return;

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

    let newMessages = [];
    // if text message exists
    if (trimmedMessage) {
      newMessages.push({
        sender: "Agent Spark",
        role: "admin",
        message: convertMarkdownToHtml(trimmedMessage),
        timestamp: now.toISOString(),
      });
    }

    // if files exist, push each as a separate message
    if (files.length > 0) {
      files.forEach(({ file, preview }) => {
      const fileMessage = {
        sender: "Agent Spark",
        role: "admin",
        message: "",
        attachments: [
          {
            name: file.name,
            size: file.size,
            type: file.type,
            preview, // ✅ must include this
          },
        ],
        timestamp: now.toISOString(),
      };
      newMessages.push(fileMessage);
    });

    }

    setConversationMessages((prev) => {
      const updatedMessages = [...prev];
      const lastMsg = prev[prev.length - 1];
      const lastDate = lastMsg ? new Date(lastMsg.timestamp).toISOString().split("T")[0] : null;

      if (!lastMsg || lastDate !== today) {
        updatedMessages.push({
          sender: "System",
          role: "date",
          message: now.toLocaleDateString("en-GB"),
          timestamp: now.toISOString(),
        });
      }

      updatedMessages.push(...newMessages);
      return updatedMessages;
    });

    // clear input and attached files after sending
    setMessage("");
    // revoke object URLs created for previews to avoid memory leaks
    setTimeout(() => {
      try {
        files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
      } catch (e) {}
    }, 3000);
    setFiles([]);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    // add a tiny delay so it doesn’t close too abruptly
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };
   const handleOptionClick = () => {
    setOpen(false);
  };


  return (
    <div className="relative z-10 x-10 w-full flex items-center justify-between gap-5 bg-white shadow-sm p-3 px-5">

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
            <div className="absolute top-1/2 right-5 -translate-y-1/2 flex items-center text-gray-500">
              <button
                onClick={() => formatText("bold")}
                className="hover:text-green-500 transition-all font-bold hover:bg-gray-200 px-3 py-1 rounded-full"
                title="Bold"
              >
                <i className="fa-solid fa-b"></i>
              </button>
              <button
                onClick={() => formatText("italic")}
                className="italic hover:text-green-500 transition-all hover:bg-gray-200 px-2.5 py-1 rounded-full"
                title="Italic"
              >
                <i className="fa-solid fa-italic"></i>
              </button>
              <button
                onClick={() => formatText("strikeThrough")}
                className="hover:text-green-500 transition-all hover:bg-gray-200 px-2 py-1 rounded-full"
                title="Strikethrough"
              >
                <i className="fa-solid fa-strikethrough"></i>
              </button>
              <div className="hover:text-green-500 transition-all cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-full" title="Emoji">
                <i onClick={()=> setOpenEmoji(!openEmoji)} className="fa-regular fa-face-smile"></i>
                {openEmoji && (
                  <div className='absolute right-0 bottom-10'>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
              <button
                onMouseEnter={message.length > 11 ? handleMouseEnter : undefined}
                onMouseLeave={message.length > 11 ? handleMouseLeave : undefined}
                className={`relative z-20 py-1.5 px-2 rounded-full ${message === "" ? "cursor-not-allowed! grayscale-100" : "cursor-pointer! group hover:bg-gray-200"}`}
                title="AI Suggest"
              >
                <Image
                  src="/ai-icon.png"
                  alt="AI Icon"
                  height={20}
                  width={20}
                  className="w-5"
                />
                {message.length < 12 && (
                  <>
                    <span className='absolute -top-12 -left-28 z-30 w-max py-2 px-3 hidden group-hover:block bg-black/90 text-white rounded text-sm text-center'>Add message to let AI help you</span>
                    <div className="absolute -top-3 left-3 z-30 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/90 hidden group-hover:block" />
                  </>
                )}
                
                <div className={`absolute z-20 bottom-8 right-0 pb-3 transition-all duration-200 origin-top ${
                  open
                    ? "block scale-y-100"
                    : "scale-y-0 pointer-events-none"
                }`}>
                  <div className="bg-white text-left p-2 shadow-5 w-max rounded">
                    {aiChatData.map(({label, value}, index) => (
                      <div key={index} 
                      onClick={handleOptionClick}
                      className="px-2 py-1 hover:bg-gray-100 w-full rounded">
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          </div>
          <button
          onClick={message !== "" || files.length !== 0 ? handleSend : null}
          className="transition-all cursor-none"
          >
            <i
              className={`${message !== "" || files.length !== 0 ? "cursor-pointer text-transparent bg-gradient-to-r from-green-500 to-green-900 hover:scale-125 transition-all duration-150" : "cursor-not-allowed text-gray-400"} fa-solid fa-paper-plane text-[18px] rotate-45 bg-clip-text hover:from-green-400 hover:to-green-600`}
            ></i>
          </button>
        </div>
      </div>

      

    </div>
  );
}
