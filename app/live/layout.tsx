import type { Metadata } from "next";
import Shell from "../final/components/Shell";

export const metadata: Metadata = {
  title: "OperaAI. Live demo",
  description: "A personalized patient video with Ask Opera underneath. This is what patients receive.",
};

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
