import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Card from "./Card";
import { Submission } from "../types";

interface RecentsProps {
  recentSubmissions: Submission[];
}

function Recents({ recentSubmissions }: RecentsProps) {
  const rows = recentSubmissions.map((entry, index) => {
    const { topic } = entry;
    return {
      id: index + 1,
      topic,
    };
  });

  const columns: GridColDef[] = [
    { field: "topic", headerName: "Topic", flex: 1 },
  ];

  return (
    <Card title="Recent Submissions">
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

export default Recents;
