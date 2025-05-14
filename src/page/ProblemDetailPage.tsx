import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';

import { Layout } from '../components/layout';

import ProblemDetailCard from '@/components/problem-detail/ProblemDetailCard';

export default function ProblemDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <main className="flex-1 container py-8 px-4 md:px-8 max-w-full mx-auto">
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link to="/problems" className="flex items-center text-gray-500 hover:text-teal-500 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              문제 목록으로 돌아가기
            </Link>
          </div>
          <ProblemDetailCard problemId={id || '0'} />
        </div>
      </main>
    </Layout>
  );
}
