import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter } from "./ui/card";
import { ThumbsUp, MessageSquare, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Problem {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  solved: boolean;
}

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link to={`/problems/${problem.id}`}>
      <Card className="overflow-hidden border-none shadow-md hover:shadow-lg dark:shadow-gray-800/30 transition-all duration-300 w-full">
        <CardContent className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800 font-medium">
                  {problem.category}
                </Badge>
                {problem.solved && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    <CheckCircle className="h-3 w-3" /> 해결됨
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-lg mb-2 hover:text-teal-500 transition-colors">{problem.title}</h3>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0 text-sm text-muted-foreground bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <ThumbsUp className="h-4 w-4" />
                <span>{problem.likes}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <MessageSquare className="h-4 w-4" />
                <span>{problem.comments}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={`/abstract-geometric-shapes.png?key=fzjld&height=32&width=32&query=${problem.author}`}
                  alt={problem.author}
                />
                <AvatarFallback>{problem.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-gray-600 dark:text-gray-400">{problem.date}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
