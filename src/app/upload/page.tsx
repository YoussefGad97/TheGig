'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Upload() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return null; // This page will now just redirect
}
