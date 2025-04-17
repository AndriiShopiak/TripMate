// src/pages/TripPage.tsx
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarkers from "../components/location-marker/LocationMarkers";
import LocationList from "../components/location-list/LocationList";
import Loader from "../components/loader/Loader";


const position: [number, number] = [48.3794, 31.1656];

export default function TripPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!id) return;

      const docRef = doc(db, "trips", id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setTrip({ id: snapshot.id, ...snapshot.data() });
      } else {
        setTrip(null);
      }

      setLoading(false);
    };

    fetchTrip();
  }, [id]);

  if (loading) return <Loader />;
  if (!trip) return <p className="p-6">Подорож не знайдена 😢</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{trip.name}</h1>
      <p className="text-gray-600 mb-4">
        {trip.startDate} — {trip.endDate}
      </p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Учасники:</h2>
        <ul className="list-disc list-inside">
          {trip.members?.map((uid: string) => (
            <li key={uid}>{uid}</li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="h-[400px] mt-4 rounded overflow-hidden border">
        <MapContainer center={position} zoom={6} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          <LocationMarkers tripId={trip.id} />
        </MapContainer>

        </div>
      </div>
      <LocationList tripId={trip.id} />
    </div>
  );
}

