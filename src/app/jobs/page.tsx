import JobsList from './JobsList';
import { getGoogleDriveImageUrl } from '@/utils/imageUtils';

async function getJobs() {
  try {
    const res = await fetch('http://localhost:3000/api/jobs', { 
      cache: 'no-store',
      next: { revalidate: 60 } // Revalidate every minute
    });
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark">
      <div className="container mx-auto px-4">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">Job Opportunities</h1>
          <p className="text-xl text-gray-400 mb-8">Find your next career opportunity</p>

          <JobsList jobs={jobs} />
        </div>
      </div>
    </div>
  );
} 