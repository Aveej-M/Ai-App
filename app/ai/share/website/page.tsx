'use client'
import ShareLink from "@/app/compenents/ShareLink"
import { get } from "http";
import { Span } from "next/dist/trace";



const Website = () => {
  const iframeEmbed = `<script
  type="text/javascript"
  src=https://chatbot.appzo.ai/embed.js
  id="appzo-wa-widget"
  data-bot-id="cmb94t3r90gg7le012colx3t9"
  defer
  ></script>`;

  const botId = (
    <>
        <span className="font-bold">Bot id:</span>{' '}
        <span>cmb94t3r90gg7le012colx3t9</span>
    </>
    
  )
  const getHelp = (
    <>
        <span className="font-bold">Get help</span>{' '}
        <span>with step by step instructions</span>
    </>
  )
  const lead = (
    <>
        <span className="font-bold">Perfect for lead</span>{' '}
        <span>collection, customer education, customer feedback.</span>
    </>
  )
  

  return (
    <>
    <ShareLink link={iframeEmbed} button="" heading="Add to Website" label="Copy the below code snippet and paste it into your HTML code, preferably before the closing head tag (</head>)." botId={botId} helpText={getHelp} lead={lead}
    />
    
    </>
  )
}

export default Website