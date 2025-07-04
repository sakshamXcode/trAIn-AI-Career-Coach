import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Smart Onboarding",
    description: "Kickstart your journey with trAIn by sharing your industry, goals, and experience level — get tailored support from day one.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Build Career Assets",
    description: "Generate polished, ATS-friendly resumes and cover letters designed to stand out in real hiring pipelines.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Master the Interview Game",
    description: "Run through realistic mock interviews and receive instant, actionable feedback to improve with every round.",
    icon: <Users className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track & Elevate",
    description: "Visualize your growth with data-backed insights, performance analytics, and career readiness metrics.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];
