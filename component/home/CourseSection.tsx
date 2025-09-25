// src/components/CourseSection.jsx
import React from "react";

const CourseSection = () => {
  return (
    <section className="relative w-full bg-sky-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Text */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            <span className="italic text-sky-600">Everything</span>{" "}
            You Need to <br className="hidden md:block" /> 
            Know About <span className="text-sky-700">Our Courses</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our expertly structured lessons and interactive tools, designed 
            to guide you step-by-step through your A Level journey.
          </p>
        </div>

        {/* Media */}
        <div className="relative flex flex-col items-center lg:flex-row lg:justify-center gap-8">
          {/* Laptop mockup */}
          <div className="relative bg-white rounded-2xl shadow-xl border overflow-hidden max-w-3xl">
            <img
              alt="Laptop with course content"
              className="w-full h-auto"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-sky-600 hover:bg-sky-700 flex items-center justify-center shadow-lg transition">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile mockup */}
          <div className="relative bg-white rounded-2xl shadow-xl border overflow-hidden max-w-xs">
            <img
              alt="Mobile with course details"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
