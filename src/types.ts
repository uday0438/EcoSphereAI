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

export interface ProductAnalysisResult {
  eco_score: number;
  verdict: string;
  reasoning: string;
  concerns: string[];
  recommended_alternative?: string | null;
  technical_details: {
    label: string;
    value: string;
  }[];
}

export interface DetectedItem {
  name: string;
  material: string;
  status: "Good" | "Bad";
}

export interface RoomAuditResult {
  plastic_load: number;
  ghost_carbon: string;
  ocean_impact: string;
  decomposition_time: string;
  decomposition_item: string;
  decomposition_comparison: string;
  toxin_risk: "Low" | "Medium" | "High" | "Severe";
  toxin_warning: string;
  recyclable_value: string;
  circular_economy_status: string;
  faux_natural_verdict: string;
  detected_items: DetectedItem[];
}

export interface ScanGreenChatMessage {
  role: 'user' | 'model';
  text: string;
}

