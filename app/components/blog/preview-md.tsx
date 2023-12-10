import React from "react";
import MarkDown from "./MarkDown";

type InfoProps = {
  title: string;
  content: string;
  timelimit: string;
  memorylimit: string;
  input: string;
  output: string;
}
const PreviewBlog = ({info}: {info: InfoProps}) => {
  return (
    <div className="w-1/2 bg-gray-gradient px-2 py-2 rounded-md border-2 border-dimWhite">
      <MarkDown info={info} />
    </div>
  );
};

export default PreviewBlog;
