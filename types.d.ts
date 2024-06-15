
type AuthProvider = {
    id: number;
    userId: number;
    googleId: string;
    createdAt: string;
    updatedAt: string;
};

type User = {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    phoneNumber: string | null;
    bio: string | null;
    profileImage: string;
    linkedIn: string | null;
    mfaEnabled: boolean;
    AuthProvider: AuthProvider[];
};


type PracticeSession = {
   sessionId: string,
   userId: string,
   problemId: string,
   createdAt: Date,

}


type Problem = {
   problemId: string,
   description: string,
   difficulty: string,
   title: string,
   tags: string[],
   examples: string[],
   hints: string[],

}
