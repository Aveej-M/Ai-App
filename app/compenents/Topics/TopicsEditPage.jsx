'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ActionHead from "../ActionHead";
import TopicsLayoutHeader from "./TopicsLayoutHeader";


const TopicsEditPage = ({ topic, showForm, setShowForm, setShowTopics }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [name, setName] = useState(topic.name);
  const [description, setDescription] = useState(topic.description);
  const [scope, setScope] = useState(topic.scope);
  const [instructions, setInstructions] = useState(topic.instructions);
  const [notification, setNotification] = useState({ message: '', visibility: false, type: '' });
  const [error, setError] = useState({
    name: '',
    description: '',
    scope: '',
    instructions: []
  })

  const handleAddInstructions = () => {
    setInstructions([...instructions, '']);
  }

  const handleRemoveInstructions = (index) => {
    const updateInstruction = [...instructions];
    updateInstruction.splice(index, 1);
    setInstructions(updateInstruction);
  }

  const handleError = () => {
    let hasError = false;
    const errors = {
      name: '',
      description: '',
      scope: '',
      instructions: Array(instructions.length).fill('')
    };

    if (name.trim() === '') {
      errors.name = 'Name field is required';
      hasError = true;
    }

    if (description.trim() === '') {
      errors.description = 'Description field is required';
      hasError = true;
    }

    if (scope.trim() === '') {
      errors.scope = 'Scope field is required';
      hasError = true;
    }

    instructions.forEach((instruction, index) => {
      if (instruction.trim() === '') {
        errors.instructions[index] = 'Instruction is required';
        hasError = true;
      }
    });

    setError(errors);
    setNotification({
      message: 'Please fix the errors in the form',
      visibility: true,
      type: 'error',
    });

    if (hasError) {
      setTimeout(() => {
        setNotification({
          message: '',
          visibility: false,
          type: '',
        });
        setError({
          name: '',
          description: '',
          scope: '',
          instructions: Array(instructions.length).fill('')
        });
      }, 3000);
    }
    return hasError;
  };


  const handleUpdateToServer = async (e) => {
    e.preventDefault();
    const hasError = handleError(); // Run validation

    if (hasError) {
      setNotification({
        message: 'Please fix the errors in the form',
        visibility: true,
        type: 'error',
      });
      setTimeout(() => {
        setNotification(prev => ({ ...prev, visibility: false }))
      }, 3000)
      return;
    }

    const data = {
      id: topic.id,
      name,
      description,
      scope,
      instructions,
    };

    try {
      const response = await fetch('/api/edit-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Server-side error message (e.g., "Name already exists")
        setNotification({
          message: result.error || 'Failed to save data',
          visibility: true,
          type: 'error',
        });
      } else {
        setNotification({
          message: result.message || 'Data saved successfully!',
          visibility: true,
          type: 'success',
        });

        setTimeout(() => {
          router.push('/ai/topics');
          router.refresh();
        }, 1500);

      }
    } catch (error) {
      console.error('Error saving to server:', error);
      setNotification({
        message: 'Server error occurred',
        visibility: true,
        type: 'error',
      });
    }

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visibility: false }));
    }, 3000);

  };

  return (
    <>
      <div className="px-5 py-3 justify-items sticky top-0 bg-white z-10 border-b border-gray-300">
        <div className="flex-items">
          <i onClick={() => setShowTopics(true)}
            className="fa-solid fa-arrow-left cursor-pointer hover:text-green-400 transition"></i>
          <h1>Topics Details</h1>
        </div>
        <div className="cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm === true ?
            <i className="fa-solid fa-arrow-right-to-bracket text-[20px] hover:text-green-500 rotate-180"></i> :
            <i className="fa-solid fa-arrow-right-from-bracket text-[20px] hover:text-green-500"></i>}

        </div>
      </div>

      {/* <div className="" > */}
      {step === 1 && (
        <div className="text-black w-full flex-items">
          <form onSubmit={handleUpdateToServer} className='flex flex-col w-full h-full'>

            <div className=" overflow-y-auto h-[60dvh] overflow-x-hidden">
              <TopicsLayoutHeader step={step} setStep={setStep} />

              <div className="p-5">
                <div className="">
                  <div>
                    <label htmlFor="name">
                      <span className='text-red-500'>*</span> Name
                    </label>
                    <input type="text"
                      id='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className='topic-formInput h-10 mb-2'
                    />
                    {error.name && <p className="text-red-500 text-sm mb-2 w-[97%]">{error.name}</p>}
                  </div>

                  <div className={`${showForm ? "grid grid-cols-2 gap-2" : "block"}`}>
                    <div>
                      <div className="flex items-center gap-2 mt-2">
                        <label htmlFor="description">
                          <span className="text-red-500">*</span> Classification Description
                        </label>
                        <div className="relative group flex items-center z-0">
                          <button type="button">
                            <i className="fa-sm fa-solid fa-circle-info text-gray-500 group-hover:text-green-500"></i>
                          </button>

                          {/* Tooltip Box */}
                          <div className="absolute z-10 left-0 -translate-x-1/2 bottom-[120%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                            An agent uses this description to determine when to use your topic in a conversation, based on your user's intent.
                            {/* Tooltip Arrow */}
                            <div className="absolute left-33.5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                          </div>
                        </div>
                      </div>
                      <textarea name=""
                        id="description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className='topic-formInput py-3'></textarea>
                      {error.description && <p className="text-red-500 text-sm mb-2 w-[97%]">{error.description}</p>}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mt-2">
                        <label htmlFor="description">
                          <span className="text-red-500">*</span> Scope
                        </label>
                        <div className="relative group flex items-center z-0">
                          <button type="button">
                            <i className="fa-sm fa-solid fa-circle-info text-gray-500 group-hover:text-green-500"></i>
                          </button>

                          {/* Tooltip Box */}
                          <div className="absolute z-10 left-28.5 -translate-x-1/2 bottom-[120%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                            The scope tells an agent what it's able to do within your topic.
                            {/* Tooltip Arrow */}
                            <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                          </div>
                        </div>
                      </div>
                      <textarea name=""
                        id="scope"
                        rows={4}
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        required
                        className='topic-formInput py-3 '></textarea>
                      {error.scope && <p className="text-red-500 text-sm mb-2 w-[97%]">{error.scope}</p>}
                    </div>
                  </div>
                </div>

                <hr className="text-gray-500 mt-5" />

                <div className='flex flex-col my-8'>
                  <div className="flex gap-2">
                    <h1 className='text-[20px]'>Instructions</h1>
                    <div className=" relative group flex items-center z-0">
                      <button type="button">
                        <i className="fa-sm fa-solid fa-circle-info text-gray-500 group-hover:text-green-500"></i>
                      </button>

                      {/* Tooltip Box */}
                      <div className="absolute z-10 left-25.5 -translate-x-1/2 bottom-[100%] w-58 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                        Instructions help an agent make decisions about how to use the actions in a topic for different use cases. For example, ask an agent to collect clarifying information before running an action. Or tell an agent how to choose between different actions.
                        {/* Tooltip Arrow */}
                        <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                      </div>
                    </div>
                  </div>
                  <p>The following instructions are used to run this topic.</p>
                  {instructions.map((step, index) => (
                    <div key={index} className="flex flex-col my-2 relative border border-white p-2 rounded hover:border-gray-500 hover:bg-gray-200 focus-within:border-green-400 focus-within:bg-green-50 transition">
                      <div className="flex items-center gap-2">
                        <label><span className="text-red-500">*</span> Instruction</label>
                        <div className="relative group flex items-center z-0">
                          <button type="button">
                            <i className="fa-sm fa-solid fa-circle-info text-gray-500 group-hover:text-green-500"></i>
                          </button>

                          {/* Tooltip Box */}
                          <div className="absolute z-10 left-28.5 -translate-x-1/2 bottom-[110%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                            Instructions help an agent make decisions about how to use the actions in a topic for different use cases. For example, ask an agent to collect clarifying information before running an action. Or tell an agent how to choose between different actions.
                            {/* Tooltip Arrow */}
                            <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-items gap-3">
                        <textarea type="text"
                          value={step}
                          className="topic-formInput py-2 field-sizing-content overflow-hidden min-h-[70px] focus-within:bg-white"
                          required
                          onChange={(e) => {
                            const updated = [...instructions];
                            updated[index] = e.target.value;
                            setInstructions(updated);
                          }}
                        />

                        {instructions.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveInstructions(index)}
                            className="h-fit hover:bg-red-300 p-1.5 mt-2 rounded-2xl duration-300 ease-in-out"
                          >
                            <Image
                              className="w-4"
                              src="/Topics/trash.png"
                              alt="Delete icon"
                              width={10}
                              height={10}
                            />
                          </button>
                        )}
                      </div>
                      {error.instructions[index] && <p className="text-red-500 text-sm mb-2 w-[97%]">{error.instructions[index]}</p>}
                    </div>
                  ))}

                  <div className='w-fit items-center h-[20] border text-green-500 flex gap-1.5 cursor-pointer px-3 py-4 rounded hover:bg-green-100 transition-transform ease-in-out '
                    onClick={handleAddInstructions}
                  >
                    <span>Add Instructions</span>
                  </div>

                </div>
              </div>
            </div>

            <div className=" h-15 bg-gray-200 flex justify-center items-center gap-5 border-t-2 border-gray-300">
              <div className="w-full flex items-center justify-end gap-5 px-5">
                <button
                  type="button"
                  onClick={() => setShowTopics(true)}
                  className="w-[100px] px-4 py-2 text-green-400 border border-gray-400 rounded hover:bg-gray-100 hover:text-green-500 transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleUpdateToServer}
                  className="w-[100px] px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <ActionHead step={step} setStep={setStep} />
      )}

      {notification.visibility && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-md text-sm transition-opacity duration-300
          ${notification.type === 'success' ? 'bg-green-100 text-green-500 border border-green-400' : 'bg-red-100 border border-red-500 text-red-500'}`}
        >
          {notification.message}
        </div>
      )}
      {/* </div> */}
    </>
  )
}

export default TopicsEditPage