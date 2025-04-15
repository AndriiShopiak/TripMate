// src/components/AddLocationModal.tsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import Button from "../../ui/Button";

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
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-1000 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" />
      <div className="bg-white rounded-xl p-6 z-10 w-full max-w-md shadow-xl">
        <Dialog.Title className="text-xl font-bold mb-4">Нова локація 📍</Dialog.Title>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Назва"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border rounded p-2"
          />
          <textarea
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded p-2"
          >
            <option value="place">Місце</option>
            <option value="food">Їжа</option>
            <option value="hotel">Готель</option>
            <option value="event">Подія</option>
          </select>
          <Button type="submit">Зберегти</Button>
          <Button variant="secondary" onClick={onClose}>Скасувати</Button>
        </form>
      </div>
    </Dialog>
  );
}
