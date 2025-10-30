import React from 'react'

const TopicsBotreply = ({ objects, contacts, showForm, messages }) => {
 
  return (
    <>
    {!showForm && (
    <div className='py-5 h-[80%] w-[450px] max-w-[500px] flex items-center flex-col overflow-auto text-black'>
        Bot reply
        <div className='w-[80%] flex flex-col-reverse'>
            {objects && (objects).map((key, index) => (
                <div key={index} className="p-3 bg-gray-300 rounded shadow mb-2">
                {key}
                </div>
            ))}

            {contacts.map((c, index) => (
                <div key={index} className="text-left bg-gray-300 p-3 flex min-h-[50] w-fit max-w-[60%] rounded-t-lg rounded-br-lg shadow">
                <div>{c.Name}</div>
                </div>          
            ))}


            {/* {messages.map((msg, i) => (
              <div key={i} className="text-left bg-gray-300 p-3 flex min-h-[50] w-fit max-w-[60%] rounded-t-lg rounded-br-lg shadow">
                  <div>{msg.text}</div>
              </div> 
            ))} */}
        </div>
    </div>
    )}
    </>
  )
}

export default TopicsBotreply