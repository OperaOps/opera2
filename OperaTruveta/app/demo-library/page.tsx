import { redirect } from 'next/navigation';

/** The demo library now lives on the home page — one-page site. */
export default function DemoLibraryRedirect() {
  redirect('/#demos');
}
