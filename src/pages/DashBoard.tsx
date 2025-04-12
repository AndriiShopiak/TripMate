import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";

type Trip = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
};

export default function Dashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) return;

      const q = query(
        collection(db, "trips"),
        where("members", "array-contains", user.uid)
      );
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Trip, "id">),
      }));
      setTrips(data);
    };

    fetchTrips();
  }, [user]);

  return (
    <>
    <Header />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Мої подорожі</h1>
          <Link
            to="/new-trip"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Нова подорож
          </Link>
        </div>

        {trips.length === 0 ? (
          <p className="text-gray-600">Подорожей ще немає.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <Link
                key={trip.id}
                to={`/trip/${trip.id}`}
                className="border rounded-xl p-4 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold">{trip.name}</h2>
                <p className="text-gray-500">
                  {trip.startDate} — {trip.endDate}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
