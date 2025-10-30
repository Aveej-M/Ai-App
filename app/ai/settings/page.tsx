'use client'
import { useState } from "react";
import Image from "next/image";

const Settings = () => {

  const [name, setName] = useState('Agent Spark')

  const chatId = 'cmb94t3r90gg7le012colx3t9';
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(chatId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      <div className=" overflow-auto">
        <div className='border border-gray-300 w-[60%] h-fit m-5 shadow-5 rounded text-black p-5'>
          <div className="flex justify-between items-center">
            <h1 className="text-[20px]">General</h1>
            <button
              className="h-[40] w-[80] bg-green-500 hover:bg-green-600 text-white rounded transition ease-in shadow"
            >Save</button>
          </div>
          <p className="font-bold text-gray-400">Chat ID</p>
          <div className="flex items-center gap-4 mb-5">
            <p className="font-bold text-[18px]">cmb94t3r90gg7le012colx3t9</p>
            <button className="h-fit min-w-[30] bg-gray-400 hover:bg-gray-500 p-2 rounded-[10]"
              onClick={handleCopy}
            >
              <Image
                src="/Share/Copy 1.png"
                alt="copy icon"
                width={15}
                height={25}
              />
            </button>

            <span className={`${copied ? 'bg-green-300 py-1 px-2 text-white rounded-[10]' : ''}`}>{copied ? 'Copied' : ''}</span>
          </div>

          <div>
            <form action="" className="flex flex-col">
              <label htmlFor="name">Name <span className="text-red-500">*</span></label>
              <input
                className="outline-none h-[40] border border-gray-300 w-full border-l-3 border-l-green-400 px-3 rounded"
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="addressed" className="mt-5">Addressed As<span className="text-red-500">*</span></label>
              <input
                className="outline-none h-[40] border border-gray-300 w-full border-l-3 border-l-green-400 px-3 rounded"
                type="text" placeholder="Enter Addressed as" />


            </form>
          </div>

          <div className="w-full flex-items flex-col py-5">
            <p className="text-green-600">Danger Zone</p>
            <div className="container-border p-5">
              <h1>Delete All Conversations</h1>
              <div className="flex justify-items">
                <p className="w-[80%] text-gray-400">
                  Once you delete your chatbot, there is no going back. Please be certain. All your uploaded data will be deleted. This action is not reversible.
                </p>
                <button className="w-[100px] bg-green-500 hover:bg-green-600 flex items-center gap-2 px-3 py-2 rounded text-white">
                  <Image
                    src="/Settings/Delete.png"
                    alt="Delete icon"
                    width={15}
                    height={15}
                  />
                  <p>Delete</p>
                </button>
              </div>
            </div>

            <div className="container-border p-5">
              <h1>Delete Chatbot</h1>
              <div className="flex justify-items">
                <p className="w-[80%] text-gray-400">
                  Once you delete your chatbot, there is no going back. Please be certain. All your uploaded data will be deleted. This action is not reversible.
                </p>
                <button className="w-[100px] bg-green-500 hover:bg-green-600 flex items-center gap-2 px-3 py-2 rounded text-white">
                  <Image
                    src="/Settings/Delete.png"
                    alt="Delete icon"
                    width={15}
                    height={15}
                  />
                  <p>Delete</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings