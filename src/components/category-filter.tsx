import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "수학",
    "물리학",
    "화학",
    "생물학",
    "컴퓨터공학",
    "전자공학",
    "기계공학",
    "경영학",
    "경제학",
    "심리학",
    "사회학",
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category} className="flex items-center space-x-2 group">
          <Checkbox
            id={`category-${category}`}
            checked={selectedCategories.includes(category)}
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
