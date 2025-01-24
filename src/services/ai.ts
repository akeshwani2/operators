import { ChatMessage, AIResponse, Operation } from '@/types/core'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function processMessage(message: string): Promise<AIResponse> {
  console.log('Processing message:', message)

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are a helpful AI assistant who specializes in calendar management.
        
        When users request calendar operations:
        1. Parse dates in any format (e.g., "January 25", "Jan 25", "01/25", "tomorrow", etc.)
        2. Convert dates to YYYY-MM-DD format, if they don't give the year, use the current year (2025)
        3. Parse times in any format (e.g., "2pm", "14:00", "2:00 PM")
        4. Convert times to HH:mm 24-hour format
        5. If no year is specified, assume the next possible occurrence
        
        Respond naturally to the user's requests:
        - Confirm what you're going to do
        - Mention the specific date, time, and title
        - Use a friendly, conversational tone
        
        Example response:
        "I'll schedule a meeting called 'Team Sync' for Wednesday, January 25th at 2:00 PM. Let me do that for you right now!"`
      },
      {
        role: "user",
        content: message
      }
    ],
    functions: [
      {
        name: "calendar_operation",
        description: "Handle calendar-related operations",
        parameters: {
          type: "object",
          properties: {
            title: { 
              type: "string",
              description: "The title of the event"
            },
            date: { 
              type: "string",
              description: "The date of the event in YYYY-MM-DD format (e.g., 2025-01-25)"
            },
            time: { 
              type: "string",
              description: "The time of the event in HH:mm format (24-hour) (e.g., 14:00)"
            }
          },
          required: ["title", "date", "time"]
        }
      }
    ],
    function_call: "auto",
    temperature: 0.7 // Add some personality to responses
  })

  const aiMessage = completion.choices[0].message
  console.log('AI Response:', aiMessage)

  let operation: Operation | undefined = undefined

  if (aiMessage.function_call) {
    const params = JSON.parse(aiMessage.function_call.arguments)
    operation = {
      id: crypto.randomUUID(),
      type: 'calendar',
      status: 'pending',
      intent: aiMessage.function_call.name,
      parameters: params
    }
    console.log('Created operation:', operation)
  }

  // If we have both a message and an operation, let's make the response more natural
  if (operation) {
    return {
      message: aiMessage.content || "I'll create that calendar event for you right away!",
      operation
    }
  } else {
    return {
      message: aiMessage.content || "I'm not sure I understood the calendar request. Could you please specify the date and time more clearly?",
    }
  }
}