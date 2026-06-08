export type EcoMission = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  impactCo2: number;
  xp: number;
  completed: boolean;
};

export type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
};

export type MonthlyData = {
  month: string;
  emissions: number;
  projected: number;
};
