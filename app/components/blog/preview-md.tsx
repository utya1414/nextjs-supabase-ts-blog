import React from "react";
import matter from "gray-matter";
import MarkDown from "./MarkDown";


const PreviewBlog = ({ title, info }: { title: string; info: string }) => {
  const { data, content } = matter(info);
  return (
    <div>
      {title}
      <MarkDown content={content} />
    </div>
  );
};

export default PreviewBlog;
