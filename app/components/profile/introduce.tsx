'use client'
import React from 'react'
import useStore from "@/store"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Loading from '@/app/loading'

const Introduce = () => {
    const supabase = createClientComponentClient()
    const { user } = useStore()

  return (
    <div>
        {user?.id}
        {user?.email}
        {user?.avatar_url}
        {user?.name}
        {user?.introduce}
    </div>
  )
}

export default Introduce