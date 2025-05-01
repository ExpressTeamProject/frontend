import { useState } from "react";
import { Layout } from "../components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { MessageSquare, Search, ThumbsUp, Users } from "lucide-react";
import { Link } from "react-router";

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 샘플 게시글 데이터
  const posts = [
    {
      id: 1,
      title: "미분방정식 공부 방법 추천해주세요",
      category: "질문",
      author: "mathstudent",
      authorAvatar: "/abstract-geometric-shapes.png",
      date: "2023-05-02",
      content: "미분방정식을 독학하고 있는데 좋은 교재나 온라인 강의 추천 부탁드립니다.",
      likes: 8,
      comments: 12,
      tags: ["수학", "미분방정식", "독학"],
    },
    {
      id: 2,
      title: "물리학 스터디 그룹 모집합니다",
      category: "모집",
      author: "physicslover",
      authorAvatar: "/musical-performance.png",
      date: "2023-05-01",
      content: "주 1회 온라인으로 물리학 스터디를 진행할 멤버를 모집합니다. 대학 물리학 1, 2 수준입니다.",
      likes: 15,
      comments: 7,
      tags: ["물리학", "스터디", "모집"],
    },
    {
      id: 3,
      title: "프로그래밍 대회 준비 팁",
      category: "정보",
      author: "codemaster",
      authorAvatar: "/copper-wires-closeup.png",
      date: "2023-04-30",
      content: "알고리즘 대회 준비를 위한 효과적인 학습 방법과 문제 풀이 전략을 공유합니다.",
      likes: 32,
      comments: 18,
      tags: ["알고리즘", "프로그래밍", "대회"],
    },
    {
      id: 4,
      title: "화학 실험 보고서 작성법",
      category: "정보",
      author: "chemistrywhiz",
      authorAvatar: "/abstract-self-representation.png",
      date: "2023-04-29",
      content: "화학 실험 보고서 작성 시 주의할 점과 효과적인 데이터 표현 방법에 대해 설명합니다.",
      likes: 21,
      comments: 9,
      tags: ["화학", "실험", "보고서"],
    },
    {
      id: 5,
      title: "통계학 과제 도움 요청",
      category: "질문",
      author: "statsnovice",
      authorAvatar: "/abstract-geometric-shapes.png",
      date: "2023-04-28",
      content: "회귀분석 과제를 하고 있는데 잔차 분석 부분에서 어려움을 겪고 있습니다. 도움 부탁드려요.",
      likes: 6,
      comments: 14,
      tags: ["통계학", "회귀분석", "과제"],
    },
    {
      id: 6,
      title: "생물학 학회 참가 후기",
      category: "후기",
      author: "bioresearcher",
      authorAvatar: "/musical-performance.png",
      date: "2023-04-27",
      content: "지난 주 참가했던 국제 생물학 학회에 대한 후기와 인상 깊었던 연구 내용을 공유합니다.",
      likes: 28,
      comments: 15,
      tags: ["생물학", "학회", "후기"],
    },
  ];

  // 인기 태그
  const popularTags = ["수학", "물리학", "화학", "생물학", "컴퓨터공학", "스터디", "질문", "정보", "모집", "후기"];

  // 카테고리별 색상
  const categoryColors = {
    질문: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    모집: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    정보: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    후기: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  };

  return (
    <Layout>
      <div className="container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-6">
          {/* 헤더 섹션 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Users className="mr-2 h-8 w-8 text-teal-500" />
                커뮤니티
              </h1>
              <p className="text-muted-foreground mt-1">
                다양한 학문적 주제에 대해 토론하고 정보를 공유하는 공간입니다
              </p>
            </div>
            <Link to="/community/new">
              <Button className="rounded-full bg-teal-500 hover:bg-teal-600 transition-colors">
                <MessageSquare className="mr-2 h-4 w-4" /> 새 글 작성
              </Button>
            </Link>
          </div>

          {/* 검색 섹션 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="커뮤니티 검색..."
              className="pl-10 py-6 rounded-full border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 메인 콘텐츠 */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* 사이드바 */}
            <div className="md:w-1/4 lg:w-1/5 space-y-6">
              <Card className="overflow-hidden border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">인기 태그</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">커뮤니티 가이드</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                      <span>서로 존중하는 대화를 나눠주세요</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                      <span>학문적 토론과 정보 공유를 권장합니다</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                      <span>출처를 명확히 밝혀주세요</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                      <span>광고성 글은 삼가주세요</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* 게시글 목록 */}
            <div className="flex-1">
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">전체</TabsTrigger>
                  <TabsTrigger value="question">질문</TabsTrigger>
                  <TabsTrigger value="recruit">모집</TabsTrigger>
                  <TabsTrigger value="info">정보</TabsTrigger>
                  <TabsTrigger value="review">후기</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <div className="grid gap-4">
                    {posts.map((post) => (
                      <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="question" className="mt-4">
                  <div className="grid gap-4">
                    {posts
                      .filter((post) => post.category === "질문")
                      .map((post) => (
                        <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="recruit" className="mt-4">
                  <div className="grid gap-4">
                    {posts
                      .filter((post) => post.category === "모집")
                      .map((post) => (
                        <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="info" className="mt-4">
                  <div className="grid gap-4">
                    {posts
                      .filter((post) => post.category === "정보")
                      .map((post) => (
                        <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="review" className="mt-4">
                  <div className="grid gap-4">
                    {posts
                      .filter((post) => post.category === "후기")
                      .map((post) => (
                        <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
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
                  <Button variant="outline" size="sm" className="rounded-full">
                    3
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

// 커뮤니티 게시글 카드 컴포넌트
function CommunityPostCard({ post, categoryColors }: { post: any; categoryColors: Record<string, string> }) {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg dark:shadow-gray-800/30 transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
              <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">{post.author}</span>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
          </div>
          <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>{post.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Link to={`/community/${post.id}`} className="hover:text-teal-500 transition-colors">
          <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
        </Link>
        <CardDescription className="line-clamp-2">{post.content}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
