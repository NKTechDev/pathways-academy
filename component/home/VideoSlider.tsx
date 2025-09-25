// src/components/home/VideoSlider.jsx
import { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

// Sample video data (replace src/poster later with your own)
const videos = [
  {
    id: 1,
    subject: "A Level Psychology",
    chapter: "Dement & Kleitman",
    lesson: "Background Aims & Hypotheses",
    title: "Teaching At Your Fingertips",
    description:
      "Clear, concise, and exam-focused video lessons that make difficult concepts simple.",
    poster: "/assets/video1-poster.png", // placeholder
  },
  {
    id: 2,
    subject: "A Level Chemistry",
    chapter: "Organic Chemistry",
    lesson: "Hydrocarbons & Reactions",
    title: "Master Organic Chemistry",
    description:
      "Step-by-step explanations by top teachers to help you score every mark.",
    poster: "/assets/video2-poster.png",
  },
  {
    id: 3,
    subject: "A Level Biology",
    chapter: "Cell Division",
    lesson: "Mitosis & Meiosis",
    title: "Understand Biology Fast",
    description:
      "Animated and easy-to-follow lessons created for clarity and retention.",
    poster: "/assets/video3-poster.png",
  },
];

export default function VideoSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((c) => (c === 0 ? videos.length - 1 : c - 1));
  };

  const nextSlide = () => {
    setCurrent((c) => (c === videos.length - 1 ? 0 : c + 1));
  };

  return (
    <section className="relative w-full bg-sky-50 py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Heading */}
        <header className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            <span className="inline-block px-2 py-1 rounded-md bg-purple-200 text-purple-900 mr-2">
              A*
            </span>
            {videos[current].title}
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            {videos[current].description}
          </p>
        </header>

        {/* Video frame */}
        <div className="relative rounded-2xl border bg-white shadow-lg overflow-hidden">
          <div className="relative aspect-[16/9]">
            <img
              src={videos[current].poster}
              alt={videos[current].lesson}
              className="w-full h-full object-cover"
            />
            <button
              className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition"
              aria-label="Play video"
            >
              <Play className="h-8 w-8" />
            </button>
          </div>
        </div>

        {/* Video meta */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-slate-800">
            {videos[current].subject}
          </h3>
          <p className="text-slate-600">
            Chapter: {videos[current].chapter}
          </p>
          <p className="text-slate-600">
            Lesson: {videos[current].lesson}
          </p>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 w-3 rounded-full transition ${
                current === i ? "bg-purple-600" : "bg-purple-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
