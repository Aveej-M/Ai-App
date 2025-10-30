'use client'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AccountProfile = ({ openProfile, setOpenProfile }) => {
    const hideRef = useRef(null);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (hideRef.current && !hideRef.current.contains(event.target)) {
                setOpenProfile(false)
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [setOpenProfile]);

    useEffect(() => {
        let timer
        if (openProfile) {
            timer = setTimeout(() => setShowProfile(true), 100);
        } else {
            setShowProfile(false);
        }
        return () => clearTimeout(timer);
    })

    if (!openProfile) return null

    return (
        <>
            <div className='text-black absolute z-20 w-full h-full bg-black/50 flex justify-end overflow-hidden transition-all'>
                <div
                    ref={hideRef}
                    className={`w-100 bg-white relative transition-transform duration-300 ease-in-out transform ${showProfile ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className='pt-15 px-8 pb-8 bg-gray-200'>
                        <div className='absolute top-6 right-10 cursor-pointer' onClick={() => setOpenProfile(false)}><span className="text-2xl">x</span></div>
                        <div className="flex items-center gap-4">
                            <Image
                                src="/Header/Profile.png"
                                alt=""
                                height={50}
                                width={50}
                                className="w-15 h-15"
                            />
                            <div>
                                <div>
                                    <h1>Jeeva M</h1>
                                    <p>jeevamj144@gmail.com</p>
                                </div>
                                <div>
                                    <Link href="/profile" onClick={() => setOpenProfile(false)}>
                                        <button className="w-fit px-4 py-1.5 text-[16px] bg-green-500 text-white rounded-[25px] hover:bg-green-600 transition">My account</button>
                                    </Link>

                                    <button className="w-fit px-4 py-1 ml-3 mt-3 text-[16px] text-black hover:text-green-500 border border-gray-400 rounded-[25px] hover:bg-gray-100 transition">Signout</button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 h-15 border-b border-gray-300 pl-8">
                        <h1 className="text-[18px]!">Subscription</h1>
                        <div className="px-1.5 py-0.5 text-green-500 text-xs bg-green-200 border border-green-500 rounded">Free</div>
                    </div>

                    <div className="py-5 px-8 font-[500] flex flex-col gap-1 font-kode">

                        <p>Need Help?</p>
                        <p className="flex items-center gap-1 hover:bg-gray-200 p-1 rounded"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg> Help Guide</p>

                        <p className="flex items-center gap-1 hover:bg-gray-200 py-1 px-2 rounded"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-question-mark" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg> FAQ</p>

                        <p className="flex items-center gap-1 hover:bg-gray-200 py-1 px-2 rounded"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg> Privacy Policy</p>

                        <p className="flex items-center gap-1 hover:bg-gray-200 py-1 px-2 rounded"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-badge" aria-hidden="true"><path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.072"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="m6.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.88.001l-1.846.85a.5.5 0 0 1-.693-.593l1.29-4.88"></path><circle cx="5" cy="14" r="3"></circle></svg> Terms of Serrvice</p>

                        <p className="flex items-center gap-1 hover:bg-gray-200 py-1 px-2 rounded"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg> Support@winfomi.ai</p>

                    </div>

                    <div></div>

                </div>
            </div>
        </>
    )
}

export default AccountProfile