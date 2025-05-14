import useToggleLikeProblemMutation from './useToggleLikeProblemMutation';
import useToggleSolvedStatusMutation from './useToggleSolvedStatusMutation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

import { useProblemDetailQuery } from '@/components/problem-detail/useProblemDetailQuery';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MarkdownViewer } from '../markdown-viewer';
import { Bookmark, CheckCircle, Circle, MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';
import { CommentSection } from '../comment/comment-section';
import { useState } from 'react';
import ShareSuccessModal from '@/page/ShareSuccessPage';

function ProblemDetailCard({ problemId }: { problemId: string }) {
  const { data: problemRes, isSuccess } = useProblemDetailQuery(problemId || '0');
  const { mutate: toggleLikeProblem } = useToggleLikeProblemMutation(problemId || '0');
  const { mutate: toggleSolvedStatus } = useToggleSolvedStatusMutation(problemId || '0');

  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareSuccess(true);
  };

  if (!isSuccess) return <div>Loading...</div>;
  const problem = problemRes.data;
  return (
    <>
      {showShareSuccess && <ShareSuccessModal onComplete={() => setShowShareSuccess(false)} />}
      <Card className="border-none shadow-lg dark:shadow-gray-800/30 overflow-hidden">
        <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline" className="bg-white dark:bg-gray-800">
              {problem.categories.map(category => category).join(', ')}
            </Badge>
            {problem.tags?.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
              >
                {tag}
              </Badge>
            ))}
            {problem.isSolved && (
              <Badge className="ml-auto bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                해결됨
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl">{problem.title}</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-8 w-8 border-2 border-white dark:border-gray-800">
              <AvatarImage src={'/placeholder.svg'} alt={problem.author.username} />{' '}
              {/* TODO: author에 아바타 이미지 넣기 */}
              <AvatarFallback>{problem.author.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <span className="font-medium">{problem.author.username}</span>
              <span className="text-gray-500 dark:text-gray-400">• {problem.createdAt?.toLocaleDateString?.()}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <MarkdownViewer content={problem.content} />
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
              onClick={() => toggleLikeProblem()}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{problem.likeCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            >
              <MessageSquare className="h-4 w-4" />
              <span>댓글 ({problem.comments.length})</span>
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              variant={problem.isSolved ? 'default' : 'ghost'}
              size="sm"
              onClick={() => toggleSolvedStatus()}
              className={`flex items-center gap-1 ${
                problem.isSolved
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              {problem.isSolved ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              <span>{problem.isSolved ? '해결됨' : '해결 표시하기'}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
            >
              <Bookmark className="h-4 w-4" />
              <span>저장</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span>공유</span>
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-teal-500" />
          답변
        </h2>
        <CommentSection problemId={problem.id} />
      </div>
    </>
  );
}

export default ProblemDetailCard;
