import React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

/*
# GFM

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, nemo!

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
` 

# TeX

x^2 + y^2 = 1 をインライン表示すると $x^2 + y^2 = 1$ になります。

$$ S=\sum_{n=1}^\infty a_n $$

$$\frac{1}{2} $$
*/

const PreviewBlog = ({ title, info }: { title: string; info: string }) => {
  const { data, content } = matter(info);
  return (
    <div className="prose">
      {title}
      
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[[rehypeKatex, { output: "mathml"}]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PreviewBlog;
