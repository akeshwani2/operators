"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ArrowRight, ArrowUpRight, Dot } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Top navigation */}
      <div className="absolute top-4 flex items-center gap-4 right-4 z-50">
        <div className="flex items-center text-xs md:text-sm text-zinc-500 border border-white/10 rounded-lg backdrop-blur-sm bg-black/20 px-2 py-1">
          <div className="flex items-center pr-2">
            <Dot className="w-5 h-5 animate-pulse text-emerald-500" />
            BETA
          </div>
        </div>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox:
                "h-10 w-10 rounded-lg transition-all duration-300 hover:scale-105 ring-2 ring-white/20 hover:ring-white/40",
            },
          }}
        />
      </div>

      <section className="w-full px-6 py-16 mx-auto max-w-7xl sm:px-8 lg:px-12 flex flex-col items-center gap-12 relative">
        {/* Hero Section */}
        <header className="flex flex-col items-center gap-6 animate-fade-in">
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-gradient px-1">
            EVO
          </h1>
          <div className="flex flex-col items-center gap-6">
            <p className="text-base sm:text-lg text-center text-gray-400 max-w-[600px] leading-relaxed animate-fade-in-up">
              EVO is my attempt to create a general purpose AI agent, that can
              be used for a wide range of tasks.
            </p>
            <Link href="https://wxflows.ibm.stepzen.com" className="group">
              <span className="text-gray-400 text-sm sm:text-base border border-gray-800 hover:border-gray-700 rounded-full py-2 px-4 flex items-center gap-1 transition-all duration-300 backdrop-blur-sm bg-black/20 pl-2">
                <Dot className="w-6 h-6 text-white group-hover:text-white/80 animate-pulse" />
                Powered by IBM&apos;s watsonx.ai
              </span>
            </Link>
          </div>
        </header>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4">
          <SignedIn>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/chat">
                <button className="group relative px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-gray-900 bg-gradient-to-r from-white via-gray-100 to-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#ffffff]">
                  Chat with EVO
                  <ArrowRight className="inline-block ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-gray-100/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
              <Link href="/docs">
                <button className="group relative px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Learn More
                  <ArrowUpRight className="inline-block ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </Link>
            </div>
          </SignedIn>
          <SignedOut>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/sign-in">
                <button className="group relative inline-flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base font-medium text-black bg-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-tighter">
                  Try EVO
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
              <Link href="/docs">
                <button className="group relative inline-flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3.5 text-sm sm:text-base font-medium text-black bg-white rounded-lg hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 tracking-tighter">
                  Learn More
                  <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-0.5" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
            </div>
          </SignedOut>
        </div>
      </section>

      {/* Add this to your global CSS */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
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
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
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
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </main>
  );
}
