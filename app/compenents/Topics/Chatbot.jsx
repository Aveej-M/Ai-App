'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import TopicsBotreply from "./Botreply";
import { fileURLToPath } from "url";

const TopicsChatbot = ({ showForm, setShowForm }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [contacts, setContacts] = useState([]);
  const [objects, setObjects] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedObject, setSelectedObject] = useState("");
  // const objectName = "";

  useEffect(() => {
    // get token once on mount
    const fetchToken = async () => {
      try {
        const res = await fetch("/api/salesforce-login/token", { method: "POST" });
        const data = await res.json();
        setAccessToken(data.access_token);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };
    fetchToken();
  }, []);

  // core handler for object fetching
  const handleObjectRecord = async (token, objectName = "") => {
    try {
      const res = await fetch("/api/salesforce-login/object&field", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, objectName }),
      });
      // handleContactRecord(token);

      const data = await res.json();
      if (!objectName) {
        // storing available objects list
        setObjects(Object.keys(data.records.objectAndFieldMap || {}));
        // show bot reply with object names
        const botMessage = {
          sender: "bot",
          text: "Available objects:\n" + Object.keys(data.records.objectAndFieldMap || {}).join(", "),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // show bot reply with selected object data
        // const fields = Object.keys(data.records.objectAndFieldMap); // this is an object

        const fieldsForObject = (data.records.objectAndFieldMap);
        const fieldNames = Object.keys(data.records.objectAndFieldMap);
        console.log(fieldsForObject[fieldNames], 'ObejctName')


        setObjects(fieldNames);
        setSelectedObject(objectName);
        setFields(fieldsForObject);
        console.log(fieldsForObject, 'FiledsName')
        // fieldNames.map((name, i) => (
        //   console.log(fieldsForObject[name], name,'Object')

        // ))

        const botMessage = {
          sender: "bot",
          // text: `Data for ${objectName}: ` + JSON.stringify(data.records.objectAndFieldMap),
          text: `Data for ${objectName}: ` + fieldNames.join(", "),

        };
        setMessages((prev) => [...prev, botMessage]);

        console.log('Messages', messages)
      }
    } catch (err) {
      console.error("Error fetching records:", err);
      alert("Something went wrong: " + err.message);
    }
  };

  // const handleContactRecord = async (token) => {

  //   try {

  //     const res = await fetch("/api/salesforce-login/contact-records", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ token }),
  //     });

  //     const data = await res.json();
  //     console.log('Contact records',data.records.records);
  //     setContacts(data.records.records);
  //     console.log("API response", data);
  //     console.log("records", data.records);

  //     // console.log(contacts)

  //   } catch (err) {
  //     console.error("Error Record Recover:", err);
  //     alert("Something went wrong: " + err.message);
  //   }
  // }

  const handleDynamicRecord = async (token, selectedObject, fieldNames, objectValues, fieldsForObject,) => {
    try {
      const res = await fetch("/api/salesforce-login/dynamic-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, selectedObject, fieldNames, objectValues, fieldsForObject }),
      });

      const data = await res.json();
      console.log("Dynamic Records:", data);

      const botMessage = {
        sender: "bot",
        text: `Fetched ${fieldNames.join(", ")} from ${selectedObject}: \n` + JSON.stringify(data.records, null, 2),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error fetching dynamic records:", err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const normalized = input.trim();
    console.log(normalized, 'NORMALIZED');

    if (normalized === "get records") {
      // step 1: fetch all objects
      await handleObjectRecord(accessToken);
    } else if (objects.map(o => o.toLowerCase()).includes(normalized)) {
      // step 2: fetch selected object data
      await handleObjectRecord(accessToken, normalized);
    } else if (normalized.includes(",")) {
      // step 3: user entered fields (comma separated)
      const fieldNames = normalized
        .split(",")
        // .map(f => f.trim().toLowerCase().replace(/\s+/g, "")); // lowercase + remove spaces
        .map(f => f.trim().replace(/^\s/, '').replace(/\s$/, ''));
      console.log(fieldNames, 'FILEDNAME')
      const objectValues = fieldNames.map(name => fields[name]);
      console.log(objectValues, 'OBEJCT NAMExx`')



      if (!selectedObject) {
        const botMessage = { sender: "bot", text: "Please select an object first." };
        setMessages((prev) => [...prev, botMessage]);
        return;
      }
      await handleDynamicRecord(accessToken, selectedObject, fieldNames, objectValues);

    } else {
      // fallback bot reply
      const botMessage = { sender: "bot", text: "I didn't understand that. Try 'get records' or choose an object." };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <>
      <TopicsBotreply objects={objects} contacts={contacts} showForm={showForm} messages={messages} />

      <div className="h-full min-w-[300px] w-[400px] flex flex-col bg-gray-100 shadow-5 text-black">
        {/* Header */}
        <div className="w-full h-[49px] px-5 flex items-center justify-between bg-gray-50 border-b border-gray-300 shadow">
          <h1 className="text-[20px] font-bold text-black">Conversation Preview</h1>
          <Image src="/reboot.png" alt="reboot icon" width={20} height={20} />
        </div>

        {/* Messages */}
        <div className="flex-1 flex items-center overflow-y-auto px-4 py-3 space-y-3 bg-white">
          {messages.length === 0 && (
            <div className="w-full text-center">
              <Image src="/Topics/image.png" alt="Chatbot image" height={500} width={500} />
              <h1>Let's Chat</h1>
              <p>Hi, I'm an AI assistant. Try typing "get records".</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 mb-4 rounded-2xl max-w-[70%] ${msg.sender === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center w-full border-t border-gray-300 p-2 pb-4 relative">
          <textarea
            placeholder="Please enter text"
            className="text-gray-700 h-[80px] px-3 pr-9 w-full focus:outline-none border border-gray-400 rounded resize-none scrollbar-hide"
            value={input}
            rows={4}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="absolute right-6 bottom-6">
            <i className="fa-solid fa-paper-plane text-green-500 rotate-45"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default TopicsChatbot;
