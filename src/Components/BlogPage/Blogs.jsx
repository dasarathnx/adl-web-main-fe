"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import MeetingComponent from "../Common/MeetingComponent";
import Container from "../Common/Container";
import Link from "next/link";
import { blogs } from "@/lib/api/apis";

export default function Blogs() {
  const [meetingModal, setMeetingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(0);
  const [blogData, setBlogData] = useState([]);
  const [totalItems, setTotalItems] = useState(0); // Renamed for clarity (API usually returns total items)
  
  const blogsPerPage = 8;
  const blogSectionRef = useRef(null);

  // Live screen width detection
  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth);
    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleScheduleClick = (value) => {
    setMeetingModal(value);
  };

  // ✅ FIX: Added [currentPage] to dependency array
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Pass currentPage dynamically to the API
        const res = await blogs(currentPage, blogsPerPage); 
        if (res.success) {
          setBlogData(res.data);
          setTotalItems(res.total); // Assuming res.total is total count of blogs
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
  }, [currentPage]); // <--- This triggers the fetch whenever page changes

  // Pagination Logic
  // We don't need indexOfFirstBlog logic because the API returns exactly 8 items for the current page
  const currentBlogs = blogData; 

  // Calculate total pages based on total items from API
  const totalPages = Math.ceil(totalItems / blogsPerPage);

  const changePage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    if (newPage === currentPage) return;

    setCurrentPage(newPage);

    // Smooth scroll to blog section
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePrev = () => changePage(currentPage - 1);
  const handleNext = () => changePage(currentPage + 1);

  return (
    <div ref={blogSectionRef} className="min-h-screen text-white py-12">
      <Container>
        <div className="max-w-7xl flex flex-col lg:flex-row gap-8">
          {/* Blog Area */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-center lg:text-left mb-8">
              Our All Blogs
            </h1>

            {currentBlogs.length === 0 ? (
              <p className="text-center text-gray-400 py-12">
                No blogs available
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {currentBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.url}`}
                    className="glass-bg rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="relative w-full h-40 md:h-56">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <h4 className="text-lg md:text-xl font-semibold text-[#E9C05F] hover:text-blue-400 transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-gray-300 mt-3 text-sm leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {currentBlogs.length > 0 && totalPages > 1 && (
              <div className="flex justify-center mt-12 space-x-2 flex-wrap">
                {/* Prev */}
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-6 py-2 rounded-md ${
                    currentPage === 1
                      ? "glass-bg text-gray-500 cursor-not-allowed"
                      : "glass-bg text-[#E9C05F]"
                  }`}
                >
                  Prev
                </button>

                {/* Page Buttons */}
                {(() => {
                  const pages = [];
                  let windowSize = 8;

                  if (screenWidth < 640) {
                    windowSize = 2;
                  } else if (screenWidth >= 640 && screenWidth < 1140) {
                    windowSize = 5;
                  } else {
                    windowSize = 8;
                  }

                  let start = Math.max(
                    1,
                    currentPage - Math.floor(windowSize / 2)
                  );
                  let end = start + windowSize - 1;

                  if (end > totalPages) {
                    end = totalPages;
                    start = Math.max(1, end - windowSize + 1);
                  }

                  for (let i = start; i <= end; i++) {
                    pages.push(i);
                  }

                  if (screenWidth >= 1140 && end < totalPages) {
                    pages.push("ellipsis");
                    pages.push(totalPages);
                  }

                  return pages.map((page, idx) =>
                    page === "ellipsis" ? (
                      <span key={`ellipsis-${idx}`} className="px-2">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        onClick={() => changePage(page)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === page
                            ? "border-b-2 border-[#E9C05F] text-white"
                            : ""
                        }`}
                      >
                        {page}
                      </button>
                    )
                  );
                })()}

                {/* Next */}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-6 py-2 rounded-md ${
                    currentPage === totalPages
                      ? "glass-bg text-gray-500 cursor-not-allowed"
                      : "glass-bg text-[#E9C05F]"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24 flex flex-col gap-6">
              {/* Latest Posts */}
              <div className="hidden md:block glass-bg p-5 rounded-2xl">
                <h3 className="text-xl font-semibold mb-4">Latest Posts</h3>
                {blogData.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No latest posts available
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {blogData
                      .slice(-5)
                      .reverse()
                      .map((post) => (
                        <li
                          key={post.id}
                          className="flex items-center gap-3 hover:text-blue-400 transition cursor-pointer"
                        >
                          <Link
                            href={`/blogs/${post.url}`}
                            className="flex items-center gap-3"
                          >
                            <div className="relative w-16 h-12 rounded-md overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p className="text-sm text-gray-300 leading-snug">
                              {post.title}
                            </p>
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              {/* CTA Box */}
              <div className="glass-bg p-5 rounded-2xl">
                <h3 className="text-xl font-semibold mb-3">
                  Let's Build Your Dream
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Ready to start your business in Dubai? Get expert help from our
                  consultants today.
                </p>
                <button
                  type="button"
                  onClick={() => handleScheduleClick(true)}
                  className="w-full glass-bg text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Book a Meeting
                </button>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Meeting Modal */}
      {meetingModal && (
        <MeetingComponent handleScheduleClick={handleScheduleClick} />
      )}
    </div>
  );
}