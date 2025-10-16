'use client'
import integrations from "@/app/data/integerations";
import connect from "@/app/data/integerations";
import { customStyles } from "@/app/data/selectStyle";
import Image from "next/image";
import Select from 'react-select';
import { useState } from "react";

// const customStyles = {
//   control: (base, state) => ({
//     ...base,
//     height: '45px',
//     padding: '0 4px',
//     borderRadius: '5px',
//     marginTop: '0',
//     borderColor: '',
//     borderColor: state.isFocused ? '#22c55e' : 'oklch(70.7% 0.022 261.325)',
//     boxShadow: 'none',
//     '&:hover': {
//       borderColor: '#22c55e',
//     },
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isSelected
//       ? '#22c55e'
//       : state.isFocused
//       ? '#bbf7d0'
//       : 'white',
//     color: 'black',
//     padding: '10px 12px',
//     cursor: 'pointer',
//   }),

// };

const Integrations = () => {
  const [selectedIntegeration, setSelectedIntegeration] = useState(null);

  return (
    <>
      <div className="h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="p-5 grid grid-cols-3 max-lg:grid-cols-2 gap-6">
          {integrations.map(({ name, logo, label, button }, index) => (
            <div key={index} className="relative h-60 max-w-full border border-gray-200 shadow rounded-[5px] p-5 text-black hover:shadow-xl transition duration-300">
              {!button && (
                <div className="absolute -right-5 top-2 flex flex-col items-end">
                  <div className="h-6 w-35 bg-green-500 text-white rounded-t-[5px] rounded-l-[5px] flex items-center justify-center shadow-5">Coming Soon</div>
                  <div
                    className="h-0 w-0 absolute -right-4.5 top-6 box-shadow"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "0px solid transparent",
                      borderLeft: "20px solid green",
                      borderRight: "20px solid transparent",
                      borderBottom: "10px solid transparent",
                    }}
                  ></div>
                </div>
              )}


              <Image
                src={logo}
                alt={name}
                width={30}
                height={30}
                className="w-10"
              />
              <h1 className="pt-5 text-[17px]">{name}</h1>
              <p className="text-gray-500 text-[14px]">{label}</p>

              {button && (
                <div className="w-full text-center mt-6">
                  <button className="px-5 py-2 border border-gray-300 hover:border-green-500 hover:text-green-500 rounded-3xl text-[14px] shadow"
                    onClick={() => setSelectedIntegeration(index)}
                  >
                    Connect
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedIntegeration !== null && (
          <div className="fixed w-full h-full bg-black/50 top-0 left-0 flex justify-center">
            {connect.map(({ title, label }, index) => (
              <div key={index}>
                {index === selectedIntegeration && (
                  <div className={`text-black bg-white p-5 w-[600px] h-fit rounded mt-20 ${selectedIntegeration !== null ? "animate-[fadeIn_0.3s_ease-out]" : "animate-[fadeOut_0.3s_ease-in]"}`}>
                    <div className="flex gap-5 items-center justify-between pb-2">
                      <h1>{title}</h1>
                      <i className="fa-solid fa-xmark cursor-pointer" onClick={() => setSelectedIntegeration(null)}></i>
                    </div>
                    <p className="text-gray-400">{label}</p>
                    {/* <input type="text" className="form-input w-full! text-gray-400"/> */}
                    <Select
                      // id=""
                      // options={}
                      // value={}
                      // onChange={}
                      styles={customStyles}
                      placeholder={label}
                      isSearchable
                      className='w-full pt-2'
                      components={{
                        IndicatorSeparator: () => null
                      }}
                    />
                    <div className="pt-10 text-right w-full">
                      <button
                        className="h-10 border border-gray-400 hover:bg-gray-100 hover:text-green-600 w-20 rounded text-green-500"
                        onClick={() => setSelectedIntegeration(null)}
                      >Cancel</button>
                      <button className="h-10 border bg-green-500 hover:bg-green-600 w-20 rounded text-white ml-5">Save</button>
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
        )}

      </div>
    </>
  )
}

export default Integrations