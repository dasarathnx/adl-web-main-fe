import Image from "next/image"; // 1. Import the component
import Container from "../Common/Container";

export default function BusinessGuideSection({ blog }) {
  if (!blog) return null;

  return (
    <section className="text-white py-16 md:py-25">
      <Container>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          
          {/* 2. PARENT DIV CHANGES: 
            - Added 'relative': Required when using layout="fill" on the child Image.
            - Added 'aspect-[4/3]' or 'h-[400px]': Since the Image is absolute, the div needs a defined height or aspect ratio, otherwise it will collapse to 0px height.
          */}
          <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-lg md:sticky top-0 md:top-24">
            <Image
              src={blog.image}
              alt={blog.title}
              fill // 3. Replaces width/height, fills the parent
              priority // Optional: Load this faster since it's above the fold
              sizes="(max-width: 768px) 100vw, 50vw" // Optimization for performance
              className="object-cover object-top origin-top scale-[1.03]"
            />
          </div>

          {/* Text Side */}
          <div>
            <h1 className="text-3xl md:text-[32px] font-bold mb-4">
              {blog.title}
            </h1>

            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
              {blog.excerpt}
            </p>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}