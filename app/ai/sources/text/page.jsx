'use client'
import SourceRight from '@/app/compenents/SourceRight';
import { useState } from 'react';
import Image from 'next/image';

const Text = () => {

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [snippets, setSnippets] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const [deleteMsg, setDeleteMsg] = useState('');
  const [error, setError] = useState({
    title: '',
    desc: ''
  })
  const [editError, setEditError] = useState({
    title: '',
    desc: ''
  })

  const handleAddSnippet = (e) => {
    e.preventDefault();

    if (title.trim() === '' || desc.trim() === '') return;

    setSnippets((prev) => [...prev, { title: title.trim(), desc: desc.trim() }]);

    setTitle('');
    setDesc('');
  };

  const handleReset = (e) => {
    e.preventDefault();
    setTitle('');
    setDesc('');
    setError({
      title: '',
      desc: ''
    })
  };

  const handleDelete = (indextoDelete) => {
    setSnippets(snippets.filter((_, index) => index !== indextoDelete));
    setMenuIndex(null);

    setDeleteMsg('Deleted Sucessfully');

    setTimeout(() => {
      setDeleteMsg('');
    }, 3000);

  }

  const handleEdit = (index) => {
    setEditIndex(editIndex === index ? null : index)
    setEditIndex(index);
    setEditTitle(snippets[index].title);
    setEditDesc(snippets[index].desc);
    setMenuIndex(null);
  }

  const handleSave = (index) => {
    let hasError = false;
    const error = {
      title: '',
      desc: ''
    }

    if (editTitle === '') {
      error.title = 'Title is required'
      hasError = true;
    }

    if (editDesc === '') {
      error.desc = 'Description is required'
      hasError = true;
    }

    if (hasError) {
      setEditError(error);
      return
    }

    setEditError({
      title: '',
      desc: ''
    })

    const updated = [...snippets];
    updated[index] = { title: editTitle, desc: editDesc };
    setSnippets(updated);
    setEditIndex(null);
  }

  const handleCancel = () => {
    setEditIndex(null);
    setEditTitle('');
    setEditDesc('');
    setEditError({
      title: '',
      desc: ''
    })
  }

  const handleError = () => {
    let hasError = false;
    const error = {
      title: '',
      desc: ''
    }

    if (title.trim() === '') {
      error.title = 'Title is required'
      hasError = true;
    }

    if (desc.trim() === '') {
      error.desc = 'Description is required'
      hasError = true;
    }

    if (hasError) {
      setError(error);
      return
    }

    setError({
      title: '',
      desc: ''
    })
  }



  return (
    <>
      <div className='w-[80%] gap-[20px] flex pl-5 max-lg:flex-col'>
        <div className='flex w-full flex-col overflow-y-scroll scrollbar-hide pl-2 pt-5'>
          <div className='flex flex-col w-[95%] h-fit shadow-5 rounded-[5px]'>

            <h1 className='text-black text-2xl p-4 font-bold shadow-19'>
              Text
            </h1>

            <form
              onSubmit={handleAddSnippet}
              className="h-auto flex justify-start py-10 items-start text-black flex-col px-10 gap-2">
              <p className='text-[15px] text-gray-600'>Add and process plain text- based sources to train your AI Agent with precise information.</p>

              <label htmlFor="title" className='font-bold' >Title <span className='text-red-500'>*</span></label>
              <input id='title' type="text" placeholder='Enter Title' value={title} required onChange={(e) => setTitle(e.target.value)}
                className='w-full h-[50] p-2 rounded border border-gray-300 outline-none'
              />
              {error.title && (
                <p className='text-red-500 text-sm mt-1'>{error.title}</p>
              )}


              <label htmlFor="description" className='font-bold'>Description <span className='text-red-500'>*</span></label>
              <textarea name="" id="description" rows={5} maxLength={2097000} placeholder='Enter Description' required value={desc} onChange={(e) => setDesc(e.target.value)}
                className='border border-gray-300 w-full p-2 rounded outline-none resize-none'></textarea>
              {error.desc && (
                <p className='text-red-500 text-sm mt-1'>{error.desc}</p>
              )}

              <div className='flex justify-end w-full gap-[20] mt-5'>
                <button className='h-[40] w-[100] shadow rounded border border-gray-400 text-gray-500' onClick={handleReset}>
                  Reset
                </button>
                <button
                  onClick={handleError}
                  type='submit'
                  className='h-[40] w-[150] border border-gray-300 rounded bg-green-500 font-bold text-white'>
                  Add Text Snippet
                </button>
              </div>
            </form>
          </div>

          <div className='w-[95%] h-fit flex flex-col py-5 px-10 text-black gap-2 shadow-5 my-[20] rounded'>
            <p className='font-bold text-[20px]'>
              Text sources
            </p>
            {snippets.length === 0 ? (
              <div className='flex-items w-full flex-col my-5'>
                <Image
                  src="/folder.png"
                  alt='Folder icon'
                  width={70}
                  height={40}
                />
                <p className=' '>No text snippets added</p>
              </div>

            ) : (
              <div className='flex flex-col gap-2'>
                {snippets.map((item, index) => (
                  <div key={index}
                    className='justify-items *:w-full border border-gray-300 px-4 py-2 rounded'
                  >
                    <div>
                      <h2 className='font-bold text-gray-600'>{item.title}</h2>
                      <p className='text-gray-400 w-[95%]'>{item.desc}</p>
                    </div>

                    <div className='relative flex justify-end w-fit' style={{ width: 15 }}>
                      <Image
                        onClick={() => setMenuIndex(menuIndex === index ? null : index)}
                        className='h-[15] w-[15] cursor-pointer'
                        src="/SourceIcons/three-dots.png"
                        alt='three dot icon'
                        height={10}
                        width={10}
                      />

                      {menuIndex === index && (
                        <div className='absolute right-0 top-[-76] border border-gray-400 rounded p-[3] text-gray-500 flex flex-col bg-white cursor-pointer gap-1 shadow-19'>
                          <p
                            className='hover:bg-gray-200 w-full px-[20] py-[5] rounded-[3] text-center'
                            onClick={() => handleEdit(index)}
                          >Edit</p>
                          <p
                            className='hover:bg-gray-200 w-full px-[20] py-[5] rounded-[3] text-center'
                            onClick={() => handleDelete(index)}
                          >Delete</p>
                        </div>
                      )}
                    </div>

                    {editIndex === index && (
                      <div key={index} className='edit-form flex-items text-black fixed h-full w-[50%] bg-black top-[0] left-0 z-20 modal-fade'>

                        <div className='w-[50%] h-[70%] bg-white p-5 flex flex-col gap-4 modal-slide-up'>

                          <h1 className='font-bold text-2xl'>Edit Form</h1>
                          <div>
                            <label htmlFor=""
                              className='text-gray-500'
                            >Title  <span className='text-red-500'>*</span></label>
                            <input type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className='w-full h-[50] p-2 rounded border border-gray-300 outline-none'
                            />
                            {editError.title && (
                              <p className='text-red-500 text-sm mt-1'>{editError.title}</p>
                            )}
                          </div>

                          <div>
                            <textarea
                              value={editDesc}
                              rows={5}
                              onChange={(e) => setEditDesc(e.target.value)}
                              className='border border-gray-300 w-full p-2 rounded outline-none resize-none'
                            ></textarea>
                            {editError.desc && (
                              <p className='text-red-500 text-sm mt-1'>{editError.desc}</p>
                            )}
                          </div>

                          <div className='flex justify-end w-full gap-[20] mt-5'>
                            <button className='h-[40] w-[100] shadow rounded border border-gray-400 text-gray-500' onClick={handleCancel}>
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSave(index)}
                              className='h-[40] w-[150] border border-gray-300 rounded bg-green-500 font-bold text-white'>
                              Save
                            </button>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>
          {deleteMsg && (
            <div id='delete'
              className="absolute bottom-[0] right-10 w-fit h-fit text-green-600 bg-green-100 border border-green-300 rounded p-2 mb-4 text-sm transition-opacity duration-500"
            >
              {deleteMsg}
            </div>

          )}
        </div>
        <div className='pt-5'>
          <SourceRight content='Text' files={snippets} />
        </div>

      </div>



    </>

  )
}

export default Text