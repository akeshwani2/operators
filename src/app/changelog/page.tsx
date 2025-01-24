"use client"

import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'

function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default Page