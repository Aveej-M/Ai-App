export const conversationData = [
    { label: "All Unassigned Chats", count: 0 },
    { label: "My Open Chats", count: 0 },
    { label: "My Waiting on Customer Chats", count: 0 },
    { label: "My Waiting on Us Chats", count: 0 },
    { label: "My On Hold Chats", count: 0 },
    { label: "My Resolved Chats", count: 0 },
    { label: "All Open Chats", count: 0 },
    { label: "All Waiting on Customer Chats", count: 0 },
    { label: "All Waiting on Us Chats", count: 0 },
    { label: "All On Hold Chats", count: 0 },
    { label: "All Resolved Chats", count: 0 },
    { label: "All Bot Conversations", count: 2 }
]

export const chatData = {
  views: [
    {
      name: "All Bot Conversations",
      unreadCount: 2,
      totalCount: 22,
      chats: [
        {
          conversationId: "bot-chat-001",
          user: "Guest user",
          channel: "Web",
          lastUpdated: "2025-10-17T12:11:00Z",
          status: "Closed",
          unreadMessages: 1,
          messages: [
            {
              sender: "Guest user",
              role: "customer",
              message: "can i know about ai",
              timestamp: "2025-10-17T12:05:00Z"
            },
            {
              sender: "Agent Spark",
              role: "agent",
              message:
                "I apologize, but I encountered an error processing the search results. Please try again.",
              timestamp: "2025-10-17T12:05:30Z"
            },
            {
              sender: "Agent Spark",
              role: "agent",
              message:
                "AI is known as Artificial intelligence which can give answers to your questions.",
              timestamp: "2025-10-17T12:06:00Z"
            },
            {
              sender: "System",
              role: "system",
              message:
                "Conversation status changed from New to Closed by Pradeep Chandran at 12:11 pm",
              timestamp: "2025-10-17T12:11:30Z"
            }
          ]
        },
        {
          conversationId: "bot-chat-002",
          user: "Guest user",
          channel: "Web",
          lastUpdated: "2025-10-16T11:45:00Z",
          status: "Closed",
          unreadMessages: 0,
          messages: [
            {
              sender: "Guest user",
              role: "customer",
              message: "Hi there! How can I help you today?",
              timestamp: "2025-10-16T11:30:00Z"
            },
            {
              sender: "Agent Spark",
              role: "agent",
              message:
                "Okay, have a great day! Come back if you need more help.",
              timestamp: "2025-10-16T11:45:00Z"
            }
          ]
        }
      ]
    }
  ]
};
