import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { CATEGORIES } from "@/constants/categories";

interface CategoryFilterProps {
  toggleCategory: (category: string) => void;
  categories: Set<string>;
}

export function CategoryFilter({ toggleCategory, categories = new Set() }: CategoryFilterProps) {
  return (
    <div className="space-y-3">
      {CATEGORIES.map((category) => (
        <div key={category} className="flex items-center space-x-2 group">
          <Checkbox
            id={`category-${category}`}
            checked={categories.has(category)}
            onCheckedChange={() => toggleCategory(category)}
            className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
          />
          <Label
            htmlFor={`category-${category}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer group-hover:text-teal-500 transition-colors"
          >
            {category}
          </Label>
        </div>
      ))}
    </div>
  );
}
