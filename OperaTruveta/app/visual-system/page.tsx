import { redirect } from 'next/navigation';

// Removed from the Truveta-facing site to keep it tight (Overview + Demos only).
export default function Page() {
  redirect('/');
}
