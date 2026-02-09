'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import SecondaryButton from '@/Components/button/SecondaryButton';
import Container from '@/Components/Common/Container';
import { motion, useScroll, useTransform } from 'framer-motion';

const businessData = [
  {
    id: 1,
    title: "Freezone",
    description: "Freezone companies enjoy full ownership, tax advantages, simplified licensing, and business setup.",
    image: "/assets/images/businessSection/freezone.png",
    url: "/uae-freezone-business-setup"
  },
  {
    id: 2,
    title: "Mainland",
    description: "Mainland setup enables UAE operations with full ownership and flexible business activities.",
    image: "/assets/images/businessSection/mainland.png",
    url: "/mainland-company-formation-in-uae"
  },
  {
    id: 3,
    title: "Offshore",
    description: "Offshore structures offer asset protection, privacy, trading flexibility, and simplified international operations.",
    image: "/assets/images/businessSection/offshore.png",
    url: "/offshore-company-formation-in-uae"
  },
];

export default function BusinessSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to active index (0, 1, 2)
  // We divide the scroll range into 3 parts
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) {
        setActiveIndex(0);
      } else if (latest < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);


  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <Container>
          <div className="px-4 flex flex-col md:flex-row md:items-center gap-12 h-screen max-h-[800px] justify-center">
            {/* ===== LEFT CONTENT ===== */}
            <div className="flex-1 flex gap-8 items-center relative">
              {/* Vertical 3-line Indicator */}
              <div className='flex items-center self-stretch'>
                <div className="flex flex-col items-center gap-9 justify-center h-full relative">
                  {businessData.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1 h-28 md:h-32 lg:h-40 rounded-full transition-all duration-500 ${activeIndex === index ? "bg-white" : "bg-[#E9C05F]"
                        }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Text Section */}
              <div className="flex-1 relative h-[300px] md:h-[400px] flex items-center">
                {businessData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transform flex items-center transition-all duration-700 ease-out ${index === activeIndex
                      ? "opacity-100 translate-y-0"
                      : index < activeIndex
                        ? "opacity-0 -translate-y-full"
                        : "opacity-0 translate-y-full"
                      }`}
                  >
                    <div className='flex flex-col'>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 ">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl max-w-lg leading-relaxed mb-8">
                        {item.description}
                      </p>
                      <div>
                        <SecondaryButton text='Explore Packages' url={item.url} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== RIGHT IMAGE SECTION ===== */}
            <div className="hidden md:block flex-1 relative h-96 lg:h-[500px] rounded-3xl overflow-hidden glass-bg">
              {businessData.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${index === activeIndex
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                    }`}
                >
                  <div className="w-full h-20 flex justify-center items-center ">
                    <h3 className="text-3xl font-semibold ">
                      {item.title}
                    </h3>
                  </div>
                  <div className="relative w-2/3 h-72">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
