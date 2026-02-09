import Link from "next/link";
import Image from "next/image";

export default function ExclusiveBlogs({ blogs }) {
  // If you actually want to duplicate for infinite scroll, use this:
  // const duplicatedPosts = [...(blogs || []), ...(blogs || [])];
  
  // For now, based on your code:
  const duplicatedPosts = blogs || [];

  return (
    <section className="py-8 md:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl mb-5 md:text-3xl main-text font-bold text-white">
          Exclusive Blogs
        </h2>

        {duplicatedPosts.length === 0 ? (
          <p className="text-gray-400 text-center pt-10">
            No exclusive blogs available
          </p>
        ) : (
          <div className="relative">
            <div className="flex animate-slide-x gap-4 pt-10 w-max">
              {duplicatedPosts.map((post, index) => (
                <Link
                  // 1. BEST PRACTICE: Create a unique key. 
                  // If post.id exists, use it. If duplicating, add index to make it unique.
                  key={`${post.id || post.url}-${index}`} 
                  className="bg-gradient-to-b from-[#1c2334] to-[#0e1424] rounded-2xl overflow-hidden shadow-md min-w-[280px] sm:min-w-[320px] md:min-w-[360px] flex-shrink-0"
                  href={`/blogs/${post.url}`}
                >
                  <div className="relative w-full h-72">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm md:text-base font-normal mb-3">
                      {post.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}