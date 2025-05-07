export interface Problem {
  id: number;
  title: string;
  categories: string[];
  author: { username: string };
  createdAt: string;
  likeCount: number;
  commentCount: number;
  solved: boolean;
  tags?: string[];
  content: string;
}
