"use client"
import { useState } from "react";

const LiveChat = () => {
    const [bookMark, setBookMark] = useState(true);

    return (
        <div className='pt-16.5 text-black h-screen w-full flex'>
            {/* Left Area */}
            <div className='w-[30%] h-full bg-gray-50'>
                <div>
                    <div className='p-5 flex items-center gap-3 shadow-11'>
                        <div className="relative group">
                            {bookMark ? (
                                <>
                                    <i onClick={() => setBookMark(false)} className="fa-solid fa-star text-green-500 cursor-pointer"></i>
                                    <span className='absolute z-20 -top-10 -left-11 w-30 py-1 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Add to bookMarks</span>
                                </>
                            ) : (
                                <>
                                    <i onClick={() => setBookMark(true)} className="fa-regular fa-star text-green-500 cursor-pointer"></i>
                                    <span className='absolute z-20 -top-10 -left-8 w-40 py-1 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Remove from bookMarks</span>
                                </>
                            )}

                            <div className="absolute -top-3 left-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/70 hidden group-hover:block" />
                        </div>
                        <h2 className='font-bold'>Live Chat</h2>
                    </div>
                    <div className='justify-items px-4 pt-1 pb-3'>
                        <div className='flex-items text-green-500 hover:bg-green-200 px-3 py-1 rounded-2xl transition-all duration-300 cursor-pointer'>
                            <i className="fa-solid fa-bars"></i>
                            <h2>My Open Chats</h2>
                        </div>
                        <div className='flex-items-2 gap-2'>
                            <i className="fa-solid fa-magnifying-glass text-sm hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                            <div className='relative group rounded-2xl'>
                                <i className="fa-solid fa-shuffle hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                                <span className='absolute -top-10 -left-8 w-25 py-1 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Bulk Update</span>
                                <div className="absolute -top-3 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/70 hidden group-hover:block" />
                            </div>
                            <div className='relative group rounded-2xl'>
                                <i className="fa-solid fa-sliders hover:bg-green-200 px-2 py-2 rounded-2xl transition-all duration-300 cursor-pointer"></i>
                                <span className='absolute -top-10 -left-8 w-25 py-1 hidden group-hover:block bg-black/70 text-white rounded text-sm text-center'>Bulk Update</span>
                                <div className="absolute -top-3 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black/70 hidden group-hover:block" />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 px-5 text-xs text-gray-500'>
                        <div className='px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-2xl'>All</div>
                        <div className='px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-2xl'>Unread</div>
                    </div>
                </div>

                <div className='flex-1 overflow-y-auto '>
                    <div className='h-full flex-items mt-8 text-sm text-gray-400'>
                        No Conversations Found
                    </div>
                </div>
            </div>

            {/* Right Area */}
            <div className='w-[70%] bg-gray-100'></div>
        </div>
    )
}

export default LiveChat