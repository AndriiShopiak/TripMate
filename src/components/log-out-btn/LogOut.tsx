import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

export default function LogOutBtn() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleLogout}>Вийти</Button>
    </Box>
  );
}
