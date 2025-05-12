import { useState } from "react";

export interface PaginationQueryParams {
  page: number;
  limit?: number;
  sort?: "latest" | "popular" | "comments";
  search?: string;
  tags?: string[];
  categories?: string[];
  status?: "solved" | "unsolved";
}

export const usePagination = (initial?: PaginationQueryParams) => {
  const [page, setPage] = useState(initial?.page ?? 1);
  const [limit, setLimit] = useState(initial?.limit ?? 5);
  const [sort, setSort] = useState(initial?.sort ?? "latest");
  const [search, setSearch] = useState(initial?.search ?? undefined);
  const [tags, setTags] = useState(initial?.tags ?? []);
  const [status, setStatus] = useState(initial?.status ?? undefined);

  return {
    page,
    limit,
    sort,
    search,
    tags,
    status,
    setPage,
    setLimit,
    setSort,
    setSearch,
    setTags,
    setStatus,
  };
};