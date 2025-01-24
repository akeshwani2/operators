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
        2. List events (daily/weekly/monthly summaries)
        3. Update existing events
        4. Delete events
        5. Postpone events

        For listing events:
        - When users ask for summaries (e.g., "what's my week look like?", "show my schedule")
        - Set action as "list_events" and specify the appropriate period ("day", "week", "month")
        - No need for date/time parameters for summaries

        For other calendar operations:
        1. Parse dates in any format (e.g., "January 25", "Jan 25", "01/25", "tomorrow", etc.)
        2. Convert dates to YYYY-MM-DD format
        3. Parse times in any format (e.g., "2pm", "14:00", "2:00 PM")
        4. Convert times to HH:mm 24-hour format
        
        Respond naturally to the user's requests:
        - For summaries: "I'll fetch your schedule for this week!"
        - For events: Confirm the specific date, time, and title
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
              description: "The title of the event",
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
            changes: {
              type: "object",
              description: "Changes to apply to an event",
              properties: {
                newTitle: { type: "string" },
                newDate: { type: "string" },
                newTime: { type: "string" },
              },
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
