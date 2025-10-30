import Image from "next/image";
import { homeData } from "./data/home-data";

export default function Home() {
  
  return (
    <div className="flex-items">
      
        <div className="flex-items h-max mt-[100px] w-[75%]  rounded flex-col text-black">
            <div className="h-[100px] w-full bg-gray-300 border-gray-400 rounded">
            Explore Appzo with a 15-Day Free Trial
            </div>

            <div className="grid grid-cols-3 gap-4 w-full mt-5">
              {homeData.map((item, index) => {

              const bgColors = ["bg-red-200", "bg-green-200", "bg-blue-200"];
              const bgColor = bgColors[index % bgColors.length]; 

              return(

                <div key={item.id} className={`gap-4 bg-gray-300 rounded ${bgColor}`}>
                <div className="p-5">
                  <h2 className="font-bold">{item.head}</h2>
                  <p className="text-[13px] mb-7">{item.content}</p>
                  <h4 className="font-bold">{item.time}</h4>
                </div>
                <div className="bg-white w-full h-[50px] flex-items drop-shadow-xl" >
                  <p>{item.button}</p>
                </div>
              </div>

          )})}
            </div>
              
        </div>

    </div>
  );
}
