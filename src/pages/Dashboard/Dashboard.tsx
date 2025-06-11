import { Skeleton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Header from "../../components/Header";
import { useGetStats } from "./hooks";
import Leaderboard from "./components/Leaderboard";

import { DashboardStats } from "./types";
import AverageScore from "./components/AverageScore";
import Recents from "./components/Recents";

interface DashboardContentProps {
  isLoading?: boolean;
  dashboardStats?: DashboardStats | null;
}

function DashboardContent({ isLoading, dashboardStats }: DashboardContentProps) {
  if (isLoading || !dashboardStats) {
    return <Skeleton />;
  }

  const { topTopics, averageScore, recentSubmissions } = dashboardStats;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        flex: 1,
        height: '100%',
        alignItems: 'center',
      }}
    >
      <Leaderboard topTopics={topTopics} />
      <AverageScore averageScore={averageScore} />
      <Recents recentSubmissions={recentSubmissions} />
    </Stack>
  );
}

function Dashboard() {
  const { dashboardStats, isLoading } = useGetStats();

  return (
    <Stack height="90%" padding={2}>
      <Header showBackButton />
      <DashboardContent isLoading={isLoading} dashboardStats={dashboardStats} />
    </Stack>
  );
}

export default Dashboard;
