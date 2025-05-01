import { useState } from "react";
import { Layout } from "../components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Award, BookOpen, Crown, Medal, Search, Trophy } from "lucide-react";
import { Input } from "../components/ui/input";

export default function RankingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // 샘플 랭킹 데이터
  const users = [
    {
      id: 1,
      username: "mathprofessor",
      avatar: "/musical-performance.png",
      major: "수학",
      solvedProblems: 87,
      contributions: 124,
      reputation: 1850,
      badges: {
        gold: 5,
        silver: 12,
        bronze: 24,
      },
      rank: 1,
    },
    {
      id: 2,
      username: "physicslover",
      avatar: "/abstract-geometric-shapes.png",
      major: "물리학",
      solvedProblems: 76,
      contributions: 98,
      reputation: 1720,
      badges: {
        gold: 4,
        silver: 15,
        bronze: 19,
      },
      rank: 2,
    },
    {
      id: 3,
      username: "codemaster",
      avatar: "/copper-wires-closeup.png",
      major: "컴퓨터공학",
      solvedProblems: 92,
      contributions: 85,
      reputation: 1680,
      badges: {
        gold: 3,
        silver: 18,
        bronze: 27,
      },
      rank: 3,
    },
    {
      id: 4,
      username: "chemistrywhiz",
      avatar: "/abstract-self-representation.png",
      major: "화학",
      solvedProblems: 64,
      contributions: 112,
      reputation: 1590,
      badges: {
        gold: 2,
        silver: 14,
        bronze: 31,
      },
      rank: 4,
    },
    {
      id: 5,
      username: "bioresearcher",
      avatar: "/musical-performance.png",
      major: "생물학",
      solvedProblems: 58,
      contributions: 96,
      reputation: 1480,
      badges: {
        gold: 2,
        silver: 11,
        bronze: 25,
      },
      rank: 5,
    },
    {
      id: 6,
      username: "linearalgebra",
      avatar: "/abstract-geometric-shapes.png",
      major: "수학",
      solvedProblems: 71,
      contributions: 82,
      reputation: 1420,
      badges: {
        gold: 1,
        silver: 13,
        bronze: 22,
      },
      rank: 6,
    },
    {
      id: 7,
      username: "algorithmexpert",
      avatar: "/copper-wires-closeup.png",
      major: "컴퓨터공학",
      solvedProblems: 85,
      contributions: 67,
      reputation: 1380,
      badges: {
        gold: 1,
        silver: 9,
        bronze: 28,
      },
      rank: 7,
    },
    {
      id: 8,
      username: "quantumphysics",
      avatar: "/abstract-self-representation.png",
      major: "물리학",
      solvedProblems: 62,
      contributions: 79,
      reputation: 1340,
      badges: {
        gold: 1,
        silver: 8,
        bronze: 19,
      },
      rank: 8,
    },
  ];

  // 랭킹 아이콘 매핑
  const rankIcons = {
    1: <Crown className="h-5 w-5 text-yellow-500" />,
    2: <Medal className="h-5 w-5 text-gray-400" />,
    3: <Award className="h-5 w-5 text-amber-600" />,
  };

  return (
    <Layout>
      <div className="container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-6">
          {/* 헤더 섹션 */}
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Trophy className="mr-2 h-8 w-8 text-teal-500" />
              랭킹
            </h1>
            <p className="text-muted-foreground mt-1">문제 해결과 기여도에 따른 사용자 랭킹을 확인해보세요</p>
          </div>

          {/* 검색 및 필터 섹션 */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="사용자 검색..."
                className="pl-10 py-6 rounded-full border-gray-300 dark:border-gray-700 focus-visible:ring-teal-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px] rounded-full">
                <SelectValue placeholder="전공 필터" />
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

          {/* 랭킹 탭 */}
          <Tabs defaultValue="overall" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overall">종합 랭킹</TabsTrigger>
              <TabsTrigger value="solved">해결 랭킹</TabsTrigger>
              <TabsTrigger value="contribution">기여 랭킹</TabsTrigger>
            </TabsList>
            <TabsContent value="overall" className="mt-4">
              <Card className="border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader>
                  <CardTitle className="text-xl">종합 랭킹</CardTitle>
                  <CardDescription>평판 점수 기준 상위 사용자</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium">순위</th>
                          <th className="text-left py-3 px-4 font-medium">사용자</th>
                          <th className="text-left py-3 px-4 font-medium">전공</th>
                          <th className="text-center py-3 px-4 font-medium">해결 문제</th>
                          <th className="text-center py-3 px-4 font-medium">기여도</th>
                          <th className="text-center py-3 px-4 font-medium">평판</th>
                          <th className="text-center py-3 px-4 font-medium">배지</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .sort((a, b) => b.reputation - a.reputation)
                          .map((user, index) => (
                            <tr
                              key={user.id}
                              className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  {index + 1 <= 3 ? (
                                    rankIcons[(index + 1) as keyof typeof rankIcons]
                                  ) : (
                                    <span className="font-medium">{index + 1}</span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                                    <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{user.username}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                  {user.major}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-center">{user.solvedProblems}</td>
                              <td className="py-3 px-4 text-center">{user.contributions}</td>
                              <td className="py-3 px-4 text-center font-medium">{user.reputation}</td>
                              <td className="py-3 px-4">
                                <div className="flex justify-center gap-2">
                                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                    {user.badges.gold}
                                  </Badge>
                                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                    {user.badges.silver}
                                  </Badge>
                                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                    {user.badges.bronze}
                                  </Badge>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="solved" className="mt-4">
              <Card className="border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader>
                  <CardTitle className="text-xl">해결 랭킹</CardTitle>
                  <CardDescription>해결한 문제 수 기준 상위 사용자</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium">순위</th>
                          <th className="text-left py-3 px-4 font-medium">사용자</th>
                          <th className="text-left py-3 px-4 font-medium">전공</th>
                          <th className="text-center py-3 px-4 font-medium">해결 문제</th>
                          <th className="text-center py-3 px-4 font-medium">평판</th>
                          <th className="text-center py-3 px-4 font-medium">배지</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .sort((a, b) => b.solvedProblems - a.solvedProblems)
                          .map((user, index) => (
                            <tr
                              key={user.id}
                              className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  {index + 1 <= 3 ? (
                                    rankIcons[(index + 1) as keyof typeof rankIcons]
                                  ) : (
                                    <span className="font-medium">{index + 1}</span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                                    <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{user.username}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                  {user.major}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">{user.solvedProblems}</td>
                              <td className="py-3 px-4 text-center">{user.reputation}</td>
                              <td className="py-3 px-4">
                                <div className="flex justify-center gap-2">
                                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                    {user.badges.gold}
                                  </Badge>
                                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                    {user.badges.silver}
                                  </Badge>
                                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                    {user.badges.bronze}
                                  </Badge>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="contribution" className="mt-4">
              <Card className="border-none shadow-md dark:shadow-gray-800/30">
                <CardHeader>
                  <CardTitle className="text-xl">기여 랭킹</CardTitle>
                  <CardDescription>기여도 기준 상위 사용자</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b dark:border-gray-700">
                          <th className="text-left py-3 px-4 font-medium">순위</th>
                          <th className="text-left py-3 px-4 font-medium">사용자</th>
                          <th className="text-left py-3 px-4 font-medium">전공</th>
                          <th className="text-center py-3 px-4 font-medium">기여도</th>
                          <th className="text-center py-3 px-4 font-medium">평판</th>
                          <th className="text-center py-3 px-4 font-medium">배지</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .sort((a, b) => b.contributions - a.contributions)
                          .map((user, index) => (
                            <tr
                              key={user.id}
                              className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  {index + 1 <= 3 ? (
                                    rankIcons[(index + 1) as keyof typeof rankIcons]
                                  ) : (
                                    <span className="font-medium">{index + 1}</span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                                    <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{user.username}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                                  {user.major}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-center font-medium">{user.contributions}</td>
                              <td className="py-3 px-4 text-center">{user.reputation}</td>
                              <td className="py-3 px-4">
                                <div className="flex justify-center gap-2">
                                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                    {user.badges.gold}
                                  </Badge>
                                  <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                    {user.badges.silver}
                                  </Badge>
                                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                    {user.badges.bronze}
                                  </Badge>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 배지 설명 섹션 */}
          <Card className="border-none shadow-md dark:shadow-gray-800/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-teal-500" />
                배지 시스템 안내
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                    <Trophy className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">골드 배지</h3>
                    <p className="text-sm text-muted-foreground">
                      최고 품질의 문제 해결 또는 기여를 한 사용자에게 수여됩니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                    <Medal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">실버 배지</h3>
                    <p className="text-sm text-muted-foreground">
                      우수한 품질의 문제 해결 또는 기여를 한 사용자에게 수여됩니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                    <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">브론즈 배지</h3>
                    <p className="text-sm text-muted-foreground">
                      양질의 문제 해결 또는 기여를 한 사용자에게 수여됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
