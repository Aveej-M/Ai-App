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
              message: "can i know about agent",
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
    { label: "AI Chatbot", value:"agent-chat" },
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

export const assignOptions = [
    { category: "Assign to Team - This will move a conversation to unassigned status", value: "Team", type: "team" },
    { category: "Assign to User", value: "Jeeva", type: "admin" },
    { category: "Assign to AI Agent", value: "Agent Spark", type: "agent" },
    { category: "Assign to Web Bot", value: "Default Live Chat", type: "" },
  ];

export const chatMessages = [
  { 
    name: "All Unassigned Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "My Open Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "My Waiting on Customer Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "My Waiting on Us Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "My On Hold Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "My Resolved Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "All Open Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "All Waiting on Customer Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "All Waiting on Us Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "All On Hold Chats", 
    chats: [],
    bookMark: false, 
  },
  { 
    name: "All Resolved Chats", 
    chats: [
      {
        conversationId: "bot-chat-009",
        user: "Guest user 9",
        channel: "Web",
        startDate: "19/08/2025",
        endDate: "27/08/2025",
        messages: [
          {
            sender: "System",
            role: "date",
            message: "19/08/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "How r u",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hello there! I'm doing well, thank you for asking. How can I help you today?",
            timestamp: "2025-08-19T10:00:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "hi",
            timestamp: "2025-08-19T10:01:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! Is there anything I can help you with today?",
            timestamp: "2025-08-19T10:02:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:06:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from Closed to New by System",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "You are exceeding your allocated Casual Leave balance. Your casual leave balance is 0.00. You are exceeding your allocated Casual Leave balance. Your casual leave balance is 0.00",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on. Is there anything else I can help you with today?",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:30:00Z"
          }
        ],
        managed_by: {type: "team", name: "Team"},
        source: "web",
        status: "closed",
        isRead: false,
      },
    ],
    bookMark: false, 
  },
  { 
    name: "All Bot Conversations", 
    chats: [
      {
        conversationId: "bot-chat-001",
        user: "Guest user 1",
        channel: "Web",
        startDate: "19/08/2025",
        endDate: "27/08/2025",
        
        messages: [
          {
            sender: "System",
            role: "date",
            message: "13/11/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "How r u",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hello there! I'm doing well, thank you for asking. How can I help you today?",
            timestamp: "2025-08-19T10:00:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "hi",
            timestamp: "2025-08-19T10:01:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! Is there anything I can help you with today?",
            timestamp: "2025-08-19T10:02:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:06:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from Closed to New by System",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "You are exceeding your allocated Casual Leave balance. Your casual leave balance is 0.00. You are exceeding your allocated Casual Leave balance. Your casual leave balance is 0.00",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on. Is there anything else I can help you with today?",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:30:00Z"
          }
        ],
        managed_by: {type: "agent", name: "Agent Spark"},
        source: "web",
        status: "closed",
        isRead: false,
      },
      {
        conversationId: "bot-chat-002",
        user: "Guest user 2",
        channel: "Web",
        startDate: "16/10/2025",
        endDate: "13/11/2025",
        messages: [
          {
            sender: "System",
            role: "date",
            message: "13/11/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! How can I help you today?",
            timestamp: "2025-10-16T11:30:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I'm a friendly customer support bot here to assist you!",
            timestamp: "2025-10-16T11:35:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have enough information to complete that request.",
            timestamp: "2025-10-16T11:40:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on.",
            timestamp: "2025-10-16T11:45:00Z"
          }
        ],
        managed_by: {type: "agent", name: "Agent Spark"},
        source: "web",
        status: "new",
        isRead: false,
      },
      {
        conversationId: "bot-chat-003",
        user: "Guest user 3",
        channel: "Web",
        startDate: "19/08/2025",
        endDate: "27/08/2025",
        messages: [
          {
            sender: "System",
            role: "date",
            message: "19/08/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "How r u",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hello there! I'm doing well, thank you for asking. How can I help you today?",
            timestamp: "2025-08-19T10:00:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "hi",
            timestamp: "2025-08-19T10:01:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! Is there anything I can help you with today?",
            timestamp: "2025-08-19T10:02:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:06:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from Closed to New by System",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "get analytics data",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on. Is there anything else I can help you with today?",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:30:00Z"
          }
        ],
        managed_by: {type: "agent", name: "Agent Spark"},
        source: "whatsapp",
        status: "closed",
        isRead: false,
      },
      {
        conversationId: "bot-chat-004",
        user: "Guest user 4",
        channel: "Web",
        startDate: "16/10/2025",
        endDate: "27/08/2025",
        messages: [
          {
            sender: "System",
            role: "date",
            message: "16/08/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! How can I help you today?",
            timestamp: "2025-10-16T11:30:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I'm a friendly customer support bot here to assist you!",
            timestamp: "2025-10-16T11:35:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have enough information to complete that request.",
            timestamp: "2025-10-16T11:40:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on.",
            timestamp: "2025-10-16T11:45:00Z"
          }
        ],
        managed_by: {type: "team", name: "Team"},
        source: "web",
        status: "new",
        isRead: true,
      },
      {
        conversationId: "bot-chat-00 5",
        user: "Guest user 5",
        channel: "Web",
        startDate: "19/08/2025",
        endDate: "27/08/2025",
        messages: [
          {
            sender: "System",
            role: "date",
            message: "19/08/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "How r u",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hello there! I'm doing well, thank you for asking. How can I help you today?",
            timestamp: "2025-08-19T10:00:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "hi",
            timestamp: "2025-08-19T10:01:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! Is there anything I can help you with today?",
            timestamp: "2025-08-19T10:02:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:06:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from Closed to New by System",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "You are exceeding your allocated Casual Leave balance. Your casual leave balance is 0.00. You are exceeding your allocated Casual Leave balance. Your casual leave balance is 0.00",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on. Is there anything else I can help you with today?",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:30:00Z"
          }
        ],
        managed_by: {type: "team", name: "Team"},
        source: "web",
        status: "closed",
        isRead: true,
      },
      {
        conversationId: "bot-chat-006",
        user: "Guest user 6",
        channel: "Web",
        startDate: "16/10/2025",
        endDate: "27/08/2025",
        messages: [
          {
            sender: "System",
            role: "date",
            message: "16/08/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! How can I help you today?",
            timestamp: "2025-10-16T11:30:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I'm a friendly customer support bot here to assist you!",
            timestamp: "2025-10-16T11:35:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have enough information to complete that request.",
            timestamp: "2025-10-16T11:40:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on.",
            timestamp: "2025-10-16T11:45:00Z"
          }
        ],
        managed_by: {type: "agent", name: "Agent Spark"},
        source: "web",
        status: "new",
        isRead: true,
      },
      {
        conversationId: "bot-chat-007",
        user: "Guest user 7",
        channel: "Web",
        startDate: "19/08/2025",
        endDate: "27/08/2025",
        messages: [
          {
            sender: "System",
            role: "date",
            message: "19/08/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "How r u",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hello there! I'm doing well, thank you for asking. How can I help you today?",
            timestamp: "2025-08-19T10:00:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "hi",
            timestamp: "2025-08-19T10:01:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! Is there anything I can help you with today?",
            timestamp: "2025-08-19T10:02:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:06:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from Closed to New by System",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Guest user",
            role: "customer",
            message: "get analytics data",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on. Is there anything else I can help you with today?",
            timestamp: "2025-08-19T10:23:00Z"
          },
          {
            sender: "System",
            role: "system",
            message: "Conversation status changed from New to Closed by the System",
            timestamp: "2025-08-19T10:30:00Z"
          }
        ],
        managed_by: {type: "agent", name: "Agent Spark"},
        source: "web",
        status: "closed",
        isRead: true,
      },
      {
        conversationId: "bot-chat-008",
        user: "Guest user 8",
        channel: "Web",
        startDate: "16/10/2025",
        endDate: "27/08/2025",
        messages: [
          {
            sender: "System",
            role: "date",
            message: "16/08/2025",
            timestamp: "2025-08-19T09:59:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "Hi there! How can I help you today?",
            timestamp: "2025-10-16T11:30:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I'm a friendly customer support bot here to assist you!",
            timestamp: "2025-10-16T11:35:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have enough information to complete that request.",
            timestamp: "2025-10-16T11:40:00Z"
          },
          {
            sender: "Agent Spark",
            role: "agent",
            message: "I don't have the specific details on how to get your analytics data right now. That's something I'd need to check on.",
            timestamp: "2025-10-16T11:45:00Z"
          }
        ],
        managed_by: "agent-chat",
        source: "web",
        status: "new",
        isRead: true,
      },
    ],
    bookMark: true,
  }
];

