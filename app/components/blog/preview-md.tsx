import React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkKatex from "rehype-katex";

const PreviewBlog = ({ title, info }: { title: string; info: string }) => {
  const { data, content } = matter(info);
  return (
    <div>
      {title}
      <ReactMarkdown remarkPlugins={[remarkMath, rehypeKatex]}>{content}</ReactMarkdown>
    </div>
  );
};

export default PreviewBlog;
