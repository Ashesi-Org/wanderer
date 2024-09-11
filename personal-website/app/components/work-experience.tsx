
export function WorkExperience() {
    const workExperience = [
        {
            role: 'Software Engineer - a cool startup',
            stack: 'Next.js • TypeScript • Tailwind ',
            date: '2024-Present',
            description:
                'Woring mostly on the frontend building out the UI components. I also work on the backend from time to time.',
        },
        {
            role: 'Software Engineer - Ahegel',
            stack: 'React Native • TS • Nativewind',
            date: '2023-2024',
            description:
                'Designed and developed UI components, optimized mobile app for performance and accessibility on both iOS and Android.',
        },
        {
            role: 'Intern - LeasAfric',
            stack: 'HTML • JS • PHP',
            date: '2022-2022',
            description:
                'Revamped and modernized ui for internal tools, improving the overall user experience.',
        },
    ];

    return (
        <>
            <div>
                <p className="mb-4 tracking-tighter text-md">work experience</p>
                {workExperience.map((item, index) => (
                    <div key={index} className="flex flex-col space-y-1 mb-8">
                        <div className="w-full sm:items-center text-sm flex flex-col md:flex-row space-x-0 md:space-x-10">
                            <div className="text-neutral-500 dark:text-neutral-400 w-[100px] tabular-nums">
                                {item.date}
                                <div className="sm:h-[92px]" />
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <p className="text-white text-start text-sm dark:text-neutral-100">{item.role}</p>
                                <p className="text-[#a5a4a4]  text-justify text-sm dark:text-neutral-100  leading-loose sm:w-lg tracking-tight">
                                    {item.description}
                                </p>
                                <p className="text-[#a5a4a4] text-sm dark:text-neutral-100 tracking-tight">{item.stack}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
