// src/app/admin/jobs/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    applyStartDate: '',
    applyEndDate: '',
    description: '',
    company: '',
    type: 'full-time',
    sector: 'private',
    eligibility: '',
    location: '', // New field for location
    salary: '', // New field for salary
    status: 'draft',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/jobs');
      } else {
        console.error('Failed to create job posting');
      }
    } catch (error) {
      console.error('Error creating job posting:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-5 sm:p-6 bg-dark-200 shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6">Create New Job Posting</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="applyStartDate" className="block text-sm font-medium text-gray-200">
                Job Apply Start Date
              </label>
              <input
                type="date"
                name="applyStartDate"
                id="applyStartDate"
                required
                value={formData.applyStartDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="applyEndDate" className="block text-sm font-medium text-gray-200">
                Job Apply End Date
              </label>
              <input
                type="date"
                name="applyEndDate"
                id="applyEndDate"
                required
                value={formData.applyEndDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-200">
              Job Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-200">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              id="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-200">
              Job Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-200">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              required
              value={formData.salary}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-200">
              Type of Job
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="full-time">Full Time</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label htmlFor="sector" className="block text-sm font-medium text-gray-200">
              Sector of the Job
            </label>
            <select
              name="sector"
              id="sector"
              value={formData.sector}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="government">Government</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label htmlFor="eligibility" className="block text-sm font-medium text-gray-200">
              Eligibility Criteria
            </label>
            <textarea
              name="eligibility"
              id="eligibility"
              rows={4}
              required
              value={formData.eligibility}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-dark-300 border-gray-600 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-100 bg-dark-300 hover:bg-dark-400 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-200"
            >
              Create Job Posting
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}