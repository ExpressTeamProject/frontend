import { Attachment, Problem } from './Problem';
import { User } from './User';


export interface Comment {
  content: string;
  author: User;
  post: Problem;
  parent: Comment | null;
  attachments: Attachment[];
  likes: User[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

