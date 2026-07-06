'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/** The demo library now lives on the home page — one-page site. */
export default function DemoLibraryRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/#demos');
  }, [router]);
  return null;
}
