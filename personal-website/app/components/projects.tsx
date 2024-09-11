import Link from 'next/link'
import { ArrowIcon } from './footer'

export function Projects() {
    const projects = [
        {
            title: 'Librelinks - An opensource link in bio tool ',
            link: 'https://librelinks.me',
            date: 'Aug 2023',
        },
        {
            title: 'Spacely - A cozy place to relax and be productive',
            link: 'https://spacely.vercel.app',
            date: 'July 2023',
        },
        {
            title: 'Breeze - A screenshot tool to build engaging assets',
            link: 'https://breeze-app.vercel.app',
            date: 'Jan 2023',
        },
        {
            title: 'Libregradients - Free gradients for your next project',
            link: 'https://libre-gradients.vercel.app/',
            date: 'Sept 2022',
        },
    ]

    return (
        <>
            <div id='projects'>
                <p className='mb-4 tracking-tighter text-md'>projects</p>
                {projects.map((item) => (
                    <Link
                        key={item.title}
                        className="flex flex-col space-y-1 mb-6 sm:mb-2"
                        href={`${item.link}`}
                        target='_blank'
                    >
                        <div className="w-full text-sm flex flex-col md:flex-row space-x-0 md:space-x-10">
                            <p className="text-neutral-500 my-1 sm:my-4 dark:text-neutral-400 w-[100px] tabular-nums">
                                {item.date}
                            </p>
                            <div className='flex gap-2 items-center'>
                                <p className="text-white text-sm dark:text-neutral-100 tracking-tight">
                                    {item.title}
                                </p>
                                <ArrowIcon width={8} height={8} />
                            </div>

                        </div>

                    </Link>
                ))}
            </div>
        </>
    )
}
