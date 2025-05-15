import { Link, useNavigate, useParams } from 'react-router';
import { useProblemDetailQuery } from './useProblemDetailQuery';
import { useEffect, useState } from 'react';
import { Layout } from '../layout';
import { CircleSpinner } from '../spinner';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { MarkdownEditor } from '../markdown-editor';
import { FileUpload } from '../file-upload';
import { TagInput } from '../tag-input';

export default function EditProblemPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: problemRes, isSuccess, isLoading, isError } = useProblemDetailQuery(id || '0');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: [] as string[],
    files: [] as File[],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 문제 데이터 로드 시 폼에 채우기
  useEffect(() => {
    if (isSuccess && problemRes?.data) {
      const problem = problemRes.data;
      setFormData({
        title: problem.title,
        category: problem.categories[0] || '',
        content: problem.content,
        tags: problem.tags || [],
        files: [], // 기존 파일은 별도로 표시
      });
    }
  }, [isSuccess, problemRes]);

  // 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleFilesUpload = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const handleFileRemove = (file: File) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f !== file),
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // 문제 수정 API 호출 (실제 구현 필요)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 임시 지연

      // 성공 시 상세 페이지로 이동
      navigate(`/problems/${id}`);
    } catch (err) {
      setError('문제 수정 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  // 추천 태그 목록 (실제 구현에서는 API에서 가져옴)
  const suggestedTags = [
    '미분방정식',
    '선형대수',
    '확률론',
    '통계학',
    '해석학',
    '대수학',
    '기하학',
    '위상수학',
    '이산수학',
    '수치해석',
    '양자역학',
    '전자기학',
    '열역학',
    '유체역학',
    '광학',
    '상대성이론',
    '입자물리학',
    '천체물리학',
    '유기화학',
    '무기화학',
    '물리화학',
    '분석화학',
    '생화학',
    '고분자화학',
    '알고리즘',
    '자료구조',
    '운영체제',
    '컴퓨터네트워크',
    '데이터베이스',
    '인공지능',
    '기계학습',
    '컴퓨터비전',
    '자연어처리',
    '웹개발',
    '모바일개발',
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <CircleSpinner size="lg" color="teal" />
            <p className="text-teal-600 dark:text-teal-400 font-medium mt-4">문제 정보를 불러오는 중입니다...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="container py-8 px-4 md:px-8 max-w-full mx-auto">
          <div className="max-w-3xl mx-auto">
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>문제를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.</AlertDescription>
            </Alert>
            <Button asChild>
              <Link to={`/problems/${id}`}>문제로 돌아가기</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex-1 container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <div className="flex items-center">
            <Link to={`/problems/${id}`} className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              문제로 돌아가기
            </Link>
          </div>

          <Card className="w-full border-none shadow-lg dark:shadow-gray-800/30">
            <CardHeader>
              <CardTitle className="text-2xl">문제 수정</CardTitle>
              <CardDescription>문제 내용을 수정하고 저장하세요</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="문제의 제목을 입력하세요"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">수학</SelectItem>
                      <SelectItem value="physics">물리학</SelectItem>
                      <SelectItem value="chemistry">화학</SelectItem>
                      <SelectItem value="biology">생물학</SelectItem>
                      <SelectItem value="computer-science">컴퓨터공학</SelectItem>
                      <SelectItem value="electrical-engineering">전자공학</SelectItem>
                      <SelectItem value="mechanical-engineering">기계공학</SelectItem>
                      <SelectItem value="business">경영학</SelectItem>
                      <SelectItem value="economics">경제학</SelectItem>
                      <SelectItem value="psychology">심리학</SelectItem>
                      <SelectItem value="sociology">사회학</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="content" className="text-base font-medium">
                      문제 내용
                    </Label>
                    <span className="text-xs text-muted-foreground">마크다운/LaTeX 지원</span>
                  </div>
                  <MarkdownEditor
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="문제의 내용을 자세히 설명해주세요. 마크다운과 LaTeX 문법을 사용할 수 있습니다. (예: $$E=mc^2$$)"
                    height={300}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="files">첨부 파일</Label>

                  {/* 기존 파일 표시 (있는 경우) */}
                  {problemRes?.data?.attachments && problemRes.data.attachments.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">기존 첨부 파일</h4>
                      <div className="space-y-2">
                        {problemRes.data.attachments.map((file: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-gray-800"
                          >
                            <span className="text-sm truncate">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">삭제</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <FileUpload
                    value={formData.files}
                    onUpload={handleFilesUpload}
                    onRemove={handleFileRemove}
                    accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    maxSize={5}
                    maxFiles={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    이미지, PDF, 문서 파일을 첨부할 수 있습니다. 최대 3개, 각 파일당 최대 5MB까지 가능합니다.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">태그</Label>
                  <TagInput
                    value={formData.tags}
                    onChange={handleTagsChange}
                    placeholder="태그를 입력하세요 (Enter로 추가)"
                    suggestions={suggestedTags}
                    maxTags={5}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    최대 5개의 태그를 추가할 수 있습니다. 태그는 문제를 분류하고 검색하는 데 도움이 됩니다.
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/problems/${id}`)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <CircleSpinner size="sm" color="white" />
                      <span>저장 중...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>변경사항 저장</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </Layout>
  );
}
