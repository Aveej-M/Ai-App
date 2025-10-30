'use client'
import FileUpload from "@/app/compenents/FileUpload";
import SourceRight from "@/app/compenents/SourceRight";
import { useState } from "react";

const page = () => {

  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className='w-[80%] gap-[20px] flex mt-[30px] ml-[30px] max-lg:flex-col'>
      <FileUpload files={files} setFiles={setFiles} />
      <SourceRight content= 'Documents' files={files}/>
    </div>
  )
}

export default page