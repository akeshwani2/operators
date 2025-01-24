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
        2. List events for any date range
        3. Update existing events
        4. Delete events

        For listing events:
        1. Handle queries like "what events do I have on [date]"
        2. Support date ranges like "show me events between [date1] and [date2]"
        3. Support relative dates like "last week", "next month"
        4. For specific dates, set both startDate and endDate to that day
        5. For ranges, set appropriate startDate and endDate

        Date formats:
        - Convert all dates to YYYY-MM-DD format
        - Handle various input formats (e.g., "January 25", "01/25", "tomorrow")
        - For relative dates like "last week", calculate the correct date range

        Example list operations:
        {
          "action": "list_events",
          "startDate": "2024-01-01",
          "endDate": "2024-01-31"
        }

        {
          "action": "list_events",
          "date": "2024-02-15"  // For single day queries
        }

        Respond naturally to queries:
        - For specific dates: "I'll check your schedule for [date]"
        - For ranges: "I'll find your events between [date1] and [date2]"`,
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
              enum: ["create_event", "list_events", "update_event", "delete_event"],
              description: "The type of calendar operation to perform",
            },
            startDate: {
              type: "string",
              description: "Start date in YYYY-MM-DD format for date range queries",
            },
            endDate: {
              type: "string",
              description: "End date in YYYY-MM-DD format for date range queries",
            },
            date: {
              type: "string",
              description: "Specific date in YYYY-MM-DD format for single-day queries",
            },
            period: {
              type: "string",
              enum: ["day", "week", "month"],
              description: "Time period for relative queries",
            }
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