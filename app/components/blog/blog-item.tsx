"use client";
import React from "react";
import Link from "next/link";
import type { BlogListType } from "@/lib/blog.types";
import Image from "next/image";
import { format } from "date-fns";

const BlogItem = (blog: BlogListType) => {
  const MAX_LENGTH = 55;
  let content = blog.content.replace(/\r?\n/g, "");
  if (content.length > MAX_LENGTH) {
    content = content.substring(0, MAX_LENGTH) + "...";
  }

  const date = format(new Date(blog.created_at), "yyyy/MM/dd");
  return (
    <Link href={`/blog/${blog.id}`} className="bg-gray-200 py-2 px-2 rounded-md shadow-md hover:brightness-90 text-sm">
      <Image
        src={blog.image_url}
        alt="image"
        className="rounded-md"
        width={300}
        height={200}
      />
      <div className="text-gray-500 font-bold">{date}</div>
      <div className="font-bold text-lg">{blog.title}</div>
      <div className="text-gray-500 font-bold">{blog.content}</div>
      <div className="font-bold">{blog.name}</div>
    </Link>
  );
};

export default BlogItem;

// id: string;
// created_at: string;
// title: string;
// content: string;
// user_id: string;
// image_url: string;
// name: string | null;