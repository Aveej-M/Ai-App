'use client'
import React from 'react';
import SourceRight from '@/app/compenents/SourceRight';
import { useState } from 'react';
import Image from 'next/image';


const QA = () => {

  const [title, setTitle] = useState('');
  // const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [snippets, setSnippets] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);

  const [questions, setQuestions] = useState(['']);

  const [editTitle, setEditTitle] = useState('');
  const [editQuestion, setEditQuestion] = useState('');
  const [editAnswer, setEditAnswer] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [errors, setErrors] = useState({
    title: '',
    questions: [],
    answer: ''
});
  const [editErrors, setEditErrors] = useState({
    title: '',
    questions: [],
    answer: ''
});

  const handleAddSnippet = (e) => {
    e.preventDefault();

    if(title.trim() === '' || questions.some(q => q.trim() === '') || answer.trim() === '') return;

    setSnippets((prev) => [...prev, {title: title.trim(), question: [...questions], answer: answer.trim()}]);

    setTitle('');
    setQuestions(['']);
    setAnswer('');
  }

  const handleError = () => {
    let hasError = false;
    const errors = {
      title: '',
      questions: Array(editQuestion.length).fill(''),
      answer: ''
    };

    if(title.trim() === ''){
      errors.title = 'Title is required'
      hasError = true;
    }

    if(questions.some(q => q.trim() === '')){
      errors.questions = 'Question is required'
      hasError = true;
    }

    if(answer.trim() === ''){
      errors.answer = 'Answer is required'
      hasError = true
    }


    if(hasError){
      setErrors(errors);
      return;
    }

    setErrors({
      title: '',
      answer: '',
      questions: []
    })
  }

  const handleReset = (e) => {
    setTitle('');
    setQuestions(['']);
    setAnswer('');
    setErrors({
      title: '',
      answer: '',
      questions: []
    })
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  }

  const handleRemoveQuestion = (index) => {
    const update = [...questions];
    update.splice(index, 1);
    setQuestions(update);
  }
  const handleRemoveEditQuestion = (i) => {
    const update = [...editQuestion];
    update.splice(i, 1);
    setEditQuestion(update);
  }

  const handleQuestionChange = (index, value) => {
    const update = [...questions]
    update[index] = value;
    setQuestions(update);

  }

  const handleDelete = (indextoDelete) => {
    setSnippets(snippets.filter((_, index) => index !== indextoDelete));
    setMenuIndex(null);

  }

  const handleEdit = (index) => {
    setEditIndex(editIndex === index ? null : index);
    setEditIndex(index);
    setEditTitle(snippets[index].title);
    console.log(snippets[index].title)
    setEditQuestion([...snippets[index].question]);
    console.log(snippets[index].question[1])
    setEditAnswer(snippets[index].answer);
    setMenuIndex(null);
  }

  const handleEditQuestionChange = (i, value) => {
    const updated = [...editQuestion];
    updated[i] = value;
    setEditQuestion(updated);
  }

  const handleSave = (index) => {
    let hasError = false;
    const errors = {
      title: '',
      questions: Array(editQuestion.length).fill(''),
      answer: ''
    };

    if(editTitle.trim() === ''){
      errors.title = 'Title is required'
      hasError = true;
    }
    editQuestion.forEach((q, i) => {
      if(q.trim() === ''){
        errors.questions[i] = 'Question is required'
        hasError = true
      }
    })
    if(editAnswer.trim() === ''){
      errors.answer = 'Answer is required'
      hasError = true
    }

    if(hasError){
      setEditErrors(errors);
      return;
    }

    setEditErrors({
      title: '',
      answer: '',
      questions: []
    })

    const updated = [...snippets];
    updated[index] = {title: editTitle, question: [...editQuestion], answer: editAnswer};
    setSnippets(updated);
    setEditIndex(null);
  }

  const handleCancel = () => {
    setEditIndex(null);
    setEditTitle('');
    setEditQuestion(['']);
    setAnswer('');
    setEditErrors({ 
      title: '',
      answer: '',
      questions: []})
  }


  return (
    <>
      <div className='w-[80%] gap-[20px] flex mt-[30px] ml-[30px] max-lg:flex-col'>
        <div className='overflow-y-scroll scrollbar-hide pb-[200px] pl-2 pt-1'>
          <div className='flex flex-col w-[95%] h-fit shadow-5 rounded-[5px]'>
          
            <h1 className='text-black text-2xl p-4 font-bold shadow-19'>
                Q&A
            </h1>
        
            <div className="h-auto flex justify-start items-center flex-col">
                
            <form 
              onClick={handleAddSnippet}
              className="h-auto flex justify-start py-10 items-start text-black flex-col px-10 gap-2">
                  <p className='text-[15px] text-gray-600'>Craft responses for important questions, ensuring your AI Agent shares the most relevant info. Use Custom
                  Answers for enhanced engagement.</p>

                  <label htmlFor="title" className='font-bold' >Title</label>
                  <input id='title' type="text" placeholder='Enter Title' required value={title} onChange={(e) => setTitle(e.target.value)}
                  className='w-full h-[50] p-2 rounded border border-gray-300 outline-none'
                  />
                  {errors.title && (
                    <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
                  )}

                  <div className='flex flex-col w-full'>
                    <label htmlFor="question" className='font-bold'>Question</label>
                    {questions.map((q, index) => (
                      <div key={index}>
                      <div className='relative w-full mb-2'>
                         <input 
                         type="text" 
                         id='question' 
                         placeholder='Enter Question' 
                         required 
                         value={q} 
                         onChange={(e) => handleQuestionChange(index, e.target.value)}
                         className='w-full h-[50] p-2 rounded border border-gray-300 outline-none bg-white!' />

                        {questions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveQuestion(index)}
                                className='absolute right-2 top-1/2 -translate-y-1/2 text-red-500 font-bold text-xl bg-white w-[25]'
                              >
                                ×
                              </button>
                            )}
                        
                      </div>
                      {errors.questions && (
                          <p className='text-red-500 text-sm mt-1'>{errors.questions}</p>
                        )}
                      </div>
                    ))}
                   

                    <div className='w-fit items-center h-[20] my-4 text-green-600 flex gap-1.5 cursor-pointer'
                      onClick={handleAddQuestion}
                    >
                        <Image 
                          className='w-[15] h-[15]'
                          src="/SourceIcons/Add 1.png"
                          alt="Plus icon"
                          height={15}
                          width={15}
                        />
                        <span>Add Question</span>
                    </div>
                  </div>


                  <label htmlFor="answer" className='font-bold'>Answer</label> 
                  <textarea name="" id="answer" rows={5} maxLength={2097000} placeholder='Enter Description' required value={answer} onChange={(e) => setAnswer(e.target.value)}
                  className='border border-gray-300 w-full p-2 rounded outline-none resize-none'></textarea>
                  {errors.answer && (
                    <p className='text-red-500 text-sm mt-1'>{errors.answer}</p>
                  )}

                  <div className='flex justify-end w-full gap-[20] mt-5'>
                    <button className='h-[40] w-[100] shadow rounded border border-gray-400 text-gray-500' 
                    onClick={() => handleReset()}
                    >
                      Reset
                    </button>
                    <button 
                    onClick={handleError}
                    type='submit'
                    className='h-[40] w-[150] border border-gray-300 rounded bg-green-500 font-bold text-white'>
                      Q&A
                    </button>
                  </div>
              </form>

            </div>
          </div>

          <div className='w-[95%] h-fit flex flex-col px-10 py-5 text-black gap-2 shadow-5 my-[20] rounded'>
            <p className='font-bold text-[20px]'>
              Q&A Sources
            </p>
            {snippets.length === 0 ? (
              <div className='flex-items w-full flex-col my-5'>
                <Image
                  src="/folder.png"
                  alt='Folder icon'
                  width={70}
                  height={40}
                />
                <p className='font-bold'>No Q&As added yet</p>
              </div>
            ) : (
              <div className='flex flex-col gap-2'>
                {snippets.map((item, index) => (
                  <div key={index}
                  className='border border-gray-300 p-4 rounded'
                  >
                    <div className='relative'>
                    <details>
                      <summary className='flex items-center gap-2 cursor-pointer'>
                        <Image 
                        className='drop'
                        src="/SourceIcons/drop.png"
                        alt="Drop icon"
                        width={15}
                        height={15}
                      /> <h1 className='text-gray-400'>{item.title}</h1>
                      
                      </summary>

                      <div className='py-2'>
                        <h1 className='text-gray-400'>Question:</h1>
                        {item.question.map((list, i) => (
                          <li key={i}>{list}</li>
                        ))}
                        
                      </div>
                      <div className='py-2'>
                        <h1 className='text-gray-400'>Answer:</h1>
                        <p className='text-[15px]'>{item.answer}</p>
                      </div>
                      
                    </details>

                    <div className='flex'>
                      <Image 
                          className='absolute top-[5] right-0 cursor-pointer'
                          src="/SourceIcons/three-dots.png"
                          alt='Three dots icon'
                          width={15}
                          height={15}
                          onClick={() => setMenuIndex(menuIndex == index ? null : index)}
                        />

                        {menuIndex == index && (
                          <div className='absolute right-0 top-[-76] border border-gray-400 rounded p-[3] text-gray-500 flex flex-col bg-white cursor-pointer shadow-19'>
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
                    </div>
                    
                    {editIndex === index && (
                    <div key={index} className='edit-form flex-items text-black fixed h-full w-full bg-black top-[0] left-0 z-10 modal-fade'>
                        <div className='w-[50%] h-[70%] bg-white p-5 flex flex-col gap-4 modal-slide-up'>

                          <h1 className='font-bold text-2xl'>Edit Form</h1>
                          <div className='relative'>
                            <label htmlFor="" className='text-gray-500'>Title <span className='text-red-500'>*</span></label>
                          <input type="text"
                              value={editTitle}
                              required
                              onChange={(e) => setEditTitle(e.target.value)}
                              className='w-full h-[50] p-2 rounded border border-gray-300 outline-none'
                        />
                        {editErrors.title && (
                          <p className='text-red-500 text-sm mt-1'>{editErrors.title}</p>
                        )}
                          </div>
                        
                        {editQuestion.map((list, i) => (
                          <div key={i} className='relative'>
                            <label htmlFor="" className='text-gray-500'>Questions <span className='text-red-500'>*</span></label>
                          <input type="text"
                          value={list}
                          required
                          onChange={(e) => handleEditQuestionChange(i, e.target.value)}
                          className='w-full h-[50] p-2 rounded border border-gray-300 outline-none'
                          />
                          {editQuestion.length > 1 && (
                            <button 
                            type='button'
                            onClick={() => handleRemoveEditQuestion(i)}
                            className='text-red-600 absolute top-[38] right-4'
                            >
                              x
                            </button>
                          )}

                          {editErrors.questions[i] && (
                            <p className='text-red-500 text-sm mt-1'>{editErrors.questions[i]}</p>
                          )}
                          </div>
                        ))}
                      
                        
                      <div className='relative'>
                      <label htmlFor="" className='text-gray-500'>Answer <span className='text-red-500'>*</span></label>
                        <textarea
                            value={editAnswer}
                            onChange={(e) => setEditAnswer(e.target.value)}
                            required
                            rows={5}
                            className='border border-gray-300 w-full p-2 rounded outline-none resize-none'
                        ></textarea>
                        {editErrors.answer && (
                          <p className='text-red-500 text-sm mt-1'>{editErrors.answer}</p>
                        )}
                      </div>

                        <div className='flex justify-end w-full gap-[20] mt-5'>
                          <button 
                          className='h-[40] w-[100] shadow rounded border border-gray-400 text-gray-500' onClick={handleCancel}>
                            Cancel
                          </button>
                          <button
                          type='submit' 
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
          
          

        </div>


        <SourceRight content='Q&A' files={snippets} />
      </div>
    </>
    
  )
}

export default QA