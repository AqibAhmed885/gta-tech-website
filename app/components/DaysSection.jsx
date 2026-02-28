import React from "react";
import Image from "next/image";

const days = [
  {
    day: "Day 1",
    time: "09:00 – 19:00",
    title: "AI Innovations & Trends",
    desc:
      "The summit kicks off with a keynote, expert panels, and discussions on AI’s impact, ethics, and automation. Hands-on workshops and a networking event wrap up the day.",
  },
  {
    day: "Day 2",
    time: "09:00 – 20:00",
    title: "AI Technologies & Applications",
    desc:
      "Explore the latest in generative AI, robotics, and NLP, with industry-led discussions and tech demos. A startup showcase and investor insights highlight AI’s business potential.",
  },
  {
    day: "Day 3",
    time: "09:30 – 16:00",
    title: "Future of AI & Networking",
    desc:
      "Dive into AI’s long-term impact, attend expert-led workshops, and watch the startup pitch competition. The event closes with a visionary keynote and final networking sessions.",
  },
];

export default function DaysSection() {
  return (
    <section className="w-full flex justify-center py-12">
      <div className="relative bg-[#191919] rounded-3xl px-8 py-10 max-w-2xl md:max-w-7xl w-full" style={{ boxShadow: "0 2px 32px 0 rgba(0,0,0,0.18)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 py-12 px-8 gap-y-10 gap-x-12">
          {days.map((d, i) => (
            <React.Fragment key={d.day}>
              <div className="flex flex-col">
                <div className="text-2xl font-semibold text-white mb-1">{d.day}</div>
                <div className="text-2xl font-bold text-white mb-4">{d.time}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-white mb-1">{d.title}</div>
                <div className="text-sm text-gray-300">{d.desc}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Mark image bottom left */}
        <div className="absolute left-0 bottom-0    hidden md:block">
          <Image src="/Mark.png" alt="Mark" width={200} height={200} className="object-contain" />
        </div>

        {/* Button bottom right */}
        <div className="flex justify-end mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-blue-700 to-blue-400 text-white text-base font-semibold shadow"
          >
            View detailed schedule
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}