'use client'
import React from 'react'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session } from "@supabase/auth-helpers-nextjs"

const CreateBlogButton = () => {
    const supabase = createClientComponentClient()

  return (
    <div>newPost</div>
  )
}

export default CreateBlogButton