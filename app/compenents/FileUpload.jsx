'use client';
import Image from 'next/image';
import React from 'react';

const MAX_SIZE_MB = 20;
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'text/plain', // .txt
];

const FileUpload = ({ files, setFiles }) => {
  const validateFiles = (fileList) => {
    const validFiles = [];

    Array.from(fileList).forEach((file) => {
      const isValidType = ALLOWED_TYPES.includes(file.type);
      const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024;

      if (isValidType && isValidSize) {
        validFiles.push(file);
      }
    });

    return validFiles;
  };

  const handleFiles = (selectedFiles) => {
    const validFiles = validateFiles(selectedFiles);
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleRemove = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-[95%] h-fit shadow-5 rounded-[5px]">
      <h1 className="text-black text-2xl p-4 font-bold shadow-19">
        Files
      </h1>

      <div className="h-auto flex justify-start pt-10 items-center flex-col">
        <label htmlFor="fileInput" className="w-full flex-items-2">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 w-[90%] h-[200px] flex-items flex-col"
          >
            <Image
              src="/upload.png"
              alt="Upload icon"
              width={60}
              height={40}
            />
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                if (e.target.files) {
                  handleFiles(e.target.files);
                  e.target.value = null;
                }
              }}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="cursor-pointer text-gray-600 font-bold">
              Drag & Drop / Browse Files<br />
              <span className="text-sm text-gray-400 font-light">
                (Only .pdf, .doc, .docx, .txt - Max 20MB each)
              </span>
            </label>
          </div>
        </label>

        {/* Uploaded Files List */}
        <div className="my-[40px] space-y-2 w-[90%]">
          {files.length === 0 ? (
            <p className="text-black font-semibold w-full text-center">No files uploaded</p>
          ) : (
            files.map((file, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white border p-2 rounded shadow-sm"
              >
                <p className="text-sm text-black truncate w-4/5">{file.name}</p>
                <button
                  className="text-red-500 hover:text-red-700 font-bold text-lg"
                  onClick={() => handleRemove(index)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
