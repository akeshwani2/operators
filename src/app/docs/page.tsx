"use client";

import React from "react";
import {
  ArrowLeft,
  Cpu,
  BookOpen,
  Zap,
  Shield,
  Layers,
  MessageCircle,
  Database,
} from "lucide-react";
import Link from "next/link";

const DocsPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content Container */}
      <div className="relative px-6 md:px-8 py-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link href="/">
            <button className="group relative px-4 py-2 mb-8 text-sm font-medium text-gray-900 bg-gradient-to-r from-white via-gray-100 to-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#ffffff] flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-gray-100/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6 animate-gradient">
            Welcome to EVO
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl">
            EVO is my attempt at creating a general purpose AI agent. Though it is
            not perfect, it is a work in progress.
          </p>
        </div>

        {/* Info Section */}
        <div className="backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-8 mb-16 border border-white/5 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-6">About EVO</h2>
          <div className="space-y-6 text-gray-400">
            <p className="leading-relaxed">
              EVO is an advanced AI agent built with Next.js, Convex, and
              LangGraph. It processes messages through a sophisticated pipeline,
              leveraging various tools and APIs to provide intelligent responses.
            </p>
            <p className="font-medium text-white">Key capabilities include:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "YouTube video transcription and analysis",
                "Google Books integration for literature queries",
                "Summarize your recent emails (coming soon)",

                "Wikipedia information retrieval",
                "Mathematical computations and problem-solving",
                "Weather information access"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Cpu className="w-8 h-8" />,
              title: "Architecture",
              description: "Understand EVO's technical architecture and workflow system.",
              href: "/docs/architecture"
            },
            {
              icon: <Layers className="w-8 h-8" />,
              title: "Prompt Caching",
              description: "Learn how EVO caches prompts to improve response times.",
              href: "/docs/caching"
            },
            {
              icon: <MessageCircle className="w-8 h-8" />,
              title: "IBM's Watsonx.ai flows engine",
              description: "Learn more about IBM's Watsonx.ai and try it yourself.",
              href: "https://wxflows.ibm.stepzen.com/?instance=fe8773c2-4192-48fa-8031-83e9c23d4f70&environment=banbakla"
            }
          ].map((feature, index) => (
            <Link href={feature.href} key={index}>
              <div className="group backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:scale-105 hover:bg-zinc-800/50">
                <div className="mb-4 text-white/80 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h2>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Technical Details Section */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">
            Technical Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Zap />,
                title: "LangGraph Integration",
                description: "Advanced language processing with state management and tool integration capabilities."
              },
              {
                icon: <Shield />,
                title: "Secure Authentication",
                description: "Built-in Clerk authentication with protected routes and user management."
              },
              {
                icon: <Database />,
                title: "Convex Database",
                description: "Real-time database with automatic caching and optimized queries for chat history."
              },
              {
                icon: <BookOpen />,
                title: "External APIs",
                description: "Integration with multiple external services including YouTube, Google Books, and Wikipedia."
              }
            ].map((feature, index) => (
              <div key={index} className="backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                  <span className="text-white">
                    {feature.icon}
                  </span>
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add the same animation styles as in the home page */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s linear infinite;
        }
      `}</style>
    </main>
  );
};

export default DocsPage;