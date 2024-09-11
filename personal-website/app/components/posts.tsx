import { ArrowIcon } from './footer'
import { getBlogPosts } from 'app/blog/utils'
import { formatDate } from 'app/blog/utils'
import Link from 'next/link'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <>
      <div>
        <p className='mb-4 tracking-tighter text-md'>latest posts</p>
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-6"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full text-sm flex flex-col md:flex-row space-x-0 md:space-x-10">
                <p className="text-neutral-500 dark:text-neutral-400 w-[100px] tabular-nums my-1 sm:my-1">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <div className='flex gap-2 items-center'>
                  <p className="text-white text-sm dark:text-neutral-100 tracking-tight">
                    {post.metadata.title}
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