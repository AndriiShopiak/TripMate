
import { useState } from "react";
import { db, auth } from "../../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleCreate} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        placeholder="Назва подорожі"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Створити подорож
      </button>
    </form>
  );
}
