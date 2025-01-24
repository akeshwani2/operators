'use client'
import { SignIn, SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'

function page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Content Container */}
      <div className="relative w-full px-6 md:px-8 max-w-5xl mx-auto"> 
        {/* Header */}
        <div className="mb-16 animate-fade-in">
          <Link href="/">
          <div className='md:pt-0 pt-10'>
            <button className="group relative py-2 px-4 mb-8 text-sm font-medium text-gray-900 bg-gradient-to-r from-white via-gray-100 to-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_2rem_-0.5rem_#ffffff] flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 to-gray-100/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            </div>
          </Link>
        </div>

        {/* Sign Up Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-gradient">
              Join EVO Today
            </h1>
            <div className="h-24">
              <p className="text-gray-400 text-xl">
                <TypeAnimation 
                  sequence={[
                    'Streamline your workflow effortlessly with AI-powered tools',
                    2000,
                    'Enhance productivity and optimize learning',
                    2000,
                    'Simplify your tasks with cutting-edge AI',
                    2000
                  ]}
                  wrapper="span"
                  speed={70}
                  repeat={Infinity}
                />
              </p>
            </div>
          </div>

          {/* Right side - Sign up component */}
          <div className="animate-fade-in-up delay-150 mb-10">
            <div className="">
              <SignUp 
                afterSignUpUrl="/dashboard"
                redirectUrl="/dashboard"
                appearance={{
                  baseTheme: dark,
                  variables: {
                    colorPrimary: "#3b82f6",
                  },
                  elements: {
                    card: "bg-transparent shadow-none",
                    headerTitle: "text-white",
                    headerSubtitle: "text-gray-400",
                    socialButtonsBlockButton: "bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/5",
                    formButtonPrimary: "bg-blue-500 hover:bg-blue-600 shadow-[0_0_1rem_-0.25rem_#3b82f6]",
                    formFieldInput: "bg-zinc-800/50 border-white/5",
                    footerAction: "hidden",
                    footer: "hidden",
                  }
                }}
              />
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
      `}</style>
    </main>
  )
}

export default page