import React from "react";
import matter from "gray-matter";
import MarkDown from "./MarkDown";


const PreviewBlog = ({ title, info }: { title: string; info: string }) => {
  const { data, content } = matter(info);
  return (
    <div className="w-1/2 bg-gray-gradient px-2 py-2 rounded-md border-2 border-dimWhite">
      <div className="text-gradient text-4xl font-bold">{title}</div>
      <MarkDown content={content} />
    </div>
  );
};

export default PreviewBlog;
