// src/app/admin/jobs/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string; // Added location field
  salary: number; // Added salary field
  status: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold">Jobs</h1>
          <p className="mt-2 text-sm">A list of all job postings in the system.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/jobs/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Job
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-100 sm:pl-6">Position</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">Company</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">Location</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">Salary</th> {/* New column for salary */}
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-100">Status</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600 bg-gray-700">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-400">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-red-500">{error}</td>
                    </tr>
                  ) : jobs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-400">No jobs found</td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr key={job._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-100 sm:pl-6">{job.title}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{job.company}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{job.location}</td> {/* Display location */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{job.salary}</td> {/* Display salary */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'published' ? 'bg-green-600 text-green-200 border border-green-500' : 'bg-yellow-600 text-yellow-200 border border-yellow-500'}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link href={`/admin/jobs/${job._id}`} className="text-indigo-400 hover:text-indigo-600">Edit</Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}