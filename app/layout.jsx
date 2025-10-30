
// import { Metadata } from "next"; // Remove or replace with a regular import if needed
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./compenents/Header";
import Sidebar from "./compenents/Sidebar";
import Drawer from "./compenents/Drawer";
import BodyLayout from "./compenents/BodyLayout";
import HomeLayout from "./ClientLayout";
// import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
// config.autoAddCss = false



export const metadata = {
  title: "Winfomi",
  description: "Ai platform created by winfomi",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      </head>
      <body>
        {/* <div>
          <BodyLayout />
        </div>
        <div className="flex w-full relative top-[67px]">
        <Drawer />

        {children}
        </div> */}

        
          <HomeLayout>
            {children}
          </HomeLayout>
          
        
        
      </body>
    </html>
  );
}
