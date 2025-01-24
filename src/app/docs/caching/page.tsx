"use client"
import { ArrowLeft, Zap, Clock, Database, LineChart } from "lucide-react";
import Link from "next/link";

const CachingPage = () => {
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
          <h1 className="text-5xl pb-1 font-bold tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4 animate-gradient">
            Prompt Caching System
          </h1>
          <p className="text-gray-400 text-lg">
            Understanding EVO&apos;s intelligent caching mechanism for improved performance and reduced costs
          </p>
        </div>

        {/* Overview Section */}
        <div className="mb-16 animate-fade-in-up">
          <div className="backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-8 border border-white/5">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-6">
              What is prompt caching and how does EVO use it?
            </h2>
            <div className="space-y-6 text-gray-400">
              <p className="leading-relaxed">
                Prompt caching is a performance optimization technique where EVO intelligently stores and reuses responses 
                to similar queries. For each conversation, EVO strategically caches three key components:
              </p>
              <ul className="space-y-3">
                {[
                  "The initial system configuration message, ensuring consistent behavior across sessions",
                  "The most recent user message, enabling quick responses to repeated questions",
                  "The second-to-last human message, maintaining conversation context while optimizing performance (think of this as a checkpoint)"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="leading-relaxed">
                When you send a message, EVO first checks if a similar query exists in its cache. If found, it can 
                respond instantly without making additional API calls to language models. This system not only speeds 
                up response times but also significantly reduces operational costs by minimizing redundant processing.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16 animate-fade-in-up delay-150">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6 text-blue-400" />,
                title: "Faster Responses",
                description: "Cached responses are delivered instantly, eliminating the need for repeated API calls and language model processing for similar queries."
              },
              {
                icon: <LineChart className="w-6 h-6 text-blue-400" />,
                title: "Cost Efficiency",
                description: "By reducing the number of API calls to external services and language models, the caching system significantly lowers operational costs."
              }
            ].map((benefit, index) => (
              <div key={index} className="group backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-6 border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800/50">
                <div className="flex items-center gap-3 mb-4">
                  {benefit.icon}
                  <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                </div>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Details */}
        <div className="mb-16 animate-fade-in-up delay-300">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">Implementation Details</h2>
          <div className="space-y-6">
            {[
              {
                icon: <Database className="w-4 h-4 text-blue-400" />,
                title: "Cache Storage",
                description: "Responses are stored in Convex with associated metadata including:",
                items: ["Original prompt text", "Response content", "Timestamp", "Usage metrics"]
              },
              {
                icon: <Clock className="w-4 h-4 text-blue-400" />,
                title: "Cache Invalidation",
                description: "The system employs smart cache invalidation strategies:",
                items: ["Time-based expiration for dynamic content", "Usage-based retention for popular queries", 
                       "Automatic cleanup for outdated entries", "Context-aware invalidation"]
              }
            ].map((section, index) => (
              <div key={index} className="backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">{section.title}</h4>
                    <p className="text-gray-400">{section.description}</p>
                    <ul className="mt-2 space-y-1 text-gray-400">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="animate-fade-in-up delay-450">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-8">Performance Impact</h2>
          <div className="backdrop-blur-sm bg-zinc-900/50 rounded-2xl p-6 border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Response Time",
                  value: "~200ms",
                  subtitle: "Average for cached responses"
                },
                {
                  title: "Cache Hit Rate",
                  value: "35%",
                  subtitle: "Average across all queries"
                },
                {
                  title: "Cost Reduction",
                  value: "40%",
                  subtitle: "Average monthly savings"
                }
              ].map((metric, index) => (
                <div key={index} className="p-4 backdrop-blur-sm bg-zinc-800/50 rounded-lg border border-white/5">
                  <h4 className="text-white font-medium mb-2">{metric.title}</h4>
                  <p className="text-3xl font-medium text-white mb-1">{metric.value}</p>
                  <p className="text-sm text-gray-400">{metric.subtitle}</p>
                </div>
              ))}
            </div>
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
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-450 {
          animation-delay: 450ms;
        }
      `}</style>
    </main>
  );
};

export default CachingPage;