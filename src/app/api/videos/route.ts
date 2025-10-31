import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Video from '@/lib/models/Video';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, videoUrl } = await req.json();

    const newVideo = new Video({
      title,
      description,
      videoUrl,
      author: token.sub,
    });

    await newVideo.save();

    return NextResponse.json({ message: 'Video uploaded successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
