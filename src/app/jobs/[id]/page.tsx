import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary?: number;
  type: string;
  sector: string;
  applyStartDate: string;
  applyEndDate: string;
  description: string;
  eligibility: string;
  status: string;
  createdAt: string;
}

async function getJob(id: string): Promise<Job | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/jobs"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Jobs
          </Link>

          <div className="bg-gray-800 rounded-lg p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <p className="text-xl text-gray-400 mb-1">{job.company}</p>
                <p className="text-gray-400">{job.location}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  {job.salary ? `₹${job.salary.toLocaleString()}` : 'Salary not specified'}
                </p>
                <p className="text-gray-400">{job.type}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <p className="text-gray-300 whitespace-pre-line">{job.description}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Eligibility Criteria</h2>
                <p className="text-gray-300 whitespace-pre-line">{job.eligibility}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-1">Sector</h3>
                <p className="font-medium">{job.sector}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-1">Application Start Date</h3>
                <p className="font-medium">
                  {new Date(job.applyStartDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-1">Application End Date</h3>
                <p className="font-medium">
                  {new Date(job.applyEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  {job.status}
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  Posted: {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
              <a
                href="#"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}