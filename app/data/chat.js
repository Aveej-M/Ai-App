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

export const chatManage = [
    { label: "AI Chatbot", value:"ai-chat" },
    { label: "All", value:"all" },
    { label: "Chatbot", value:"bot" },
    { label: "Team", value:"team" },
]

export const chatSource = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Whatsapp", value: "whatsapp" },
]

export const converstaionStatus = [
  { label: "Closed", value: "closed" },
  { label: "New", value: "new" },
  { label: "On Hold", value: "hold" },
  { label: "Waiting on customer", value: "waitingCustomer" },
  { label: "Waiting on Us", value: "waitingUs" }
]

export const formStatus = [
  { label: "Do Not Contact", value: "not-contact" },
  { label: "Intersted", value: "intersted" },
  { label: "Internal", value: "internal" },
  { label: "Junk Lead", value: "junk" },
  { label: "New", value: "new" },
  { label: "Not Qualified", value: "not-qualified" },
  { label: "Qualified", value: "Qualified" },
  { label: "Won", value: "won" },
]

export const lifeCycleData = [
  { label: "Lead", value: "lead" },
  { label: "Sales Qualified Lead", value: "sales" },
  { label: "Customer", value: "customer" },
  { label: "Internal", value: "internal" },
]
