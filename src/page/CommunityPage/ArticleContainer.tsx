import Pagination from '@/components/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const tabCategoryMapper: Record<string, string> = {
  all: '전체',
  question: '질문',
  recruit: '모집',
  info: '정보',
  review: '후기',
};
function ArticleContainer({ posts }: { posts: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('all');

  const filteredPosts = posts.filter(post => currentTab === 'all' || post.category === tabCategoryMapper[currentTab]);
  const lastPage = Math.ceil(Math.ceil(filteredPosts.length / 5));
  const currentPosts = filteredPosts.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className="flex-1">
      <Tabs defaultValue="all" className="mb-6" value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="question">질문</TabsTrigger>
          <TabsTrigger value="recruit">모집</TabsTrigger>
          <TabsTrigger value="info">정보</TabsTrigger>
          <TabsTrigger value="review">후기</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {currentPosts.map(post => (
              <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="question" className="mt-4">
          <div className="grid gap-4">
            {currentPosts
              // .filter(post => post.category === '질문')
              .map(post => (
                <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="recruit" className="mt-4">
          <div className="grid gap-4">
            {currentPosts
              .filter(post => post.category === '모집')
              .map(post => (
                <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="info" className="mt-4">
          <div className="grid gap-4">
            {currentPosts
              .filter(post => post.category === '정보')
              .map(post => (
                <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="review" className="mt-4">
          <div className="grid gap-4">
            {currentPosts
              .filter(post => post.category === '후기')
              .map(post => (
                <CommunityPostCard key={post.id} post={post} categoryColors={categoryColors} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage} />
    </div>
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
              <AvatarImage src={post.authorAvatar || '/placeholder.svg'} alt={post.author} />
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

// 카테고리별 색상
const categoryColors = {
  질문: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  모집: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  정보: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  후기: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
};

export default ArticleContainer;
