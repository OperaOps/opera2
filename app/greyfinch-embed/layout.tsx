import type { Metadata } from "next";

// White-labeled: override the app-wide "Opera AI" title for the embed route.
export const metadata: Metadata = {
  title: "Generate patient video",
  description: "Generate a personalized patient education video.",
  robots: { index: false, follow: false },
  openGraph: { title: "Generate patient video", description: "Generate a personalized patient education video." },
  twitter: { title: "Generate patient video", description: "Generate a personalized patient education video." },
};

export default function GreyfinchEmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