export const aiChatData = [
  { label: "Rephrase", value: "rephrase" },
  { label: "Correct Grammar", value: "correct_grammar" },
  { label: "Change Tone", value: "change_tone" },
  { label: "Empathize", value: "empathize" },
  { label: "Summarize", value: "summarize" },
  { label: "Expand", value: "expand" },
  { label: "Simplify", value: "simplify" },
  { label: "Add Examples", value: "add_examples" },
  { label: "Translate", value: "translate" },
  { label: "Adjust Politeness", value: "adjust_politeness" },
  { label: "Highlight Key Points", value: "highlight_key_points" },
  { label: "Personalize", value: "personalize" },
  { label: "Align with Brand Voice", value: "align_with_brand_voice" },
  { label: "Remove Jargon", value: "remove_jargon" },
];

export const bulkUpdateData = [
    { label: "Assign to", value: "assign_to" },
    { label: "Update Conversation Status", value: "update_convo_status" },
];

export const assigntoData = [
    { label: "Assign to User", options: [
      { value: "admin", label: "Jeeva", type: "admin" },
    ], },
    { label: "Assign to Bot", options: [
        { value: "bot", label: "", type: "bot" },
        ], },
    { label: "Assign to AI Agent", options: [
      { value: "agent", label: "Agent Spark", type: "agent" },
    ], },
];

export const conversationStatusData = [
  { label: "Closed", value: "closed" },
  { label: "New", value: "new" },
  { label: "On Hold", value: "on_hold" },
  { label: "Waiting on customer", value: "waiting_customer" },
  { label: "Waiting on us", value: "waiting_us" }
]

