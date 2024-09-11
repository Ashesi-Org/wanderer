import { BlogPosts } from 'app/components/posts';
import Image from 'next/image';
import { WorkExperience } from './components/work-experience';
import { Projects } from './components/projects';
import Balancer from 'react-wrap-balancer';

export default function Page() {
  return (
    <section>
      <div className="flex flex-row gap-6 items-center mb-8">
        <div className="w-[120px] h-[150] rounded-full ">
          <Image
            src="/profile-pic.jpeg"
            alt="Abdul Wahab"
            width={120}
            height={120}
            className="w-[120px] h-[120px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl">abdul</h2>
          <p className="text-sm text-[#a5a4a4]">i design & build cool shit ✨</p>
        </div>
      </div>
      <h1 className="mb-2 text-md  tracking-tighter">about</h1>
      <p className="mb-4 text-[#a5a4a4] text-sm leading-loose text-justify">
        <Balancer>
          {`I currently work as a fullstack developer at a cool startup while building projects and freelancing on the side. 
        I'm passionate about AI, ML, robotics and how they can adddress real world problems. I enjoy building stuff people actually want to use. 
        I'm a hard core linux fanboy (i use vim btw) and UI/UX freak. Outside programming, I like to play video games and football.`}
        </Balancer>
      </p>
      <div className="sm:my-10 my-14">
        <WorkExperience />
      </div>
      <div className="my-10">
        <Projects />
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
