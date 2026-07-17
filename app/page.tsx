import type { Metadata } from "next";
import Shell from "./final/components/Shell";
import FinalPage from "./final/page";

export const metadata: Metadata = {
  title: "OperaAI. The future of patient education",
  description:
    "Opera turns every treatment plan into moving, medically true images, in every specialty, and works the interval between the consult and the yes.",
};

export default function Home() {
  return (
    <Shell>
      <FinalPage />
    </Shell>
  );
}
