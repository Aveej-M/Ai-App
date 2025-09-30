'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { Theme } from "@/app/data/theme";
import { CirclePicker, SketchPicker, ChromePicker } from 'react-color';

const options = [
  { label: '5 minutes', value: '5 minutes' },
  { label: '10 minutes', value: '10 minutes' },
  { label: '15 minutes', value: '15 minutes' },
  { label: '20 minutes', value: '20 minutes' },
  { label: '25 minutes', value: '25 minutes' }
]

const alignItems = [
  { icons: '/Settings/bottom-alignment.png', width: 'w-[50]', label: 'Left Bottom' },
  { icons: '/Settings/center-alignment.png', width: 'w-[50]', label: 'Right Center' },
  { icons: '/Settings/Left-Align.png', width: 'w-[40] mb-2', label: 'Right Bottom' }
]



const ChatInterface = () => {
  const [avatars, setAvatars] = useState([
    "/Robots/Bot1.png",
    "/Robots/Bot2.png",
    "/Robots/Bot3.png",
    "/Robots/Bot4.png",
    "/Robots/Bot5.png",
    "/Robots/Bot6.png",
    "/Robots/Bot7.png",
    "/Robots/Bot8.png",
    "/Robots/Bot9.png",
  ]);

  const msgLimit = 40;

  const [initialMessage, setInitialMessage] = useState('Hi! What can I help you with?');
  const [msgPlaceholder, setMsgPlaceholder] = useState('Enter ur messages....')
  const [suggestedMsg, setSuggestedMsg] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [customAvatar, setCustomAvatar] = useState(null); // for uploaded image
  const [showAll, setShowAll] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedAlign, setSelectedAlign] = useState(0);
  const [selectColor, setSelectColor] = useState('#8c52ff')
  const [isClient, setIsClient] = useState(false);
  const [showSketch, setShowSketch] = useState(false);
  const [headerColor, setHeaderColor] = useState(false);

  useEffect(() => {
    setIsClient(true);
  })

  const handleAddMessage = () => {
    setSuggestedMsg([...suggestedMsg, '']);
  }

  const handleSetMessage = (event) => {
    setInitialMessage(event.target.value)
  }

  const handleMessagePlaceholder = (event) => {
    setMsgPlaceholder(event.target.value);
  }

  const handleSuggestedChange = (index, value) => {
    const updated = [...suggestedMsg];
    updated[index] = value;
    setSuggestedMsg(updated);
  };

  const handleRemoveMessage = (index) => {
    const update = [...suggestedMsg];
    update.splice(index, 1);
    setSuggestedMsg(update);
  }

  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    handlePresetChange(options[0]);
  }, []);

  const handlePresetChange = (selected) => {
    const value = selected.value;
    setSelectedOption(selected);
  }

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;

        // Check if already uploaded
        setAvatars(prev => [base64, ...prev.filter(a => a !== base64)]); // ⬅ ensure first
        setSelectedAvatar(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (color) => {
    setSelectColor(color.hex)
  }

  const handleToggleSketch = () => {
    setShowSketch(!showSketch);
  }

  const handelToggle = () => {
    setHeaderColor(!headerColor);
  }

  return (
    <>
      <button
        className="h-[40] w-[80] bg-green-500 hover:bg-green-600 text-white rounded transition ease-in shadow absolute right-4 z-10 -top-12"
      >Save</button>

      <div className="flex px-5 w-full justify-between gap-5">
        <div className="py-5 w-[60%] overflow-auto scrollbar-hide">
          <div className="flex w-full overflow-x-auto">
            <div className='flex flex-col h-fit w-full gray-border shadow-5 p-5 text-black'>
              <h1 className="text-[18px] mb-1">Chat Interface</h1>
              <div className='flex flex-col'>
                <p className="text-gray-500 my-2">Initial Messages</p>
                <textarea
                  name="" id=""
                  rows={5}
                  value={initialMessage}
                  className="border border-gray-300 rounded outline-none p-2"
                  onChange={handleSetMessage}
                >

                </textarea>
                <p className="text-gray-500 my-2">Enter each message in new line</p>
              </div>

              <div className="gap-2 flex flex-col mt-5">
                <h1>Suggested Messages</h1>
                <div className={`container-border p-2 ${suggestedMsg.length == 0 ? 'hidden' : 'block'}`}>
                  {suggestedMsg.map((msg, index) => (
                    <div key={index}
                      className="w-full"
                    >
                      <div className="justify-items w-[60%]">
                        <p>Message {index + 1}</p>
                        <p className="text-gray-300 text-[12px]">{suggestedMsg[index].length} / {msgLimit}</p>
                      </div>
                      <div className="flex items-center gap-1 pb-3">
                        <input type="text"
                          className="h-[40] px-2 w-[60%] container-border outline-none"
                          placeholder="Add a suggested message..."
                          maxLength={msgLimit}
                          onChange={(e) => { handleSuggestedChange(index, e.target.value) }}
                        />
                        <div className="hover:bg-gray-300 rounded-2xl p-1 h-[25] w-[25] flex-items">
                          <Image
                            className="w-[16px] h-[20px] cursor-pointer "
                            src="/Settings/trash.png"
                            alt="Delete icon"
                            width={15}
                            height={15}
                            onClick={() => handleRemoveMessage(index)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`h-[30] w-fit border flex-items-2 px-3 gap-2 cursor-pointer rounded ${suggestedMsg.length == 4 ? 'border-gray-300' : ''}`}

                  onClick={() => {
                    if (suggestedMsg.length < 4) handleAddMessage()
                  }}
                >
                  <Image
                    className="w-3 add-suggest"
                    src="/SourceIcons/Add.png"
                    alt="Add icon"
                    width={20}
                    height={20}
                  />
                  <p className="text-gray-500 text-[14px] pt-[1px]">Suggested Messages</p>
                </div>

              </div>

              <div className="flex flex-col gap-2 my-5">
                <h1 className="text-[15px]">Message Placeholder</h1>
                <input type="text"
                  className="h-[40] px-2 w-full border border-gray-300 rounded outline-none"
                  placeholder='Message....'
                  value={msgPlaceholder}
                  onChange={handleMessagePlaceholder}
                />
              </div>

              <div className="w-80 mt-3">
                <div className="flex justify-between">
                  <h1 className="text-[14px] text-gray-500">Collect User Feedback</h1>
                  <label className="inline-flex items-center mb-4 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-9 h-5 bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-300 dark:peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex justify-between">
                  <h1 className="text-[14px] text-gray-500">Regenerate Messages</h1>
                  <label className="inline-flex items-center mb-4 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-9 h-5 bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-300 dark:peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex justify-between">
                  <h1 className="text-[14px] text-gray-500">Auto show Initial messages pop-ups</h1>
                  <label className="inline-flex items-center mb-4 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-9 h-5 bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-300 dark:peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <div></div>

              <div className="mt-3">
                <p className="font-bold">How long should the bot wait before ending the session due to inactivity?</p>
                <Listbox value={selectedOption} onChange={handlePresetChange}
                  className="mt-2"
                >
                  {({ open }) => (
                    <div className="relative min-w-[160px]">
                      <Listbox.Button className={`flex items-center w-full h-[40px] px-4 border ${open ? 'border-2 border-green-400' : 'border-gray-300'} rounded text-[14px] text-black text-left relative`}>
                        {selectedOption.label}

                        {/* Rotating dropdown arrow */}
                        <Image
                          className={`absolute right-2.5 pointer-events-none transition-transform duration-300 ${open ? 'rotate-180' : ''
                            }`}
                          src="/Header/drop.png"
                          alt="Drop icon"
                          height={15}
                          width={15}
                        />
                      </Listbox.Button>

                      <Listbox.Options className="mt-1 border border-gray-300 rounded shadow bg-white absolute w-full z-10">
                        {options.map((option, idx) => (
                          <Listbox.Option
                            key={idx}
                            value={option}
                            className={({ active }) =>
                              `text-[14px] cursor-pointer p-2 selectDay ${active ? 'bg-green-100 text-green-700' : 'text-gray-700'
                              }`
                            }
                          >
                            {option.label}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  )}
                </Listbox>

              </div>

              <div className="my-5">
                <h1>Avatar</h1>
                <div className="flex items-center gap-4 flex-wrap mt-1">
                  {/* Upload Button */}
                  <div
                    className={`w-[50px] h-[50px] border-2 border-dashed rounded-full flex justify-center items-center cursor-pointer`}
                    onClick={() => fileInputRef.current.click()}
                  >
                    +
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </div>

                  {/* Predefined Avatars */}
                  {(showAll ? avatars : avatars.slice(0, 4)).map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`w-[50px] h-[50px] rounded-full border-2 p-1 cursor-pointer ${selectedAvatar === avatar ? "border-green-500" : "border-gray-300"
                        }`}
                      alt={`avatar-${index}`}
                    />
                  ))}


                  {/* View All / View Less Button */}
                  {avatars.length > 4 && (
                    <>
                      {!showAll ? (
                        <button
                          onClick={() => setShowAll(true)}
                          className="w-[50px] h-[50px] rounded-full border-2 border-gray-300 text-xs text-black flex-items-2 flex-col"
                        >
                          <Image
                            className="w-[15]"
                            src="/Settings/ViewAll.png"
                            alt="View all icon"
                            width={10}
                            height={10}
                          />
                          View All
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowAll(false)}
                          className="w-[50px] h-[50px] rounded-full border-2 border-gray-300 text-xs text-black flex-items-2 flex-col"
                        >
                          <Image
                            className="w-[12]"
                            src="/Settings/ViewLess.png"
                            alt="View all icon"
                            width={10}
                            height={10}
                          />
                          Less
                        </button>
                      )}
                    </>
                  )}

                  {/* Show Uploaded Avatar if Selected */}
                  {customAvatar && !avatars.includes(selectedAvatar) && (
                    <img
                      src={customAvatar}
                      alt="custom avatar"
                      className="w-[50px] h-[50px] rounded-full border-2 p-1 border-blue-500"
                      onClick={() => setSelectedAvatar(customAvatar)}
                    />
                  )}
                </div>
              </div>

              {/* POSITION */}
              <div>
                <h1>Position</h1>
                <div className="flex gap-3 mt-1">
                  {alignItems.map(({ icons, label, width }, index) => (
                    <div key={index}
                      onClick={() => setSelectedAlign(index)}
                      className={`border-3 rounded p-3 flex-items-2 flex-col cursor-pointer ${selectedAlign === index ? 'border-green-500 bg-green-100' : 'border-gray-300'}
                  hover:bg-green-100`}>
                      <Image
                        className={width}
                        src={icons}
                        alt="Align icon"
                        width={30}
                        height={30}
                      />
                      <p>{label}</p>
                    </div>
                  ))}

                </div>
              </div>

              {/* THEME COLORS */}
              <div className="mt-5">
                <h1>Theme Color</h1>
                <div className="flex mt-2">
                  <div className="w-[50%] flex gap-3 flex-wrap">
                    <CirclePicker color={selectColor} onChange={handleColorChange} />
                    <div className="relative">
                      {showSketch && (

                        // <SketchPicker color={selectColor} onChange={handleColorChange} width='250px' className="absolute bottom-80 rounded-[5px]" />
                        <ChromePicker color={selectColor} onChange={handleColorChange} className="absolute left-10 bottom-0 rounded-[5px] text-black" />
                      )}

                      <div
                        className="w-8 h-8 rounded-full cursor-pointer bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 hover:scale-115 ease-in-out transition-transform"
                        onClick={handleToggleSketch}
                      ></div>
                    </div>
                  </div>
                  <div className="w-[50%] flex-items">
                    <div className="h-[60] w-[60] rounded" style={isClient ? { backgroundColor: selectColor } : {}}></div>
                  </div>
                </div>

                <div className="flex justify-between w-[80%] mt-5">
                  <h1 className="text-[14px] text-gray-500">Collect User Feedback</h1>
                  <label className="inline-flex items-center mb-4 cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" onClick={handelToggle} />
                    <div className="relative w-9 h-5 bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-green-300 dark:peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/*---------- MESSAGE CONTAINER --------- */}
        <div className="py-5 w-[40%]">
          <div className="container-border h-full relative">
            <div style={isClient && headerColor ? { backgroundColor: selectColor } : {}} className="justify-items w-full h-[60px] rounded-t px-5 shadow-53">
              <h1 className="text-2xl font-bold text-black">Agent Spark</h1>
              <Image
                src="/reboot.png"
                alt="reboot icon"
                width={20}
                height={20}
              />
            </div>

            <div className="h-[80%] p-5 overflow-auto scrollbar-hide">
              <div className="h-[70%]">
                <div className="flex justify-self-start items-center min-w-[40%] max-w-[80%] min-h-[50] gap-3 ml-2 mb-4">
                  <Image
                    className="h-[30] w-[40] rounded-full"
                    src={selectedAvatar}
                    alt="Robot icon"
                    width={25}
                    height={25}
                  />
                  <div className="bg-gray-300 self-end p-3 flex min-h-[50] w-full rounded-t-xl rounded-br-xl shadow">
                    <p className="text-black">{initialMessage}</p>
                  </div>
                </div>
              </div>

              <div className="h-[30%] w-full flex flex-wrap justify-end">
                {/* <div className="flex"> */}
                {suggestedMsg.map((msg, index) => (
                  <div key={index} className="flex justify-self-end min-h-[50] w-fit gap-3 ml-2 mb-4">
                    <div className="bg-gray-300 self-end p-3 flex min-h-[50] w-full rounded-t-lg rounded-bl-lg shadow">
                      <p className="text-black">{msg}</p>
                    </div>
                  </div>
                ))}
                {/* </div> */}
              </div>
            </div>



            <div className="justify-items w-full border border-t-gray-300 absolute bottom-0">
              <input type="text" placeholder={msgPlaceholder}

                className="text-gray-400 align-baseline h-[50px] px-5 w-full focus:outline-hidden"
              />
              <i className="fa-regular fa-paper-plane fa-lg w-[30] mr-2" style={isClient ? { color: selectColor } : {}}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatInterface