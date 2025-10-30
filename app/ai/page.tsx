import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className='relative w-auto h-fit'>
        <div className='h-[60px] bg-gray-100 pl-[30px] text-black flex items-center ai-head'>
            <p className="flex items-center  text-1xl font-bold">AI Agent <Image 
                src="/right-arrow.svg"
                alt=""
                width={30}
                height={20}
            /></p>
        </div>


        
        <div className='h-[60px] bg-gray-100 pl-[30px] text-black justify-items ai-head'>
            <p className="flex items-center text-1xl font-bold">My Bot </p>

            <div className="flex items-center px-4 py-0 rounded-md border-2 border-gray-400 overflow-hidden max-w-md mr-5 h-[35px]">
            <input type="email" placeholder="Search"
              className="w-full outline-none bg-transparent text-gray-600 text-sm h-[35px]" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600">
              <path
                d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
              </path>
            </svg>
          </div>
        </div>


        <div className="flex h-full w-[] justify-items-start lg:flex-row max-sm:flex-col sm:flex-col items-start gap-10 mt-[30px] ml-[30px]">
          <div className=" flex-items flex-col h-[150px] w-[300px] shadow-5 rounded-[10px] max-sm:w-[90%]">
            <Image
              className=""
              src="/AI Home/plus.png"
              alt="ai-plus"
              width={20}
              height={20}
            >

            </Image>

            <p className="text-black font-bold text-[20px]">Create Bot</p>
          </div>
          <div className=" flex justify-around px-5 flex-col h-[150px] w-[300px] max-sm:w-[90%] shadow-5 rounded-[10px] ">
            <Link
              href="/ai/playground"
            >
            <div className="flex flex-row items-center gap-2 ">
              <Image
              className="border-2 border-green-600 rounded-[50%] p-0"
                src="/AI Home/Robot.png"
                alt="ai-plus"
                width={50}
                height={20}
              />

              <p className="text-black font-bold text-[20px]">Agent Spark</p>
            </div>
            </Link>
            

            <div className="flex justify-between w-full">
              <Image 
                src="/ai-icon.png"
                alt="ai-plus"
                width={15}
                height={20}
              />

              <div className="flex gap-5 h-[20px]">
              <Image 
                src="/AI Home/Pen.png"
                alt="pen-plus"
                width={20}
                height={10}
              />
              <Image 
                src="/AI Home/Messages.png"
                alt="vector-plus"
                width={15}
                height={15}
              />
              <Image 
                src="/AI Home/Copy.png"
                alt="copy-plus"
                width={20}
                height={20}
              />

              </div>
            </div>
            
          </div>
        </div>
       
    </div>
  )
}

export default page