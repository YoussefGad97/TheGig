"use client";

import React, { useState } from 'react';

const MessagesPage = () => {
  const [activeConversationId, setActiveConversationId] = useState('1'); // State to manage active conversation
  const [showConversations, setShowConversations] = useState(true); // State to toggle views on mobile

  // Mock data for conversations
  const conversations = [
    {
      id: '1',
      user: {
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/150',
      },
      lastMessage: 'Hey, how are you?',
      unreadCount: 2,
      lastMessageTime: '10:30 AM',
      active: true,
    },
    {
      id: '2',
      user: {
        name: 'Jane Smith',
        avatar: 'https://via.placeholder.com/150',
      },
      lastMessage: 'See you tomorrow!',
      unreadCount: 0,
      lastMessageTime: 'Yesterday',
      active: false,
    },
    {
      id: '3',
      user: {
        name: 'Alice Johnson',
        avatar: 'https://via.placeholder.com/150',
      },
      lastMessage: 'Don\'t forget the meeting.',
      unreadCount: 1,
      lastMessageTime: '2 days ago',
      active: false,
    },
  ];

  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  const handleConversationClick = (id: string) => {
    setActiveConversationId(id);
    setShowConversations(false); // Hide conversations list and show message area on mobile
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Conversations List */}
      <div
        className={`w-full md:w-1/3 bg-card-background border-r border-border-color ${
          !showConversations ? 'hidden md:flex' : 'flex flex-col'
        }`}
      >
        <div className="p-4 border-b border-border-color">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <div className="overflow-y-auto flex-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-4 border-b border-border-color cursor-pointer ${
                conversation.id === activeConversationId
                  ? 'bg-primary/10 dark:bg-primary/20'
                  : 'hover:bg-card-background/50'
              }`}
              onClick={() => handleConversationClick(conversation.id)}
            >
              <img
                className="w-10 h-10 rounded-full mr-3"
                src={conversation.user.avatar}
                alt={`${conversation.user.name} Avatar`}
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{conversation.user.name}</h3>
                <p className="text-sm text-foreground/70">{conversation.lastMessage}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-xs text-foreground/50 mb-1">{conversation.lastMessageTime}</p>
                {conversation.unreadCount > 0 && (
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Area */}
      <div
        className={`flex-1 flex-col bg-background ${
          showConversations ? 'hidden md:flex' : 'flex'
        }`}
      >
        <div className="p-4 border-b border-border-color bg-card-background flex items-center">
          <button
            className="md:hidden mr-3 text-foreground"
            onClick={() => setShowConversations(true)}
          >
            {'< Back'}
          </button>
          <h2 className="text-xl font-semibold">
            {activeConversation ? activeConversation.user.name : 'Select a conversation'}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* Example Message - will be replaced with dynamic messages */}
          <div className="flex items-start mb-4">
            <img
              className="w-8 h-8 rounded-full mr-3"
              src="https://via.placeholder.com/150"
              alt="User Avatar"
            />
            <div className="bg-card-background p-3 rounded-lg max-w-xs">
              <p className="text-foreground">Hi there!</p>
            </div>
          </div>
          <div className="flex items-start justify-end mb-4">
            <div className="bg-primary text-white p-3 rounded-lg max-w-xs">
              <p>Hello! How are you?</p>
            </div>
            <img
              className="w-8 h-8 rounded-full ml-3"
              src="https://via.placeholder.com/150"
              alt="My Avatar"
            />
          </div>
        </div>
        <div className="p-4 border-t border-border-color bg-card-background">
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            />
            <button className="ml-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
