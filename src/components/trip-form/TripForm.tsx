
import { useState } from "react";
import { db, auth } from "../../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Stack,
  TextField
} from "@mui/material";

export default function TripForm() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Користувач не авторизований");
      return;
    }
    try {
      console.log("User:", auth.currentUser);
      const tripRef = await addDoc(collection(db, "trips"), {
        name,
        startDate,
        endDate,
        createdAt: serverTimestamp(),
        owner: auth.currentUser?.uid,
        members: [auth.currentUser?.uid],
      });
      navigate(`/trip/${tripRef.id}`);
    } catch (err) {
      alert("Не вдалося створити подорож 😢");
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleCreate}>
        <Stack spacing={3}>
          <TextField
            label="Назва подорожі"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Дата початку"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <TextField
            label="Дата завершення"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          <Button variant="contained" color="primary" type="submit">
            Створити подорож
          </Button>
        </Stack>
      </Box>
  );
}
