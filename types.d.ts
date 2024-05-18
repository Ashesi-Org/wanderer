type User = {
   userId: string,
   email: string,
   firstName: string,
   lastName: string,
   role: string,
   avatarUrl: string,
   bio: string,
   mfaEnabled: boolean,
   verified: boolean,
   phoneNumber: string

}


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
