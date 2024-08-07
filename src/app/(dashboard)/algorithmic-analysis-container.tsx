"use client"

import { Card, CardContent } from "@/components/ui/card";

interface AlgorithmicAnalysisProps {
    practiceSession: PracticeSession;
    challenge: Challenge;
    submissions: Submission[];
}

const AlgorithmicAnalysis: React.FC<AlgorithmicAnalysisProps> = ({
    practiceSession,
    challenge,
    submissions,
}) => {
    const { startedAt, endedAt, sessionId } = practiceSession;
    const { title, description, difficulty, constraints, assumptions } = challenge;

    // Get submission details
    const submissionDetails = submissions.map((submission) => ({
        code: submission.code,
        status: submission.status,
        runtime: submission.runtime,
        memory: submission.memory,
    }));

    return (
        <div className="space-y-6 p-4 max-w-7xl mx-auto">
            <Card className="p-4 bg-white shadow-md rounded-lg">
                <CardContent>
                    <h2 className="text-lg font-semibold text-gray-800">Practice Session Overview</h2>
                    <div className="mt-2">
                        <p><strong>Session ID:</strong> {sessionId}</p>
                        <p><strong>Started At:</strong> {new Date(startedAt).toLocaleString()}</p>
                        <p><strong>Ended At:</strong> {endedAt ? new Date(endedAt).toLocaleString() : 'Ongoing'}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="p-4 bg-white shadow-md rounded-lg">
                <CardContent>
                    <h2 className="text-lg font-semibold text-gray-800">Challenge Details</h2>
                    <div className="mt-2">
                        <p><strong>Title:</strong> {title}</p>
                        <p><strong>Description:</strong> {description}</p>
                        <p><strong>Difficulty:</strong> {difficulty}</p>
                        <p><strong>Constraints:</strong> {constraints || 'None'}</p>
                        <p><strong>Assumptions:</strong> {assumptions.join(', ') || 'None'}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="p-4 bg-white shadow-md rounded-lg">
                <CardContent>
                    <h2 className="text-lg font-semibold text-gray-800">Submission Details</h2>
                    <div className="mt-2">
                        {submissionDetails.length > 0 ? (
                            <ul className="space-y-2">
                                {submissionDetails.map((sub, index) => (
                                    <li key={index} className="border rounded-md p-2 bg-gray-50">
                                        <p><strong>Code:</strong> {sub.code}</p>
                                        <p><strong>Status:</strong> {sub.status}</p>
                                        <p><strong>Runtime:</strong> {sub.runtime ? `${sub.runtime} ms` : 'N/A'}</p>
                                        <p><strong>Memory:</strong> {sub.memory ? `${sub.memory} MB` : 'N/A'}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No submissions found.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default AlgorithmicAnalysis;




export type PracticeSession = {
    sessionId: string;
    startedAt: string;
    endedAt?: string;
    userId: number;
    challengeId: number;
};

export type Challenge = {
    title: string;
    description: string;
    difficulty: string;
    constraints?: string;
    assumptions: string[];
};

export type Submission = {
    submission_id: number;
    user_id: number;
    challenge_id: number;
    code: string;
    status: 'Pending' | 'Accepted' | 'Rejected';
    runtime?: number;
    memory?: number;
    created_at: string;
};
