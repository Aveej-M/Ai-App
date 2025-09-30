import type { Metadata } from "next";
import Leftbar from "@/app/compenents/Leftbar";
import SourceRight from "@/app/compenents/SourceRight";
import { SourceData } from "@/app/data/leftbar-data";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-full lg:flex-row md:flex-row max-sm:flex-col fixed top-0 pt-[186px]" style={{ width: '-webkit-fill-available' }}>
      <div className='flex flex-col text-black border-r border-r-gray-200 shadow w-[20%] min-w-[170px] max-sm:w-full'>
        <ul className='pt-5 pl-4 w-full '>
          {SourceData.map(({ label, icon, greenIcon, href }, index) => (
            <Leftbar
              key={index}
              label={label}
              icon={icon}
              greenIcon={greenIcon}
              href={href}
            />
          ))}
        </ul>
      </div>




      {children}
      {/* <SourceRight content= 'Document'/> */}
    </div>
  );
}
