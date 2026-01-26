// src/types/index.ts

export interface GithubStatsData {
  repos: number;
  followers: number;
  contributions: number;
}

export interface ProjectType {
  id: number;
  title: string;
  category: "React" | "UI/UX" | "Open Source" | "All";
  tech: string[];
}

export interface SkillGroupType {
  category: string;
  items: string[];
}

export interface StatCardProps {
  label: string;
  value: number;
}