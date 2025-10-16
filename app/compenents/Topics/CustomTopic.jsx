'use client'
import React from "react";
import { useState } from "react";
import Image from "next/image";

const CustomTopic = ({ setStep, formData, setFormData, notification, setNotification, error, setError, handleError, handleChange }) => {
  const [snippets, setSnippets] = useState([]);
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [scope, setScope] = useState('');
  // const [instructions, setInstructions] = useState(['']);
  // const [notification, setNotification] = useState({message: '', visibility: false, type: ''});
  // const [error, setError] = useState({
  //   name: '',
  //   description: '',
  //   scope: '',
  //   instructions: []
  // })

  const handleAddSnippets = () => {
    const errors = {
      name: '',
      description: '',
      scope: '',
      instructions: Array(formData.instructions.length).fill('')
    };
    let hasError = false;

    if (formData.name.trim() === '') {
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

    formData.instructions.forEach((instruction, index) => {
      if (instruction.trim() === '') {
        errors.instructions[index] = 'Instruction is required';
        hasError = true;
      }
    });

    setError(errors);

    if (hasError) {
      setNotification({
        message: 'Please fix the errors in the form',
        visibility: true,
        type: 'error',
      });
      return;
    }

    // Add new snippet if valid
    setSnippets((prev) => [
      ...prev,
      {
        name: formData.name.trim(),
        description: formData.description.trim(),
        scope: formData.scope.trim(),
        instructions: formData.instructions.map(ins => ins.trim()),
        inputs: formData.inputs.map(ins => ins.trim()),
      }
    ]);

    // Reset state
    // setName('');
    // setDescription('');
    // setScope('');
    // setInstructions(['']);
    // setError({ name: '', description: '', instructions: [] });
  };


  const handleAddInstructions = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }))
  }

  const handleAddInputs = () => {
    setFormData((prev) => ({
      ...prev,
      inputs: [...prev.inputs, '']
    }))
  }

  const handleRemoveInstructions = (i) => {
    const updateInstruction = [...formData.instructions];
    updateInstruction.splice(i, 1);
    setFormData(prev => ({
      ...prev,
      instructions: updateInstruction
    }));
  }

  //   const handleError = () => {
  //   let hasError = false;
  //   const errors = {
  //     name: '',
  //     description: '',
  //     scope: '',
  //     instructions: Array(formData.instructions.length).fill('')
  //   };

  //   if (formData.name.trim() === '') {
  //     errors.name = 'Name field is required';
  //     hasError = true;
  //   }

  //   else if (formData.description.trim() === '') {
  //     errors.description = 'Description field is required';
  //     hasError = true;
  //   }

  //   else if (formData.scope.trim() === '') {
  //     errors.scope = 'Scope field is required';
  //     hasError = true;
  //   } else {

  //   formData.instructions.forEach((instruction, index) => {
  //     if (instruction.trim() === '') {
  //       errors.instructions[index] = 'Instruction is required';
  //       hasError = true;
  //     }
  //   });
  //   }

  //   setError(errors);
  //   setNotification({
  //     message: 'Please fix the errors in the form',
  //     visibility: true,
  //     type: 'error',
  //   });

  //   if (hasError) {
  //     setTimeout(() => {
  //       setNotification({
  //         message: '',
  //         visibility: false,
  //         type: '',
  //       });
  //       setError({
  //         name: '',
  //         description: '',
  //         scope: '',
  //         instructions: Array(formData.instructions.length).fill('')
  //       });
  //     }, 3000);
  //   }

  //   return !hasError;
  // };

  // const handleChange = (field, value) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData(prev => ({
      ...prev,
      instructions: updatedInstructions
    }));
  };

  const handleNext = () => {
    const hasError = handleError(); // Run validation

    if (!hasError) {
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

    setStep(3)
    setNotification({ visibility: false })
  }

  // const handleSaveToServer = async (e) => {
  //   e.preventDefault();
  //   const hasError = handleError(); // Run validation

  //   if (!hasError) {
  //     setNotification({
  //       message: 'Please fix the errors in the form',
  //       visibility: true,
  //       type: 'error',
  //     });
  //     setTimeout(() => {
  //       setNotification(prev => ({...prev, visibility: false}))
  //   }, 3000)
  //     return;
  //   }

  //   const data = {
  //     name: formData.name,
  //     description: formData.description,
  //     scope: formData.scope,
  //     instructions: formData.instruction,
  //   };

  //   try {
  //     const response = await fetch('/api/save-action', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       // Server-side error message (e.g., "Name already exists")
  //       setNotification({
  //         message: result.error || 'Failed to save data',
  //         visibility: true,
  //         type: 'error',
  //       });
  //     } else {
  //       setNotification({
  //         message: result.message || 'Data saved successfully!',
  //         visibility: true,
  //         type: 'success',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error saving to server:', error);
  //     setNotification({
  //       message: 'Server error occurred',
  //       visibility: true,
  //       type: 'error',
  //     });
  //   }

  //   // Hide notification after 3 seconds
  //   setTimeout(() => {
  //     setNotification((prev) => ({ ...prev, visibility: false }));
  //   }, 3000);
  // };


  return (
    <>
      <div className='w-full flex-items'>
        <form action={handleAddSnippets} className='flex flex-col px-5 max-h-[65dvh] w-full'>
          <div className="h-full mb-5 overflow-x-auto scrollbar-hide">
            <label htmlFor="name"><span className="text-red-500">*</span> Name</label>
            <input type="text"
              id="name"
              placeholder='Enter Name'
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className='topic-formInput h-10 mb-2' />
            {error.name && <p className="text-red-500 text-sm mb-2">{error.name}</p>}

            <div className="flex items-center gap-2">
              <label htmlFor="description"><span className="text-red-500">*</span> Classification Description</label>
              <div className="relative group flex items-center">
                <button type="button">
                  <i className="fa-sm fa-solid fa-circle-info text-gray-500 hover:text-green-500"></i>
                </button>

                {/* Tooltip Box */}
                <div className="absolute z-10 left-28.5 -translate-x-1/2 bottom-[120%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                  An agent uses this description to determine when to use your topic in a conversation, based on your user's intent.

                  {/* Tooltip Arrow */}
                  <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                </div>
              </div>
            </div>
            <textarea name=""
              id="description"
              placeholder="In 1-3 sentences, describe what your topic does and the types of user requests that should be classified into this topic."
              rows={2}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
              className='topic-formInput py-3'></textarea>
            {error.description && <p className="text-red-500 text-sm mb-2 w-[97%]">{error.description}</p>}

            <div className="flex items-center gap-2">
              <label htmlFor="description"><span className="text-red-500">*</span> Scope</label>
              <div className="relative group flex items-center">
                <button type="button">
                  <i className="fa-sm fa-solid fa-circle-info text-gray-500 hover:text-green-500"></i>
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
              placeholder='Give your topic a job description, and be specified. For example, "Your job is only to..."'
              rows={2}
              value={formData.scope}
              onChange={(e) => handleChange('scope', e.target.value)}
              required
              className='topic-formInput py-3'></textarea>
            {error.scope && <p className="text-red-500 text-sm mb-2 w-[97%]">{error.scope}</p>}


            <div className='flex flex-col my-8'>
              <div className="flex items-center gap-2">
                <h1 className="text-[20px]">Instructions</h1>
                <div className="relative group flex items-center">
                  <button type="button">
                    <i className="fa-sm fa-solid fa-circle-info text-gray-500 hover:text-green-500"></i>
                  </button>

                  {/* Tooltip Box */}
                  <div className="absolute left-28.5 -translate-x-1/2 bottom-[120%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                    Instructions help an agent make decisions about how to use the actions in a topic for different use cases. For example, ask an agent to collect clarifying information before running an action. Or tell an agent how to choose between different actions.

                    {/* Tooltip Arrow */}
                    <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                  </div>
                </div>
              </div>
              <p>The following instructions are used to run this topic.</p>
              {formData.instructions.map((i, index) => (
                <div key={index} className={`flex flex-col my-2 relative ${formData.instructions.length == 1 ? 'w-full' : 'w-[94%]'}`}>
                  <div className="flex items-center gap-2">
                    <label htmlFor="instruction"><span className="text-red-500">*</span> Instruction {index + 1}</label>

                    <div className="relative group flex items-center">
                      <button type="button">
                        <i className="fa-sm fa-solid fa-circle-info text-gray-500 hover:text-green-500"></i>
                      </button>

                      {/* Tooltip Box */}
                      <div className="absolute left-28.5 -translate-x-1/2 bottom-[120%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                        Instructions help an agent make decisions about how to use the actions in a topic for different use cases. For example, ask an agent to collect clarifying information before running an action. Or tell an agent how to choose between different actions.

                        {/* Tooltip Arrow */}
                        <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-items gap-3">
                    <textarea name=""
                      id="instruction"
                      placeholder='Define a topic-specific instruction for how an agent should use available actions. For example, "Always...", "Never...", "If x, then y..."'
                      value={i}
                      onChange={e => handleInstructionChange(index, e.target.value)}
                      className="topic-formInput py-2 field-sizing-content overflow-hidden min-h-[70px]"
                      required
                    ></textarea>

                    {formData.instructions.length > 1 && (
                      <button
                        type="submit"
                        onClick={() => handleRemoveInstructions(index)}
                        className="h-fit mt-2 hover:bg-red-300 p-1.5 rounded-2xl duration-300 ease-in-out"
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
                  {error.instructions[index] && (
                    <p className="text-red-500 text-sm mt-1">{error.instructions[index]}</p>
                  )}
                </div>
              ))}


              <div className='w-fit items-center h-[20] border text-green-500 flex gap-1.5 cursor-pointer px-3 py-4 rounded hover:bg-green-100 transition-transform ease-in-out '
                onClick={handleAddInstructions}
              >
                <span>Add Instructions</span>
              </div>
            </div>

            <div className='flex flex-col my-8'>
              <div className="flex items-center gap-2">
                <h1 className="text-[20px]">Example User Input</h1>
                <div className="relative group flex items-center">
                  <button type="button">
                    <i className="fa-sm fa-solid fa-circle-info text-gray-500 hover:text-green-500"></i>
                  </button>

                  {/* Tooltip Box */}
                  <div className="absolute left-28.5 -translate-x-1/2 bottom-[120%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                    Examples of user input help guide the agent with recommended actions for the topic. If this section is empty, the recommendation engine makes decisions based on conversation and other context.

                    {/* Tooltip Arrow */}
                    <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                  </div>
                </div>
              </div>
              <p>Add examples of questions or requests that could trigger this topic.</p>
              {formData.inputs.map((i, index) => (
                <div key={index} className={`flex flex-col my-2 relative ${formData.inputs.length == 1 ? 'w-full' : 'w-[94%]'}`}>
                  <div className="flex items-center gap-2">
                    <label htmlFor="instruction">Example User Input {index + 1}</label>

                    <div className="relative group flex items-center">
                      <button type="button">
                        <i className="fa-sm fa-solid fa-circle-info text-gray-500 hover:text-green-500"></i>
                      </button>

                      {/* Tooltip Box */}
                      <div className="absolute left-28.5 -translate-x-1/2 bottom-[120%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                        Examples of user input help guide the agent with recommended actions for the topic. If this section is empty, the recommendation engine makes decisions based on conversation and other context.
                        {/* Tooltip Arrow */}
                        <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-items gap-3">
                    <textarea name=""
                      id="instruction"
                      placeholder='Example User Input'
                      value={i}
                      onChange={e => handleInstructionChange(index, e.target.value)}
                      className="topic-formInput py-2 field-sizing-content overflow-hidden min-h-[70px]"
                      required
                    ></textarea>

                    <button
                      type="submit"
                      // onClick={() => handleRemoveInstructions(index)}
                      className="h-fit mt-2 hover:bg-red-300 p-1.5 rounded-2xl duration-300 ease-in-out"
                    >
                      <Image
                        className="w-4"
                        src="/Topics/trash.png"
                        alt="Delete icon"
                        width={10}
                        height={10}
                      />
                    </button>
                  </div>
                </div>
              ))}

              <div className='w-fit items-center h-[20] border text-green-500 flex gap-1.5 cursor-pointer mt-2 px-3 py-4 rounded hover:bg-green-100 transition-transform ease-in-out '
                onClick={handleAddInputs}
              >
                <span>Add Example Input</span>
              </div>


            </div>
          </div>

          <div className="justify-items -mx-5 px-5 py-3 border-t-2 border-gray-400">
            <button
              onClick={() => setStep(1)}
              className="h-10 border border-gray-400 hover:bg-gray-100 hover:text-green-600 w-20 rounded text-green-500">
              Back
            </button>

            <div className="flex-items-2 gap-1">
              <i className="fa-lg fa-solid fa-circle-check text-green-500"></i>
              <hr className="text-green-500 w-25 border rounded" />
              {notification.visibility && notification.type === 'error' ? (
                <i className="fa-solid fa-ban text-red-500"></i>
              ) : (
                <div className="h-[18px] w-[18px] bg-green-500 rounded-2xl flex-items">
                  <span className="h-[10px] w-[10px] bg-white rounded-2xl"></span>
                </div>
              )}
              <hr className="text-gray-400 w-25 border rounded" />
              <div className="h-[10] w-[10] bg-gray-400 rounded-2xl"></div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="h-10 border bg-green-500 hover:bg-green-600 w-20 rounded text-white"
            >
              Next
            </button>

          </div>
        </form>
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

export default CustomTopic