'use client'
import ShareLink from "@/app/compenents/ShareLink"



const Share = () => {
  const iframeEmbed = `<iframe
  src="https://chatbot.appzo.ai?id=cmb94t3r90gg7le012colx3t9"
  width="50%"
  height="500px"
  title="Embedded Page"
  allow="clipboard-write"
  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
/>`;
  

  return (
    <>
    <ShareLink link={iframeEmbed} button="" heading="WWW.winfomi.ai" label="To add the chat bot any where on your websites, add this iframes to your html code" botId="" helpText="" lead=""
    />
    
    </>
  )
}

export default Share