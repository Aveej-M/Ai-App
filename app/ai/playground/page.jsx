'use client'
import Image from "next/image";
import { useState, useEffect } from "react";

const Page = () => {
  const [messages, setMessages] = useState([]); // store multiple messages
  const [input, setInput] = useState(""); // store input text
  const [accessToken, setAccessToken] = useState('')
  const [contacts, setContacts] = useState([]);
  const [objects, setObjects] = useState([]);
  const [splitMsg, setSplitMsg] = useState([]);

  // useEffect(() => {
  //   if (messages.length > 0) {
  //     const lastMsg = messages[messages.length - 1];
  //     const splitMsg = lastMsg.split(" ");
  //     console.log(splitMsg, "Split message after storing");
  //   }
  // }, [messages]);

  useEffect(() => {
    if (messages.length === 0 || !accessToken) return;

    const lastMsg = messages[messages.length - 1];
    setSplitMsg((prev) => [...prev, lastMsg.split(" ")]);
    console.log("Latest message:", lastMsg, "Split message", splitMsg);


    if (lastMsg.trim().toLowerCase() === "get records") {
      handleObjectRecord(accessToken);
    } else if (lastMsg.trim().toLowerCase() === "get contact records") {
      handleContactRecord(accessToken);
    } else {
      console.log("Message did not match 'get records'");
    }
  }, [messages, accessToken]); // runs when messages or token changes



  const handleObjectRecord = async (token) => {
    // ✅ Check last message only
    const lastMsg = messages[messages.length - 1]?.trim().toLowerCase();

    if (lastMsg === "get records") {
      try {
        const res = await fetch("/api/salesforce-login/object&field", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token}),
        });

        const data = await res.json();
        setObjects(data.records.objectAndFieldMap);
      } catch (err) {
        console.error("Error Record Recover:", err);
        alert("Something went wrong: " + err.message);
      }
    } else {
      console.log("Mismatched message:", lastMsg);
      alert("Mismatched");
    }
  };

  const handleContactRecord = async (token) => {
    
    try {
      
      const res = await fetch("/api/salesforce-login/contact-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      console.log('Contact records',data.records.records);
      setContacts(data.records.records);
      console.log("API response", data);
      console.log("records", data.records);

      // console.log(contacts)

    } catch (err) {
      console.error("Error Record Recover:", err);
      alert("Something went wrong: " + err.message);
    }


  }
  
  const handleMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, input]);
    setInput("");

    try {
      // 🔹 Fetch Salesforce token (ideally only once, not per message)
      const res = await fetch("/api/salesforce-login/token", { method: "POST" });
      const data = await res.json();
      setAccessToken(data.access_token)
      // if (data.access_token) {
      //   handleObjectRecord(data.access_token);
      // } else {
      //   alert("Login failed: " + JSON.stringify(data));
      // }
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Something went wrong: " + err.message);
    }
    
  };


  return (
    <div className="flex-items h-full">
      <div className="h-[50%] max-h-[500px] lg:w-[60%] md:w-[80%] w-[95%] max-w-[650px] justify-items flex-col border border-gray-300 shadow-11 rounded">

        {/* Header */}
        <div className="justify-items w-full h-[80px] rounded px-5 shadow-53 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Agent Spark</h1>
          <Image src="/reboot.png" alt="reboot icon" width={20} height={20} />
        </div>

        {/* Message display area */}
        {/* <div className=" w-full flex flex-col items-end justify-end p-3 overflow-y-auto text-black">
          <div className="overflow-y-auto w-[60%] h-full scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className="flex justify-self-end min-h-[50] w-fit gap-3 ml-2 mb-4">
                <div className="bg-gray-300 self-end p-3 flex min-h-[50] w-full rounded-t-lg rounded-bl-lg shadow">
                  <p className="text-black">{msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="h-full w-full flex flex-col gap-2 text-black p-5 overflow-y-auto">
          {messages && (
            messages.map((msg, i) => (
              <div key={i} className="text-right bg-gray-300 self-end p-3 flex min-h-[50] w-fit max-w-[60%] rounded-t-lg rounded-bl-lg shadow">
                {msg}
              </div>
            ))  
          )}
          
          {contacts.map((c, index) => (
            <div key={index} className="text-left bg-gray-300 p-3 flex min-h-[50] w-fit max-w-[60%] rounded-t-lg rounded-br-lg shadow">
              <div>{c.Name}</div>
            </div>
           
          ))}
          {objects && Object.keys(objects).map((key, index) => (
            <div key={index} className="p-3 bg-gray-300 rounded shadow">
              {key}
            </div>
          ))}

          <div></div>
          
        </div>

        {/* Input area */}
        <form onSubmit={handleMessage} className="flex items-center w-full border-t border-gray-300">
          <input
            type="text"
            placeholder="Please enter text"
            className="text-gray-700 h-[50px] px-5 w-full focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <Image
              className="w-[40px] pr-3 cursor-pointer"
              src="/sent.png"
              alt="sent icon"
              width={15}
              height={20}
            />
          </button>
        </form>

      </div>
    </div>
  );
};

export default Page;
