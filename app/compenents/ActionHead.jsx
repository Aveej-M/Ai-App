'use client'
import { useState } from "react";
import { actionTable } from "../data/actionTable"
import TopicsLayoutHeader from "./Topics/TopicsLayoutHeader";

const ActionHead = ({ step, setStep }) => {

  const [searchInput, setSearchInput] = useState('');
  const [wrapper, setWrapper] = useState(0);
  const [nameWrapper, setNameWrapper] = useState(true);
  const [textWrapper, setTextWrapper] = useState(true);
  const [sourceWrapper, setSourceWrapper] = useState(true);
  const [referenceWrapper, setReferenceWrapper] = useState(true);
  const [dateWrapper, setDateWrapper] = useState(true);
  const [creatorWrapper, setCreatorWrapper] = useState(true);

  const wrapperStates = {
    nameWrapper: [nameWrapper, setNameWrapper],
    textWrapper: [textWrapper, setTextWrapper],
    sourceWrapper: [sourceWrapper, setSourceWrapper],
    referenceWrapper: [referenceWrapper, setReferenceWrapper],
    dateWrapper: [dateWrapper, setDateWrapper],
    creatorWrapper: [creatorWrapper, setCreatorWrapper],
  };

  const handleReset = () => {
    setSearchInput('');
  }

  return (
    <>
      <div className="text-black">
        <TopicsLayoutHeader step={step} setStep={setStep} />
        <div className="w-full h-fit flex justify-between max-lg:gap-5 px-5 pt-5">
          <p className="w-[50%]">Manage the actions assigned to your topic. To add or remove actions, your agent must be deactivated.</p>
          <button
            className="bg-green-500 hover:bg-green-600 align-middle rounded text-white w-30 h-[40] max-sm:mr-0"

          >
            New Actions
          </button>
        </div>

        <div className="relative flex gap-2 my-4 max-sm:mr-0 px-5">
          <i className="fa-solid fa-magnifying-glass text-gray-500 absolute top-4.5 left-7"></i>
          <input type="text" placeholder='Search topics...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className='border border-gray-400 w-full mt-2 py-1 px-3 pl-8 rounded focus:outline-green-500 focus:border-green-500 hover:border-green-500'
          />
          <div
            onClick={handleReset}
            tabIndex={0}
            className="border border-gray-500 rounded w-fit items-center group flex mt-2 px-2 pt-1 
                hover:border-green-500 cursor-pointer 
                 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
            <i className="fa-solid fa-arrow-rotate-right text-gray-500 group-hover:text-green-500 group-focus:text-green-500 outline-0"></i>
          </div>
        </div>

        <p className="px-5">3 items • Sorted by Agent Action Label(asc)</p>
        <div className="min-h-[400] mt-3 overflow-x-auto max-sm:mr-0 scrollbar-hide">
          <table className="text-left table-auto w-full min-w-[900px] md:table">
            <thead>
              <tr className="bg-gray-200 h-10">
                {actionTable.map(({ name, wrapNo, stateKey }, index) => {
                  const [wrapValue, setWrapValue] = wrapperStates[stateKey];
                  return (
                    <th key={index} className="min-w-[150] max-w-[200] group h-10 relative hover:bg-white border-r-2 border-b border-gray-400 pl-2.5">
                      <div className="flex gap-3">
                        <span>{name}</span>
                        <div className=" flex-items cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                          <i className={`text-green-500 fa-solid fa-arrow-up `}></i>
                        </div>
                      </div>
                      <div>
                        <i className={`fa-solid fa-chevron-down text-[18px] text-gray-500 hover:text-green-500 cursor-pointer absolute right-3 top-3 `}
                          onClick={() => wrapper === 0 ? setWrapper(wrapNo) : setWrapper(0)}></i>
                        {wrapper === wrapNo && (
                          <div
                            className='absolute right-5 border-2 border-gray-400 rounded p-[3] text-gray-500 flex flex-col bg-white cursor-pointer gap-1 shadow-19'
                          >
                            <p className={`w-full px-[20] py-[5] rounded-[3] border-2 border-gray-100 shadow hover:border-2 hover:border-green-500 ${!wrapValue && 'border-2 border-green-500 bg-green-100'} `}
                              onClick={() => setWrapValue(false)}
                            >Wrap Text</p>
                            <p
                              className={`w-full px-[20] py-[5] rounded-[3] border-2 border-gray-100 shadow hover:border-2 hover:border-green-500 ${wrapValue && 'border-2 border-green-500 bg-green-100'} `}
                              onClick={() => setWrapValue(true)}
                            >Clip Text</p>
                          </div>
                        )}
                      </div>
                    </th>
                  )
                })}
                <th className="w-[50px] hover:bg-white"></th>

              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  )
}

export default ActionHead