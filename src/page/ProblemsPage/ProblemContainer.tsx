import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemCard } from "../../components/problem-card";

interface Problem {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  solved: boolean;
  tags: string[];
}

interface ProblemContainerProps {
  problems: Problem[];
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function ProblemContainer({ problems: filteredProblems, activeTab, onTabChange }: ProblemContainerProps) {
  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <div className="flex-1">
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">전체 문제</TabsTrigger>
          <TabsTrigger value="solved">해결된 문제</TabsTrigger>
          <TabsTrigger value="unsolved">미해결 문제</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
            {filteredProblems.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="solved" className="mt-4">
          <div className="grid gap-4">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
            {filteredProblems.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="unsolved" className="mt-4">
          <div className="grid gap-4">
            {filteredProblems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
            {filteredProblems.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8">
        <nav className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="rounded-full">
            <span className="sr-only">이전 페이지</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            1
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-primary text-primary-foreground">
            2
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            3
          </Button>
          <span className="mx-1">...</span>
          <Button variant="outline" size="sm" className="rounded-full">
            8
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <span className="sr-only">다음 페이지</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </nav>
      </div>
    </div>
  );
}
