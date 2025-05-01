import { useState } from "react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, BookOpen } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col gap-6 py-4">
            <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <BookOpen className="h-6 w-6 text-teal-500" />
              <span className="font-bold text-xl">학문공유</span>
            </Link>
            <nav className="flex flex-col gap-4">
              <Link
                to="/problems"
                className="text-lg font-medium transition-colors hover:text-teal-500"
                onClick={() => setOpen(false)}
              >
                문제 목록
              </Link>
              <Link
                to="/solved"
                className="text-lg font-medium transition-colors hover:text-teal-500"
                onClick={() => setOpen(false)}
              >
                해결된 문제
              </Link>
              <Link
                to="/community"
                className="text-lg font-medium transition-colors hover:text-teal-500"
                onClick={() => setOpen(false)}
              >
                커뮤니티
              </Link>
              <Link
                to="/ranking"
                className="text-lg font-medium transition-colors hover:text-teal-500"
                onClick={() => setOpen(false)}
              >
                랭킹
              </Link>
            </nav>
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full rounded-full">
                  로그인
                </Button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full bg-teal-500 hover:bg-teal-600 transition-colors">
                  회원가입
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
