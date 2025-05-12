import { STATUS } from "@/constants/categories";
import { useState } from "react";

export interface FilterQueryParams {
  status: (typeof STATUS)[number];
  tags: Set<string>;
  categories: Set<string>;
}

function useFilter() {
  const [status, setStatus] = useState<(typeof STATUS)[number]>("all");
  const [tags, setSelectedTags] = useState<Set<string>>(new Set());
  const [categories, setSelectedCategories] = useState<Set<string>>(new Set());


  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      console.log('new toggleCategory', newSet)
      console.log(newSet.has(category))
      return newSet;
    });
  };

  console.log('hook', categories)

  return { status, setStatus, tags, categories, toggleTag, toggleCategory }
}

export default useFilter
