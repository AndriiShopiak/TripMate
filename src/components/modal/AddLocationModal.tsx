
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  position: { lat: number; lng: number };
};

export default function AddLocationModal({ isOpen, onClose, tripId, position }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("place");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, "trips", tripId, "locations"), {
      name,
      description,
      type,
      lat: position.lat,
      lng: position.lng,
      userId: auth.currentUser?.uid,
      createdAt: Date.now(),
    });
    onClose();
    setName("");
    setDescription("");
    setType("place");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Нова локація 📍</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label="Назва локації"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Опис локації"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
          />

          <TextField
            select
            label="Тип локації"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            <MenuItem value="place">Місце</MenuItem>
            <MenuItem value="food">Їжа</MenuItem>
            <MenuItem value="hotel">Готель</MenuItem>
            <MenuItem value="event">Подія</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Скасувати
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
