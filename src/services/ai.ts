import { ChatMessage, AIResponse, Operation } from "@/types/core";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function processMessage(message: string): Promise<AIResponse> {
  console.log("Processing message:", message);

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      {
        role: "system",
        content: `You are an AI assistant capable of managing calendar operations.
        You can:
        1. Create new events
        2. List events (daily/weekly summaries)
        3. Update existing events (reschedule)
        4. Delete events
        5. Postpone events

        For rescheduling/updating events:
        1. When users mention "reschedule", "move", "postpone", "change time", or anything similar - use action: "update_event"
        2. Extract the event title from their request (e.g., "dinner", "meeting with Darshit")
        3. Set the new date and time in the required format
        4. Example: "reschedule the dinner to 3pm" should update the "dinner" event
        5. Always include both the title and new time in the operation parameters
        6. If the user doesn't specify a new time, use the current time
        7. If the user doesn't specify a year, use 2025

        Date and Time Handling:
        1. Parse dates in any format (e.g., "January 25", "01/25", "tomorrow")
        2. Convert dates to YYYY-MM-DD format
        3. Parse times in any format (e.g., "2pm", "14:00", "2:00 PM")
        4. Convert times to HH:mm 24-hour format
        
        Example update operation:
        {
          "action": "update_event",
          "title": "dinner",
          "date": "2025-01-26",
          "time": "15:00"
        }

        Respond naturally to the user's requests:
        - For updates: "I'll reschedule [event] to [new date/time]"
        - For summaries: "I'll fetch your schedule!"
        - Use a friendly, conversational tone`,
      },
      {
        role: "user",
        content: message,
      },
    ],
    functions: [
      {
        name: "calendar_operation",
        description: "Handle calendar-related operations",
        parameters: {
          type: "object",
          properties: {
            action: {
              type: "string",
              enum: [
                "create_event",
                "list_events",
                "update_event",
                "delete_event",
                "postpone_event",
              ],
              description: "The type of calendar operation to perform",
            },
            title: {
              type: "string",
              description: "The title/summary of the event to create or modify",
            },
            date: {
              type: "string",
              description: "The date in YYYY-MM-DD format",
            },
            time: {
              type: "string",
              description: "The time in HH:mm format (24-hour)",
            },
            period: {
              type: "string",
              enum: ["day", "week", "month"],
              description: "Time period for listing events",
            },
            eventId: {
              type: "string",
              description: "ID of the event to modify (for updates/deletions)",
            },
          },
          required: ["action"],
        },
      },
    ],
    function_call: "auto",
    temperature: 0.7,
  });

  const aiMessage = completion.choices[0].message;
  console.log("AI Response:", aiMessage);

  let operation: Operation | undefined = undefined;

  if (aiMessage.function_call) {
    const params = JSON.parse(aiMessage.function_call.arguments);
    operation = {
      id: crypto.randomUUID(),
      type: "calendar",
      status: "pending",
      intent: aiMessage.function_call.name,
      parameters: params,
    };
    console.log("Created operation:", operation);
  }

  // Customize response based on operation type
  if (operation) {
    if (operation.parameters.action === 'list_events') {
      return {
        message: aiMessage.content || "I'll fetch your schedule right away!",
        operation,
      };
    } else if (operation.parameters.action === 'create_event') {
      return {
        message: aiMessage.content || "I'll create that calendar event for you right away!",
        operation,
      };
    } else if (operation.parameters.action === 'update_event') {
      return {
        message: aiMessage.content || "I'll update that event for you now.",
        operation,
      };
    } else if (operation.parameters.action === 'delete_event') {
      return {
        message: aiMessage.content || "I'll delete that event for you.",
        operation,
      };
    }
  }

  return {
    message: aiMessage.content || "I'm not sure I understood that request. Could you please be more specific?",
    operation,
  };
}
