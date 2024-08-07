import Link from 'next/link';

const SubmissionError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Submission Failed!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Unfortunately, your submission could not be processed due to an error.
          Please try again later or contact support if the issue persists.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/retry">
            <h3 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Retry Submission</h3>
          </Link>
          <Link href="/challenges">
            <h3 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Back to Challenge</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SubmissionError;
