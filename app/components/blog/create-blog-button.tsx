'use client'
import React from 'react'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session } from "@supabase/auth-helpers-nextjs"

const CreateBlogButton = () => {
    const supabase = createClientComponentClient()

  return (
    <div className="w-20 bg-sky-500 text-white font-bold text-sm flex text-center items-center py-2 px-3 rounded-md cursor-pointer shadow-md hover:bg-sky-600">
      <Link href="/blog/post">
        新規投稿
      </Link>
    </div>
  )
}

export default CreateBlogButton