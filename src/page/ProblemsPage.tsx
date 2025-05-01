import { useState } from "react";
import { Link } from "react-router";
import { Layout } from "../components/layout";
import { ProblemCard } from "../components/problem-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { CategoryFilter } from "../components/category-filter";
import { Card, CardContent } from "../components/ui/card";
import { BookOpen, Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "../components/ui/badge";

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // 샘플 문제 데이터
  const problems = [
    {
      id: 1,
      title: "미분방정식의 일반해 구하기",
      category: "수학",
      author: "mathprofessor",
      date: "2023-04-28",
      likes: 24,
      comments: 8,
      solved: true,
    },
    {
      id: 2,
      title: "뉴턴의 운동법칙 적용 문제",
      category: "물리학",
      author: "physicslover",
      date: "2023-04-27",
      likes: 18,
      comments: 5,
      solved: false,
    },
    {
      id: 3,
      title: "알고리즘 복잡도 분석 문제",
      category: "컴퓨터공학",
      author: "codemaster",
      date: "2023-04-26",
      likes: 32,
      comments: 12,
      solved: true,
    },
    {
      id: 4,
      title: "유기화학 반응 메커니즘 설명",
      category: "화학",
      author: "chemistrywhiz",
      date: "2023-04-25",
      likes: 15,
      comments: 3,
      solved: false,
    },
    {
      id: 5,
      title: "세포 분열 과정 분석",
      category: "생물학",
      author: "bioresearcher",
      date: "2023-04-24",
      likes: 21,
      comments: 7,
      solved: true,
    },
    {
      id: 6,
      title: "전자기학 맥스웰 방정식 응용",
      category: "물리학",
      author: "electromagnetism",
      date: "2023-04-23",
      likes: 29,
      comments: 14,
      solved: false,
    },
    {
      id: 7,
      title: "선형대수학 고유값 문제",
      category: "수학",
      author: "linearalgebra",
      date: "2023-04-22",
      likes: 17,
      comments: 9,
      solved: true,
    },
    {
      id: 8,
      title: "데이터베이스 정규화 과정 설명",
      category: "컴퓨터공학",
      author: "dbmaster",
      date: "2023-04-21",
      likes: 26,
      comments: 11,
      solved: false,
    },
  ];

  // 인기 태그
  const popularTags = ["미분방정식", "알고리즘", "양자역학", "유기화학", "데이터구조", "열역학", "선형대수", "통계학"];

  return (
    <Layout>
      <div className="container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-6">
          {/* 헤더 섹션 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <BookOpen className="mr-2 h-8 w-8 text-teal-500" />
                문제 목록
              </h1>
              <p className="text-muted-foreground mt-1">다양한 전공 분야의 문제를 탐색하고 해결해보세요</p>
            </div>
            <div className="flex gap-2">
              <Link to="/problems/new">
                <Button className="rounded-full bg-teal-500 hover:bg-teal-600 transition-colors">
                  <Plus className="mr-2 h-4 w-4" /> 문제 등록
                </Button>
              </Link>
              <Button variant="outline" className="rounded-full md:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
            </div>
          </div>

          {/* 검색 및 필터 섹션 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="문제 검색..."
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
                  <SelectItem value="comments">댓글순</SelectItem>
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

          {/* 메인 콘텐츠 */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* 사이드바 - 모바일에서는 토글 가능 */}
            <div className={`md:w-1/4 lg:w-1/5 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
              <Card className="overflow-hidden border-none shadow-md dark:shadow-gray-800/30">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <SlidersHorizontal className="mr-2 h-5 w-5 text-teal-500" />
                    상세 필터
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">상태</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          전체
                        </Badge>
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          해결됨
                        </Badge>
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        >
                          미해결
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">카테고리</h4>
                      <CategoryFilter />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">인기 태그</h4>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 cursor-pointer"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 문제 목록 */}
            <div className="flex-1">
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">전체 문제</TabsTrigger>
                  <TabsTrigger value="solved">해결된 문제</TabsTrigger>
                  <TabsTrigger value="unsolved">미해결 문제</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <div className="grid gap-4">
                    {problems.map((problem) => (
                      <ProblemCard key={problem.id} problem={problem} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="solved" className="mt-4">
                  <div className="grid gap-4">
                    {problems
                      .filter((problem) => problem.solved)
                      .map((problem) => (
                        <ProblemCard key={problem.id} problem={problem} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="unsolved" className="mt-4">
                  <div className="grid gap-4">
                    {problems
                      .filter((problem) => !problem.solved)
                      .map((problem) => (
                        <ProblemCard key={problem.id} problem={problem} />
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
          </div>
        </div>
      </div>
    </Layout>
  );
}
