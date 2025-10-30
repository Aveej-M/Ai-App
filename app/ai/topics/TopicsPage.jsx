'use client'
import React, { useState, useEffect } from "react";
import ClientTopics from "../../compenents/Topics/ClientTopics";
import CustomTopic from "../../compenents/Topics/CustomTopic";
import ActionsForm from "../../compenents/Topics/ActionsForm";
import TopicsChatbot from "../../compenents/Topics/Chatbot";
import TopicsEditPage from "../../compenents/Topics/TopicsEditPage";
import { useRouter } from "next/navigation";

// Separate client-side component
function TopicsPage({ topicData }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [notification, setNotification] = useState({ message: '', visibility: false, type: '' });
  const [showTopics, setShowTopics] = useState(true);
  const [topicId, setTopicId] = useState(null);
  const [error, setError] = useState({
    name: '',
    description: '',
    scope: '',
    instructions: []
  })
  const [formData, setFormData] = useState({
    topicDescription: '',
    name: '',
    description: '',
    scope: '',
    instructions: [''],
    inputs: [''],
  });

  //   useEffect(() => {
  //   // Hide the notification whenever the step changes
  //   setNotification(prev => ({ ...prev, visibility: false }));
  // }, [step]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    setStep(step + 1);

  };
  const handleClose = () => {
    setShowModal(false);
    setFormData({
      topicDescription: '',
      name: '',
      description: '',
      scope: '',
      instructions: [''],
      inputs: [''],
    })
    setStep(1);
  };

  const handleError = () => {
    let hasError = false;
    const errors = {
      name: '',
      description: '',
      scope: '',
      instructions: Array(formData.instructions.length).fill('')
    };

    if (formData.name.trim() === '') {
      errors.name = 'Name field is required';
      hasError = true;
    }

    else if (topicData.some(topic => topic.name.trim().toLowerCase() === formData.name.trim().toLowerCase())) {
      errors.name = 'Name already exists';
      hasError = true;
    }

    else if (formData.description.trim() === '') {
      errors.description = 'Description field is required';
      hasError = true;
    }

    else if (formData.scope.trim() === '') {
      errors.scope = 'Scope field is required';
      hasError = true;
    } else {

      formData.instructions.forEach((instruction, index) => {
        if (instruction.trim() === '') {
          errors.instructions[index] = 'Instruction is required';
          hasError = true;
        }
      });
    }

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
          instructions: Array(formData.instructions.length).fill('')
        });
      }, 3000);
    }

    return !hasError;
  };


  const handleSaveToServer = async (e) => {
    e.preventDefault();
    const hasError = handleError(); // Run validation

    setNotification({
      visibility: true,
      type: "info", // can be 'info' for gray/neutral
      message: "Saving..."
    });

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

    const data = {
      topicDescription: formData.topicDescription,
      name: formData.name,
      description: formData.description,
      scope: formData.scope,
      instructions: formData.instructions,
      inputs: formData.inputs,
    };

    try {
      const response = await fetch('/api/save-action', {
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
          handleClose();
          window.location.reload();
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

  const matchedTopic = topicData.find(
    (topic) => topic.id === topicId
  );

  return (
    <>
      <div className="flex justify-between w-full overflow-auto">
        <div className={`${!showForm ? 'w-[400px]' : 'w-full'} min-w-[300px] h-full text-black shadow-right ${showTopics ? "overflow-auto" : "overflow-hidden"}`}>
          {showTopics && (
            <div>
              <div className="px-5 py-3 border-b border-gray-300 justify-items sticky top-0 bg-white z-10">
                <h1>Topics</h1>
                <div className="cursor-pointer"
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm === true ?
                    <i className="fa-solid fa-arrow-right-to-bracket text-[20px] hover:text-green-500 rotate-180"></i> :
                    <i className="fa-solid fa-arrow-right-from-bracket text-[20px] hover:text-green-500"></i>}

                </div>
              </div>
              <div className="h-fit flex justify-between gap-2 pt-2 px-5">
                <p className={`${!showForm ? 'w-[65%]' : 'w-[50%]'}`}>Manage the topics assigned to your agent. To make changes, your agent must be deactivated.</p>
                <button
                  className="bg-green-500 hover:bg-green-600 align-middle rounded text-white w-30! h-[40] max-sm:mr-0"
                  onClick={() => setShowModal(true)}
                >
                  New Topics
                </button>
              </div>

              <div>
                <ClientTopics
                  topicData={topicData}
                  showForm={showForm}
                  setShowForm={setShowForm}
                  setTopicId={setTopicId}
                  setShowTopics={setShowTopics}
                />
              </div>

              {showModal && (
                <div className="fixed z-20 top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                  <div className="bg-white pt-1 rounded-lg w-[600px] max-h-[80vh] relative">
                    {/* Close Button */}
                    <button
                      onClick={handleClose}
                      className="absolute -top-11 right-0 text-gray-500 hover:text-black text-3xl bg-white px-2.5 rounded"
                    >
                      &times;
                    </button>
                    <h1 className="h-[50px] border-b-2 text-2xl text-gray-500 font-light! border-gray-400 w-full flex-items">Create a Topic</h1>

                    {/* Step 1: Show initial description and Next */}
                    {step === 1 && (
                      <>
                        <div className="h-fit w-full bg-white flex-items text-black flex-col rounded">

                          <div className="flex flex-col w-full justify-start">
                            <div className="flex items-center justify-start gap-2 px-5 pt-5">
                              <label htmlFor="">
                                What do you want this topic to do? (Optional)
                              </label>
                              <div className="relative group flex items-center">
                                <button type="button">
                                  <i className="fa-sm fa-solid fa-circle-info text-gray-500 hover:text-green-500"></i>
                                </button>

                                {/* Tooltip Box */}
                                <div className="absolute z-10 left-28.5 -translate-x-1/2 bottom-[110%] w-64 p-2 rounded bg-green-100 border border-green-500 text-[12px] text-black opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
                                  Describe what job you want this topic to perform. For example, "I'd like this topic to book flight reservations."
                                  {/* Tooltip Arrow */}
                                  <div className="absolute left-5 -translate-x-1/2 top-full w-2 h-2 bg-green-100 border-l border-t border-green-500 rotate-[-130deg] mt-[-4px]"></div>
                                </div>
                              </div>
                            </div>
                            <div className="px-5 pb-5">
                              <textarea
                                name=""
                                value={formData.topicDescription}
                                onChange={(e) => handleChange('topicDescription', e.target.value)}
                                id="topicDescription"
                                rows={5}
                                placeholder="Describe the job you want this topic to perform."
                                className="topic-formInput py-3"
                              >

                              </textarea>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 2: Show full form component */}
                    {step === 2 && (
                      <div className="mt-4 relative z-20">
                        <CustomTopic
                          setStep={setStep}
                          formData={formData}
                          setFormData={setFormData}
                          notification={notification}
                          setNotification={setNotification}
                          error={error}
                          setError={setError}
                          handleError={handleError}
                          handleChange={handleChange}
                        />
                      </div>
                    )}

                    {/* Step 3: Show Action form component */}
                    {step === 3 && (
                      <div className="">
                        <ActionsForm
                          setStep={setStep}
                          formData={formData}
                          handleSaveToServer={handleSaveToServer}
                          notification={notification}
                          setNotification={setNotification}
                        />
                      </div>
                    )}


                    <div className=" ">
                      {step === 1 && (
                        <div className="justify-items px-5 py-3 border-t-2 border-gray-400">
                          <button
                            onClick={handleClose}
                            className="h-10 border border-gray-400 hover:bg-gray-100 hover:text-green-600 w-20 rounded text-green-500">Cancel</button>

                          <div className="flex-items-2 gap-1">
                            <div className="h-[18] w-[18] bg-green-500 rounded-2xl flex-items">
                              <span className="h-[10] w-[10] bg-white rounded-2xl"></span>
                            </div>
                            <hr className="text-gray-400 w-25 border rounded" />
                            <div className="h-[10] w-[10] bg-gray-400 rounded-2xl"></div>
                            <hr className="text-gray-400 w-25 border rounded" />
                            <div className="h-[10] w-[10] bg-gray-400 rounded-2xl"></div>
                          </div>

                          <button
                            onClick={handleNext}
                            className="h-10 border bg-green-500 hover:bg-green-600 w-20 rounded text-white">Next</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!showTopics && (
            <>
              <div className="h-[100%]">
                {!matchedTopic ?
                  <div className="p-6 text-red-500">Topic not found: {topicId}</div> :
                  <TopicsEditPage
                    topic={matchedTopic}
                    showForm={showForm}
                    setShowForm={setShowForm}
                    setShowTopics={setShowTopics}
                    showTopics={showTopics}
                  />
                }
              </div>
              {/* // <TopicsEditPage topic={matchedTopic} /> */}
            </>
          )}
        </div>
        {/* <TopicsBotreply /> */}
        <TopicsChatbot showForm={showForm} setShowForm={setShowForm} />
      </div>
    </>
  );
}

export default TopicsPage