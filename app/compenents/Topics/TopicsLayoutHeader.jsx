'use client'
import { useState } from "react"

const TopicsLayoutHeader = ({ step, setStep }) => {
  // const [step, setStep] = useState(1);


  return (
    <>
      <div className="text-black z-10">
        <div className="h-[45px] shadow px-10 flex items-center gap-5 bg-white z-1">
          <button
            onClick={() => setStep(1)}
            className={`flex items-center ${step === 1
              ? 'border-b-2 border-green-500 text-green-500 font-semibold'
              : 'text-gray-600 hover:text-green-500'
              }`}
          >
            Topic Configuration
          </button>
          <button
            onClick={() => setStep(2)}
            className={`flex items-center ${step === 2
              ? 'border-b-2 border-green-500 text-green-500 font-semibold'
              : 'text-gray-600 hover:text-green-500'
              }`}
          >
            Topic Actions
          </button>
        </div>

      </div>
    </>
  )
}

export default TopicsLayoutHeader