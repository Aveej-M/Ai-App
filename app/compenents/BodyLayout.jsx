'use client'
import { useState, useRef, useEffect, use } from 'react';
import React from 'react'
import Header from "./Header";
// import Sidebar from "./compenents/Sidebar";
// import Drawer from "./compenents/Drawer";
import AccountProfile from "./AccountProfile";

const BodyLayout = () => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <>
      <Header openProfile={openProfile} setOpenProfile={setOpenProfile} />
      {openProfile && (
        <div>
          <AccountProfile openProfile={openProfile} setOpenProfile={setOpenProfile} />
        </div>
      )}
    </>
  )
}

export default BodyLayout