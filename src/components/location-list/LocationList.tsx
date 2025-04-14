// src/components/LocationList.tsx
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Props = {
  tripId: string;
};

type Location = {
  id: string;
  name: string;
  description: string;
  type: string;
  lat: number;
  lng: number;
};

export default function LocationList({ tripId }: Props) {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const locRef = collection(db, "trips", tripId, "locations");
    const unsubscribe = onSnapshot(locRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Location, "id">),
      }));
      setLocations(data);
    });

    return () => unsubscribe();
  }, [tripId]);

  return (
    <div className="flex flex-col gap-2 mt-4">
      <h2 className="text-lg font-semibold">📍 Локації подорожі</h2>
      {locations.map((loc) => (
        <div key={loc.id} className="border rounded p-3 bg-gray-50">
          <p className="font-bold">{loc.name}</p>
          <p className="text-sm text-gray-600">{loc.description}</p>
          <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 inline-block mt-1">
            {loc.type}
          </span>
        </div>
      ))}
    </div>
  );
}
