import ChatInterface from '@/components/ChatInterface'
import { redirect } from 'next/navigation';
import { auth } from "@clerk/nextjs/server";


async function ChatPage() {
  const { userId } = await auth();
  // If no user is logged in, redirect them to the ChatPage page
  if (!userId) {
    redirect("/");
  }
  return (
    <main className="container mx-auto">
      <ChatInterface />
    </main>
  )
}

export default ChatPage