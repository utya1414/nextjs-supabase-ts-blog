export interface BlogListType {
  id: string;
  created_at: string;
  title: string;
  content: string;
  timelimit: string | null;
  memorylimit: string | null;
  input: string | null;
  output: string | null;
  user_id: string;
  name: string | null | undefined;
}

export interface LikeType {
  user_id: string
}

export interface ProfileType {
  id: string;
  avatar_url: string;
  introduce: string;
}

export interface CommentType {
  id: string;
  content: string;
  created_at: string;
  profiles: ProfileType[]
  likes: LikeType[]
}
