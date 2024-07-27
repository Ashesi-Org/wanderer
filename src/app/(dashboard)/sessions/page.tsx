'use client';

import { Timer } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const SessionCard = () => {
    return (
        <>
            <Card className='h-30 cursor-pointer'>
                <div className='p-4'>
                    <div className="flex w-[250px] justify-between items-center">
                        <CardTitle className="text-lg font-medium">Reverse String</CardTitle>
                        <div className='flex items-center gap-1'>
                            <span className='text-gray-500 text-sm'>45mins</span>
                            <Timer className='text-gray-500' size={17} />
                        </div>
                    </div>
                    <div className='flex items-center gap-3 mt-3 mb-2'>
                        <span className='text-sm'>Status:</span>
                        <p className="text-xs text-muted-foreground">
                            <Badge className='bg-green-100 text-green-800 pointer-events-none'>Completed</Badge>
                        </p>
                    </div>
                    <div className='mt-4'>
                        <Link className='text-sm text-primary font-semibold hover:underline' href="/analysis">View details</Link>
                    </div>
                </div>

            </Card>
        </>
    );
};

const Analytics = () => {
    return (
        <>
            <section className="py-6 px-8 w-full">
                <div className='flex items-center gap-6 '>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SessionCard key={index} />
                    ))}
                </div>

            </section>
        </>
    );
};

export default Analytics;
