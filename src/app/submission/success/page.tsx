'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

const SubmissionSuccess = ({ submissionId }: { submissionId: string }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  // Dummy data for demonstration
  const dummyData = {
    submission_id: submissionId || 12345,
    user_id: 1,
    challenge_id: 101,
    code: 'console.log("Hello World");',
    status: 'Accepted',
    runtime: 0.123,
    memory: 1.45,
    created_at: new Date().toLocaleString(),
    challenge: {
      title: 'Solve the Fibonacci Sequence',
      description: 'Write a function to generate Fibonacci numbers up to a given number.',
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Submission Successful!</h1>
        <div className="mb-6">
          <p className="text-lg font-semibold mb-2">Submission ID: {dummyData.submission_id}</p>
          <p className="text-gray-700 mb-2">Challenge: {dummyData.challenge.title}</p>
          <p className="text-gray-700 mb-2">Status: <span className="text-green-600">{dummyData.status}</span></p>
          <p className="text-gray-700 mb-2">Runtime: {dummyData.runtime} seconds</p>
          <p className="text-gray-700 mb-2">Memory Used: {dummyData.memory} MB</p>
          <p className="text-gray-700">Submitted At: {dummyData.created_at}</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={handleOpenDialog} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            View Analytics
          </button>
          <Link href="/challenges">
            <h3 className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Explore More Challenges</h3>
          </Link>
          <Link href="/dashboard">
            <h3 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Go to Dashboard</h3>
          </Link>
        </div>

        {/* Modal for Analytics */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {/* Button to trigger modal (hidden, handled by state) */}
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
            <DialogClose className="absolute top-4 right-4">
            </DialogClose>
            <DialogTitle className="text-xl font-semibold text-blue-600">Analytics Unavailable</DialogTitle>
            <DialogDescription className="mt-2 text-gray-700">
              <h3>
                The detailed analytics are not ready at the moment. Please check back in a few minutes.
              You can find feedback and details of your submission in the practice session analytics dashboard.
                </h3>
            </DialogDescription>
            <div className="flex justify-end mt-4">
              <button onClick={handleCloseDialog} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubmissionSuccess;
