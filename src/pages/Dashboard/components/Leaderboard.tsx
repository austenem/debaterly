import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Card from "./Card";

interface LeaderboardProps {
  topTopics: Record<string, number>[];
}

function Leaderboard({ topTopics }: LeaderboardProps) {
  const rows = topTopics.map((entry, index) => {
    const [topic, score] = Object.entries(entry)[0];
    return {
      id: index + 1,
      topic,
      score: Math.round(score),
    };
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 70 },
    { field: "topic", headerName: "Topic", flex: 1 },
    { field: "score", headerName: "Avg. Score", type: "number", width: 130 },
  ];

  return (
    <Card title="Leaderboard">
      <Box width="100%">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Card>
  );
}

export default Leaderboard;
