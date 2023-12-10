import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";

type InfoProps = {
  title: string;
  content: string;
  timelimit: string | null;
  memorylimit: string | null;
  input: string | null;
  output: string | null; 
};

const MarkDown = ({ info }: { info: InfoProps }) => {
  const { data, content } = matter(info.content);
  return (
    <>
      <div className="text-gradient text-4xl font-bold">{info.title}</div>
      <div className="flex text-sm">
        <div className="text-gray-300 px-1">timelimit:{info.timelimit}sec</div>
        <div className="text-gray-300 px-1">
          memorylimit:{info.memorylimit}MB
        </div>
      </div>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[[rehypeKatex, { output: "mathml" }]]}
        className="text-white prose "
      >
        {content}
      </ReactMarkdown>
    </>
  );
};

export default MarkDown;

