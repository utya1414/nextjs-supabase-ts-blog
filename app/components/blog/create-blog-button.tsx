import React from 'react'
import Link from 'next/link'

const CreateBlogButton = () => {
  return (
    <div className="w-20 bg-black-gradient text-white font-bold text-sm flex text-center items-center py-2 px-3 rounded-md cursor-pointer shadow-md hover:bg-sky-600">
      <Link href="/blog/post">
        新規投稿
      </Link>
    </div>
  )
}

export default CreateBlogButton