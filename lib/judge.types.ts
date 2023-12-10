export type TestcaseType = {
  id: string;
  input: string;
  output: string;
}
export type JudgeProps = {
  blogId: string;
  code: string | undefined;
  language: string;
  userid: string;
  testcases: TestcaseType[];
};
