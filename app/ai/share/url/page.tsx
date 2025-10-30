import ShareLink from "@/app/compenents/ShareLink";
import Image from "next/image";
import Link from "next/link";

const URL = () => {
  const url = `https://chatbot.appzo.ai?id=cmb94t3r90gg7le012colx3t9`
  const customButton = (
    <div className="m-2 bg-gray-400 hover:bg-gray-500 p-2 rounded-[10]">
      <Link
        href="https://chatbot.appzo.ai?id=cmb94t3r90gg7le012colx3t9"
      >
        <Image 
          src="/Share/Redirect.png"
          alt="copy icon"
          width={15}
          height={25}
        />
      </Link>
      
    </div>
  )
  return (
    <>
    <ShareLink link={url} button={customButton} heading="WWW.winfomi.ai" label="To add the chat bot any where on your websites, add this iframes to your html code" botId="" helpText="" lead=""/>
    </>
  )
}

export default URL