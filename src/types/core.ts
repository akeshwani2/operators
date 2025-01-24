export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    status?: 'pending' | 'processing' | 'complete' | 'error'
  }
  
  export interface Operation {
    id: string
    type: 'calendar' | 'email' | 'task' // we can expand this later
    status: 'pending' | 'running' | 'completed' | 'failed'
    intent: string
    parameters: Record<string, any>
    result?: any
    error?: string
  }
  
  export interface AIResponse {
    message: string
    operation?: Operation
    requiredAuth?: string[]
  }