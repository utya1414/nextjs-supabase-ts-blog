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

export type ResultProps = {
  id: string;
  status: string;
  error: string;
};
export type CreateProps = {
  source_code: string;
  language: string;
  input: string;
  longpoll: boolean;
  longpoll_timeout: string;
  api_key: string;
};
export type DetailProps = {
  id: string;
  language: string;
  status: string;
  build_stdout: string;
  build_stderr: string;
  build_exit_code: string;
  build_time: string;
  build_memory: string;
  build_result: string;
  stdout: string;
  stderr: string;
  exit_code: string;
  time: string;
  memory: string;
  result: string;
};
