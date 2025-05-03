import { Suspense } from 'react';
import EditBlogClient from './EditBlogClient';

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading...</div>}>
      <EditBlogClient id={params.id} />
    </Suspense>
  );
}
