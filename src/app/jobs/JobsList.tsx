'use client';

import { useState } from 'react';
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

interface JobsListProps {
  jobs: Job[];
}

export default function JobsList({ jobs }: JobsListProps) {
  const [sortBy, setSortBy] = useState<'latest' | 'salary'>('latest');

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return (b.salary || 0) - (a.salary || 0);
    }
  });

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={() => setSortBy('latest')}
            className={`px-4 py-2 rounded-md ${
              sortBy === 'latest'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            Latest Uploads
          </button>
          <button
            onClick={() => setSortBy('salary')}
            className={`px-4 py-2 rounded-md ${
              sortBy === 'salary'
                ? 'bg-primary text-white'
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            Highest Salary
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {sortedJobs.map((job) => (
          <div
            key={job._id}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                <p className="text-gray-400 mb-1">{job.company}</p>
                <p className="text-gray-400 mb-4">{job.location}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-primary">
                  {job.salary ? `₹${job.salary.toLocaleString()}` : 'Salary not specified'}
                </p>
                <p className="text-gray-400">{job.type}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-gray-300 mb-2">{job.description}</p>
              <div className="flex gap-2 mt-4">
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  {job.sector}
                </span>
                <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  Apply by: {new Date(job.applyEndDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`/jobs/${job._id}`}
                className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 