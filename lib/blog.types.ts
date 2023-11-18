export interface BlogListType {
  id: string;
  created_at: string;
  title: string;
  content: string;
  user_id: string;
  image_url: string;
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