"use client"
import { ArrowLeft, Workflow, Database, Shield, Cpu, MessageSquare, Wrench } from "lucide-react";
import Link from "next/link";
import { MermaidChart } from '@/components/MermaidChart'

const ArchitecturePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content Container */}
      <div className="relative px-6 md:px-8 py-16 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <Link href="/docs">
            <button className="group relative px-4 py-2 mb-8 text-sm font-medium text-gray-900 bg-gradient-to-r from-white via-gray-100 to-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#ffffff] flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Docs
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-gray-100/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>
          <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 animate-gradient">
            System Architecture
          </h1>
          <p className="text-gray-400 text-lg">
            Understanding how EVO works under the hood
          </p>
        </div>

        {/* Core Components Section */}
        <div className="mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">Core Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/50">
              <div className="flex items-center gap-3 mb-4">
                <Workflow className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-medium text-white">LangGraph Pipeline</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Message processing workflow using LangGraph for orchestration:
              </p>
              <ul className="space-y-2 text-gray-400">
                {["State management for conversation context", "Conditional routing between agent and tools", 
                  "Streaming response generation", "Tool execution coordination"].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="group backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/50">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-medium text-white">Convex Database</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Real-time database system handling:
              </p>
              <ul className="space-y-2 text-gray-400">
                {["Chat history persistence", "User data management", 
                  "Message synchronization", "Automatic caching and indexing"].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* System Flow */}
        <div className="mb-16 animate-fade-in-up delay-150">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">System Flow</h2>
          <div className="backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-8 border border-white/5">
            <div className="space-y-8">
              {[
                {
                  icon: <MessageSquare className="w-4 h-4 text-blue-400" />,
                  title: "1. Message Processing",
                  description: "User messages are received through the Next.js API route, authenticated, and streamed to the LangGraph pipeline for processing."
                },
                {
                  icon: <Cpu className="w-4 h-4 text-blue-400" />,
                  title: "2. Agent Evaluation",
                  description: "The LangGraph agent evaluates the message context and determines whether to respond directly or utilize available tools."
                },
                {
                  icon: <Wrench className="w-4 h-4 text-blue-400" />,
                  title: "3. Tool Integration",
                  description: "When needed, the agent interfaces with external tools through GraphQL queries, including YouTube transcripts, Google Books, Wikipedia, and mathematical computations."
                },
                {
                  icon: <Shield className="w-4 h-4 text-blue-400" />,
                  title: "4. Security & Storage",
                  description: "All interactions are secured through Clerk authentication, with conversation history stored in Convex for real-time access and persistence."
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">{step.title}</h4>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flow Chart */}
        <div className="mb-16 animate-fade-in-up delay-200">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">System Flow Chart</h2>
          <div className="backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-8 border border-white/5 flex justify-center">
            <MermaidChart chart={`
              graph TD
                  A[User Input] -->|Next.js API| B[LangGraph Pipeline]
                  B -->|Evaluate| C{Need Tools?}
                  C -->|Yes| D[Tool Selection]
                  C -->|No| E[Direct Response]
                  D -->|Query| F[External APIs]
                  F -->|Results| G[Response Generation]
                  E -->G
                  G -->|Stream| H[UI Update]
                  G -->|Store| I[Convex DB]
                  
                  style A fill:#2563eb20,stroke:#3b82f6
                  style B fill:#2563eb20,stroke:#3b82f6
                  style C fill:#2563eb20,stroke:#3b82f6
                  style D fill:#2563eb20,stroke:#3b82f6
                  style E fill:#2563eb20,stroke:#3b82f6
                  style F fill:#2563eb20,stroke:#3b82f6
                  style G fill:#2563eb20,stroke:#3b82f6
                  style H fill:#2563eb20,stroke:#3b82f6
                  style I fill:#2563eb20,stroke:#3b82f6
            `} />
          </div>
        </div>

        {/* Technical Stack */}
        <div className="animate-fade-in-up delay-300">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">Technical Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend",
                items: ["Next.js 15.1.5", "React 19", "TailwindCSS", "Lucide Icons"]
              },
              {
                title: "Backend",
                items: ["Convex Database", "LangGraph", "GraphQL Tools", "Clerk Authentication"]
              },
              {
                title: "External Services",
                items: ["YouTube API", "Google Books API", "Wikipedia API", "Weather API"]
              }
            ].map((stack, index) => (
              <div key={index} className="group backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/50">
                <h3 className="text-lg font-medium text-white mb-3">{stack.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {stack.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation styles */}
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
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </main>
  );
};

export default ArchitecturePage;