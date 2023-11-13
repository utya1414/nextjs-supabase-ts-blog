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
    <div>
      <Image
        src={blog.image_url}
        alt="image"
        className=""
        width={300}
        height={200}
      />
      <div>{blog.title}</div>
      <div>by {blog.name}</div>
      <div>{date}</div>
    </div>
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
