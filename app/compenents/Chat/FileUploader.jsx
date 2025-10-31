'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ChatFileUpload({ files, setFiles, setOpenAddFile }) {
  // const [files, setFiles] = useState([]);
  useEffect(() => {
  return () => {
    files.forEach(({ preview }) => URL.revokeObjectURL(preview));
  };
}, [files]);


  // handle upload
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    setOpenAddFile(false);
  };

  // const handleRemoveFile = (index) => {
  //   setFiles((prev) => {
  //     URL.revokeObjectURL(prev[index].preview);
  //     return prev.filter((_, i) => i !== index);
  //   });
  // };

  return (
    <div className="">
      

      {/* Upload input */}
      <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
        <i className="fa-regular fa-image"></i>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.rtf,.csv,.xls,.xlsx,.jpg,.jpeg,.png,.mp4,.avi,.mkv,.mp3"
          multiple
          className="hidden"
          onChange={handleFileChange}
          // onClick={()=> setOpenAddFile(false)}
        />
        <span>Upload File</span>
      </label>
    </div>
  );
}
