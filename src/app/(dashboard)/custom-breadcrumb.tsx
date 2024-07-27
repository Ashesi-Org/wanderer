import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

const CustomBreadcrumb = () => {
    return (
        <>
            <div className="mt-2 mb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link className='text-[1rem]' href="/sessions">Practice sessions</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link className='text-[1rem]' href="/analytics">Analysis</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link className='text-[1rem]' href="/Feedback">Feedback</Link>
                            </BreadcrumbLink>{' '}
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </>
    );
}

export default CustomBreadcrumb;