export type Answer = {
  analysis: { dataSources: string[]; steps: string[]; notes?: string[] };
  title?: string;
  subtitle?: string;
  format: "table" | "cards" | "bullets" | "chart" | "mixed";
  headers?: string[];
  columns?: string[];
  rows?: (string | number)[][];
  cards?: { heading: string; body: string; footnote?: string }[];
  bullets?: string[];
  blocks?: Array<{
    kind: "table" | "cards" | "bullets";
    title?: string;
    columns?: string[];
    rows?: (string | number)[][];
    cards?: { heading: string; body: string; footnote?: string }[];
    bullets?: string[];
  }>;
  notes?: string[];
  followUps?: string[];
};
