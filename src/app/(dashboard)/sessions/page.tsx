'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { Timer } from 'lucide-react';
import { useQuery } from 'react-query';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import WithAuthHoc from '@/components/with-auth/WithAuthHoc';
import { UserContext } from '@/contexts/userContext';


interface Session {
    id: number;
    sessionId: string;
    userId: number;
    challengeId: number;
    startedAt: string;
    endedAt: string | null;
}

interface Challenge {
    challenge_id: number;
    title: string;
    difficulty: string;
}

interface SessionCardProps {
    session: Session;
    challenge: Challenge;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, challenge }) => {
    const status = session.endedAt ? 'Completed' : 'In Progress';

    return (
        <Card className='h-30 cursor-pointer'>
            <div className='p-4'>
                <div className="flex w-[250px] justify-between items-center">
                    <CardTitle className="text-lg font-medium">{challenge.title}</CardTitle>
                    <div className='flex items-center gap-1'>
                        <span className='text-gray-500 text-sm'>{'45 mins'}</span>
                        <Timer className='text-gray-500' size={17} />
                    </div>
                </div>
                <div className='flex items-center gap-3 mt-3 mb-2'>
                    <span className='text-sm'>Status:</span>
                    <p className="text-xs text-muted-foreground">
                        <Badge className={`pointer-events-none ${status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {status}
                        </Badge>
                    </p>
                </div>
                <div className='mt-4 flex justify-between'>
                    <Link className='text-sm text-primary font-semibold hover:underline' href={`/analysis/`}>View details</Link>
                    <Badge className={`pointer-events-none ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : (challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800')}`}>
                        {challenge.difficulty}
                    </Badge>
                </div>
            </div>
        </Card>
    );
};

const SkeletonLoader = () => {
    return (
        <div className="h-30 w-[250px] cursor-pointer bg-gray-50 animate-pulse">
            <div className="p-4 space-y-4">
                <div className="h-5 bg-gray-100 rounded"></div>
                <div className="h-5 bg-gray-100 rounded w-1/2"></div>
                <div className="h-5 bg-gray-100 rounded w-1/3"></div>
            </div>
        </div>
    );
};

const fetchSessions = async (userId: number) => {
    const response = await fetch(`https://wandererappserver.azurewebsites.net/api/sessions/${userId}`);
    return response.json();
};

const fetchChallenge = async (id: any) => {
    console.log(id);
    const response = await fetch(`https://wandererappserver.azurewebsites.net/api/challenge/title/${id}`);
    console.log(response.body);
    return response.json();
};

const Analytics: React.FC = () => {
    const { user } = useContext(UserContext);

    const { data: sessions, isLoading: sessionsLoading } = useQuery(['practiceSessions'], () => fetchSessions(user.id));
    const { data: challenges, isLoading: challengesLoading } = useQuery(['practicedChallenges'], async () => {
        if (!sessions) return [];
        const challengeIds = Array.from(new Set(sessions.map((session: Session) => session.challengeId)));
        const challengePromises = challengeIds.map((id: any) => fetchChallenge(id));
        return Promise.all(challengePromises).then(results =>
            results.reduce((acc, challenge) => {
                acc[challenge.challenge_id] = challenge;
                return acc;
            }, {} as Record<number, Challenge>)
        );
    }, {
        enabled: !!sessions
    });

    if (sessionsLoading || challengesLoading) {
        return (
            <section className="py-6 px-8 h-full w-full flex justify-center flex-col overflow-y-auto">
                <div className='w-2/3 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center '>
                    {Array.from({ length: 8 }).map((_, index) => <SkeletonLoader key={index} />)}
                </div>
            </section>
        );
    }

    const sessionCards = sessions && sessions?.map((session: Session) => {
        const challenge = challenges[session.challengeId];
        return challenge ? <SessionCard key={session.id} session={session} challenge={challenge} /> : null;
    });

    return (
        <WithAuthHoc>
            <section className="py-6 px-8 h-full w-full flex justify-center flex-col">
                {!sessionCards?.length ? <p className="text-center text-lg font-medium">No sessions found,  Continue Practicing </p> :
                <div className='w-2/3 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center '>
                    {sessionCards}
                </div>}
            </section>
        </WithAuthHoc>
    );
};

export default Analytics;
