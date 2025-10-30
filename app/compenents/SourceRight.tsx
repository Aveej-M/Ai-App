import React from 'react';

interface Props{
  files: File[],
  content: string
}

const SourceRight: React.FC<Props> = ({files, content}) => {
  return (
    <div>
        <div className='w-[350px] h-[220px] mr-[30px] rounded shadow-5 p-5 text-black '>
            <h1 className='mb-2 text-[20px] font-bold'>Sources</h1>
            <p className='mb-2 text-[16px] font-mono text-gray-400'>{files.length}: {content}</p>
            <p className='mb-10 text-[16px] font-mono text-gray-400'>Total: {files.length}/0</p>

            <button className={`${files.length == 0 ? 'h-[40px] w-full border border-gray-300 bg-gray-200 rounded text-gray-500 font-semibold' : 'h-[40px] w-full border border-gray-300 bg-green-500 text-white font-bold rounded'} `}>
                Train Chatbot
            </button>
        </div>
    </div>
  )
}

export default SourceRight