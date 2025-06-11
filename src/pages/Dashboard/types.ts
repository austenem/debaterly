export interface Submission {
  id: number;
  topic: string;
  argument: string[];
  averageScore: number;
  submittedAt: string;
}

export interface DashboardStats {
  averageScore: number;
  totalSubmissions: number;
  topTopics: Record<string, number>[];
  recentSubmissions: Submission[];
  submissionsPerDay: Record<string, number>;
}
