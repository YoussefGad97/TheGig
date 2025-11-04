import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Assuming an auth middleware or utility

export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Mock data for conversations, matching the structure in page.tsx
  const conversations = [
    {
      id: '1',
      user: {
        id: 'user1',
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
        id: 'user2',
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
        id: 'user3',
        name: 'Alice Johnson',
        avatar: 'https://via.placeholder.com/150',
      },
      lastMessage: 'Don\'t forget the meeting.',
      unreadCount: 1,
      lastMessageTime: '2 days ago',
      active: false,
    },
  ];

  return NextResponse.json(conversations);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { conversationId, recipientId, content } = await request.json();

  if (!conversationId || !recipientId || !content) {
    return NextResponse.json({ message: 'Conversation ID, Recipient ID, and content are required' }, { status: 400 });
  }

  // In a real application, you would save the message to a database
  // For now, we'll return a success message with mock data
  const newMessage = {
    id: String(Date.now()),
    sender: session.user.name || 'You',
    content,
    conversationId,
    recipientId,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json({ message: 'Message sent successfully', newMessage }, { status: 201 });
}
