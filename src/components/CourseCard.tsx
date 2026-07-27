"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { Course } from "@/lib/data";

const levelColors = {
  Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  Intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

const categoryColors = {
  DSA: "text-blue-400",
  "System Design": "text-purple-400",
  "Full Stack": "text-cyan-400",
  "Web Dev": "text-orange-400",
  "AI/ML": "text-pink-400",
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`} className="group relative flex flex-col bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden transition-all duration-300 card-glow hover:-translate-y-1">
      {course.popular && (
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 text-xs font-semibold bg-[#0071e3] text-white rounded-full">
          Popular
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold ${categoryColors[course.category]}`}>
            {course.category}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${levelColors[course.level]}`}>
            {course.level}
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#3d95f4] transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-[#8b949e] mb-4 leading-relaxed flex-1">{course.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-[#1c2333] border border-[#21262d] text-[#8b949e] rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-[#21262d]">
          <div className="flex items-center gap-4 text-xs text-[#8b949e]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> {course.lessons} lessons
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#0071e3] group-hover:text-[#00c9ff] transition-colors">
            View Course <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
