import React, { PropsWithChildren } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const cardStyle = {
  width: '40%',
  height: '80%',
  border: '1px solid #ddd',
  borderRadius: 2,
  padding: 4,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 2px 4px rgba(0, 1, 1, 0.4)',
};

interface CardProps {
  title: string;
}

function Card({ title, children }: PropsWithChildren<CardProps>) {
  return (
    <Box sx={cardStyle}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {title}
      </Typography>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Card;
