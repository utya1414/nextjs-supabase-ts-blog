import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

const MarkDown = ({ content }: { content: string }) => {
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[[rehypeKatex, { output: "mathml" }]]}
        className="text-white prose min-h-screen"
      >
        {content}
      </ReactMarkdown>
    </>
  );
};

export default MarkDown;

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
