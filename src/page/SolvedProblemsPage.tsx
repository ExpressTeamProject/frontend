import { useState } from "react";
import { Layout } from "../components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CheckCircle, Search, Star, Trophy } from "lucide-react";

export default function SolvedProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // 샘플 해결된 문제 데이터
  const solvedProblems = [
    {
      id: 1,
      title: "미분방정식의 일반해 구하기",
      category: "수학",
      author: "mathprofessor",
      solver: "student123",
      solverAvatar: "/abstract-geometric-shapes.png",
      date: "2023-04-28",
      likes: 24,
      quality: "gold",
      description: "2차 상미분방정식의 일반해를 구하는 문제로, 특성방정식을 이용한 해법을 제시했습니다.",
    },
    {
      id: 3,
      title: "알고리즘 복잡도 분석 문제",
      category: "컴퓨터공학",
      author: "codemaster",
      solver: "algorithmexpert",
      solverAvatar: "/copper-wires-closeup.png",
      date: "2023-04-26",
      likes: 32,
      quality: "silver",
      description: "시간 복잡도와 공간 복잡도를 분석하여 최적의 알고리즘을 찾는 문제입니다.",
    },
    {
      id: 5,
      title: "세포 분열 과정 분석",
      category: "생물학",
      author: "bioresearcher",
      solver: "cellbiology",
      solverAvatar: "/musical-performance.png",
      date: "2023-04-24",
      likes: 21,
      quality: "bronze",
      description: "세포 분열 과정의 각 단계를 분석하고 특징을 설명하는 문제입니다.",
    },
    {
      id: 7,
      title: "선형대수학 고유값 문제",
      category: "수학",
      author: "linearalgebra",
      solver: "matrixmaster",
      solverAvatar: "/abstract-self-representation.png",
      date: "2023-04-22",
      likes: 17,
      quality: "gold",
      description: "행렬의 고유값과 고유벡터를 구하고 대각화하는 문제입니다.",
    },
  ];

  // 품질 배지 색상 매핑
  const qualityBadgeColors = {
    gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    silver: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    bronze: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  };

  // 품질 아이콘 매핑
  const qualityIcons = {
    gold: <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
    silver: <Star className="h-4 w-4 text-gray-600 dark:text-gray-400" />,
    bronze: <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
  };

  return (
    <Layout>
      <div className="container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-6">
          {/* 헤더 섹션 */}
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <CheckCircle className="mr-2 h-8 w-8 text-teal-500" />
              해결된 문제
            </h1>
            <p className="text-muted-foreground mt-1">
              다른 사용자들이 해결한 문제들을 확인하고 다양한 해결 방법을 배워보세요
            </p>
          </div>

          {/* 검색 및 필터 섹션 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="해결된 문제 검색..."
                className="pl-10 py-6 rounded-full border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] rounded-full">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="quality">품질순</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px] rounded-full">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="math">수학</SelectItem>
                  <SelectItem value="physics">물리학</SelectItem>
                  <SelectItem value="chemistry">화학</SelectItem>
                  <SelectItem value="biology">생물학</SelectItem>
                  <SelectItem value="computer-science">컴퓨터공학</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 탭 섹션 */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="gold">최고 품질</TabsTrigger>
              <TabsTrigger value="silver">우수 품질</TabsTrigger>
              <TabsTrigger value="bronze">일반 품질</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4">
                {solvedProblems.map((problem) => (
                  <SolvedProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="gold" className="mt-4">
              <div className="grid gap-4">
                {solvedProblems
                  .filter((problem) => problem.quality === "gold")
                  .map((problem) => (
                    <SolvedProblemCard key={problem.id} problem={problem} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="silver" className="mt-4">
              <div className="grid gap-4">
                {solvedProblems
                  .filter((problem) => problem.quality === "silver")
                  .map((problem) => (
                    <SolvedProblemCard key={problem.id} problem={problem} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="bronze" className="mt-4">
              <div className="grid gap-4">
                {solvedProblems
                  .filter((problem) => problem.quality === "bronze")
                  .map((problem) => (
                    <SolvedProblemCard key={problem.id} problem={problem} />
                  ))}
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
              <Button variant="outline" size="sm" className="rounded-full bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                2
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
      </div>
    </Layout>
  );
}

// 해결된 문제 카드 컴포넌트
function SolvedProblemCard({ problem }: { problem: any }) {
  const qualityBadgeColors = {
    gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    silver: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    bronze: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  };

  const qualityIcons = {
    gold: <Trophy className="h-4 w-4" />,
    silver: <Star className="h-4 w-4" />,
    bronze: <CheckCircle className="h-4 w-4" />,
  };

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg dark:shadow-gray-800/30 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <Badge variant="outline" className="self-start mb-2 bg-gray-50 dark:bg-gray-800">
              {problem.category}
            </Badge>
            <CardTitle className="text-xl hover:text-teal-500 transition-colors">
              <a href={`/problems/${problem.id}`}>{problem.title}</a>
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">{problem.description}</CardDescription>
          </div>
          <Badge
            className={`flex items-center gap-1 ${
              qualityBadgeColors[problem.quality as keyof typeof qualityBadgeColors]
            }`}
          >
            {qualityIcons[problem.quality as keyof typeof qualityIcons]}
            <span>
              {problem.quality === "gold" ? "최고 품질" : problem.quality === "silver" ? "우수 품질" : "일반 품질"}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">해결자:</span>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={problem.solverAvatar || "/placeholder.svg"} alt={problem.solver} />
                <AvatarFallback>{problem.solver.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{problem.solver}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
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
                <path d="M7 10v12" />
                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
              </svg>
              <span>{problem.likes}</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              해결책 보기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
