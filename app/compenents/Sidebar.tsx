import Image from "next/image";
import Link from "next/link";
import Drawer from "./Drawer";

const Sidebar = () => {
  return (
    <>
        <div className="h-screen w-[75px] relative flex bg-gray-200 z-10">

            <aside
                className="flex flex-col items-center text-gray-700 shadow h-full w-full">

                <ul>
                <div className="relative group h-16 flex items-center hover:bg-gray-100">
                {/* Icon Link */}
                <Link
                    href=""
                    data-tooltip-target="tooltip-dashboard"
                    className="h-6 w-6 mx-auto"
                >
                    <Image 
                    src="/dashboard.png"
                    alt="dashboard icon"
                    width={40}
                    height={20}
                    />
                </Link>

                {/* Tooltip */}
                <div
                    id="tooltip-dashboard"
                    role="tooltip"
                    className="tooltip"
                >
                    Dashboard
                    <div className="tooltip-point"></div>
                </div>
                </div>

            

               
                    <li className="hover:bg-gray-100 relative group flex">
                        <Link
                            id="tooltip-book"
                            href="."
                            className="h-16 px-6 flex justify-center items-center w-full
                            focus:text-orange-500">
                            <Image 
                            src="/book-icon.png"
                            alt="knowledge icon"
                            width={30} height={20}
                            />

                        </Link>
                        <div
                            id="tooltip-book"
                            role="tooltip"
                            className="tooltip"
                        >
                            Knowledge Base
                            <div className="tooltip-point"></div>
                        </div>
                    </li>

                    <li className="hover:bg-gray-100 relative group">
                        <Link
                            id="tooltip-vector"
                            href="."
                            className="h-16 px-6 flex justify-center items-center w-full
                            focus:text-orange-500">
                            <Image 
                            src="/Vector.png"
                            alt="vector icon"
                            width={35} height={20}
                            />  
                        </Link>
                        <div
                            id="tooltip-vector"
                            role="tooltip"
                            className="tooltip"
                        >
                            Live Chat
                            <div className="tooltip-point"></div>
                        </div>
                    </li>

                    <li className="hover:bg-gray-100 relative group">
                        <Link
                            id="tooltip-ai"
                            href="/ai"
                            className="h-16 px-6 flex justify-center items-center w-full
                            focus:text-orange-500">
                            <Image 
                            src="/ai-icon.png"
                            alt="Ai icon"
                            width={35} height={20}
                            />
                        </Link>
                        <div
                            id="tooltip-ai"
                            role="tooltip"
                            className="tooltip"
                        >
                            Ai Agent
                            <div className="tooltip-point"></div>
                        </div>
                    </li>

                                        
                </ul>
                    

            </aside>

            
        </div>

        <Drawer />
    </>
  )
}

export default Sidebar