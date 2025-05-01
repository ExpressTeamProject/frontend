"use client";

import type React from "react";

import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Layout } from "../components/layout";
import { MarkdownEditor } from "../components/markdown-editor";

export default function NewProblemPage() {
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
    // 문제 등록 로직 구현
    console.log("Problem submission:", formData);
  };

  return (
    <Layout>
      <main className="flex-1 container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              홈으로 돌아가기
            </Link>
          </div>

          <Card className="w-full border-none shadow-lg dark:shadow-gray-800/30">
            <CardHeader>
              <CardTitle className="text-2xl">새 문제 등록</CardTitle>
              <CardDescription>전공 관련 문제를 등록하고 다른 사용자들과 함께 해결해보세요</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
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
                  <Select onValueChange={handleCategoryChange} required>
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
                  <Label htmlFor="content">문제 내용</Label>
                  <MarkdownEditor
                    value={formData.content}
                    onChange={handleContentChange}
                    placeholder="문제의 내용을 자세히 설명해주세요. 마크다운과 LaTeX 문법을 사용할 수 있습니다. (예: $$E=mc^2$$)"
                    height={300}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">태그</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="관련 태그를 쉼표로 구분하여 입력하세요 (예: 미분방정식, 해석학)"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" asChild>
                  <Link to="/">취소</Link>
                </Button>
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600 transition-colors">
                  문제 등록
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </Layout>
  );
}
