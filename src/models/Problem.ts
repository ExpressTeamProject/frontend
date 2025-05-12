import { Author } from "./User";

export interface Problem {
  id: string;
  title: string;
  category: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  isSolved: boolean;
  viewCount: number;
  likes: Author[];
  comments: Comment[];
  tags?: string[];
  content: string;
}
