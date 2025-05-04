import { PaginationQueryParams } from "@/page/ProblemsPage/ProblemsPage";
import { useQuery } from "@tanstack/react-query";
interface PaginationQueryResponse<T> {
  data: T[];
  count: number;
  pagination: { currentPage: number; totalPages: number };
  success: boolean;
}

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
}

function getProblems(pagination?: PaginationQueryParams): Promise<PaginationQueryResponse<Problem>> {
  const url = new URL("http://localhost:5000/posts");
  if (pagination) {
    url.searchParams.set("page", pagination.page.toString());
    if (pagination.sortBy) url.searchParams.set("sortBy", pagination.sortBy);
    if (pagination.limit) url.searchParams.set("limit", pagination.limit.toString());
  }
  return fetch(url).then((res) => res.json());
}

export const useProblemQuery = (pagination?: PaginationQueryParams) => {
  return useQuery({
    queryKey: ["problems", pagination],
    queryFn: () => getProblems(pagination),
  });
};
