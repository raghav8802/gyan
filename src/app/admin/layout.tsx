'use client';

// import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();

  return (
    <div className="min-h-screen bg-dark">
      <nav className="bg-dark-100/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/admin" className="text-xl font-heading font-bold text-primary">
                  Admin
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/admin/blog"
                  className="border-transparent text-gray-300 hover:text-primary hover:border-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                >
                  Blog
                </Link>
                <Link
                  href="/admin/courses"
                  className="border-transparent text-gray-300 hover:text-primary hover:border-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                >
                  Courses
                </Link>
                <Link
                  href="/admin/jobs"
                  className="border-transparent text-gray-300 hover:text-primary hover:border-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
                >
                  Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="bg-dark">{children}</main>
    </div>
  );
} 