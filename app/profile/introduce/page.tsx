import Introduce from '@/app/components/profile/introduce'
import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Profile = async () => {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect('/auth/login')
    }

  return (
    <Introduce />
  )
}

export default Profile