"use client";

import type React from "react";

import { useState } from "react";
import { Layout } from "../components/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { MarkdownEditor } from "../components/markdown-editor";

export default function CommunityNewPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현에서는 API 호출로 데이터 저장
    console.log("커뮤니티 글 작성:", formData);

    // 제출 후 커뮤니티 페이지로 이동
    navigate("/community");
  };

  return (
    <Layout>
      <main className="flex-1 container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <div className="flex items-center">
            <Link to="/community" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              커뮤니티로 돌아가기
            </Link>
          </div>

          <Card className="border-none shadow-lg dark:shadow-gray-800/30">
            <CardHeader>
              <CardTitle className="text-2xl">새 글 작성</CardTitle>
              <CardDescription>커뮤니티에 새로운 글을 작성하여 다른 사용자들과 정보를 공유하세요</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="글의 제목을 입력하세요"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select onValueChange={handleCategoryChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="question">질문</SelectItem>
                      <SelectItem value="recruit">모집</SelectItem>
                      <SelectItem value="info">정보</SelectItem>
                      <SelectItem value="review">후기</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">내용</Label>
                  <MarkdownEditor
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="글의 내용을 자세히 작성해주세요. 마크다운과 LaTeX 문법을 사용할 수 있습니다."
                    height={300}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">태그</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="관련 태그를 쉼표로 구분하여 입력하세요 (예: 수학, 스터디, 질문)"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link to="/community">취소</Link>
                </Button>
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600 transition-colors">
                  글 등록
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </Layout>
  );
}
