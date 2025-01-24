'use client'

import { useState, useEffect } from 'react'
import type { ChatMessage, AIResponse } from '@/types/core'

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [operationStatus, setOperationStatus] = useState<{
    isProcessing: boolean
    status?: 'success' | 'error'
    message?: string
  }>({ isProcessing: false })

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status')
      const { authenticated } = await response.json()
      setIsAuthenticated(authenticated)
    } catch (error) {
      console.error('Failed to check auth status:', error)
      setIsAuthenticated(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!input.trim() || isLoading) return
    
    // Create new user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setOperationStatus({ isProcessing: true, message: 'Processing your request...' })

    try {
      // First, get AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      const data: AIResponse = await response.json()
      
      // Add AI response to chat
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])

      // If there's an operation, execute it
      if (data.operation) {
        setOperationStatus({ 
          isProcessing: true, 
          message: 'Creating calendar event...' 
        })

        const operationResponse = await fetch('/api/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data.operation.parameters),
        })

        if (!operationResponse.ok) {
          throw new Error('Failed to create calendar event')
        }

        const operationResult = await operationResponse.json()
        
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '✅ Calendar event created successfully!',
          timestamp: new Date()
        }])

        setOperationStatus({
          isProcessing: false,
          status: 'success',
          message: 'Calendar event created!'
        })
      } else {
        setOperationStatus({ isProcessing: false })
      }

    } catch (error) {
      console.error('Failed to process message:', error)
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date()
      }])
      setOperationStatus({
        isProcessing: false,
        status: 'error',
        message: 'Failed to process request'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const response = await fetch('/api/auth/google')
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Failed to start auth:', error)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {!isAuthenticated && (
        <div className="p-4 bg-gray-800 text-white">
          <button
            onClick={handleGoogleAuth}
            className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Connect Google Calendar
          </button>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white ml-auto' 
                : 'bg-gray-800 text-white'
            } max-w-[80%]`}
          >
            {message.content}
          </div>
        ))}
        
        {/* Loading/Status Indicator */}
        {operationStatus.isProcessing && (
          <div className="flex items-center space-x-2 text-white">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            <span>{operationStatus.message}</span>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 p-2 bg-gray-800 text-white border border-gray-700 rounded-lg"
            placeholder={isLoading ? "Processing..." : "Type your request..."}
          />
          <button 
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {isLoading ? 'Processing...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}