'use client'
import { usePathname } from "next/navigation";
import BodyLayout from "./compenents/BodyLayout";
import Drawer from "./compenents/Drawer"

export default function HomeLayout({ children }) {
    const pathName = usePathname();

    // const homeLayout = pathName !== "/settings/Home";
    const homeLayout = pathName.startsWith("/settings");

    return (
        <div className="w-full min-h-screen">
            {!homeLayout && <BodyLayout />}

            <div className={`flex w-full ${homeLayout ? 'top-0' : ''}`}>
                {/* <div className="fixed w-full flex"> */}
                {!homeLayout && <Drawer />}
                {children}
                {/* </div> */}
            </div>
        </div>
    )
}
