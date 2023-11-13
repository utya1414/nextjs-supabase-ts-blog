'use client'
import React from 'react'
import Link from 'next/link'

const ReturnTopPage = () => {
  return (
    <div className="w-[60px] bg-sky-500 text-white font-bold text-sm flex text-center items-center py-2 px-2 rounded-md cursor-pointer shadow-md hover:bg-sky-600">
      <Link href="/">もどる</Link>
    </div>
  )
}

export default ReturnTopPage