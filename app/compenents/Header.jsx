'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from "react";

const Header = ({ setOpenProfile }) => {
  const hideRef = useRef(null);
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hideRef.current && !hideRef.current.contains(event.target)) {
        setOpenNotification(false);
      }
    }

    if (openNotification) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [openNotification]);


  const pathName = usePathname();
  return (
    <header className={`px-5 py-3 justify-items font-sans shadow-sm fixed w-full ${pathName === ('/ai/topics') ? 'z-[0]' : 'z-[11]'}`}>

      <Link
        href="/"
        className="cursor-pointer">
        <Image
          aria-hidden
          src="/winfomi.png"
          alt="Logo"
          width={100}
          height={30}
          className="w-30"
        />
      </Link>


      <nav className="text-black font-[500] text-[18px] justify-items gap-5">
        <div className="flex gap-2 items-center hover-header">
          <Image src="/Header/check-icon.png"
            alt="check icon"
            width={20} height={20}
          />
          <span>Available</span>
          <Image src="/Header/drop.png"
            alt="expand arrow"
            width={15} height={15}
            className="w-auto"
          />
        </div>

        <div className="flex justify-center items-center">
          <Link href="/">
            <div className="hover-header flex-items ">
              <Image
                className="bg-green-500 py-1.5 px-1.5 rounded "
                src="/Header/home-icon.png"
                alt="Home icon"
                width={25} height={20}
              />
            </div>
          </Link>

          <Link href="/settings/Home">
            <div className="hover-header flex-items">
              <Image src="/Header/settings.png"
                alt="settings icon"
                width={20} height={20}
              />
            </div>
          </Link>

          <div onClick={() => setOpenNotification(!openNotification)} className="hover-header flex-items relative">
            <Image src="/Header/notification.png"
              alt="notification icon"
              width={20} height={20}
              className=""
            />
          </div>
          {openNotification && (
            <div ref={hideRef} className="absolute top-18 right-5">
              {/* Arrow */}
              <div
                className="absolute -top-2 right-46"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: "#1e1f28",
                  transform: "rotate(45deg)",
                }}
              ></div>

              {/* Panel */}
              <div className="h-[500px] w-[400px] bg-[#1e1f28] rounded-[15px] px-5 py-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-white text-[20px]">Notifications</h1>
                  <p className="text-gray-400 text-[14px] cursor-pointer">
                    Mark all as read
                  </p>
                </div>

                <div className="w-full h-[90%] overflow-y-auto p-2 flex flex-col items-center justify-center">
                  <Image
                    src="/Header/snooze.png"
                    alt="Snooze image"
                    width={100}
                    height={100}
                    className="w-50 h-50"
                  />
                  <h1 className="text-gray-400 mt-4">Nothing new to see here yet</h1>
                </div>
              </div>
            </div>
          )}


        </div>
        <div className="flex-items hover-header">
          <span>Winfomi</span>
          <Image src="/Header/drop.png"
            alt="check icon"
            width={15} height={15}
            className="w-auto"
          />
        </div>
        <div onClick={() => setOpenProfile(true)} className="cursor-pointer">
          {/* <Link href="/profile"> */}
          <Image src="/Header/Profile.png"
            alt="check icon"
            width={30} height={20}
            className="w-auto"
          />
          {/* </Link> */}

        </div>
      </nav>



    </header>
  )
}

export default Header