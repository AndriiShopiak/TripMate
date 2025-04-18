import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../../lib/firebase";

export default function Welcome() {

  return (
    <Box>
      <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
      <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
        👋 Вітаємо {auth.currentUser?.displayName || "мандрівнику"} у TripMate!
      </Link>
      </Typography>
    </Box>
  );
}
