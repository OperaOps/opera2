import type { Metadata } from "next";
import Shell from "./components/Shell";

export const metadata: Metadata = {
  title: "OperaAI. The future of patient education",
  description:
    "Opera turns every treatment plan into moving, medically true images, in every specialty, and works the interval between the consult and the yes.",
};

export default function FinalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
