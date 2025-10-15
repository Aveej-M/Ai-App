import { useEffect } from "react";

const ActionsForm = ({ setStep, handleSaveToServer, notification, setNotification }) => {

  // useEffect(() => {
  //   // Hide old notifications when this form loads
  //   setNotification(prev => ({ ...prev, visibility: false }));
  // }, []);

  


  return (
    <>
    <div className='p-5'>
      <p>Select the actions you want to include in your topic.</p>
      <div className="relative flex gap-2">
        <i className="fa-solid fa-magnifying-glass text-gray-500 absolute top-4.5 left-2"></i>
        <input type="search" placeholder='Search actions...'
        className='border border-gray-400 w-full mt-2 py-1 px-3 pl-8 rounded focus:outline-green-500 focus:border-green-500 hover:border-green-500'
        />
        <div className="border border-gray-500 rounded w-fit items-center flex mt-2 px-2 pt-1 hover:border-green-500 group">
          <i className="fa-solid fa-arrow-rotate-right text-gray-500 group-hover:text-green-500"></i>
        </div>
      </div>
    </div>
    <div className="justify-items px-5 py-3 border-t-2 border-gray-400">
      <button 
      onClick={() => setStep(2)}
      className="h-10 border border-gray-400 hover:bg-gray-100 hover:text-green-600 w-20 rounded text-green-500">
        Back
      </button>

      <div className="flex-items-2 gap-1">
        <i className="fa-lg fa-solid fa-circle-check text-green-500"></i>
        <hr className="text-green-500 w-25 border rounded"/>
        <i className="fa-lg fa-solid fa-circle-check text-green-500"></i>
        <hr className="text-green-500 w-25 border rounded"/>
       {notification.visibility && notification.type === 'error' ? (
          <i className="fa-solid fa-ban text-red-500"></i>
        ) : (
          <div className="h-[18px] w-[18px] bg-green-500 rounded-2xl flex-items">
            <span className="h-[10px] w-[10px] bg-white rounded-2xl"></span>
          </div>
        )}

      </div>

      <button
      type="button"
      onClick={handleSaveToServer}
      className="h-10 border bg-green-500 hover:bg-green-600 w-20 rounded text-white"
      >
        Finish
      </button>

      {notification.visibility && (
        <div
        className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-sm transition-opacity duration-300
          ${notification.type === 'success' ? 'bg-green-100 text-green-500 border border-green-400' : 'bg-red-100 border border-red-500 text-red-500'}`}
        >
        {notification.message}
        </div>
      )}
    </div>
    </>
  )
}

export default ActionsForm