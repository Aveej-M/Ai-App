'use client'
import ShareLink from "@/app/compenents/ShareLink"
import { get } from "http";
import { Span } from "next/dist/trace";



const Wordpress = () => {
  const iframeEmbed = `<script
  type="text/javascript"
  src=https://chatbot.appzo.ai/embed.js
  id="appzo-wa-widget"
  data-bot-id="cmb94t3r90gg7le012colx3t9"
  defer
  ></script>`;

  const label = (
    <>
        <span className="font-bold ">For Embed-</span>{' '}
        <span>Go to your post or page editor. Copy the following URL and paste where required.</span>
    </>
  )
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
    <ShareLink link={iframeEmbed} button="" heading="Add to WordPress Website" label={label} botId={botId} helpText={getHelp} lead={lead}
    />
    
    </>
  )
}

export default Wordpress