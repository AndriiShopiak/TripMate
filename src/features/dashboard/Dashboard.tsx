// src/pages/Dashboard.tsx
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 rounded shadow">
      <h1 className="text-2xl font-bold text-gray-800">👋 Вітаємо у TripMate!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Вийти
      </button>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
      <p className="text-gray-600">Тут скоро буде список твоїх подорожей 😎</p>
      </div>
    </div>
  );
}
