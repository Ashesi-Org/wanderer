
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



export const dummyPracticeSession: PracticeSession = {
    sessionId: "session123",
    startedAt: "2024-07-30T09:00:00Z",
    endedAt: "2024-07-30T09:45:00Z",
    userId: 1,
    challengeId: 1,
};

export const dummyChallenge: Challenge = {
    title: "Two Sum",
    description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    difficulty: "Medium",
    constraints: "The solution must be in linear runtime complexity.",
    assumptions: ["The input array is not sorted.", "Each input would have exactly one solution."],
};

export const dummySubmissions: Submission[] = [
    {
        submission_id: 1,
        user_id: 1,
        challenge_id: 1,
        code: "function twoSum(nums, target) { ... }",
        status: "Accepted",
        runtime: 25.5,
        memory: 12.4,
        created_at: "2024-07-30T09:10:00Z",
    },
    {
        submission_id: 2,
        user_id: 1,
        challenge_id: 1,
        code: "function twoSum(nums, target) { ... }",
        status: "Rejected",
        runtime: 30.2,
        memory: 13.1,
        created_at: "2024-07-30T09:20:00Z",
    },
    {
        submission_id: 3,
        user_id: 1,
        challenge_id: 1,
        code: "function twoSum(nums, target) { ... }",
        status: "Accepted",
        runtime: 22.8,
        memory: 11.7,
        created_at: "2024-07-30T09:30:00Z",
    },
];